var connect = require('connect');

var serveStatic = require('serve-static');

var path = require('path');

var https = require('https');

var fs = require('fs');

module.exports = function(gulp, config) {
  gulp.task('server', function() {
    var port = 8000;
    var host = '0.0.0.0';

    var app = connect();

    var options = {
      key: fs.readFileSync('ssl/dev-key.pem'),
      cert: fs.readFileSync('ssl/dev-cert.pem')
    };

    app.use('/static/scripts', serveStatic(path.resolve(config.scripts.src_path)));
    app.use('/static/typos', serveStatic(path.resolve(path.join(config.src_path, 'static', 'typos'))));
    app.use('/static/images', serveStatic(path.resolve(path.join(config.src_path, 'static', 'images'))));
    app.use('/', serveStatic(path.resolve(config.build_path)));

    //app.use('/', function(req, res) {
      //res.write(fs.readFileSync(path.join(config.build_path, 'index.html')));
    //});

    // TODO: https
    //https.createServer(options, app).listen(port, host);

    // normal
    app.listen(port, host);
  });
};
