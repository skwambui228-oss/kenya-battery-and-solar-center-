/* Kenya Battery and Solar Center - product detail page */
(function () {
  'use strict';
  var WHATSAPP_NUMBER = '254748829759';
  var nav = document.getElementById('nv');
  document.getElementById('bg').addEventListener('click', function () { nav.classList.toggle('open'); });
  nav.addEventListener('click', function () { nav.classList.remove('open'); });
  document.getElementById('y').textContent = new Date().getFullYear();

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  var id = new URLSearchParams(window.location.search).get('id');
  var p = (window.PRODUCTS || {})[id];
  var box = document.getElementById('pd');
  if (!p) {
    box.innerHTML = '<h1>Product not found</h1><p class="lead">Please go back to <a href="index.html#our-products"><b>Our Products Prices</b></a> and choose a product.</p>';
    return;
  }
  document.title = p.title + ' | Kenya Battery and Solar Center';
  var msg = 'Hello, I would like to order: ' + p.title + ' (' + p.price + '). Please confirm availability.';
  box.innerHTML =
    '<div class="pd">' +
      '<div class="pd-img"><img alt="' + esc(p.title) + '" src="' + esc(p.img) + '"/></div>' +
      '<div>' +
        '<span class="tag">' + esc(p.cat) + '</span>' +
        '<h1>' + esc(p.title) + '</h1>' +
        '<div class="pd-price">' + esc(p.price) + '</div>' +
        '<p class="lead">' + esc(p.short) + '</p>' +
        '<h2>Key features</h2>' +
        '<ul class="ticks">' + p.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
        '<h2>Specifications</h2>' +
        '<table class="specs">' + p.specs.map(function (s) { return '<tr><th>' + esc(s[0]) + '</th><td>' + esc(s[1]) + '</td></tr>'; }).join('') + '</table>' +
        '<div class="cta">' +
          '<a class="btn btn-c" style="background:var(--navy);color:var(--cyan)" target="_blank" rel="noopener" href="https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg) + '">Order on WhatsApp</a>' +
          '<a class="btn btn-o" href="tel:+' + WHATSAPP_NUMBER + '">Call us</a>' +
        '</div>' +
        '<p class="pd-note"> Please confirm stock and the current price before you pay.</p>' +
      '</div>' +
    '</div>';
})();
