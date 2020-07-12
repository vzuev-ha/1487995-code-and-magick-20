'use strict';

(function () {

  function onClickWizardAndFireball(evt) {
    var setupWizard = document.querySelector('.setup-player');
    var newColor;

    if (!evt.target) {
      return;
    }

    if (evt.target.classList.contains('wizard-coat')) {
      newColor = window.utils.getRandomCoatColor();
      setupWizard.querySelector('input[name="coat-color"]').value = newColor;
      evt.target.style.fill = newColor;
    } else if (evt.target.classList.contains('wizard-eyes')) {
      newColor = window.utils.getRandomEyesColor();
      setupWizard.querySelector('input[name="eyes-color"]').value = newColor;
      evt.target.style.fill = newColor;
    } else if (evt.target.classList.contains('setup-fireball')) {
      newColor = window.utils.getRandomFireballColor();
      setupWizard.querySelector('input[name="fireball-color"]').value = newColor;
      evt.target.style.backgroundColor = newColor;
    }
  }

  function onPopupEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      if (evt.target.name !== 'username') {
        closePopup();
      }
    }
  }

  function onSubmitDialog(evt) {
    window.backend.submitSetup(
        new FormData(window.setup.setupWizardForm),
        closePopup,
        window.backend.networkErrorHandler
    );

    evt.preventDefault();
  }

  function closePopup() {
    // Найдем окно настроек и скроем его
    var setupDialog = window.setup.setupDialogElement;
    setupDialog.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);

    // Удалим  обработчик клика по персонажу и смены цветов
    var setupPlayer = document.querySelector('.setup-player');
    setupPlayer.removeEventListener('click', onClickWizardAndFireball);

    // Удалим обработчик нажатия мыши на кнопку выбора файла .upload
    window.setup.setupDialogHandle.removeEventListener('mousedown', window.mover.onSetupDialogMouseDown);

    // Восстановим положение окна настроек
    setupDialog.style.left = window.setup.setupDialogDefaultCoords.x + 'px';
    setupDialog.style.top = window.setup.setupDialogDefaultCoords.y + 'px';

    // Удалим с диалога обработчик submit
    window.setup.setupDialogElement.removeEventListener('submit', onSubmitDialog);
  }

  function openPopup() {
    // Запустим загрузку магов. Пока они грузятся, разберемся с отображением окна
    window.backend.loadWizards(
        window.setup.fillWizardsBlock,
        window.backend.networkErrorHandler
    );


    // Покажем окно настроек
    var setupDialog = window.setup.setupDialogElement;
    setupDialog.classList.remove('hidden');

    // Отобразим блок со списком магов
    document.querySelector('.setup-similar').classList.remove('hidden');

    // Привяжем к документу обработчик закрытия по Esc
    document.addEventListener('keydown', onPopupEscPress);


    // Привяжем обработчики закрытия к крестику по клику и Enter
    var setupClose = window.setup.setupDialogElement.querySelector('.setup-close');

    setupClose.addEventListener('click', function () {
      closePopup();
    });

    setupClose.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        closePopup();
      }
    });

    // Привяжем через делегирование обработчик клика по персонажу и смены цветов
    var setupPlayer = document.querySelector('.setup-player');
    setupPlayer.addEventListener('click', onClickWizardAndFireball);


    // Навесим обработчик нажатия мыши на кнопку выбора файла .upload
    window.setup.setupDialogHandle.addEventListener('mousedown', window.mover.onSetupDialogMouseDown);

    // Сохраним положение окна настроек
    window.setup.setupDialogDefaultCoords.x = setupDialog.offsetLeft;
    window.setup.setupDialogDefaultCoords.y = setupDialog.offsetTop;

    // Навесим на диалог обработчик submit, чтобы перехватить и переопределить его
    window.setup.setupDialogElement.addEventListener('submit', onSubmitDialog);
  }


  // Чтобы не загромождать секцию экспорта, опишем функцию выше, а здесь сошлемся на нее
  window.dialog = {
    openPopup: openPopup
  };

})();
