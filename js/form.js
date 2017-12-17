'use strict';

(function () {
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var MIN_PRICES = [1000, 0, 5000, 10000];

  var form = document.querySelector('.notice__form');
  var titleInput = form.querySelector('#title');
  var typeSelect = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var timeinSelect = form.querySelector('#timein');
  var timeoutSelect = form.querySelector('#timeout');
  var roomSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');
  var formSubmit = form.querySelector('.form__submit');

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
    if (target.value.length < 30) {
      target.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else {
      target.setCustomValidity('');
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

  window.synchronizeFields(typeSelect, priceInput, TYPES, MIN_PRICES, window.util.syncValuesWithMin);
  window.synchronizeFields(timeinSelect, timeoutSelect, CHECKINS, CHECKOUTS, window.util.syncValues);
  window.synchronizeFields(timeoutSelect, timeinSelect, CHECKOUTS, CHECKINS, window.util.syncValues);

  if (roomSelect.value === '1') {
    capacitySelect.value = roomSelect.value;
  }

  roomSelect.addEventListener('change', function () {
    var capacities = capacitySelect.children;
    if (roomSelect.value === '1') {
      capacitySelect.value = capacities[2].value;
      capacities[0].disabled = true;
      capacities[1].disabled = true;
      capacities[2].disabled = false;
      capacities[3].disabled = true;
    } else if (roomSelect.value === '2') {
      capacitySelect.value = capacities[1].value;
      capacities[0].disabled = true;
      capacities[1].disabled = false;
      capacities[2].disabled = false;
      capacities[3].disabled = true;
    } else if (roomSelect.value === '3') {
      capacitySelect.value = capacities[0].value;
      capacities[0].disabled = false;
      capacities[1].disabled = false;
      capacities[2].disabled = false;
      capacities[3].disabled = true;
    } else {
      capacitySelect.value = capacities[3].value;
      capacities[0].disabled = true;
      capacities[1].disabled = true;
      capacities[2].disabled = true;
      capacities[3].disabled = false;

    }
  });

  formSubmit.addEventListener('click', function () {
    window.util.colorInvalidFieldsRed(form);
  });

  formSubmit.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, window.util.colorInvalidFieldsRed(form));
  });

  function removeStyleInput(elem) {
    var elements = elem.querySelectorAll('input, select, textarea');
    window.util.removeAttributeAll(elements, 'style');
  }

  function succesHandler() {
    form.reset();
  }

  function errorHandler(errorMessage) {
    window.util.createErrorMessage(errorMessage);
    window.util.deleteErrorMessage();
  }

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    removeStyleInput(form);
    window.backend.save(new FormData(form), succesHandler, errorHandler);
  });
})();
