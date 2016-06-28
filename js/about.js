(function(module) {
  function About(obj) {
    this.name = obj.name;
    this.giturl = obj.giturl;
    this.porturl = obj.porturl;
    this.description = obj.description;
  };

  About.all = [];

  About.loadAll = function(rawData) {
    About.all = rawData.map(function(element){
      return new About(element);
    });
  };

  About.fetchAll = function (viewCallback) {
    var aboutArray = [];
    $.getJSON('../data/team.json', function(data){
      $.each(data, function(index, value){
        aboutArray.push(value);
      });
    }).done(function(){
      About.loadAll(aboutArray);
      viewCallback();
    });
  };

  About.prototype.toHTML = function () {
    var template = Handlebars.compile($('#about-template').text());
    return template(this);
  };

  About.appendAll = function () {
    About.all.forEach(function(element){
      $('#aboutContent').append(element.toHTML());
    });
  };
  module.About = About;
})(window);
