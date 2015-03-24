var stylus = require('gulp-stylus');

var nib = require('nib');

var csso = require('gulp-csso');

var gulpif = require('gulp-if');

function condition(file) {
  if (file.relative.indexOf('/') === -1) {
    return true;
  } else {
    return false;
  }
}

module.exports = function(gulp, config) {
  gulp.task('styles', function() {
    gulp.src(config.files)
    .pipe(gulpif(condition, stylus({
      use: nib(),
      compress: true
    })))
    .pipe(gulpif(condition, csso()))
    .pipe(gulpif(condition, gulp.dest(config.build_path)));
  });

};
