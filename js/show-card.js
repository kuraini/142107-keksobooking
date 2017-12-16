'use strict';

(function () {
  function showCard(card) {
    var map = document.querySelector('.map');
    var popup = map.querySelector('.popup');
    var filtersContainer = document.querySelector('.map__filters-container');

    if (popup) {
      map.removeChild(popup);
    }
    map.insertBefore(window.makeCard(window.advertisments[card]), filtersContainer);

    var newPopup = map.querySelector('.popup');
    newPopup.classList.remove('hidden');
  }

  window.showCard = showCard;
})();
