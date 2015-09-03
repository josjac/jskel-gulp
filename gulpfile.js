var gulp = require('gulp');

var fs = require('fs');

var path = require('path');

var merge = require('node.extend');

var project = {
  base_path: __dirname,
  build_path: path.join(__dirname, 'build', 'web'),
  src_path: path.join(__dirname, 'src'),
  yargs: require('yargs').argv,
  host: '',
  static_path: 'static/',
  livereload_url: '',
  
  getFile: function(uri) {
    return fs.readFileSync(uri, {
      encoding: 'utf-8'
    });
  },

  getJSON: function(uri) {
    var str = this.getFile(uri);
    if (str) {
      return JSON.parse(str);
    }

    return {};
  }
};


if (!project.yargs.prod) {
  project.host = '192.168.1.125';
  
  project.port = ':8000';
  
  project.livereload_url = [
    'http://', project.host, ':35729/livereload.js?ext=Chrome&extver=2.1.0'
  ].join('');

  project.static_path = [
    'http://', project.host, project.port, '/static/'
  ].join('');
}

if (project.yargs.tv_normal) {
  project.build_path = path.join(__dirname, 'build', 'normal');
}

else if (project.yargs.tv_tizen) {
  project.build_path = path.join(__dirname, 'build', 'tizen');
}

else if (project.yargs.prod) {
  project.build_path = path.join(__dirname, 'build', 'webprod');
}

project.templates = {
  files: [
    '!' + path.join(project.src_path, 'templates','client', '**'),
    path.join(project.src_path, 'templates','**', '*.jade')
  ],
  clients: path.join(project.src_path, 'templates', 'client', '*.jade'),
  clients_build_path: path.join(project.src_path, 'static', 'scripts', 'templates')
};

project.styles = {
  files: path.join(project.src_path, 'static', 'styles','**', '*.styl'),
  build_path: path.join(project.build_path, 'static', 'styles')
};

project.sprites = {
  src_path: path.join(project.src_path, 'static', 'sprites'),
  build_path: path.join(project.build_path, 'static', 'sprites')
};

project.scripts = {
  static_path: path.join(project.src_path, 'static'),
  src_path: path.join(project.src_path, 'static', 'scripts'),
  build_path: path.join(project.build_path, 'static', 'scripts'),
  files: path.join(project.src_path, 'static', 'scripts','*.js')
};

project.mailing = {
  files: path.join(project.build_path, 'mailing', '*.html')
};

try {
  var local_settings = require('./local_settings.js')(project);
  project = merge(false, project, local_settings);
} catch(e) {}

require('./tasks/templates')(gulp, merge(false, project, project.templates));

require('./tasks/styles')(gulp, merge(false, project, project.styles));

require('./tasks/sprites')(gulp, merge(false, project, project.sprites));

require('./tasks/scripts')(gulp, merge(false, project, project.scripts));

require('./tasks/mailing')(gulp, merge(false, project, project.mailing));

require('./tasks/server')(gulp, project);

require('./tasks/copy')(gulp, project);

require('./tasks/watch')(gulp, project);

require('./tasks/package')(gulp, project);

if (project.yargs.prod) {
  gulp.task('deploy', ['templates', 'sprites', 'copy:compile'], function() {
    gulp.start('scripts');
  });
}
else {
  gulp.task('deploy', ['templates', 'sprites', 'copy']);
}
