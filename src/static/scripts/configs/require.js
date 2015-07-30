require.config({
  baseUrl: 'static/scripts',
  paths: {
    'jquery': 'libs/jquery/dist/jquery',
    'lodash': 'libs/lodash/lodash',
    'multiscreen': 'modules/multiscreen-smarttv-1.1.19.min'
  },
  deps: [
    'jquery'
  ],
  shim: {
    'lodash': {
      exports: '_'
    }
  }
});
