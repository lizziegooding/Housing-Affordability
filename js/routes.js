function setRouteMappings() {
  page.base('/');

  page('/', initialView.index);
  page('home', homeController.index);
  page('compare', compareController.index);
  page('afford', affordController.index);
  page('assumptions', assumptionsController.index);
  page('about', aboutController.index);
  page('funk', funkController.index);

  page('*', '/');

  page();
}

setRouteMappings();
