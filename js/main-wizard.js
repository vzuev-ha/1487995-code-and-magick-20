'use strict';

(function () {

  function onClickWizardAndFireball(evt) {
    var setupWizard = window.setup.setupWizard;
    var newColor;

    if (!evt.target) {
      return;
    }

    if (evt.target.classList.contains('wizard-coat')) {
      newColor = window.randomUtils.getRandomCoatColor();
      setupWizard.querySelector('input[name="coat-color"]').value = newColor;
      evt.target.style.fill = newColor;
      window.mainWizard.coatColor = newColor;

    } else if (evt.target.classList.contains('wizard-eyes')) {
      newColor = window.randomUtils.getRandomEyesColor();
      setupWizard.querySelector('input[name="eyes-color"]').value = newColor;
      evt.target.style.fill = newColor;
      window.mainWizard.eyesColor = newColor;

    } else if (evt.target.classList.contains('setup-fireball')) {
      newColor = window.randomUtils.getRandomFireballColor();
      setupWizard.querySelector('input[name="fireball-color"]').value = newColor;
      evt.target.style.backgroundColor = newColor;
    }

    window.debouncer.debounceSingle(
        window.similarWizards.updateSimilarWizards()
    );
  }


  // Объявим глобальные свойства Главного Мага. Они заполняются в setup,
  //   но тут мы укажем им значения, чтобы lint не ругался
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

  window.mainWizard = {
    coatColor: coatColor,
    eyesColor: eyesColor,

    onClickWizardAndFireball: onClickWizardAndFireball
  };
})();
