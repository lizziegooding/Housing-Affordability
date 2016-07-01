(function(module) {
  // create an object contructor for the funk page
  function Funk(obj) {
    this.location = obj.location;
    this.info = obj.info;
  };

  // set an empty array
  Funk.all = [];

  // create new funk objects using constructor
  Funk.loadAll = function(rawData){
    Funk.all = rawData.map(function(element){
      return new Funk(element);
    });
  };

  // get the data from json using ajax
  Funk.fetchAll = function(viewCallback){
    var funkArray = [];
    $.getJSON('../data/plusData.json', function(data){
      $.each(data, function(index, value){
        funkArray.push(value);
      });
    }).done(function(){
      Funk.loadAll(funkArray);
      viewCallback();
    });
  };

  // add a method to the funk object that compiles handlebars
  Funk.prototype.toHTML = function(){
    var template = Handlebars.compile($('#funk-template').text());
    return template(this);
  };

  // appends all data that was returned to the dom element
  Funk.appendAll = function(){
    Funk.all.forEach(function(element){
      $('#funkContent').append(element.toHTML());
    });
  };
  module.Funk = Funk;
})(window);
