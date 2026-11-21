/* Kenya Battery and Solar Center - site scripts */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '254748829759'; // change here if the number changes

  /* ---------- Mobile navigation ---------- */
  var nav = document.getElementById('nv');
  var burger = document.getElementById('bg');
  burger.addEventListener('click', function () { nav.classList.toggle('open'); });
  nav.addEventListener('click', function () { nav.classList.remove('open'); });

  /* ---------- Footer year ---------- */
  document.getElementById('y').textContent = new Date().getFullYear();

  /* ---------- Gallery filter tabs ---------- */
  var tabs = document.querySelectorAll('.tab');
  var items = document.querySelectorAll('#pg .photo');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('on'); });
      tab.classList.add('on');
      items.forEach(function (item) {
        var show = tab.dataset.f === 'all' || item.dataset.c === tab.dataset.f;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Photo lightbox ---------- */
  var lightbox = document.getElementById('lb');
  var lightboxImg = lightbox.querySelector('img');
  document.querySelectorAll('.ph img').forEach(function (img) {
    img.addEventListener('click', function () {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('on');
    });
  });
  lightbox.addEventListener('click', function () { lightbox.classList.remove('on'); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') lightbox.classList.remove('on');
  });

  /* ---------- Star rating -> WhatsApp ---------- */
  var stars = document.querySelectorAll('.star');
  var ratingMsg = document.getElementById('rm');
  var labels = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
  var rating = 0;
  function paintStars(n) {
    stars.forEach(function (s) { s.classList.toggle('on', +s.dataset.v <= n); });
  }
  stars.forEach(function (s) {
    s.addEventListener('mouseenter', function () { paintStars(+s.dataset.v); });
    s.addEventListener('mouseleave', function () { paintStars(rating); });
    s.addEventListener('click', function () {
      rating = +s.dataset.v;
      paintStars(rating);
      ratingMsg.textContent = rating + ' / 5 - ' + labels[rating - 1];
    });
  });
  document.getElementById('rf').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!rating) { ratingMsg.textContent = 'Please tap a star to choose your rating'; return; }
    var name = document.getElementById('rn').value;
    var comment = document.getElementById('rc').value;
    var text = 'Hello, I am ' + name + '. I rate Kenya Battery and Solar Center ' + rating + '/5 stars (' + labels[rating - 1] + ').' + (comment ? ' ' + comment : '');
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank');
  });

  /* ---------- Contact form -> WhatsApp ---------- */
  document.getElementById('cf').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('n').value;
    var phone = document.getElementById('p').value;
    var message = document.getElementById('m').value;
    var text = 'Hello, I am ' + name + ' (' + phone + '). ' + message;
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank');
  });
})();
