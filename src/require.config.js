require.config({

  baseUrl: '../',
  'paths': {
    underscore: 'lib/underscore/underscore'
  },
  'map': {},
  'shim': {
    'underscore': {
      'exports': '_'
    }
  },
  'waitSeconds': 60
});
