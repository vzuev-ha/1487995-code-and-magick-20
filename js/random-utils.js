'use strict';

(function () {
  // Объявим константы
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  /**
   * Получение случайного целого числа в заданном интервале, включительно
   * @param {int} min
   * @param {int} max
   * @return {int} Случайное число
   */
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  }

  /*
    Другой вариант получения рандомного числа от 0 до max
    return COLORS[Math.floor(COLORS.length * Math.random())];
   */

  window.utils = {
    getRandomName: function () {
      var randomNameId = getRandomIntInclusive(0, FIRST_NAMES.length - 1);
      return FIRST_NAMES[randomNameId] + ' ' + LAST_NAMES[randomNameId];
    },

    getRandomCoatColor: function () {
      return COAT_COLORS[getRandomIntInclusive(0, COAT_COLORS.length - 1)];
    },

    getRandomEyesColor: function () {
      return EYES_COLORS[getRandomIntInclusive(0, EYES_COLORS.length - 1)];
    },

    getRandomFireballColor: function () {
      return FIREBALL_COLORS[getRandomIntInclusive(0, FIREBALL_COLORS.length - 1)];
    }
  };


  /* *
 * Создание объекта Маг
 * @return {{eyesColor: (string), name: string, coatColor: string}} Объект Маг
 * /
function generateWizard() {

  return {
    name: window.utils.getRandomName(),
    coatColor: window.utils.getRandomCoatColor(),
    eyesColor: window.utils.getRandomEyesColor()
  };
} */


})();
