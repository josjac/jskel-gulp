define([
  'modules/msf'
], function() {
  'use strict';

  var pointer = document.getElementById('pointer');

  var msf = window.msf;

  pointer.style.boxShadow = '0 3px 5px #000';

  
  msf.local(function(err, service) {
    var channel = service.channel('com.funciton.multiscreen.demo');

    channel.calculateRelativePosition = function(x, y) {
      var d = channel.dimension || 0;

      if (d === 0) {
        return {};
      }

      x = x * d.width / 100;
      y = y * d.height / 100;

      return { x: x, y: y };
    };

    channel.connect({ name: 'TV' }, function(err) {
      if (err) {
        return console.error(err);
      }
    });

    channel.on('click:pointer', function(msg) {
      var p = channel.calculateRelativePosition(msg.x, msg.y);

      if (p.x && p.y) {
        pointer.style.top = p.y + 'px';
        pointer.style.left = p.x + 'px';
      }

      pointer.style.boxShadow = 'none';

      setTimeout(function() {
        pointer.style.boxShadow = '0 3px 5px #000';
      }, 200);
    });

    channel.on('move:pointer', function(msg, from) {
      var p = channel.calculateRelativePosition(msg.x, msg.y);

      if (p.x && p.y) {
        pointer.style.top = p.y + 'px';
        pointer.style.left = p.x + 'px';
      }
    });

    channel.on('clientConnect', function(client) {
      pointer.style.display = 'block';
      channel.dimension = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      channel.publish('identify', channel.dimension);
    });

    channel.on('clientDisconnect', function(client) {
      pointer.style.display = 'none';
    });

    channel.on('connect', function(client) {
      pointer.style.display = 'block';
      pointer.style.backgroundColor = 'blue';
    });

    channel.on('disconnect', function(client) {
      pointer.style.backgroundColor = 'red';
    });
  });
});
