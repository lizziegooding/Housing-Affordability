function setRouteMappings() {
  page.base('/');

  page('/', initialView.index);
  page('home', homeController.index);
  page('compare', compareController.index);
  page('afford', affordController.index);
  page('about', aboutController.index);
  page('index.html', initialView.index);
  page('*', function() {
    $('body').html('Sorry! The page you requested doesn\'t exist. Hit your browser\'s "back" button to return to the previous page');
  });



  page();
}

setRouteMappings();
