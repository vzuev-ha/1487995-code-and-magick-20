'use strict';

(function () {
  var WIZARDS_COUNT = 4;


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

  // Блок для показа магов
  var wizardsPlaceholder = document.querySelector('.setup-similar-list');

  // HTML-элемент FORM, который отправляется на сервер при нажатии Сохранить
  var setupWizardForm = document.querySelector('.setup-wizard-form');


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


  var setupWizard = document.querySelector('.setup-player');


  // Заполним начальные значения объекта Главный Маг из разметки
  window.mainWizard.coatColor = setupWizard.querySelector('input[name="coat-color"]').value;
  window.mainWizard.eyesColor = setupWizard.querySelector('input[name="eyes-color"]').value;


  // Чтобы не загромождать секцию экспорта, опишем функцию выше, а здесь сошлемся на нее
  window.setup = {
    WIZARDS_COUNT: WIZARDS_COUNT,

    setupDialogElement: setupDialogElement,
    setupDialogHandle: setupDialogHandle,
    setupDialogDefaultCoords: setupDialogDefaultCoords,
    wizardsPlaceholder: wizardsPlaceholder,
    setupWizardForm: setupWizardForm,
    setupWizard: setupWizard
  };

})();
