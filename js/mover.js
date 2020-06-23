'use strict';
(function () {

  function onSetupDialogMouseDown(evt) {
    evt.preventDefault();

    // Почему-то прямой вызов window.setup.setupDialogElement.style.top не может разрезолвить style и offset
    //   поэтому объявим локальные переменные.
    var setupDialog = window.setup.setupDialogElement;
    var dialogHandle = window.setup.setupDialogHandle;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialog.style.left = (setupDialog.offsetLeft - shift.x) + 'px';
      setupDialog.style.top = (setupDialog.offsetTop - shift.y) + 'px';
    }

    function onClickPreventDefault(clickEvt) {
      clickEvt.preventDefault();
      dialogHandle.removeEventListener('click', onClickPreventDefault);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  window.mover = {
    onSetupDialogMouseDown: onSetupDialogMouseDown
  };

})();
