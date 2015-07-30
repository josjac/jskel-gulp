define([], function() {

  function open(callback) {
    if (typeof this.init === 'function' && this.status === 0) {
      this.init.call(this, arguments);
      this.status = 1;
    }
    if (typeof callback === 'function') {
      callback();
    }
    return this;
  }

  function close(callback) {
    if (typeof this.end === 'function' && this.status === 1) {
      this.end.call(this, arguments);
      this.status = 0;
    }
    if (typeof callback === 'function') {
      callback();
    }
    return this;
  }

  function update() {
  }

  function on() {
  }

  function Controller() {
    // status 0, no activo o cerrado
    // status 1, activo o abierto
    this.status = 0;
  }

  Controller.prototype.open = open;

  Controller.prototype.close = close;

  Controller.prototype.on = on;

  Controller.prototype.update = update;

  return Controller;
});
