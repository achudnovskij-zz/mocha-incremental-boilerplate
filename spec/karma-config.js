module.exports = function (config) {
  'use strict';

  config.set({


    basePath: '../',

    frameworks: ['requirejs', 'mocha'],

    files: [
      {
        pattern: 'src/require.config.js',
        included: true
      },
      {
        pattern: 'spec/spec-runner.js',
        included: true
      },

      {
        pattern: 'lib/**/*.js',
        included: false
      },
          // App Code
      {
        pattern: 'src/**/*.js',
        included: false
      },
          // Spec
      {
        pattern: 'spec/**/*.js',
        included: false
      },
      {
        pattern: 'incremental-changes.js',
        included: false
      }
        ],
    exclude: [],
    reporters: ['coverage', 'mocha'],
    preprocessors: {
      'src/**/*.js': ['coverage']
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    captureTimeout: 60000,

    singleRun: true,

    coverageReporter: {
      reporters: [
        {
          type: 'html',
          dir: 'coverage/'
            }
          ]
    },

    mochaReporter: {
      output: 'full'
    },


  });
};
