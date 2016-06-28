(function(module) {
  var initialView = {};

  initialView.index = function() {
    homeController.index();
  };
  console.log('called initial view');
  module.initialView = initialView;
})(window);
