(function(module) {
  function Funk(obj) {
    this.location = obj.location;
    this.info = obj.info;
  };

  Funk.all = [];

  Funk.loadAll = function(rawData){
    Funk.all = rawData.map(function(element){
      return new Funk(element);
    });
  };

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

  Funk.prototype.toHTML = function(){
    var template = Handlebars.compile($('#funk-template').text());
    return template(this);
  };

  Funk.appendAll = function(){
    Funk.all.forEach(function(element){
      $('#funkContent').append(element.toHTML());
    });
  };
  module.Funk = Funk;
})(window);
