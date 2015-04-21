var path = require('path');

var livereload = require('gulp-livereload');

function changed() {
  setTimeout(
    (function(a) {
      return function() {
        return livereload.changed.apply(livereload, a);
      };
    }(arguments)) , 100);
}

module.exports = function(gulp, config) {
  gulp.task('watch', function() {
    livereload.listen({
      port: config.yargs.port || 35729
    });

    gulp.watch(config.templates.files, ['templates'])
      .on('change', changed);

    gulp.watch(config.styles.files, ['styles'])
      .on('change', changed);

    gulp.watch(config.scripts.src_path + '/**', ['copy:scripts'])
      .on('change', changed);

    gulp.watch(config.scripts.src_path + '/**')
      .on('change', changed);
  });
};
