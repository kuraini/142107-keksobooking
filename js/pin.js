'use strict';

(function () {
  var PIN_HEIGHT = 44;
  var PIN_PSEUDO_HEIGHT = 18;
  var PIN_HEIGHT_IN_PROCENT = 100;
  var PIN_TRANSITION = Math.floor((PIN_PSEUDO_HEIGHT * 100 / PIN_HEIGHT) + PIN_HEIGHT_IN_PROCENT);

  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  function renderPin(pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinAvatar = pinElement.querySelector('img');

    pinElement.setAttribute('style', 'left: ' + pin.location.x + 'px; ' +
                            'top: ' + pin.location.y + 'px; ' +
                            'transform: translate(-50%, -' + PIN_TRANSITION + '%);');
    pinElement.setAttribute('hidden', 'hidden');
    pinAvatar.setAttribute('src', pin.author.avatar);

    return pinElement;
  }

  function makePin() {
    var pin = document.createDocumentFragment();
    for (var i = 0; i < window.advertisments.length; i++) {
      pin.appendChild(renderPin(window.advertisments[i]));
    }
    return pin;
  }

  window.makePin = makePin;
})();
