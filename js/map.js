'use strict';

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function doDeclension(number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function makeAd(count) {
  TITLES = shuffleArray(TITLES);
  AVATARS = shuffleArray(AVATARS);
  var ads = [];
  for (var i = 0; i < count; i++) {
    var locationX = getRandomInRange(300, 900);
    var locationY = getRandomInRange(100, 500);
    ads[i] = {
      'author': {
        'avatar': 'img/avatars/user' + '0' + AVATARS[i] + '.png'
      },
      'offer': {
        'title': TITLES[i],
        'address': locationX + ', ' + locationY,
        'price': getRandomInRange(1000, 1000000),
        'type': getRandomInArray(TYPES),
        'rooms': getRandomInRange(1, 5),
        'guests': getRandomInRange(1, 10),
        'checkin': getRandomInArray(CHECKINS),
        'checkout': getRandomInArray(CHECKOUTS),
        'features': FEATURES.slice(getRandomInRange(0, FEATURES.length - 1)),
        'description': '',
        'photos': []
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  }
  return ads;
}

var advertisments = makeAd(8);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var filtersContainer = document.querySelector('.map__filters-container');

function renderPin(pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinAvatar = pinElement.querySelector('img');

  pinElement.setAttribute('style', 'left: ' + pin.location.x + 'px; ' + 'top: ' + pin.location.y + 'px;');
  pinAvatar.setAttribute('src', pin.author.avatar);

  return pinElement;
}

function makePin() {
  var pin = document.createDocumentFragment();
  for (var i = 0; i < advertisments.length; i++) {
    pin.appendChild(renderPin(advertisments[i]));
  }
  return pin;
}

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
  roomAndGuest.textContent = card.offer.rooms + ' ' + doDeclension(card.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + card.offer.guests + ' ' + doDeclension(card.offer.guests, ['гостя', 'гостей', 'гостей']);
  checkinAndCheckout.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  removeItem();
  makeItem();
  description.textContent = card.offer.description;
  avatar.setAttribute('src', card.author.avatar);

  return cardElement;
}

var card = document.createDocumentFragment();
card.appendChild(renderCard(advertisments[0]));

mapPins.appendChild(makePin());
map.insertBefore(card, filtersContainer);
