(function(module) {
  var initialView = {};

  initialView.index = function() {
    homeController.index();
    modalControl();
  };

  module.initialView = initialView;
})(window);
