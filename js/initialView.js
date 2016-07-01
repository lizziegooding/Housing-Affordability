(function(module) {
  var initialView = {};

  initialView.index = function() {
    // show all home elements
    homeController.index();
    localStorageController.modalControl();
  };

  module.initialView = initialView;
})(window);
