require([
  'modules/app',

  'modules/tv',
  'modules/Router',
  'modules/Navigate',

  'controllers/main'
], function(
  app,
  
  tv,
  Router,
  Navigate,

  main
) {

  localStorage.clear();

  app.dom = {
    canvas: document.getElementById('canvas')
  };

  //$('body').append('<div id="log"></div>');

  app.log = function(txt, clear) {
    //if (clear) {
      //$('#log').html('');
    //}
    
    //$('#log').append(txt);
    //$('#log').append('<br/>');
  };

  app.tv = tv;

  app.navigate = new Navigate();

  app.router = new Router({
    '^$': main
  });

  app.router.start();

  window.app = app;
});
