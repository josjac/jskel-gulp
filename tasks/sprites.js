var sprite = require('css-sprite').stream;

var gulpif = require('gulp-if');

var fs = require('fs');

var path = require('path');

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

module.exports = function(gulp, config) {

  gulp.task('sprites:icons', function() {
    getFolders(config.src_path).map(function(directory) {
      return gulp.src(path.join(config.src_path, directory,  '/*.png'))
        .pipe(sprite({
          name: directory,
          style: directory + '.styl',
          cssPath: '../sprites/',
          processor: 'stylus'
        }))
        .pipe(gulpif('*.png', gulp.dest(config.build_path), gulp.dest(config.src_path)));
    });
  });

  if (gulp.tasks.styles) {
    gulp.task('sprites', ['sprites:icons', 'styles']);
  }
};
