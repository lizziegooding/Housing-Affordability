var localStorageAvail = function() {
  if (typeof(Storage) !== 'undefined') {
    return true;
  } else {
    return false;
  };
};

var modalControl = function() {
  var $instrModal = $('#instrModal');
  var $checkbox = $('#checkbox');
  var $agreeButton = $('#agreeButton');

  $agreeButton.on('click', function() {
    if ($checkbox.prop('checked')) {
      console.log('reached if statement');
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

var salaryStorage = function() {
  
}
