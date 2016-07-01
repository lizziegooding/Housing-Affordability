(function(module) {
  // create an object contructor for the about page
  function About(obj) {
    this.name = obj.name;
    this.giturl = obj.giturl;
    this.porturl = obj.porturl;
    this.description = obj.description;
  };

// set an empty array
  About.all = [];

// create new About objects using constructor
  About.loadAll = function(rawData) {
    About.all = rawData.map(function(element){
      return new About(element);
    });
  };

// get the data from json using ajax
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

// add a method to the about object that compiles handlebars
  About.prototype.toHTML = function () {
    var template = Handlebars.compile($('#about-template').text());
    return template(this);
  };

// appends all data that was returned to the dom element
  About.appendAll = function () {
    About.all.forEach(function(element){
      $('#aboutContent').append(element.toHTML());
    });
  };
  module.About = About;
})(window);
