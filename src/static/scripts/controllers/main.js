define([
  'modules/app',
  'modules/Controller',
  'views/home'
], function(
  app,
  Controller,
  HomeView
) {

  function MainController() {

    Controller.call(this);

    this.views = {
      main: new HomeView()
    };
  }

  MainController.prototype = Object.create(Controller.prototype);

  // ---------------------------------------------
  // inicio de todo
  // ---------------------------------------------
  MainController.prototype.init = init;

  function init() {
    var self = this;
    
    self.updateViews();
  }

  // ---------------------------------------------
  // actualizo plantillas
  // ---------------------------------------------
  MainController.prototype.updateViews = updateViews;

  function updateViews() {
    var self = this;

    app.dom.canvas
      .appendChild(self.views.main.render());

    app.navigate.setIndexNav(self.views.main.navigation);
    self.views.main.navigation.setDefaultElement();
  }

  // ---------------------------------------------
  // finalizando
  // ---------------------------------------------
  MainController.prototype.end = end;

  function end() {
    var self = this;
    
    app.navigate.setIndexNav(null);

    setTimeout(function() {
      self.views.main.remove();
    }, 200);
  }

  return function() {
    var c = app.activeController('main', MainController);
    c.open();
  };
});
