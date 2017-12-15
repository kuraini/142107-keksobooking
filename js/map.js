'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_PSEUDO_HEIGHT = 22;
  var MAIN_PIN_HEIGHT_IN_PROCENT = 100;
  var MAIN_PIN_TRANSITION = Math.floor((MAIN_PIN_PSEUDO_HEIGHT * 100 / MAIN_PIN_HEIGHT) + MAIN_PIN_HEIGHT_IN_PROCENT);
  var MAP_TOP_LIMIT = 100;
  var MAP_BOTTOM_LIMIT = 500;

  window.advertisments = window.makeAd(8);

  var mapPinsContainer = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');

  mapPinsContainer.appendChild(window.makePin());

  var map = document.querySelector('.map');
  map.insertBefore(window.makeCard(window.advertisments[0]), filtersContainer);


  var mapPinMain = map.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var fieldsets = form.querySelectorAll('fieldset');
  var pins = map.querySelectorAll('button.map__pin:not(.map__pin--main)');

  window.util.addAttributeAll(fieldsets, 'disabled');
  window.util.addIdAll(pins);

  function onMapPinMainMouseup() {
    map.classList.remove('map--faded');
    window.util.removeAttributeAll(pins, 'hidden');
    form.classList.remove('notice__form--disabled');
    window.util.removeAttributeAll(fieldsets, 'disabled');
    mapPinMain.removeEventListener('mouseup', onMapPinMainMouseup);
  }

  mapPinMain.addEventListener('mouseup', onMapPinMainMouseup);

  window.showCard();

  var inputAddress = form.querySelector('#address');

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
