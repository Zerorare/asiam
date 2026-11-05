/* ===================================================================
   Новогоднее оформление (сезонное): снег на главном экране
   и в бордовой полосе со слоганом. Гирлянда под золотой полосой —
   в css/style.css (раздел «НОВОГОДНИЙ БЛОК»).

   Само выключается вместе с новогодним блоком: после даты из <head>
   на странице появляется класс ny-off, и скрипт ничего не делает.
   Не запускается, если в настройках телефона отключены анимации.
   =================================================================== */
(function () {
  var root = document.documentElement;
  if (root.classList.contains('ny-off')) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var phone = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;

  // где идёт снег и сколько снежинок
  var places = [
    ['.hero', phone ? 24 : 46],
    ['.slogan-band', phone ? 12 : 22]
  ];

  function rnd(a, b) { return a + Math.random() * (b - a); }

  places.forEach(function (place) {
    var host = document.querySelector(place[0]);
    if (!host) return;

    var snow = document.createElement('div');
    snow.className = 'ny-snow';
    snow.setAttribute('aria-hidden', 'true');

    for (var i = 0; i < place[1]; i++) {
      var fall = rnd(10, 20);   // секунд на падение сверху вниз
      var sway = rnd(2.5, 5);   // секунд на покачивание влево-вправо
      var size = rnd(3, 8);     // размер снежинки, px
      var flake = document.createElement('i');
      var dot = document.createElement('b');
      flake.style.cssText =
        'left:' + rnd(0, 100).toFixed(2) + '%;' +
        'opacity:' + rnd(0.45, 0.95).toFixed(2) + ';' +
        'animation-duration:' + fall.toFixed(1) + 's;' +
        'animation-delay:-' + rnd(0, fall).toFixed(1) + 's;' +
        '--sway:' + rnd(6, 22).toFixed(0) + 'px';
      dot.style.cssText =
        'width:' + size.toFixed(1) + 'px;height:' + size.toFixed(1) + 'px;' +
        'animation-duration:' + sway.toFixed(1) + 's;' +
        'animation-delay:-' + rnd(0, sway).toFixed(1) + 's';
      flake.appendChild(dot);
      snow.appendChild(flake);
    }

    host.classList.add('ny-snow-host');
    host.insertBefore(snow, host.firstChild);

    // высота падения = высота блока (пересчитываем при повороте экрана)
    function fit() { snow.style.setProperty('--fall', (host.offsetHeight + 24) + 'px'); }
    fit();
    window.addEventListener('resize', fit);
  });
})();
