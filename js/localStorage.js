(function(module){

  var localStorageController = {};

// show welcome modal with instructions on load
  localStorageController.modalControl = function() {
    var $instrModal = $('#instrModal');
    var $checkbox = $('#checkbox');
    var $agreeButton = $('#agreeButton');

    $agreeButton.on('click', function() {
      if ($checkbox.prop('checked')) {
        localStorage.DoNotShow = 'true';
      }
    });
    if (localStorage.DoNotShow && localStorage.DoNotShow === 'true') {
      $instrModal.hide();
    } else {
      $(window).load(function() {
        $instrModal.modal('show');
      });
    }
  };

  localStorageController.salaryStorage = function(input, currency) {
    var $salaryCheckbox = $('#salaryCheckbox');
    if ($salaryCheckbox.prop('checked')) {
      localStorage.salaryCurrency = JSON.stringify([input, currency]);
    }
  };

  module.localStorageController = localStorageController;
})(window);
