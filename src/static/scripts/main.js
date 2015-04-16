require([
  'modules/tv',
  'modules/Router',
  'controllers/home',
  'controllers/category',


  'modules/msf.pointer'
  //'libs/gsap/src/minified/plugins/CSSPlugin.min',
  //'libs/gsap/src/minified/TweenLite.min'
], function(tv, Router, Home, Category) {
  var app = {};

  app.history = [];

  app.router = new Router({
    '/home': new Home(),
    '/category/(.*)': new Category()
  });

  app.controller = 0;

  function controllerManager() {
    var next = app.router.get(location.hash);
    var current = app.controller;
    
    next.open(function() {
      // in
      if (!current) {
        //TweenLite.from(next.page, 0.8, { 
          //transformOrigin: '50% 100%',
          //transform: 'scale(1.2) rotateX(-90deg)',
          //backgroundColor: '#000',
          //ease: Linear.easeIn
        //});
      }

      else {
        current.close();
        //TweenLite
        //.to(current.page, 0.5, { 
          //transformOrigin: '50% 100%',
          //transform: 'rotateX(90deg)',
          //opacity: 0,
          //ease: Linear.easeOut
        //});
        //TweenLite
        //.from(next.page, 0.8, { 
          //transformOrigin: '50% 100%',
          //transform: 'rotateX(-90deg)',
          //backgroundColor: '#000',
          //ease: Linear.easeIn,
          //delay: 0.1,
          //onComplete: function() {
            //current.close();
          //}
        //});
      }
    });

    app.controller = next;
  }

  window.addEventListener('hashchange', controllerManager);

  // control de interface

  // inica aplicacion
  if (location.hash === '') {
    location.hash = '#/home';
  }
  else {
    window.dispatchEvent(new Event('hashchange'));
  }

  window.app = app;

  if (typeof tv.widget.sendReadyEvent === 'function') {
    tv.widget.sendReadyEvent();
  }
});
