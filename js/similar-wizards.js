'use strict';

(function () {

  /**
   * Создание HTML-ноды "Маг" из объекта Маг на основе шаблона
   * @param {{colorEyes: (string), name: string, colorCoat: string}} wizardObject Объект Маг
   * @param {ActiveX.IXMLDOMNode | Node} wizardTemplate Шаблон
   * @return {ActiveX.IXMLDOMNode | Node} HTML-нода "Маг"
   */
  function createWizardFromTemplate(wizardObject, wizardTemplate) {
    var wizard = wizardTemplate.cloneNode(true);

    wizard.querySelector('.setup-similar-label').textContent = wizardObject.name;
    wizard.querySelector('.wizard-coat').style.fill = wizardObject.colorCoat;
    wizard.querySelector('.wizard-eyes').style.fill = wizardObject.colorEyes;

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
   * Наполнение заранее приготовленного в разметке блока магами
   * @param {Array} wizardsJSON
   * Функция не возвращает ничего, а работает с глобальным объектом
   */
  function fillWizardsBlock(wizardsJSON) {
    // Найдем заранее заготовленный HTML-шаблон
    var template = document
      .querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

    window.setup.wizardsPlaceholder.innerHTML = '';
    // Заполним массив HTML-нодами "Маг", генерируя магов со случайными параметрами
    var wizardsArray = [];

    for (var i = 0; i < window.setup.WIZARDS_COUNT; i++) {
      wizardsArray[i] = createWizardFromTemplate(wizardsJSON[i], template);
    }

    // Создаем DocumentFragment, наполненный магами, и добавляем его в разметку
    window.setup.wizardsPlaceholder.appendChild(createWizards(wizardsArray));
  }


  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.mainWizard.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.mainWizard.eyesColor) {
      rank += 1;
    }

    return rank;
  }


  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }


  function updateSimilarWizards() {
    fillWizardsBlock(wizardsArray.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }


  function successLoadWizards(data) {
    wizardsArray = data;
    updateSimilarWizards();
  }

  var wizardsArray = [];

  window.similarWizards = {
    wizardsArray: wizardsArray,

    successLoadWizards: successLoadWizards,
    updateSimilarWizards: updateSimilarWizards
  };

})();
