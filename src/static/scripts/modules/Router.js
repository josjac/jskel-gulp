define([], function() {

  function Router(urls) {
    var self = this;

    var win = window;

    var loc = win.location;

    this.urls = urls;

    this.urls_keys = Object.keys(this.urls);

    this.url_exp = {};

    this.start = function() {
      win.addEventListener('hashchange', update);
      win.dispatchEvent(new Event('hashchange'));
    };

    function update() {
      var next = self.get(loc.hash);

      if (next) {
        next(self.params);
      }
    }

    return this;
  }

  Router.prototype.evalue = evalue;

  function evalue(name, value) {
    var exp = this.url_exp[name];

    if (!exp) {
      exp = this.url_exp[name] = new RegExp(name);
    }

    return value.match(exp);
  }


  Router.prototype.get = get;

  function get(name) {
    var self = this;
    var keys = self.urls_keys;
    var index = 0;
    var main = { empty: 1 };
    var params = [];

    for (; index < keys.length; ++index) {
      params = self.evalue(keys[index], name);

      if (params) {
        main = self.urls[keys[index]];
        self.params = params;
        break;
      }
    }

    if (main.empty) {
      return null;
    }

    else {
      return main;
    }
  }

  return Router;
});
