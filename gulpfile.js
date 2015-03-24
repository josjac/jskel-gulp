var gulp = require('gulp');

var fs = require('fs');

var path = require('path');

var merge = require('node.extend');

var project = {
  base_path: __dirname,
  build_path: path.join(__dirname, 'build'),
  src_path: path.join(__dirname, 'src'),
  yargs: require('yargs').argv
};

project.templates = {
  files: path.join(project.src_path, 'templates','**', '*.jade')
};

project.styles = {
  files: path.join(project.src_path, 'static', 'styles','*.styl'),
  build_path: path.join(project.build_path, 'static', 'styles')
};

project.sprites = {
  src_path: path.join(project.src_path, 'static', 'sprites'),
  build_path: path.join(project.build_path, 'static', 'sprites')
};

project.scripts = {
  src_path: path.join(project.src_path, 'static', 'scripts'),
  build_path: path.join(project.build_path, 'static', 'scripts'),
  files: path.join(project.src_path, 'static', 'scripts','*.js')
};

project.mailing = {
  files: path.join(project.build_path, 'mailing', '*.html')
};

require('./tasks/templates')(gulp, merge(false, project, project.templates));

require('./tasks/styles')(gulp, merge(false, project, project.styles));

require('./tasks/sprites')(gulp, merge(false, project, project.sprites));

require('./tasks/scripts')(gulp, merge(false, project, project.scripts));

require('./tasks/mailing')(gulp, merge(false, project, project.mailing));

require('./tasks/server')(gulp, project);

require('./tasks/copy')(gulp, project);

require('./tasks/watch')(gulp, project);
