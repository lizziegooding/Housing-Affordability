(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('#funkDiv').hide();
    $('.tab-content').hide();
    $('iframe').show();
    $('#homeContent').show();
  };

  $('#salarySubmit').on('click', function(e) {
    e.preventDefault();
    var salaryInput = $('#salaryInput').val();
    var salaryInteger = parseInt(salaryInput);
    var salaryCurrency = salaryInteger.toLocaleString('en-US');
    if (isNaN(salaryInteger)) {
      // TODO: Create user dialogue to note invalid input. (Won't be necessary if we write an if statment to check for and remove and non-integers like 'e'.)
    } else {
      setPaint(salaryInput, 'index');
      localStorageController.salaryStorage(salaryInput, salaryCurrency);
      charting.salaryChart[2] = JSON.parse(localStorage.salaryCurrency)[0];
    }
    if (charting.myChart) {
      charting.myChart.destroy();
    }
  });

  module.homeController = homeController;
})(window);
