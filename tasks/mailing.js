var path = require('path');

var inlineCss = require('gulp-mc-inline-css');

var MC_API_KEY = '';

module.exports = function(gulp, config) {
  gulp.task('mailing', function() {
    gulp.src(config.files)
      .pipe(inlineCss(MC_API_KEY))
      .pipe(gulpif(config.yargs.prod, htmlMin()))
      .pipe(gulp.dest(config.build_path));
  });
};
