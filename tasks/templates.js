var jade = require('gulp-jade');

var lodash_template = require('gulp-template');

var amd_wrap = require('gulp-wrap-amd');

var rename = require('gulp-rename');

var path = require('path');

var gulpif = require('gulp-if');

var handler = {
  env: '',

  STATIC_PATH: '',

  FILE_DEST: '',

  DEST: '',

  static_url: function(uri, path) {
    var r = '';

    if (path) {
      return path + uri;
    }

    if (this.env === 'jinja') {
      return "{{ handler.static_url('" + uri + "') }}";
    } else {
      r = this.relative();

      if (r !== '') {
        r += '/';
      }

      return r + this.STATIC_PATH + uri;
    }
  },

  reverse_url: function(uri) {
    var r = '';

    r = this.relative();

    if (r !== '') {
      r += '/';
    }

    return r + uri;
  },

  relative: function() {
    return path.relative(path.dirname(this.FILE_DEST), this.DEST);
  }
};

function condition(file) {
  if (file.relative.indexOf('/_') !== -1 || file.relative.indexOf('_') === 0) {
    return false;
  } else {
    return true;
  }
}

module.exports = function(gulp, config) {

  gulp.task('templates', function() {
    handler.argv = config.yargs;
    handler.config = config;
    handler.STATIC_PATH = config.static_path;
    handler.getFile = config.getFile;
    handler.getJSON = config.getJSON;

    gulp.src(config.files)
      .pipe(jade({
        locals: {
          handler: handler
        },
        pretty: (config.yargs.prod) ? false : true
      }))
      .pipe(gulpif(condition, gulp.dest(config.build_path)));

    // ---------------------------------------------------------
    // del lado del client
    // ---------------------------------------------------------
    gulp.src(config.clients)
      .pipe(jade({
        locals: {
          handler: handler
        }
      }))
      .pipe(lodash_template.precompile())
      .pipe(amd_wrap())
      .pipe(rename({
        extname: '.js'
      }))
      .pipe(gulpif(condition, gulp.dest(config.clients_build_path)));
  });

};
