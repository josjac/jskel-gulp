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

require('./tasks/templates')(gulp, merge(false, project, {
  files: project.src_path + '/templates/**/*.jade'
}));

require('./tasks/styles')(gulp, merge(false, project, {
  files: project.src_path + '/static/styles/*.styl'
}));
