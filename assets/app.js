/* Knowva site — small, dependency-free interactions. */
(function () {
  // mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // mark current nav link
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });

  // ---- role-workflow tabs ----
  var wf = document.getElementById('wf');
  if (wf) {
    var tabs = wf.querySelectorAll('.wf-tab');
    var panels = wf.querySelectorAll('.wf-panel');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var i = +tab.getAttribute('data-wf');
        tabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        panels.forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        if (panels[i]) panels[i].classList.add('active');
      });
    });
  }

  // ---- stat count-up (one deliberate moment, on scroll into view) ----
  var stats = document.querySelectorAll('.stat .n');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (stats.length && 'IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target, raw = el.textContent.trim();
        var m = raw.match(/^(\d[\d,]*)(\D*)$/);
        if (!m) return;
        var target = parseInt(m[1].replace(/,/g, ''), 10), suffix = m[2] || '';
        var start = null, dur = 900;
        function step(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString('en-IN') + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    stats.forEach(function (s) { io.observe(s); });
  }

  // ---- pricing estimator ----
  var est = document.getElementById('estimator');
  if (est) {
    var RATES = { essentials: 99, standard: 199, complete: 299 };
    var MIN = 15000;
    var inr = function (n) {
      return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    };
    function slabCost(rate, students) {
      // income-tax-style slabs: 1-500 full, 501-1500 85%, 1501-5000 70%
      var bands = [
        { upto: 500, mult: 1 },
        { upto: 1500, mult: 0.85 },
        { upto: 5000, mult: 0.70 }
      ];
      var prev = 0, total = 0, lines = [];
      for (var i = 0; i < bands.length; i++) {
        var b = bands[i];
        if (students <= prev) break;
        var inBand = Math.min(students, b.upto) - prev;
        if (inBand > 0) {
          var r = +(rate * b.mult).toFixed(2);
          total += inBand * r;
          lines.push({ count: inBand, rate: r, pct: Math.round(b.mult * 100) });
        }
        prev = b.upto;
      }
      return { total: total, lines: lines };
    }
    function render() {
      var students = Math.max(0, parseInt(est.querySelector('#est-students').value, 10) || 0);
      var plan = est.querySelector('#est-plan').value;
      var quarterly = est.querySelector('#est-billing').value === 'quarterly';
      var out = est.querySelector('.est-out');
      if (students > 5000) {
        out.innerHTML = '<div class="big">Let’s talk</div><p class="mb-0">Above 5,000 students we tailor a quote. Book a demo and we’ll size it with you.</p>';
        return;
      }
      if (students <= 0) { out.innerHTML = '<p class="mb-0">Enter your number of students to see a figure.</p>'; return; }
      var rate = RATES[plan];
      var r = slabCost(rate, students);
      var before = Math.max(r.total, MIN);
      var minApplied = r.total < MIN;
      if (quarterly) before = before * 1.10;
      var gst = before * 0.18;
      var total = before + gst;
      var per = (before / students);
      var rows = r.lines.map(function (l) {
        return '<tr><td>' + l.count + ' × ' + inr(l.rate) + (l.pct < 100 ? ' (' + l.pct + '%)' : '') + '</td><td class="center">' + inr(l.count * l.rate) + '</td></tr>';
      }).join('');
      out.innerHTML =
        '<div class="big">' + inr(+total.toFixed(2)) + '</div>' +
        '<p style="margin:.2rem 0 1rem;color:var(--muted)">a year, GST included · ' +
        inr(+per.toFixed(2)) + ' per student before GST</p>' +
        '<table><tbody>' + rows +
        (minApplied ? '<tr><td>Minimum applied</td><td class="center">' + inr(MIN) + '</td></tr>' : '') +
        (quarterly ? '<tr><td>Quarterly (+10%)</td><td class="center">applied</td></tr>' : '') +
        '<tr><td>Before GST</td><td class="center">' + inr(+before.toFixed(2)) + '</td></tr>' +
        '<tr><td>GST at 18%</td><td class="center">' + inr(+gst.toFixed(2)) + '</td></tr>' +
        '<tr><td><strong>Total for the year</strong></td><td class="center"><strong>' + inr(+total.toFixed(2)) + '</strong></td></tr>' +
        '</tbody></table>';
    }
    est.querySelectorAll('input,select').forEach(function (el) {
      el.addEventListener('input', render);
      el.addEventListener('change', render);
    });
    render();
  }

  // ---- capability filter ----
  var cap = document.getElementById('cap-table');
  if (cap) {
    var rows = Array.prototype.slice.call(cap.querySelectorAll('tbody tr'));
    var activeModule = 'all';
    function apply() {
      rows.forEach(function (tr) {
        var ok = activeModule === 'all' || tr.getAttribute('data-module') === activeModule;
        tr.style.display = ok ? '' : 'none';
      });
    }
    document.querySelectorAll('[data-filter]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('[data-filter]').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        activeModule = chip.getAttribute('data-filter');
        apply();
      });
    });
  }
})();
