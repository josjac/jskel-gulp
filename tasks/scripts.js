var r = require('gulp-requirejs-optimize');

var path = require('path');

module.exports = function(gulp, config) {
  gulp.task('scripts', function() {
    gulp.src(config.files)
      .pipe(r(function(file) {
        return {
          mainConfigFile: config.main_config_file || path.join(config.src_path, 'configs', 'require.js'),
          preserveLicenseComments: false,
          wrap: true,
          name: 'libs/almond/almond',
          insertRequire: [file.relative]
        };
      }))
      .pipe(gulp.dest(config.build_path));
  });
};
