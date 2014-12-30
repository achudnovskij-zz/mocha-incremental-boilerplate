// This module allows to speed up in-browser debugging by loading files required for the curreng 'grep' query only.
// First time grep query is executed - this module collects list of test suites which were actually ran.
// Next time is the same query is used - the required files are loaded only.
define(['underscore'], function (_) {
  'use strict';

  var global = window;

  // Get previously saved list of module names from sessionStorage
  function getModules(query) {
    var sessionData;
    if (!query) {
      return null;
    }
    sessionData = JSON.parse(sessionStorage.getItem('testModules') || '{}');
    if (!sessionData[query]) {
      return null;
    }
    return sessionData[query];
  }

  // collect list module names for all tests actually executed in the current run.
  // query - querystring for the current test run. Used as cache key.
  function collectModules(query) {
    var modulesList = [];
    if (!query) {
      return null;
    }

    // overload define function to allow module factory function to access the current module's name
    wrapDefine();

    // when a test is Defined (with mocha.it function) - save module name in test.moduleName property.
    // After this step every test in the suite associated with module name
    global.it = _.wrap(global.it, function (originalIt) {
      var testObject = originalIt.apply(this, Array.prototype.slice.call(arguments, 1));
      testObject.moduleName = window._testModulesCache_currentModule;
      return testObject;
    });

    // wrap mocha.run. Each time a test is run - register the test's module name in the list of module names.
    mocha.run = _.wrap(mocha.run, function (originalRun) {
      var runner = originalRun.apply(Array.prototype.slice.call(arguments, 1));
      runner.on('test', function (test) {
        if (!_.contains(modulesList, test.moduleName)) {
          modulesList.push(test.moduleName);
        }
      });

      // When suite execution completed - save list of modules
      runner.on('end', function () {
        saveModulesList(query, modulesList);
      })
    });
  }

  // Wrap define function call to have access to the current module name
  function wrapDefine() {
    var originalDefine = define,
      defineOverride = _.wrap(originalDefine, function (originalDefine, name, deps, callback) {
      var defineArgs = [];

      // Handle different 'overloads' of define function
      if (typeof name !== 'string') {
        callback = deps;
        deps = name;
        name = null;
      }
      if (!_.isArray(deps)) {
        callback = deps;
        deps = [];
      }

      // Add 'module' dependency if it doesn't exist
      var indexOfModule = _.indexOf(deps, 'module');
      if (indexOfModule == -1) {
        indexOfModule = deps.length;
        deps.push('module');
      }

      // wrap module's factory function to set window._testModulesCache_currentModule when module factory is executed
      var wrappedCallback = _.isFunction(callback)
        ? _.wrap(callback, function (originalCallback) {
            var moduleObj = arguments[indexOfModule + 1],
                result;
            // When module factory is called - keep the module name in window object to have reference from code within the factory.
            window._testModulesCache_currentModule = moduleObj.id;
            result = originalCallback.apply(this, Array.prototype.slice.call(arguments, 1));
            window._testModulesCache_currentModule = null;
          return result;
          })
        : callback;

      if (name) {
        defineArgs.push(name);
      }
      defineArgs.push(deps);
      defineArgs.push(wrappedCallback);
      return originalDefine.apply(this, defineArgs);
    });

    define = defineOverride;
    define.amd = originalDefine.amd;
  }

  // Save collected modules list with test grep query to session storage.
  function saveModulesList(query, modulesList) {
    var mappingObj = {};
    mappingObj[query] = modulesList;
    sessionStorage.setItem('testModules', JSON.stringify(mappingObj));
  }


  return {
    getModules: getModules,
    collectModules: collectModules
  }

});
