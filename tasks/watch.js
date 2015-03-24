var path = require('path');

var livereload = require('gulp-livereload');

module.exports = function(gulp, config) {
  gulp.task('watch', function() {
    livereload.listen();

    gulp.watch(config.templates.files, ['templates'])
      .on('change', livereload.changed);

    gulp.watch(config.styles.files, ['styles'])
      .on('change', livereload.changed);
  });
};
