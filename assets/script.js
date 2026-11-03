/* Vivid & White POC — light interactions only (no dependencies) */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Hero slider */
  var slides = $(".slides");
  if (slides) {
    var dots = $$(".dots button");
    var idx = 0, total = dots.length, timer;
    var go = function (i) {
      idx = (i + total) % total;
      slides.style.transform = "translateX(" + (-100 * idx) + "%)";
      dots.forEach(function (d, n) { d.classList.toggle("on", n === idx); d.setAttribute("aria-current", n === idx ? "true" : "false"); });
    };
    var start = function () { timer = setInterval(function () { go(idx + 1); }, 5000); };
    dots.forEach(function (d, n) { d.addEventListener("click", function () { clearInterval(timer); go(n); start(); }); });
    go(0); start();
  }

  /* Best sellers / New arrivals tabs */
  $$(".tab[data-tab]").forEach(function (t) {
    t.addEventListener("click", function () {
      $$(".tab[data-tab]").forEach(function (x) { x.classList.remove("on"); x.setAttribute("aria-selected", "false"); });
      t.classList.add("on"); t.setAttribute("aria-selected", "true");
      $$("[data-panel]").forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== t.getAttribute("data-tab"); });
    });
  });

  /* Wishlist hearts */
  var count = $("#wish-count");
  $$(".fav, .wish").forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      var on = b.classList.toggle("on");
      b.setAttribute("aria-pressed", on ? "true" : "false");
      if (count) {
        var n = Math.max(0, parseInt(count.textContent || "0", 10) + (on ? 1 : -1));
        count.textContent = n; count.hidden = n === 0;
      }
    });
  });

  /* Add to cart (demo) */
  var cart = $("#cart-count");
  $$("[data-add]").forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      if (cart) cart.textContent = parseInt(cart.textContent || "0", 10) + parseInt(b.getAttribute("data-add") || "1", 10);
    });
  });

  /* Reviews carousel */
  var rv = [
    ["Loved the keratin set — my hair feels so much softer after two weeks.", "Amal K."],
    ["Fast delivery and the packaging was perfect. Will order again.", "Mona S."],
    ["The serum absorbed quickly and my skin looks brighter.", "Nour A."]
  ];
  var ri = 0, rp = $("#review-text"), rn = $("#review-name");
  var showReview = function (d) {
    if (!rp) return;
    ri = (ri + d + rv.length) % rv.length;
    rp.textContent = rv[ri][0]; rn.textContent = rv[ri][1];
  };
  var rprev = $("#rv-prev"), rnext = $("#rv-next");
  if (rprev) rprev.addEventListener("click", function () { showReview(-1); });
  if (rnext) rnext.addEventListener("click", function () { showReview(1); });

  /* Back to top */
  var top = $(".to-top");
  if (top) {
    window.addEventListener("scroll", function () { top.classList.toggle("show", window.scrollY > 500); }, { passive: true });
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* Mobile filters */
  var ft = $(".filter-toggle"), fp = $(".filters");
  if (ft && fp) ft.addEventListener("click", function () {
    var o = fp.classList.toggle("open"); ft.setAttribute("aria-expanded", o ? "true" : "false");
  });

  /* Quantity stepper */
  var q = $("#qty-val");
  $$("[data-qty]").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = Math.max(1, parseInt(q.textContent, 10) + parseInt(b.getAttribute("data-qty"), 10));
      q.textContent = v;
      $$("[data-add]").forEach(function (a) { a.setAttribute("data-add", v); });
    });
  });

  /* Gallery thumbs (demo) */
  $$(".thumbs button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".thumbs button").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
    });
  });
})();
