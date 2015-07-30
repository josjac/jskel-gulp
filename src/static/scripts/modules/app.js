define([
  'modules/Controller'
], function(Controller) {


  var app = {
    Controllers: {}
  };

  app.loader = {
    el: $('#loader'),
    show: function () {
      this.el.show();
    },
    hide: function () {
      this.el.fadeOut(250);
    }
  };

  app.store = {
    set: function(name, value) {
      localStorage.setItem(name, JSON.stringify(value));
    },
    get: function(name) {
      return JSON.parse(localStorage.getItem(name));
    }
  };

  app.activeController = function(id, Controller) {

    if (app.current_controller_id) {
      app.Controllers[app.current_controller_id].close();
    }

    if (!app.Controllers[id]) {
      app.Controllers[id] = new Controller();
    }

    app.current_controller_id = id;

    return app.Controllers[id];
  };

  return app;
});
