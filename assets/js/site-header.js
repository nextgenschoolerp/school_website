/**
 * Knowva Systems — shared site header.
 *
 * Single source of truth for the header on every page. Each page contains:
 *   <div id="site-header" data-root="../"></div>        (data-root = path back to the site root)
 *   <script src="{root}assets/js/site-header.js"></script>
 *
 * This script renders the header into the mount point, highlights the menu item
 * for the current page (aria-current="page") and drives the tablet/mobile drawer.
 */
(function () {
  'use strict';

  // Navigation items, in display order. `file` is the page's file name in /pages.
  var NAV_ITEMS = [
    { label: 'Product', file: 'product.html' },
    { label: 'Capabilities', file: 'capabilities.html' },
    { label: 'Solutions', file: 'solutions.html' },
    { label: 'Parent app', file: 'parent-app.html' },
    { label: 'Security', file: 'security.html' },
    { label: 'Pricing', file: 'pricing.html' },
    { label: 'Resources', file: 'resources.html' },
    { label: 'About', file: 'about.html' }
  ];

  // Pages that belong to a menu item but do not have their own entry.
  var PAGE_ALIASES = {
    'fees.html': 'product.html',      // Fees & Payments is a module deep dive under Product
    'demo.html': null,                 // booking form: no menu item
    'demo-success.html': null          // confirmation page: no menu item
  };

  var ICON_MENU = '<svg class="kv-icon-open" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  var ICON_CLOSE = '<svg class="kv-icon-close" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function currentFile() {
    var name = (window.location.pathname.split('/').pop() || '').toLowerCase();
    return name === '' ? 'index.html' : name;
  }

  function activeFile(file) {
    if (Object.prototype.hasOwnProperty.call(PAGE_ALIASES, file)) {
      return PAGE_ALIASES[file];
    }
    return file;
  }

  function buildHeader(root, active) {
    function linkAttrs(file) {
      return file === active ? ' aria-current="page"' : '';
    }

    var desktopLinks = NAV_ITEMS.map(function (item) {
      return '<a href="' + root + 'pages/' + item.file + '"' + linkAttrs(item.file) + '>' + item.label + '</a>';
    }).join('');

    var drawerLinks = NAV_ITEMS.map(function (item) {
      return '<li><a href="' + root + 'pages/' + item.file + '"' + linkAttrs(item.file) + '>' + item.label + '</a></li>';
    }).join('');

    return (
      '<header class="kv-header" id="kv-header">' +
        '<div class="kv-bar">' +
          '<a class="kv-brand" href="' + root + 'index.html" aria-label="Knowva System home">' +
            '<img class="kv-logo" src="' + root + 'assets/img/knowva-logo-icon.png" alt="" width="36" height="36">' +
            '<span class="kv-brand-text">' +
              '<span class="kv-brand-name">Knowva Systems</span>' +
              '<span class="kv-brand-tag">School ERP</span>' +
            '</span>' +
          '</a>' +
          '<nav class="kv-nav" aria-label="Main navigation">' + desktopLinks + '</nav>' +
          '<div class="kv-actions">' +
            '<a class="kv-cta" href="' + root + 'pages/demo.html">Book a demo</a>' +
            '<button type="button" class="kv-toggle" id="kv-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="kv-drawer">' +
              ICON_MENU + ICON_CLOSE +
            '</button>' +
          '</div>' +
        '</div>' +
        '<div class="kv-drawer" id="kv-drawer" hidden>' +
          '<nav aria-label="Mobile navigation">' +
            '<ul class="kv-drawer-list">' + drawerLinks + '</ul>' +
          '</nav>' +
          '<div class="kv-drawer-cta">' +
            '<a class="kv-cta" href="' + root + 'pages/demo.html">Book a demo</a>' +
          '</div>' +
        '</div>' +
      '</header>'
    );
  }

  function initDrawer() {
    var toggle = document.getElementById('kv-toggle');
    var drawer = document.getElementById('kv-drawer');
    var header = document.getElementById('kv-header');
    if (!toggle || !drawer || !header) return;

    function setOpen(open) {
      drawer.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(drawer.hidden);
    });

    document.addEventListener('click', function (e) {
      if (!drawer.hidden && !header.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close the drawer when the layout switches to the inline desktop menu.
    var desktop = window.matchMedia('(min-width: 1200px)');
    var onChange = function (ev) { if (ev.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  function init() {
    var mount = document.getElementById('site-header');
    if (!mount) return;

    var root = mount.getAttribute('data-root') || '';
    var active = activeFile(currentFile());

    mount.innerHTML = buildHeader(root, active);
    initDrawer();
  }

  // The mount point sits where the header used to be, so this runs synchronously
  // before the rest of the page renders. Other scripts can rely on #kv-header existing.
  init();
})();
