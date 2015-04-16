var zip = require('gulp-zip');

var replace = require('gulp-replace');

var gulpif = require('gulp-if');

var path = require('path');

var fs = require('fs');

var info = {
  name: 'aplication name',
  id: 'aplication_name',
  date: '15052015'
};

module.exports = function(gulp, config) {
  gulp.task('package', function() {
    if (config.yargs.tv_normal) {
      gulp.src([
          path.join(config.base_path, 'tv', 'normal', '**'),
          '!' + path.join(config.base_path, 'tv', 'normal', 'config.xml')
        ])
        .pipe(gulp.dest(config.build_path));

      gulp.src(path.join(config.base_path, 'tv', 'normal', 'config.xml'))
        .pipe(replace(/__app_name__/g, info.name))
        .pipe(replace(/__app_id__/g, info.id))
        .pipe(gulp.dest(config.build_path));

      var package_file_name = info.id + '_1.000_Others_' + info.date +  '.zip';

      gulp.src(path.join(config.build_path, '**'))
        .pipe(zip(package_file_name))
        .pipe(gulp.dest(path.join(config.base_path, 'build', 'Package')));

      setTimeout(function() {
        var stat = fs.statSync(
          path.join(config.base_path, 'build', 'Package', package_file_name)
        );

        gulp.src(path.join(config.base_path, 'tv', 'Package', 'widgetlist.xml'))
          .pipe(replace(/__app_name__/g, info.name))
          .pipe(replace(/__app_id__/g, info.id))
          .pipe(replace(/__app_size__/g, stat.size))
          .pipe(gulp.dest(path.join(config.base_path, 'build', 'Package')));
      }, 2000);
    }

    if (config.yargs.tv_tizen) {
      gulp.src([
          path.join(config.base_path, 'tv', 'tizen', '**'),
          '!' + path.join(config.base_path, 'tv', 'tizen', 'config.xml')
        ])
        .pipe(gulp.dest(config.build_path));

      gulp.src(path.join(config.base_path, 'tv', 'tizen', 'config.xml'))
        .pipe(replace(/__app_name__/g, info.name))
        .pipe(replace(/__app_id__/g, info.id))
        .pipe(gulp.dest(config.build_path));
    }
  });
};
