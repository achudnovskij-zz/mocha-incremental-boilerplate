var path = require('path'),
  fs = require('fs'),
  os = require('os');

module.exports = function (grunt) {
  'use strict';

  var WARMUP_TASK_NAME = 'karma_warmup',
    warmupTaskRegistered = false;

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    karma: {
      fullPass: {
        configFile: 'spec/karma-config.js'
      },
      incremental: {
        configFile: 'spec/karma-config.js',
        options: {
          singleRun: false,
          background: true,
          reporters: ['mocha'],
          // Url parameter is set to use different applicationPaths for full test run and partial run. It allows to differentiate them at runtime
          urlRoot: '/watch/'
        }
      }
    },
    watch: {
      karma: {
        // Watch for all *.js files src and spec folders
        files: ['src/**/*.js', 'spec/**/*.js'],
        tasks: ['karma:incremental:run'],
        options: {
          event: ['added', 'changed', 'deleted'],
          spawn: false,
        }
      },
      karma_warmup: {
        files: ['no-matching-files'],
        tasks: ['karma:incremental:start'],
        options: {
          atBegin: true,
          spawn: false
        }
      }
    }
  });

  grunt.event.on('watch', function (action, filepath, target) {
    if (target === 'karma') {
      var isTest = filepath.search(/-tests.js$/g) != -1,
        testPath = isTest ? filepath : path.join('spec/suites/', path.relative('src', filepath).replace(/.js$/g, '-tests.js')),
        suitesPath = 'incremental-changes.js',
        scriptContent;

      if (fs.existsSync(testPath)) {
        scriptContent = 'define(["' + testPath.replace(/\\/g, '/').replace(/.js$/g, '') + '"], function(){});';
      } else {
        grunt.log.write(os.EOL + 'No affected test suites found' + os.EOL);
        scriptContent = 'define(function(){});';
      }

      fs.writeFileSync(suitesPath, scriptContent);
    }
  });

  grunt.registerTask('default', ['karma:fullPass']);
};
