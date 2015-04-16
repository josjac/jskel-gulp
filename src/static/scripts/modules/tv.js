define([
], function() {
  var tv = {};

  try {
    tv.widget = new Common.API.Widget();
    tv.webapis = webapis;
  }
  catch(e) {
    tv.widget = {};
    tv.webapis = {};
    tv.webapis.recognition = {
      IsRecognitionSupported: function() { return false; },
      IsGestureRecognitionEnabled: function() { return false; }
    };
  }

  // tvKey, keyCode 
  try {
    tv.tvKey = new Common.API.TVKeyValue();
  }
  catch(e) {
    tv.tvKey = {
      KEY_LEFT: 37,
      KEY_UP: 38,
      KEY_RIGHT: 39,
      KEY_DOWN: 40,
      KEY_ENTER: 13,
      KEY_RETURN: 8,
      // 1
      KEY_EXIT: 49
    };
  }

  return tv;
});
