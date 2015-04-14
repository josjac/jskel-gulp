var path = require('path');

module.exports = function(gulp, config) {

  gulp.task('copy:compile', function() {

    gulp.src(path.join(config.src_path, 'static', 'images', '**'))
      .pipe(gulp.dest(path.join(config.build_path, 'static', 'images')));

    gulp.src(path.join(config.src_path, 'static', 'typos', '**'))
      .pipe(gulp.dest(path.join(config.build_path, 'static', 'typos')));
  });

  gulp.task('copy:scripts', function() {
    gulp.src(path.join(config.scripts.src_path, '**', '*.js'))
      .pipe(gulp.dest(path.join(config.build_path, 'static', 'scripts')));
  });

  gulp.task('copy', ['copy:compile', 'copy:scripts']);
};
