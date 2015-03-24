var connect = require('connect');

var serveStatic = require('serve-static');

var path = require('path');

module.exports = function(gulp, config) {
  gulp.task('server', function() {
    var port = 8000;
    var host = '0.0.0.0';

    var app = connect();

    app.use('/static/scripts', serveStatic(path.resolve(config.scripts.src_path)));
    app.use('/static/typos', serveStatic(path.resolve(path.join(config.src_path, 'static', 'typos'))));
    app.use('/static/images', serveStatic(path.resolve(path.join(config.src_path, 'static', 'images'))));
    app.use('/', serveStatic(path.resolve(config.build_path)));

    app.listen(port, host);
  });
};
