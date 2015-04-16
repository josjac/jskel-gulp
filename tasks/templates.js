var jade = require('gulp-jade');

var fs = require('fs');

var path = require('path');

var gulpif = require('gulp-if');

var handler = {
  env: '',

  STATIC_PATH: '/static/',

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

  getFile: function(uri) {
    return fs.readFileSync(uri, {
      encoding: 'utf-8'
    });
  },

  relative: function() {
    return path.relative(path.dirname(this.FILE_DEST), this.DEST);
  },

  getJSON: function(uri) {
    var str = this.getFile(uri);
    if (str) {
      return JSON.parse(str);
    }

    return {};
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

    gulp.src(config.files)
      .pipe(jade({
        locals: {
          handler: handler
        },
        pretty: (config.yargs.prod) ? false : true
      }))
      .pipe(gulpif(condition, gulp.dest(config.build_path)));
  });

};
