define([], function() {

  function evalue(name, value) {
    var exp = this.url_exp[name];

    if (!exp) {
      exp = this.url_exp[name] = new RegExp(name);
    }

    return exp.test(value);
  }

  function get(name) {
    var self = this;
    var keys = self.urls_keys;
    var index = 0;
    var main = {};

    for (; index < keys.length; ++index) {
      if (self.evalue(keys[index], name)) {
        main = self.urls[keys[index]];
        break;
      }
    }

    return main;
  }

  function Router(urls) {
    this.urls = urls;
    this.urls_keys = Object.keys(this.urls);
    this.url_exp = {};

    return this;
  }

  Router.prototype.evalue = evalue;

  Router.prototype.get = get;

  return Router;
});
