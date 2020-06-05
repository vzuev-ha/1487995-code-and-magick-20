'use strict';

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

var WIZARDS_COUNT = 4;


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

/**
 * Создание объекта Маг
 * @return {{eyesColor: (string), name: string, coatColor: string}} Объект Маг
 */
function generateWizard() {
  var randomNameId = getRandomIntInclusive(0, FIRST_NAMES.length - 1);
  var randomCoatColorId = getRandomIntInclusive(0, COAT_COLORS.length - 1);
  var randomEyesColorId = getRandomIntInclusive(0, EYES_COLORS.length - 1);

  return {
    name: FIRST_NAMES[randomNameId] + ' ' + LAST_NAMES[randomNameId],
    coatColor: COAT_COLORS[randomCoatColorId],
    eyesColor: EYES_COLORS[randomEyesColorId]
  };
}

/**
 * Создание HTML-ноды "Маг" из объекта Маг на основе шаблона
 * @param {{eyesColor: (string), name: string, coatColor: string}} wizardObject Объект Маг
 * @param {ActiveX.IXMLDOMNode | Node} wizardTemplate Шаблон
 * @return {ActiveX.IXMLDOMNode | Node} HTML-нода "Маг"
 */
function createWizardFromTemplate(wizardObject, wizardTemplate) {
  var wizard = wizardTemplate.cloneNode(true);

  wizard.querySelector('.setup-similar-label').textContent = wizardObject.name;
  wizard.querySelector('.wizard-coat').style.fill = wizardObject.coatColor;
  wizard.querySelector('.wizard-eyes').style.fill = wizardObject.eyesColor;

  return wizard;
}

/**
 * Создание DocumentFragment из массива HTML-нод "Маг"
 * @param {array} wizardsHTMLArray Массив HTML-нод "Маг"
 * @return {DocumentFragment} DocumentFragment, наполненный нодами магов
 */
function createWizards(wizardsHTMLArray) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsHTMLArray.length; i++) {
    fragment.appendChild(wizardsHTMLArray[i]);
  }

  return fragment;
}

/**
 * Наполнение заранее приготовленного в разметке блока случайными магами
 * @param {Element} wizardsPlaceholder HTML-элемент, куда будут помещены ноды магов
 * Функция не возвращает ничего, а работает с входящим объектом по ссылке
 */
function fillWizardsBlock(wizardsPlaceholder) {
  // Найдем заранее заготовленный HTML-шаблон
  var template = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // Заполним массив HTML-нодами "Маг", генерируя магов со случайными параметрами
  var wizardsArray = [];

  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizardsArray[i] = createWizardFromTemplate(generateWizard(), template);
  }

  // Создаем DocumentFragment, наполненный магами, и добавляем его в разметку
  wizardsPlaceholder.appendChild(createWizards(wizardsArray));
}

function showSetupWindow() {
  // Найдем окно настроек и выведем его
  document.querySelector('.setup').classList.remove('hidden');

  // Найдем блок для показа магов
  var wizardsPlaceholder = document.querySelector('.setup-similar-list');

  // Заполним этот блок Фрагментом
  fillWizardsBlock(wizardsPlaceholder);

  // Отобразим блок со списком магов
  document.querySelector('.setup-similar').classList.remove('hidden');
}

// Покажем окно настройки со всеми магами
showSetupWindow();
