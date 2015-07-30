define([
  'lodash',
  'modules/events'
], function(_, events) {

  function View(config) {
    _.extend(this, events);

    this.config = config || {};

    this.template = '';

    this.template_compiled = function() {};

    this.is_template_compiled = 0;

    this.is_renderer = 0;
  }

  // ---------------------------------------------
  // crea el nodo base
  // ---------------------------------------------
  View.prototype.setEl = setEl;

  function setEl(el) {
    this.el = el || this.el || document.createElement('div');
    this.$el = $(this.el);
  }


  // ----------------------------------------------------
  // compilo la plantilla e inserto el html
  // ----------------------------------------------------
  View.prototype.render = render;
  
  function render(data) {
    data = data || {};

    if (!this.template) {
      throw('no hay una plantilla asignada');
    }

    this.setEl();

    if (this.is_template_compiled === 0) {
      this.template_compiled = _.template(this.template);
    }

    if (this.is_renderer) {
      if (this.$el && typeof this.$el.off === 'function') {
        this.$el.off();
      }
    }

    this.el.innerHTML = this.template_compiled(data || {});

    this.trigger('render');

    this.is_renderer = 1;

    return this.el;
  }

  // ----------------------------------------------------
  // elimino el nodo
  // ----------------------------------------------------
  View.prototype.remove = remove;
  
  function remove() {
    var self = this;

    this.trigger('remove');

    if (this.navigation && this.navigation.current) {
      this.navigation.current = null;
    }

    if (this.$el && typeof this.$el.off === 'function') {
      this.$el.off();
    }

    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }

    this.is_renderer = 0;
  }

  // ------------------------------------------------
  // devuelve el index  el elemento 
  // ------------------------------------------------
  View.prototype.getIndexElement = getIndexElement;
  
  function getIndexElement(element) {
    var sib = element.parentNode.childNodes;
    var n = 0;
    for (var i = 0; i < sib.length; i++) {
      if (sib[i] == element) return n;
      if (sib[i].nodeType == 1) n++;
    }
    return -1;
  }

  return View;
});
