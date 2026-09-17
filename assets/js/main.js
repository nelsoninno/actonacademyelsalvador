/* Acton Academy El Salvador - small interactions only */

/* In page anchors, with a correction pass.

   The browser decides where an anchor link lands at the moment it is tapped, then
   animates towards that one fixed offset. On a slow phone the fonts and the images
   further down the page are often still settling while that animation is running,
   the document grows underneath it, and the visitor stops short of the section they
   asked for. On this site that means the pricing link lands inside the photo gallery
   just above it, which is what Shannon saw. Closing the mobile menu moves things too.

   So we scroll ourselves and keep re measuring for a couple of seconds, correcting
   if the target has moved. Any touch, wheel or key press from the visitor cancels
   the correction immediately, so we never fight them for control of the page. */
(function () {
  'use strict';

  var root = document.documentElement;
  var EVENTS = ['wheel', 'touchstart', 'keydown'];
  var timers = [];

  function headerOffset() {
    var h = document.querySelector('.site-header');
    if (!h) return 76;
    var pos = window.getComputedStyle(h).position;
    if (pos !== 'sticky' && pos !== 'fixed') return 8;
    return Math.round(h.getBoundingClientRect().height) + 5;
  }

  function targetY(el) {
    var y = el.getBoundingClientRect().top + (window.pageYOffset || root.scrollTop);
    return Math.max(0, Math.round(y - headerOffset()));
  }

  function jump(y) {
    var prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, y);
    root.style.scrollBehavior = prev;
  }

  function glide(y) {
    try { window.scrollTo({ top: y, behavior: 'smooth' }); }
    catch (err) { jump(y); }
  }

  function stop() {
    while (timers.length) clearTimeout(timers.pop());
    EVENTS.forEach(function (t) { window.removeEventListener(t, stop); });
  }

  /* Re measure at intervals. While the smooth scroll may still be running we
     retarget smoothly; once it must have finished we snap. */
  function correct(el) {
    EVENTS.forEach(function (t) { window.addEventListener(t, stop, { passive: true }); });
    [[250, true], [600, true], [1100, false], [1800, false], [2600, false]]
      .forEach(function (step) {
        timers.push(setTimeout(function () {
          var want = targetY(el);
          if (Math.abs((window.pageYOffset || root.scrollTop) - want) > 4) {
            step[1] ? glide(want) : jump(want);
          }
        }, step[0]));
      });
    timers.push(setTimeout(stop, 2800));
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) !== '#' || href.length < 2) return;
    if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;

    var el = document.getElementById(href.slice(1));
    if (!el) return;

    e.preventDefault();
    stop();
    if (history.replaceState) history.replaceState(null, '', href);

    /* One frame of delay so the mobile menu has closed before we measure. */
    requestAnimationFrame(function () {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var want = targetY(el);
      reduce ? jump(want) : glide(want);
      correct(el);
    });
  });

  /* Same problem when the page is opened straight at a hash. */
  window.addEventListener('load', function () {
    if (!location.hash || location.hash.length < 2) return;
    var el = document.getElementById(location.hash.slice(1));
    if (el) { jump(targetY(el)); correct(el); }
  });
})();

(function () {
  'use strict';

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll reveal
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  items.forEach(function (el) { io.observe(el); });
})();
