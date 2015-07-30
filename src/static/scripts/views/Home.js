define([
  'modules/View',
  'modules/app',
  'templates/home'
], function(View, app, homeTpl) {

  function HomeView(config) {
    var self = this;

    View.call(this, config);

    // ------------------------------------
    // plantillas precompiladas
    self.template = 'precompiled';

    self.template_compiled = homeTpl;

    self.is_template_compiled = 1;
    // ------------------------------------

    self.navigation = app.navigate.createNavChildConfig(self);

    self.on('render', getUI);

    self.on('render', delegateEvents);

    return self;
  }

  HomeView.prototype = Object.create(View.prototype);


  function getUI() {
    var self = this;

    if (self.ui) {
      return self.ui;
    }

    self.ui = {};

    return self.ui;
  }

  function delegateEvents() {
    var self = this;

    self.$el.on('click', '.js-nav-item', self, openDetail);
  }

  function openDetail(e) {
    var self = e.data;
    var el = $(e.currentTarget);
    var href = el.attr('href');

    if (href) {
      location.hash = href;
    }
  }

  function clear() {
    var self = this;
    self.ui = null;
    self.last_current_element = null;
    self.list_layout = null;
  }


  return HomeView;
});
