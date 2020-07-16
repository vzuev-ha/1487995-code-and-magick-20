// Файл debounce.js
'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  // В данном проекте нам не нужны версия с замыканием, так как обработчик клика у нас один
  //   и, к тому же, мы его добавляем и удаляем, а обертка нам это испортит.
  // Но мы хотим сохранить код на память ;)
  function debounceEnclosed(cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }


  // Одиночный устранитель дребезга (если используется только он один в проекте)
  var lastTimeout;
  function debounceSingle(cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  }

  window.debouncer = {
    debounceEnclosed: debounceEnclosed,
    debounceSingle: debounceSingle
  };

})();
