var path = require('path');

var livereload = require('gulp-livereload');

module.exports = function(gulp, config) {
  gulp.task('watch', function() {
    livereload.listen();

    gulp.watch(path.join(config.base_path, 'templates'), ['templates'])
      .on('change', livereload.changed);

    gulp.watch(path.join(config.base_path, 'static', 'styles'), ['styles'])
      .on('change', livereload.changed);

    //gulp.watch(path.join(config.base_path, 'static', 'scripts'), ['copy'])
      //.on('change', livereload.changed);
  });
};
