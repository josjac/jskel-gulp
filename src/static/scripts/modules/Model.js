define([
  'lodash',
  'modules/events'
], function(_, events) {

  function Model() {
    _.extend(this, events);
    return this;
  }

  Model.prototype.pull = pull;

  function pull(config) {
    var self = this;

    config = config || {};

    this.trigger('before:update');

    if (this.demo) {
      this.update({
      });

      return {};
    }

    else {
      this.xhr = $.ajax({
        url: config.url || this.url,
        dataType: 'json',
        type: config.type || 'get',
        success: function(response) {
          self.update(response, config.success);
        },
        error: function() {
          self.fail(response, config.error);
        },
        data: this.data || config.data || {}
      });
    }
  }

  Model.prototype.update = update;

  function update(event, callback) {
    if (this.demo) {
      this.store = this.demo;
    } else {
      this.store = event;
    }

    this.parse(this.store);

    this.trigger('done', event);

    this.trigger('update', event);

    if (typeof callback === 'function') {
      callback();
    }
  }

  Model.prototype.fail = fail;
  
  function fail(event, callback) {
    var self = this;
    
    this.trigger('fail', event);

    if (typeof callback === 'function') {
      callback();
    }
  }

  // ---------------------------------------------
  // restructuro datos
  // ---------------------------------------------
  Model.prototype.parse = parse;

  function parse() {
    var self = this;
  }

  return Model;

});
