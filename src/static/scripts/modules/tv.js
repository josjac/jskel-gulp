define([
], function() {

  var app = {};

  app.log = function(txt) {
    //$('#log').append(txt);
    //$('#log').append('<br/>');
  };

  var tv = {};

  function Nothing() {}

  try {
    tv.widget = new Common.API.Widget();
    tv.webapis = webapis;
    tv.pluginWindow = document.getElementById('pluginWindow');
  } catch (e) {
  }

  tv.getKeyCodes = function() {
    var keys = {};
    var keys_values = {};

    // -----------------------
    // tizen
    // -----------------------
    if (window.tizen) {
      return {
        37: 'left',
        38: 'top',
        39: 'right',
        40: 'bottom',
        13: 'enter',

        // tv
        10009: 'back',
        403: 'redButton',
        404: 'greenButton',
        405: 'yellowButton',
        406: 'blueButton',

        428: 'tuneDown',
        427: 'tuneUp'
      };
    }

    // -----------------------
    // normal sdk
    // -----------------------
    else if (window.Common && window.Common.API) {
      keys_values = new Common.API.TVKeyValue();
      keys = {};

      keys[keys_values.KEY_LEFT] = 'left';
      keys[keys_values.KEY_UP] = 'top';
      keys[keys_values.KEY_RIGHT] = 'right';
      keys[keys_values.KEY_DOWN] = 'bottom';
      keys[keys_values.KEY_ENTER] = 'enter';
      keys[keys_values.KEY_EXIT] = 'exit';
      keys[keys_values.KEY_RETURN] = 'back';
      keys[65] = 'tuneDown';
      keys[68] = 'tuneUp';
      keys[7] = 'volUp';
      keys[11] = 'volDown';

      return keys;
    }

    // -----------------------
    // keyboard
    // -----------------------
    else {
      return {
        37: 'left',
        38: 'top',
        39: 'right',
        40: 'bottom',
        13: 'enter',

        188: 'back', // < menor que
        // a,b,c,d top keyboard
        65: 'redButton',
        66: 'greenButton',
        67: 'yellowButton',
        68: 'blueButton'
      };
    }
  };

  tv.sendReadyEvent = function() {
    try {
      tv.widget.sendReadyEvent();
      $('#body').addClass('tv-device');
    } catch (e) {}
  };

  tv.registerKeys = function() {
    try {
      //if (window.tizen) {
      //var i, supportedKeys;
      //supportedKeys = window.tizen.tvinputdevice.getSupportedKeys();
      //for (i = 0; i < supportedKeys.length; i++) {
      //app.log(''+supportedKeys[i].name+' = '+supportedKeys[i].code);
      //}
      //}

      window.tizen.tvinputdevice.registerKey('ChannelUp');
      window.tizen.tvinputdevice.registerKey('ChannelDown');
      window.tizen.tvinputdevice.registerKey('ColorF0Red');
      window.tizen.tvinputdevice.registerKey('ColorF1Green');
      window.tizen.tvinputdevice.registerKey('ColorF2Yellow');
      window.tizen.tvinputdevice.registerKey('ColorF3Blue');
    } catch (e2) {
      app.log('tvinputdevice ->' + e2.name);
    }
  };

  tv.tuneUp = function(success, error) {
    var config = {
      onsuccess: success || Nothing,
      onnosignal: error || Nothing
    };

    if (window.tizen) {
      try {
        window.tizen.tvchannel.tuneUp(config, null, "ALL");
      } catch (e2) {
        app.log('tuneUp ->' + e2.name);
      }
    }

    else if (tv.webapis) {
      try {
        tv.webapis.tv.channel.tuneUp(config.onsuccess, config.onnosignal, tv.webapis.tv.channel.NAVIGATOR_MODE_ALL, 0);
      } catch (e2) {
        app.log('tuneUp ->' + e2.name);
      }
    }
  };

  tv.tuneDown = function(success, error) {
    var config = {
      onsuccess: success || Nothing,
      onnosignal: error || Nothing
    };

    if (window.tizen) {
      try {
        window.tizen.tvchannel.tuneDown(config, null, "ALL");
      } catch (e2) {
        app.log('tuneDown ->' + e2.name);
      }
    }

    else if (tv.webapis) {
      tv.webapis.tv.channel.tuneDown(config.onsuccess, config.onnosignal, tv.webapis.tv.channel.NAVIGATOR_MODE_ALL, 0);
    }
  };

  tv.volUp = function() {
    if (tv.webapis) {
      try {
        tv.webapis.audiocontrol.setVolumeUp();
      }
      catch(e) {
        app.log(e.name);
      }
    }
  };

  tv.volDown = function() {
    if (tv.webapis) {
      try {
        tv.webapis.audiocontrol.setVolumeDown();
      }
      catch(e) {
        app.log(e);
      }
    }
  };


  tv.getChannelList = function(success, error) {
    error = error || Nothing;
    success = success || Nothing;

    if (window.tizen) {
      try {
        window.tizen.tvchannel.getChannelList(success, error, 'ALL', 0, 10);
      } catch (e2) {
        app.log('getChannelList ->' + e2.name);
      }
    } else if (tv.webapis) {
      try {
        tv.webapis.tv.channel.getChannelList(success, error, tv.webapis.tv.channel.NAVIGATOR_MODE_ALL, 0, 10);
      } catch (e2) {
        app.log('getChannelList ->' + e2.name);
      }
    }
  };

  tv.tune = function(channel, success, error) {
    error = error || Nothing;
    success = success || Nothing;
    if (window.tizen) {
      try {
        window.tizen.tvchannel.tune({
          major: channel.major
        }, Nothing);
      } catch (e2) {
        app.log('tvchannel.tune ->' + e2.name);
      }
    } else if (tv.webapis) {
      try {
        tv.webapis.tv.channel.tune({
          major: channel.major
        }, success, error, 0);
      }
      catch(e) {
        app.log('tvchannel.tune ->' + e2.name);
      }
    }
  };

  tv.showBroadcast = function(success, error, rectangle, type) {
    error = error || Nothing;
    success = success || Nothing;
    type = type || 'MAIN';
    rectangle = rectangle || ['0', '0', '100%', '100%'];

    if (window.tizen) {
      try {
        window.tizen.tvwindow.show(success, error, rectangle, type);
      } catch (e2) {
        app.log('tvwindow.show ->' + e2.name);
      }
    }

    else if (tv.webapis) {
      try {
        tv.webapis.tv.window.getAvailableWindow(function() {
          try {

            var sv = tv.webapis.tv.window.setRect({
              left: rectangle[0],
              top: rectangle[1],
              width: rectangle[2],
              height: rectangle[3]
            });

            tv.pluginWindow.SetPreviousSource();

            tv.webapis.tv.window.getAvailableWindow(function(w) {
              webapis.tv.window.show(w);
            }, Nothing);

            tv.webapis.audiocontrol.setMute(0);

            success();

            app.log('setrect = ' + JSON.stringify(sv));
          }
          catch(e) {
            app.log('tvAvailable = ' + e);
          }
        }, Nothing);
      }
      catch(e) {
        app.log('tvwindow.show ->' + e2.name);
      }
    }
  };

  tv.hideBroadcast = function(success) {
    success = success || Nothing;

    if (window.tizen) {
      try {
        window.tizen.tvwindow.hide(success);
      } catch (e2) {
        app.log('tvwindow.hide ->' + e2.name);
      }
    }

    else if (tv.webapis) {
      app.log('hide window webapi');
      try {

        //tv.webapis.tv.window.setRect({
          //left: 0,
          //top: 0,
          //width: 0,
          //height: 0
        //}, -1);

        tv.webapis.tv.window.getAvailableWindow(function(w) {
          webapis.tv.window.hide(w);
        }, Nothing);

        //tv.webapis.audiocontrol.setMute(1);
      }
      catch(e) {
        app.log('tvSetRect webapi = ' + JSON.stringify(e));
      }
    }
  };

  tv.setMute = function(val) {
    if (tv.webapis) {
      try {
        //tv.webapis.audiocontrol.setMute(val);
      }
      catch(e) {
        app.log('set mute ' + e);
      }
    }
  };

  tv.getDeviceInfo = function(success, error) {
    error = error || Nothing;
    success = success || Nothing;

    try {
      if (typeof success === 'function') {
        success({
          model: window.tizen.systeminfo.getCapability('http://tizen.org/system/model_name'),
          id: window.tizen.systeminfo.getCapability('http://tizen.org/system/tizenid')
        });
      }
    } catch (e2) {
      if (typeof success === 'function') {
        success({
          //model: 'UJ55001',
          //id: '03Q83CTG200531P'
        });
      }
    }
  };

  tv.exit = function() {
    if (typeof tv.onExit === 'function') {
      tv.onExit();
    }

    if (window.tizen) {
      try {
        window.tizen.application.getCurrentApplication().hide();
      } catch (e2) {
        app.log('exit ->' + e2.name);
      }
    }

    else if (tv.webapis) {
      //app.tv.setMute(0);
    }
  };

  tv.preventBack = function() {
    if (!window.tizen && event) {
      event.preventDefault();
    }
  };

  return tv;
});
