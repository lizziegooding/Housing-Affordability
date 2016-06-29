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
      // TODO: Create user dialogue to note invalid input. (Won't be necessary if we write an if statment to check for and remove and non-integers like 'e'.)
      console.log('will change class to show user invalid input');
    } else {
      setPaint(salaryInput);
    }
    salaryStorage(salaryInput, salaryCurrency);
    console.log('salary storage called');
  });

  module.homeController = homeController;
})(window);
