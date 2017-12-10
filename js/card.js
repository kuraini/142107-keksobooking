'use strict';

(function () {
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  function getOfferType(card) {
    var offerType;
    if (card.offer.type === 'flat') {
      offerType = 'Квартира';
    }
    if (card.offer.type === 'house') {
      offerType = 'Дом';
    }
    if (card.offer.type === 'bungalo') {
      offerType = 'Бунгало';
    }
    return offerType;
  }

  function renderCard(card) {
    var cardElement = mapCardTemplate.cloneNode(true);
    var header = cardElement.querySelector('h3');
    var address = cardElement.querySelector('small');
    var price = cardElement.querySelector('.popup__price');
    var type = cardElement.querySelector('h4');
    var roomAndGuest = cardElement.querySelector('h4').nextElementSibling;
    var checkinAndCheckout = cardElement.querySelector('.popup__features').previousElementSibling;
    var featuresList = cardElement.querySelector('.popup__features');
    var featureItems = cardElement.querySelectorAll('.feature');
    var description = cardElement.querySelector('.popup__pictures').previousElementSibling;
    var avatar = cardElement.querySelector('.popup__avatar');

    function removeItem() {
      for (var i = 0; i < featureItems.length; i++) {
        var item = featuresList.querySelector('.feature');
        featuresList.removeChild(item);
      }
    }

    function makeItem() {
      for (var i = 0; i < card.offer.features.length; i++) {
        var item = document.createElement('li');
        item.setAttribute('class', 'feature feature--' + card.offer.features[i]);
        featuresList.appendChild(item);
      }
    }

    header.textContent = card.offer.title;
    address.textContent = card.offer.address;
    price.innerHTML = card.offer.price + '&#x20bd;/ночь';
    type.textContent = getOfferType(card);
    roomAndGuest.textContent = card.offer.rooms + ' ' +
                              window.util.doDeclension(card.offer.rooms, ['комната', 'комнаты', 'комнат']) +
                              ' для ' + card.offer.guests + ' ' +
                              window.util.doDeclension(card.offer.guests, ['гостя', 'гостей', 'гостей']);
    checkinAndCheckout.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    removeItem();
    makeItem();
    description.textContent = card.offer.description;
    avatar.setAttribute('src', card.author.avatar);
    cardElement.classList.add('hidden');

    return cardElement;
  }

  function makeCard(elem) {
    var card = document.createDocumentFragment();
    card.appendChild(renderCard(elem));
    return card;
  }

  window.makeCard = makeCard;
})();
