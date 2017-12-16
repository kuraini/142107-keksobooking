'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomInArray: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    shuffleArray: function (arr) {
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
    },
    doDeclension: function (number, titles) {
      var cases = [2, 0, 1, 1, 1, 2];
      return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    },
    addAttributeAll: function (arr, attr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].setAttribute(attr, attr);
      }
    },
    removeAttributeAll: function (arr, attr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].removeAttribute(attr, attr);
      }
    },
    addIdAll: function (arr) {
      var index = 0;
      for (var i = 0; i < arr.length; i++) {
        arr[i].setAttribute('id', index++);
      }
    },
    syncValues: function (element, value) {
      element.value = value;
    },
    syncValuesWithMin: function (element, value) {
      element.min = value;
    },
    colorInvalidFieldsRed: function (elem) {
      var elements = elem.querySelectorAll('input, select, textarea');
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].validity.valid === false) {
          elements[i].setAttribute('style', 'border-color: red; box-shadow: 0 0 0 1px red;');
        }
      }
    }
  };
})();
