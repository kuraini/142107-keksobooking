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
var PIN_HEIGHT = 44;
var PIN_PSEUDO_HEIGHT = 18;
var PIN_HEIGHT_IN_PROCENT = 100;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var PIN_TRANSITION = Math.floor((PIN_PSEUDO_HEIGHT * 100 / PIN_HEIGHT) + PIN_HEIGHT_IN_PROCENT);

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
  var currentIndex = arr.length;
  var temp;
  var randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temp = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}

function doDeclension(number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function addAttributeAll(arr, attr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setAttribute(attr, attr);
  }
}

function removeAttributeAll(arr, attr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].removeAttribute(attr, attr);
  }
}

function addIdAll(arr) {
  var index = 0;
  for (var i = 0; i < arr.length; i++) {
    arr[i].setAttribute('id', index++);
  }
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

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapPinsContainer = document.querySelector('.map__pins');
var filtersContainer = document.querySelector('.map__filters-container');

function renderPin(pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinAvatar = pinElement.querySelector('img');

  pinElement.setAttribute('style', 'left: ' + pin.location.x + 'px; ' + 'top: ' + pin.location.y + 'px; ' + 'transform: translate(-50%, -' + PIN_TRANSITION + '%);');
  pinElement.setAttribute('hidden', 'hidden');
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

mapPinsContainer.appendChild(makePin());

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
  cardElement.classList.add('hidden');

  return cardElement;
}

function makeCard(elem) {
  var card = document.createDocumentFragment();
  card.appendChild(renderCard(elem));
  return card;
}

var map = document.querySelector('.map');
map.insertBefore(makeCard(advertisments[0]), filtersContainer);


var mapPinMain = map.querySelector('.map__pin--main');
var form = document.querySelector('.notice__form');
var fieldsets = form.querySelectorAll('fieldset');
var pins = map.querySelectorAll('button.map__pin:not(.map__pin--main)');

addAttributeAll(fieldsets, 'disabled');
addIdAll(pins);

function onMapPinMainMouseup() {
  map.classList.remove('map--faded');
  removeAttributeAll(pins, 'hidden');
  form.classList.remove('notice__form--disabled');
  removeAttributeAll(fieldsets, 'disabled');
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
  var pinId = Number(target.getAttribute('id'));

  var popup = map.querySelector('.popup');

  if (popup) {
    map.removeChild(popup);
  }
  map.insertBefore(makeCard(advertisments[pinId]), filtersContainer);

  var newPopup = map.querySelector('.popup');
  newPopup.classList.remove('hidden');

  var popupClose = newPopup.querySelector('.popup__close');

  function onPopupEscPress(e) {
    if (e.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  }

  function openPopup() {
    map.insertBefore(makeCard(advertisments[pinId]), filtersContainer);
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
    if (e.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  target.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  document.addEventListener('keydown', onPopupEscPress);
}

mapPinsContainer.addEventListener('click', onMapPinClick);

var titleInput = form.querySelector('#title');
var addressInput = form.querySelector('#address');
var typeSelect = form.querySelector('#type');
var priceInput = form.querySelector('#price');
var timeinSelect = form.querySelector('#timein');
var timeoutSelect = form.querySelector('#timeout');
var roomSelect = form.querySelector('#room_number');
var capacitySelect = form.querySelector('#capacity');
var formSubmit = form.querySelector('.form__submit');

var minPrices = {
  'flat': 1000,
  'bungalo': 0,
  'house': 5000,
  'palace': 10000
};

function getMinPrices() {
  if (typeSelect.value === 'flat') {
    priceInput.setAttribute('min', minPrices.flat);
  }
  if (typeSelect.value === 'bungalo') {
    priceInput.setAttribute('min', minPrices.bungalo);
  }
  if (typeSelect.value === 'house') {
    priceInput.setAttribute('min', minPrices.house);
  }
  if (typeSelect.value === 'palace') {
    priceInput.setAttribute('min', minPrices.palace);
  }
}

function synchronizeValue(selected, selectable) {
  var children = selectable.children;
  for (var i = 0; i < children.length; i++) {
    if (selected.value === children[i].value) {
      children[i].selected = true;
    }
  }
}

function getInvalidFieldsBorderRed(elem) {
  var elements = elem.querySelectorAll('input, select, textarea');
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].validity.valid === false) {
      elements[i].setAttribute('style', 'border-color: red;');
    }
  }
}

titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

titleInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
  } else {
    target.setCustomValidity('');
  }
});

addressInput.addEventListener('invalid', function () {
  if (addressInput.validity.valueMissing) {
    addressInput.setCustomValidity('Обязательное поле');
  } else {
    addressInput.setCustomValidity('');
  }
});

priceInput.addEventListener('invalid', function () {
  if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity('Минимальная цена не может быть ниже ' + priceInput.min);
  } else if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity('Максимальная цена не может превышать 1 000 000');
  } else if (priceInput.validity.badInput) {
    priceInput.setCustomValidity('Вводить можно только числа');
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
  } else {
    priceInput.setCustomValidity('');
  }
});

typeSelect.addEventListener('change', function () {
  getMinPrices();
});

timeinSelect.addEventListener('change', function () {
  synchronizeValue(timeinSelect, timeoutSelect);
});

roomSelect.addEventListener('change', function () {
  var capacities = capacitySelect.children;
  if (roomSelect.value === '1') {
    capacities[0].disabled = true;
    capacities[1].disabled = true;
    capacities[2].disabled = false;
    capacities[3].disabled = true;
  } else if (roomSelect.value === '2') {
    capacities[0].disabled = true;
    capacities[1].disabled = false;
    capacities[2].disabled = false;
    capacities[3].disabled = true;
  } else if (roomSelect.value === '3') {
    capacities[0].disabled = false;
    capacities[1].disabled = false;
    capacities[2].disabled = false;
    capacities[3].disabled = true;
  } else {
    capacities[0].disabled = true;
    capacities[1].disabled = true;
    capacities[2].disabled = true;
    capacities[3].disabled = false;
  }
});

formSubmit.addEventListener('click', function () {
  getInvalidFieldsBorderRed(form);
});

formSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    getInvalidFieldsBorderRed(form);
  }
});
