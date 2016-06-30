(function(module) {
  var repos = {};

  repos.all = [];

  var repoRender = Handlebars.compile($('#git-template').text());

  repos.requestRepos = function(callback) {
    $.get('/github/user/repos' + '?per_page=100' + '&sort=updated')
    .done(function(data, message, xhr) { console.log(data); repos.all = data; })
    .done(callback);
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) { return repo[attr] > 4; });
  };

  repos.stickOnPage = function() {
    $('#thisRepo ul').append(
      repos.with('watchers_count').map(repoRender)
    );
  };

  $('#githubProxy').on('click', function(){
    repos.stickOnPage();
  });

  repos.requestRepos(repos.stickOnPage());

  module.repos = repos;

})(window);
