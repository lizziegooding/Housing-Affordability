(function(module) {
  var homeController = {};

  // show all home elements
  homeController.index = function() {
    $('.tab-content').hide();
    $('iframe').show();
    $('#homeContent').show();
  };
// get salary input from user, store in localstorage if checkbox is true, validate input
  $('#salarySubmit').on('click', function(e) {
    e.preventDefault();
    var salaryInput = $('#salaryInput').val();
    var salaryInteger = parseInt(salaryInput);
    var salaryCurrency = salaryInteger.toLocaleString('en-US');
    if (isNaN(salaryInteger)) {
      // TODO: Create user dialogue to note invalid input. (Won't be necessary if we write an if statment to check for and remove and non-integers like 'e'.)
    } else {
      colorObj.setPaint(salaryInput, 'index');
      localStorageController.salaryStorage(salaryInput, salaryCurrency);
      charting.salaryChart[2] = JSON.parse(localStorage.salaryCurrency)[0];
    }
    if (charting.myChart) {
      charting.myChart.destroy();
    }
  });

  $('#natAvgBtn').on('click', function(e) {
    e.preventDefault();
    colorObj.setPaint(mathObj.iSalary, 'index');
  });
  $('#minWageBtn').on('click', function(e) {
    e.preventDefault();
    colorObj.setPaint(mathObj.minSalary, 'index');
  });

  module.homeController = homeController;
})(window);
