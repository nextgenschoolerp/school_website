#!/usr/bin/env python3
"""
Validates the static site: required files, CNAME, and every local link.

Checks every local href / src / poster in all HTML pages (root and pages/),
plus local url(...) references in CSS:
  - the target file must exist
  - a #fragment must match an id (or a[name]) in the target page
External (http/https/mailto/tel/data) references are not fetched.
"""
import os
import re
import sys
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {".git", ".github", "scripts", "node_modules"}
SKIP_PREFIX = ("http://", "https://", "mailto:", "tel:", "data:", "javascript:", "//")
LINK_ATTRS = {"href", "src", "poster"}


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []   # (attr, value, line)
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key == "id" and value:
                self.ids.add(value)
            if key == "name" and value and tag == "a":
                self.ids.add(value)
            if key in LINK_ATTRS and value is not None:
                self.refs.append((key, value, self.getpos()[0]))


def walk(exts):
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in filenames:
            if name.endswith(exts):
                yield os.path.join(dirpath, name)


def rel(path):
    return os.path.relpath(path, ROOT).replace("\\", "/")


def main():
    print("Checking essential files...")
    required_files = [
        "index.html",
        "CNAME",
        os.path.join("assets", "css", "styles.css"),
        os.path.join("assets", "js", "app.js"),
    ]
    for req in required_files:
        if not os.path.exists(os.path.join(ROOT, req)):
            print(f"::error::Missing required file: {req}")
            sys.exit(1)
        print(f"  [OK] {req}")

    with open(os.path.join(ROOT, "CNAME"), "r", encoding="utf-8") as f:
        cname = f.read().strip()
    if cname != "school.knowvasystems.com":
        print(f"::error::CNAME file contains '{cname}', expected 'school.knowvasystems.com'")
        sys.exit(1)
    print(f"  [OK] CNAME verified: {cname}")

    print("\nValidating local links, sources and anchors...")
    pages = {}
    for path in walk(".html"):
        with open(path, "r", encoding="utf-8") as f:
            parser = PageParser()
            parser.feed(f.read())
        pages[os.path.normpath(path)] = parser

    broken = 0
    checked = 0
    for src, parser in pages.items():
        for attr, value, line in parser.refs:
            value = value.strip()
            if not value or value.startswith(SKIP_PREFIX):
                continue
            parts = urlsplit(value)
            target_path = unquote(parts.path)
            fragment = parts.fragment
            checked += 1
            if target_path == "":
                target = src  # same-page anchor
            else:
                target = os.path.normpath(os.path.join(os.path.dirname(src), target_path))
                if not os.path.exists(target):
                    print(f"::error file={rel(src)},line={line}::Broken {attr} in {rel(src)} -> {value} (file not found)")
                    broken += 1
                    continue
            if fragment and target in pages and fragment not in pages[target].ids:
                print(f"::error file={rel(src)},line={line}::Broken anchor in {rel(src)} -> {value} (#{fragment} not found)")
                broken += 1

    for css in walk(".css"):
        with open(css, "r", encoding="utf-8") as f:
            for lineno, text in enumerate(f, 1):
                for m in re.finditer(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)', text):
                    u = m.group(1)
                    if u.startswith(("data:", "http", "#")):
                        continue
                    checked += 1
                    target = os.path.normpath(os.path.join(os.path.dirname(css), u.split("?")[0]))
                    if not os.path.exists(target):
                        print(f"::error file={rel(css)},line={lineno}::Broken url() in {rel(css)} -> {u}")
                        broken += 1

    if broken > 0:
        print(f"\nFailed: found {broken} broken reference(s) out of {checked} checked.")
        sys.exit(1)

    print(f"  [OK] {checked} local references across {len(pages)} HTML pages, 0 broken.")
    print("\nAll site checks passed successfully!")


if __name__ == "__main__":
    main()
