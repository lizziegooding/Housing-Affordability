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
    if ($('#natAvgBtn').hasClass('btn btn-danger')){
      $('#natAvgBtn').removeClass('btn btn-danger');
      $('#natAvgBtn').addClass('btn btn-default');

    }
    if ($('#minWageBtn').hasClass('btn btn-danger')){
      $('#minWageBtn').removeClass('btn btn-danger');
      $('#minWageBtn').addClass('btn btn-default');

    }

  });

  $('#natAvgBtn').on('click', function(e) {
    e.preventDefault();
    colorObj.setPaint(mathObj.iSalary, 'index');
    $('#salaryInput').val(mathObj.iSalary);
    if ($('#natAvgBtn:focus')) {
      $('#natAvgBtn').removeClass('btn btn-default');
      $('#natAvgBtn').addClass('btn btn-danger');

      $('#minWageBtn').removeClass('btn btn-danger');
      $('#minWageBtn').addClass('btn btn-default');

    }
    else {
      $('#natAvgBtn').removeClass('btn btn-danger');
      $('#natAvgBtn').addClass('btn btn-default');

      $('#minWageBtn').removeClass('btn btn-default');
      $('#minWageBtn').addClass('btn btn-danger');
    }
  });

//   "btn btn-danger” = orange
//
// "btn btn-default” = white

  $('#minWageBtn').on('click', function(e) {
    e.preventDefault();
    colorObj.setPaint(mathObj.minSalary, 'index');
    $('#salaryInput').val(mathObj.minSalary);
    if ($('#minWageBtn:focus')){
      $('#minWageBtn').removeClass('btn btn-default');
      $('#minWageBtn').addClass('btn btn-danger');

      $('#natAvgBtn').removeClass('btn btn-danger');
      $('#natAvgBtn').addClass('btn btn-default');
    }
    else {
      $('#minWageBtn').removeClass('btn btn-danger');
      $('#minWageBtn').addClass('btn btn-default');

      $('#natAvgBtn').removeClass('btn btn-default');
      $('#natAvgBtn').addClass('btn btn-danger');
    }
  });

  module.homeController = homeController;
})(window);
