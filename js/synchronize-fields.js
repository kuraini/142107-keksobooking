'use strict';

(function () {
  function synchronizeFields(selected, selectable, selectedData, selectableData, callback) {
    selected.addEventListener('change', function () {
      var i = selectedData.indexOf(selected.value);
      if (typeof callback === 'function') {
        callback(selectable, selectableData[i]);
      }
    });
  }

  window.synchronizeFields = synchronizeFields;
})();
