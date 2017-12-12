'use strict';

(function () {
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

  function makeAd(count) {
    TITLES = window.util.shuffleArray(TITLES);
    AVATARS = window.util.shuffleArray(AVATARS);
    var ads = [];
    for (var i = 0; i < count; i++) {
      var locationX = window.util.getRandomInRange(300, 900);
      var locationY = window.util.getRandomInRange(100, 500);
      ads[i] = {
        'author': {
          'avatar': 'img/avatars/user' + '0' + AVATARS[i] + '.png'
        },
        'offer': {
          'title': TITLES[i],
          'address': locationX + ', ' + locationY,
          'price': window.util.getRandomInRange(1000, 1000000),
          'type': window.util.getRandomInArray(TYPES),
          'rooms': window.util.getRandomInRange(1, 5),
          'guests': window.util.getRandomInRange(1, 10),
          'checkin': window.util.getRandomInArray(CHECKINS),
          'checkout': window.util.getRandomInArray(CHECKOUTS),
          'features': FEATURES.slice(window.util.getRandomInRange(0, FEATURES.length - 1)),
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

  window.makeAd = makeAd;
})();
