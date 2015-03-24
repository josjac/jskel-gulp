var path = require('path');

module.exports = function(gulp, config) {

  gulp.task('copy', function() {
    gulp.src(config.scripts.files)
      .pipe(gulp.dest(path.join(config.build_path, 'static', 'scripts')));

    gulp.src(path.join(config.src_path, 'static', 'images', '**'))
      .pipe(gulp.dest(path.join(config.build_path, 'static', 'images')));

    gulp.src(path.join(config.src_path, 'static', 'typos', '**'))
      .pipe(gulp.dest(path.join(config.build_path, 'static', 'typos')));
  });
};
