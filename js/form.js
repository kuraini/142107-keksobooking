'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var titleInput = form.querySelector('#title');
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

  typeSelect.addEventListener('change', getMinPrices);

  timeinSelect.addEventListener('change', function () {
    window.util.synchronizeValue(timeinSelect, timeoutSelect);
  });

  timeoutSelect.addEventListener('change', function () {
    window.util.synchronizeValue(timeoutSelect, timeinSelect);
  });

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
})();
