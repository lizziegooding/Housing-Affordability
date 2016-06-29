(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('.tab-content').hide();
    $('iframe').fadeIn(700);
    $('#overlay').fadeIn(700);
    $('#homeContent').fadeIn(700);
  };

  $('#salarySubmit').on('click', function(e) {
    e.preventDefault();
    var salaryInput = $('#salaryInput').val();
    var salaryInteger = parseInt(salaryInput);
    var salaryCurrency = salaryInteger.toLocaleString('en-US');
    if (isNaN(salaryInteger)) {
      console.log('will change class to show user invalid input');
    } else {
      setPaint(salaryInput);
    }
  });

  module.homeController = homeController;
})(window);
