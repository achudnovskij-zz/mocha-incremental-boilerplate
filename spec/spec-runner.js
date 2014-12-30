mocha.setup({
  ui: 'bdd',
  ignoreLeaks: true
});

if(!!window.__karma__){
  require.config({
    baseUrl: '/base'
  });
}


require(['underscore', 'spec/lib/mocha-modules-cache', 'spec/spec-list'], function (_, modulesCache, fullList) {
  'use strict';

  var requireConfig = require.s.contexts._.config,
    paths = _.extend({}, requireConfig.paths, {
      'chai': 'lib/chai/chai',
      'should': 'spec/lib/should'
    }),

    getSpecModulesList = function () {
      var isWatch = document.location.pathname.indexOf('/watch/') > -1,
        modulesList;

      if(isWatch){
        return ['incremental-changes'];
      }

      modulesList = modulesCache.getModules(window.location.search);
      if (!modulesList) {
        modulesCache.collectModules(window.location.search);
      }
      return modulesList || fullList;
    };

  require.config({
    paths: paths
  });

  require(getSpecModulesList(), function () {
    if (window.__karma__) {
      window.__karma__.start();
    } else {
      var runner = mocha.run();
    }
  });

});
