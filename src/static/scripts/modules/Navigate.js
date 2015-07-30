define([
  'modules/app',
  'lodash',
  'modules/events'
], function(app, _, events) {

  function Navigate() {
    var self = this;

    var key_codes = app.tv.getKeyCodes();

    function update(e) {
      var key_code = e.keyCode;
      var index_nav = self.index_nav;
      var current = {};
      var key_name = key_codes[key_code];

      if (!self.index_nav) {
        return;
      }

      if (typeof index_nav.any === 'function') {
        index_nav.any();
      }

      if (key_name === 'enter') {
        current = index_nav.getCurrentElement();

        if (current && current.classList && current.classList.contains('selected')) {
          $(current).trigger('click', 'keyboard');
        }
      } else if (typeof index_nav[key_name] === 'function') {
        index_nav[key_name]();
      }

      if (typeof index_nav.moveSelectedFrame === 'function') {
        index_nav.moveSelectedFrame();
      }
    }

    app.tv.registerKeys();

    document.addEventListener('keydown', update);

    return this;
  }

  // ------------------------------------------------
  // el nav en el que debe trabajar
  // ------------------------------------------------
  Navigate.prototype.setIndexNav = setIndexNav;

  function setIndexNav(index_nav) {
    var self = this;

    if (this.index_nav && typeof this.index_nav.onInactive === 'function') {
      this.index_nav.onInactive();
    }

    if (this.index_nav && typeof this.index_nav.showSelectedFrame === 'function') {
      this.index_nav.showSelectedFrame('none');
    }

    if (this.index_nav && typeof this.index_nav.leave === 'function') {
      this.index_nav.leave();
    }

    this.index_nav = index_nav;

    if (this.index_nav && typeof this.index_nav.onActive === 'function') {
      this.index_nav.onActive();
    }

    if (this.index_nav && typeof this.index_nav.moveSelectedFrame === 'function') {
      this.index_nav.moveSelectedFrame(true);
      this.index_nav.showSelectedFrame('block');
    }
  }

  // ------------------------------------------------
  // crea la configuracion de los navs por defecto
  // ------------------------------------------------
  Navigate.prototype.createNavChildConfig = createNavChildConfig;

  function createNavChildConfig(view) {
    var self = this;

    return _.extend({
      enabled: 1,

      showSelectedFrame: function(display) {
        var f = self.index_nav.getSelectedFrame();

        if (!f) {
          return;
        }

        f.style.display = display || 'block';
      },

      moveSelectedFrame: function(fast) {
        var current = this.getCurrentElement();
        var offset = {};
        var config = {};
        var selected_frame = this.getSelectedFrame();

        if (!current || !selected_frame) {
          return;
        }

        setTimeout(function() {
          current = $(current);
          selected_frame = $(selected_frame);

          offset = current.position();
          config = {
            width: current.outerWidth(),
            height: current.outerHeight(),
            top: offset.top,
            left: offset.left
          };

          if (fast) {
            selected_frame.css(config);
          } else {
            selected_frame.animate(config, 200);
          }
        }, 150);
      },

      getSelectedFrame: function() {
        return view.el.querySelector('.selected-frame');
      },

      getCurrentElement: function() {
        if (this.current) {
          return this.current;
        } else {
          return view.$el.find('.js-nav-item:first').get(0);
        }
      },

      setCurrentElement: function(element) {
        if (this.current) {
          this.current.classList.remove('selected');
        }

        this.trigger('set:element', { current: element, last: this.current });

        this.current = element;

        if (this.current) {
          this.current.classList.add('selected');
        }
      },

      setDefaultElement: function() {
        this.setCurrentElement(
          this.getCurrentElement()
        );
      },

      leave: function() {
        var current = this.getCurrentElement();

        if (current) {
          current.classList.remove('selected');
        }
      },

      left: function() {
        if (!this.enabled) {
          return;
        }
        var item = this.getCurrentElement();
        var next = (item) ? document.querySelector(item.getAttribute('data-nav-left')) : null;

        if (next) {
          this.trigger('before:left');
          this.setCurrentElement(next);
          this.trigger('left');
        } else {
          this.leaveLeft();
        }
      },
      right: function() {
        if (!this.enabled) {
          return;
        }
        var item = this.getCurrentElement();
        var next = (item) ? document.querySelector(item.getAttribute('data-nav-right')) : null;

        if (next) {
          this.trigger('before:right');
          this.setCurrentElement(next);
          this.trigger('right');
        } else {
          this.leaveRight();
        }
      },
      top: function() {
        if (!this.enabled) {
          return;
        }
        var item = this.getCurrentElement();
        var next = (item) ? document.querySelector(item.getAttribute('data-nav-top')) : null;

        if (next) {
          this.trigger('before:top');
          this.setCurrentElement(next);
          this.trigger('top');
        } else {
          this.leaveTop();
        }
      },
      bottom: function() {
        if (!this.enabled) {
          return;
        }
        var item = this.getCurrentElement();
        var next = (item) ? document.querySelector(item.getAttribute('data-nav-bottom')) : null;

        if (next) {
          this.trigger('before:bottom');
          this.setCurrentElement(next);
          this.trigger('bottom');
        } else {
          this.leaveBottom();
        }
      },
      back: function() {
        this.trigger('back');
        this.leaveBack();
      },
      leaveLeft: function() {},
      leaveTop: function() {},
      leaveRight: function() {},
      leaveBottom: function() {},
      leaveBack: function() {}
    }, events);
  }

  return Navigate;

});
