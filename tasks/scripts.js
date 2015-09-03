var r = require('gulp-requirejs-optimize');

var path = require('path');

module.exports = function(gulp, config) {
  gulp.task('scripts', function() {
    var require_config = config.getJSON(path.join(config.src_path, 'configs', 'require.js'));
    require_config.baseUrl = config.static_path;
    
    gulp.src(config.files)
      .pipe(r(function(file) {
        require_config.preserveLicenseComments = false;
        require_config.wrap = true;
        require_config.name = 'libs/almond/almond';
        require_config.include = ['scripts/' + file.relative];
        return require_config;
      }))
      .pipe(gulp.dest(config.build_path));
  });
};
