function setRouteMappings() {
  page.base('/');

  // page('home', homeController.index);
  // page('compare', compareController.index);
  page('afford', affordController.index);

  page();
}

setRouteMappings();
