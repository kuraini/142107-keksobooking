'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_PSEUDO_HEIGHT = 22;
  var MAIN_PIN_HEIGHT_IN_PROCENT = 100;
  var MAIN_PIN_TRANSITION = Math.floor((MAIN_PIN_PSEUDO_HEIGHT * 100 / MAIN_PIN_HEIGHT) + MAIN_PIN_HEIGHT_IN_PROCENT);
  var MAP_TOP_LIMIT = 100;
  var MAP_BOTTOM_LIMIT = 500;
  var PINS_LIMIT = 3;

  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');
  var mapPinMain = map.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var fieldsets = form.querySelectorAll('fieldset');
  var inputAddress = form.querySelector('#address');

  function succesHandler(data) {
    window.cards = data;
    mapPinsContainer.appendChild(window.makePins(data));
    map.insertBefore(window.makeCard(data[0]), filtersContainer);
  }

  function errorHandler(errorMessage) {
    window.util.createErrorMessage(errorMessage);
    window.util.deleteErrorMessage();
  }

  window.backend.load(succesHandler, errorHandler);

  window.util.addAttributeAll(fieldsets, 'disabled');

  function onMapPinMainMouseup() {
    var pins = map.querySelectorAll('button.map__pin:not(.map__pin--main)');
    map.classList.remove('map--faded');

    for (var i = 0; i < PINS_LIMIT; i++) {
      pins[i].removeAttribute('hidden');
    }

    form.classList.remove('notice__form--disabled');
    window.util.removeAttributeAll(fieldsets, 'disabled');
    mapPinMain.removeEventListener('mouseup', onMapPinMainMouseup);
  }

  mapPinMain.addEventListener('mouseup', onMapPinMainMouseup);

  var selectedPin;

  function getClassActive(node) {
    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
    }
    selectedPin = node;
    selectedPin.classList.add('map__pin--active');
  }

  function onMapPinClick(evt) {
    var target = evt.target.closest('.map__pin');

    if (!target || target.classList.contains('map__pin--main')) {
      return;
    }

    getClassActive(target);

    var pins = Array.from(map.querySelectorAll('button.map__pin:not(.map__pin--main)'));
    var index = pins.indexOf(target);

    window.showCard(window.cards[index]);

    var popup = map.querySelector('.popup');
    var popupClose = popup.querySelector('.popup__close');

    function onPopupEscPress(e) {
      window.util.isEscEvent(e, closePopup);
    }

    function openPopup() {
      window.showCard(window.cards[index]);
      document.addEventListener('keydown', onPopupEscPress);
    }

    function closePopup() {
      map.removeChild(popup);
      target.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onPopupEscPress);
    }

    popupClose.addEventListener('click', closePopup);

    popupClose.addEventListener('keydown', function (e) {
      window.util.isEnterEvent(e, closePopup);
    });

    target.addEventListener('keydown', function (e) {
      window.util.isEnterEvent(e, openPopup);
    });

    document.addEventListener('keydown', onPopupEscPress);
  }

  mapPinsContainer.addEventListener('click', onMapPinClick);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var shiftCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      if ((shiftCoords.y >= MAP_TOP_LIMIT) && (shiftCoords.y <= MAP_BOTTOM_LIMIT)) {
        mapPinMain.setAttribute('style', 'top: ' + shiftCoords.y + 'px; ' +
                                'left: ' + shiftCoords.x + 'px; ' +
                                'transform: translate(-50%, -' + MAIN_PIN_TRANSITION + '%);');
      }

      inputAddress.setAttribute('value', 'x: ' + shiftCoords.x + ', y: ' + shiftCoords.y);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    }

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });
})();
