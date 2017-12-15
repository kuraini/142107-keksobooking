'use strict';

(function () {
  function showCard() {
    var map = document.querySelector('.map');
    var mapPinsContainer = document.querySelector('.map__pins');
    var filtersContainer = document.querySelector('.map__filters-container');
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

      var pinId = Number(target.getAttribute('id'));
      var popup = map.querySelector('.popup');

      if (popup) {
        map.removeChild(popup);
      }
      map.insertBefore(window.makeCard(window.advertisments[pinId]), filtersContainer);

      var newPopup = map.querySelector('.popup');
      newPopup.classList.remove('hidden');

      var popupClose = newPopup.querySelector('.popup__close');

      function onPopupEscPress(e) {
        window.util.isEscEvent(e, closePopup);
      }

      function openPopup() {
        map.insertBefore(window.makeCard(window.advertisments[pinId]), filtersContainer);
        newPopup.classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
      }

      function closePopup() {
        map.removeChild(newPopup);
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
  }

  window.showCard = showCard;
})();
