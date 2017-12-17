'use strict';

(function () {
  var PHOTOS_MAX_AMOUNT = 6;
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  function giveOfferType(card) {
    if (card.offer.type === 'flat') {
      return 'Квартира';
    } else if (card.offer.type === 'house') {
      return 'Дом';
    } else {
      return 'Бунгало';
    }
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
    var photosList = cardElement.querySelector('.popup__pictures');
    var photoFirst = photosList.querySelector('li');
    var offer = card.offer;

    function removeItem() {
      for (var i = 0; i < featureItems.length; i++) {
        var item = featuresList.querySelector('.feature');
        featuresList.removeChild(item);
      }
    }

    function makeItem() {
      for (var i = 0; i < offer.features.length; i++) {
        var item = document.createElement('li');
        item.setAttribute('class', 'feature feature--' + offer.features[i]);
        featuresList.appendChild(item);
      }
    }

    function makePhotos() {
      photosList.removeChild(photoFirst);
      for (var i = 0; i < offer.photos.length && i < PHOTOS_MAX_AMOUNT; i++) {
        var item = document.createElement('li');
        item.classList.add('picture');
        var photo = document.createElement('img');
        photo.setAttribute('src', offer.photos[i]);
        photosList.appendChild(item);
        item.appendChild(photo);
      }
    }

    header.textContent = offer.title;
    address.textContent = offer.address;
    price.innerHTML = offer.price + '&#x20bd;/ночь';
    type.textContent = giveOfferType(card);
    roomAndGuest.textContent = offer.rooms + ' ' +
                              window.util.doDeclension(offer.rooms, ['комната', 'комнаты', 'комнат']) +
                              ' для ' + offer.guests + ' ' +
                              window.util.doDeclension(offer.guests, ['гостя', 'гостей', 'гостей']);
    checkinAndCheckout.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    removeItem();
    makeItem();
    description.textContent = offer.description;
    avatar.setAttribute('src', card.author.avatar);
    makePhotos();
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
