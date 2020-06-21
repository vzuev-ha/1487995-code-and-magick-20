'use strict';

(function () {
  var WIZARDS_COUNT = 4;

  /**
   * Создание объекта Маг
   * @return {{eyesColor: (string), name: string, coatColor: string}} Объект Маг
   */
  function generateWizard() {

    return {
      name: window.utils.getRandomName(),
      coatColor: window.utils.getRandomCoatColor(),
      eyesColor: window.utils.getRandomEyesColor()
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

    wizardsPlaceholder.innerHTML = '';
    // Заполним массив HTML-нодами "Маг", генерируя магов со случайными параметрами
    var wizardsArray = [];

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      wizardsArray[i] = createWizardFromTemplate(generateWizard(), template);
    }

    // Создаем DocumentFragment, наполненный магами, и добавляем его в разметку
    wizardsPlaceholder.appendChild(createWizards(wizardsArray));
  }


  // Инициализация окна настроек
  // Само окно настроек
  var setupDialogElement = document.querySelector('.setup');
  // Кнопка в окне настроек, за которую мы его перетаскиваем
  var setupDialogHandle = setupDialogElement.querySelector('.upload');

  // Координаты окна настроек
  var setupDialogDefaultCoords = {
    x: 0,
    y: 0
  };


  // Найдем кнопку открытия окна настроек и навесим на нее обработчики
  var setupOpen = document.querySelector('.setup-open');

  setupOpen.addEventListener('click', function () {
    window.dialog.openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.dialog.openPopup();
    }
  });


  // Чтобы не загромождать секцию экспорта, опишем функцию выше, а здесь сошлемся на нее
  window.setup = {
    setupDialogElement: setupDialogElement,
    setupDialogHandle: setupDialogHandle,
    setupDialogDefaultCoords: setupDialogDefaultCoords,

    fillWizardsBlock: fillWizardsBlock
  };

})();
