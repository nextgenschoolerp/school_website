/**
 * Knowva Systems — shared site footer.
 *
 * Single source of truth for the footer on every page. Each page contains:
 *   <div id="site-footer" data-root="../"></div>        (data-root = path back to the site root)
 *   <script src="{root}assets/js/site-footer.js"></script>
 *
 * Edit FOOTER_COLUMNS below to change links for all pages at once.
 * Link targets are relative to the site root; `pages/` is added automatically.
 */
(function () {
  'use strict';

  var FOOTER_COLUMNS = [
    {
      title: 'Product',
      links: [
        { label: 'Overview', href: 'pages/product.html#overview' },
        { label: 'Students', href: 'pages/product.html#students' },
        { label: 'Admissions', href: 'pages/product.html#admissions' },
        { label: 'Staff & faculty', href: 'pages/product.html#staff' },
        { label: 'Payroll', href: 'pages/product.html#payroll' },
        { label: 'Academics & Exams', href: 'pages/product.html#academics' },
        { label: 'Teaching & Planning', href: 'pages/product.html#teaching' },
        { label: 'Attendance', href: 'pages/product.html#attendance' },
        { label: 'Fees & payments', href: 'pages/fees.html' },
        { label: 'Transport & Auxiliary', href: 'pages/product.html#transport' },
        { label: 'Communications', href: 'pages/product.html#communications' },
        { label: 'Calendar', href: 'pages/product.html#calendar' },
        { label: 'Reports', href: 'pages/product.html#reports' },
        { label: 'Documents & Settings', href: 'pages/product.html#documents' }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Trustees & Owners', href: 'pages/solutions.html#trustees' },
        { label: 'Principals', href: 'pages/solutions.html#principals' },
        { label: 'Admissions Head', href: 'pages/solutions.html#admissions' },
        { label: 'Academic Coordinators', href: 'pages/solutions.html#coordinators' },
        { label: 'Teachers', href: 'pages/solutions.html#teachers' },
        { label: 'Finance & Accounts', href: 'pages/solutions.html#finance' },
        { label: 'Transport Manager', href: 'pages/solutions.html#transport' },
        { label: 'IT & System Admins', href: 'pages/solutions.html#admins' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Knowva Systems', href: 'pages/about.html' },
        { label: 'Security & Compliance', href: 'pages/security.html' },
        { label: 'Resources & Guides', href: 'pages/resources.html' },
        { label: 'Careers', href: 'pages/about.html#careers' },
        { label: 'Contact Us', href: 'pages/demo.html' }
      ]
    },
    {
      title: 'Legal & Compliance',
      links: [
        { label: 'Privacy Policy', href: 'pages/security.html#privacy' },
        { label: 'Terms of Service', href: 'pages/security.html#terms' },
        { label: 'Student Data Safety (DPDP Act India)', href: 'pages/security.html#dpdp' },
        { label: 'CBSE/ICSE Board Audit readiness', href: 'pages/security.html#board-audit' }
      ]
    }
  ];

  var COPYRIGHT = '© Knowva Systems Inc. All rights reserved. Made for schools in India.';

  var SOCIAL_ICONS = ['share', 'public', 'smart_display'];

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildFooter(root) {
    var columns = FOOTER_COLUMNS.map(function (column) {
      var items = column.links.map(function (link) {
        return '<li><a href="' + root + escapeHtml(link.href) + '">' + escapeHtml(link.label) + '</a></li>';
      }).join('');
      return (
        '<div class="kv-ft-col">' +
          '<h4>' + escapeHtml(column.title) + '</h4>' +
          '<ul>' + items + '</ul>' +
        '</div>'
      );
    }).join('');

    var icons = SOCIAL_ICONS.map(function (name) {
      return '<span class="material-symbols-outlined" aria-hidden="true">' + name + '</span>';
    }).join('');

    return (
      '<footer class="kv-footer">' +
        '<div class="kv-ft-inner">' +
          '<div class="kv-ft-grid">' + columns + '</div>' +
          '<div class="kv-ft-bottom">' +
            '<p>' + escapeHtml(COPYRIGHT) + '</p>' +
            '<div class="kv-ft-icons">' + icons + '</div>' +
          '</div>' +
        '</div>' +
      '</footer>'
    );
  }

  function init() {
    var mount = document.getElementById('site-footer');
    if (!mount) return;
    var root = mount.getAttribute('data-root') || '';
    mount.innerHTML = buildFooter(root);
  }

  // Runs synchronously where the footer sits in the page.
  init();
})();
