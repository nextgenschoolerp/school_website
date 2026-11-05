#!/usr/bin/env python3
"""
Validates static site assets, internal HTML links, and CNAME configuration.
"""
import os
import re
import sys

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(root)

    print("Checking essential files...")
    required_files = [
        "index.html",
        "CNAME",
        os.path.join("assets", "styles.css"),
        os.path.join("assets", "app.js")
    ]

    for req in required_files:
        if not os.path.exists(req):
            print(f"::error::Missing required file: {req}")
            sys.exit(1)
        print(f"  [OK] {req}")

    # Verify CNAME content
    with open("CNAME", "r", encoding="utf-8") as f:
        cname = f.read().strip()
    if cname != "school.knowvasystems.com":
        print(f"::error::CNAME file contains '{cname}', expected 'school.knowvasystems.com'")
        sys.exit(1)
    print(f"  [OK] CNAME verified: {cname}")

    # Verify internal HTML links
    print("\nValidating internal HTML links...")
    html_files = [f for f in os.listdir(".") if f.endswith(".html")]
    broken = 0

    for doc in html_files:
        with open(doc, "r", encoding="utf-8") as f:
            html = f.read()

        # Find relative hrefs to .html
        hrefs = re.findall(r'href=["\']([a-zA-Z0-9_\-]+\.html(?:#[^"\']*)?)["\']', html)
        for href in hrefs:
            clean_href = href.split("#")[0]
            if not os.path.exists(clean_href):
                print(f"::error file={doc}::Broken link in {doc} -> {href}")
                broken += 1

    if broken > 0:
        print(f"\nFailed: Found {broken} broken internal link(s).")
        sys.exit(1)

    print(f"  [OK] Verified internal links across {len(html_files)} HTML pages with 0 broken links.")
    print("\nAll site checks passed successfully!")

if __name__ == "__main__":
    main()

