function setRouteMappings() {
  page.base('/');

  page('/', initialView.index);
  page('home', homeController.index);
  page('compare', compareController.index);
  page('afford', affordController.index);
  page('about', aboutController.index);
  page('funk', funkController.index);

  page('index.html', '/');

  page();
}

setRouteMappings();
