var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    copy = require('gulp-copy'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
    htmlMin = require('gulp-minify-html'),
    sprite = require('css-sprite').stream,
    livereload = require('gulp-livereload'),
    inlineCss = require('gulp-mc-inline-css'),
    concat = require('gulp-concat'),
    requirejs = require('requirejs'),
    serveStatic = require('serve-static'),
    connect = require('connect'),
    yargs = require('yargs').argv,
    path = require('path');

var config = require('./config.js');
config.argv = yargs;

var settings = {
  src: './src',
  dist: './dist',
  add: add
};

function add(name, config) {
  var root = this;

  var self = root[name] = {};

  var i = 0;

  var item = '';

  self.src = config.src;

  self.dist = config.dist || config.src;

  self.tree = [];

  for (item in config) {
    if (item !== 'tree' && item.indexOf('tree') !== -1 && typeof config[item] === 'object') {
      self[item] = [];
      i = 0;
      for (; i < config[item].length; ++i) {
        self[item].push(
          ((item === 'invalid_tree')? '!' : '') +
          self.src + config[item][i]
        );
      }

      self.tree = self.tree.concat(self[item]);
    }

    else if (item !== 'src' && item !== 'dist' && item !== 'tree') {
      self[item] = config[item];
    }
  }
}

function spriteConfigure(name) {
  gulp.src(settings.sprites.src + '/' + name +'/*.png')
  .pipe(sprite({
    name: name,
    style: name + '.styl',
    cssPath: '../sprites',
    processor: 'stylus'
  }))
  .pipe(gulpif('*.png', gulp.dest(settings.sprites.dist), gulp.dest(settings.styles.src)));
}


// ------------------------------------------------------------------------
// config templates
// ------------------------------------------------------------------------
settings.add('templates', {
  src: './src/templates',
  dist: '../templates',
  valid_tree: [ '/*.jade', '/**/*.jade' ],
  invalid_tree: [ '/_*.jade', '/**/_*.jade', '/_**/*.jade' ],
  options: {
    locals: { handler: config, settings: settings },
    pretty: (yargs.prod)? false : true
  }
});


// ------------------------------------------------------------------------
// config sprites
// ------------------------------------------------------------------------
settings.add('sprites', {
  src: './src/static/sprites',
  dist: '../static/sprites',
  valid_tree: ['core']
});

// ------------------------------------------------------------------------
// config styles
// ------------------------------------------------------------------------
settings.add('styles', {
  src: './src/static/styles',
  dist: '../static/styles',
  valid_tree: [ '/*.styl', '/**/*.styl' ],
  invalid_tree: [ '/modules/*.styl', '/_**/*.styl' ]
});

// ------------------------------------------------------------------------
// config scripts
// ------------------------------------------------------------------------
settings.add('scripts', {
  src: './src/static/scripts',
  dist: '../static/scripts',
  compile_tree: ['/*.js'],
  valid_tree: [ '/*.js', '/modules/*.js', '/configs/*.js' ],
  invalid_tree: []
});


// ------------------------------------------------------------------------
// Templates task
// ------------------------------------------------------------------------
gulp.task('templates', function() {
  gulp.src(settings.templates.tree)
  .pipe(jade(settings.templates.options))
  .pipe(gulp.dest(settings.templates.dist));
});

// ------------------------------------------------------------------------
// Styles task
// ------------------------------------------------------------------------
gulp.task('styles', function() {
  var opt = {
    use: nib(),
    compress: true
  };

  var tree = settings.styles.valid_tree;

  function condition(file) {
    if (file.relative.indexOf('/_') !== -1 || file.relative.indexOf('_') === 0) {
      return false;
    }

    else {
      return true;
    }
  }

  if (yargs.prod) {
    tree = settings.styles.tree;
  }

  gulp.src(tree)
  .pipe(gulpif(condition, stylus(opt)))
  .pipe(gulpif(condition, csso()))
  .pipe(gulpif(condition, gulp.dest(settings.styles.dist)));
});

// ------------------------------------------------------------------------
// sprites task
// ------------------------------------------------------------------------
gulp.task('sprites', function() { 
  var item = '';

  for (item in settings.sprites.valid_tree) {
    spriteConfigure(item);
  }
});

gulp.task('sprites_build', ['sprites', 'styles']);

// ------------------------------------------------------------------------
// inlinecss
// ------------------------------------------------------------------------
gulp.task('mailing', function() {
  gulp.src('./dist/mailing/*.html')
  .pipe(inlineCss(config.MC_API_KEY))
  .pipe(gulpif(yargs.prod, htmlMin()))
  .pipe(gulp.dest('./dist/mailing'));
});

// ------------------------------------------------------------------------
// Server task
// ------------------------------------------------------------------------
gulp.task('server', function() {
  var port = 8000;
  var host = '0.0.0.0';

  var app = connect();

  app.use('/static/scripts', serveStatic(path.resolve(settings.scripts.src)));
  app.use('/', serveStatic(path.resolve(settings.dist)));

  app.listen(port, host);
});


// ------------------------------------------------------------------------
// Todo a copiar
// ------------------------------------------------------------------------
gulp.task('copy', function() {
  gulp.src('./src/static/scripts/**')
  .pipe(gulp.dest(settings.scripts.dist));
});

// ------------------------------------------------------------------------
// Requirejs
// ------------------------------------------------------------------------
gulp.task('requirejs', function() {
  requirejs.optimize({
    baseUrl: './src/static/scripts/',
    mainConfigFile: './src/static/scripts/configs/require.js',
    preserveLicenseComments: false,
    wrap: true,
    name: 'libs/almond/almond',
    include: [ 'main' ],
    insertRequire: [ 'main' ],
    out: settings.scripts.dist + '/main.js'
  });
});

// ------------------------------------------------------------------------
// Clean
// ------------------------------------------------------------------------
gulp.task('clean', function() {
  gulp.src([
    settings.scripts.dist + '/configs',
    settings.scripts.dist + '/libs',
    settings.scripts.dist + '/modules',
    settings.styles.dist + '/_*'
  ])
  .pipe(clean({ force: true, read: false }));
});

// ------------------------------------------------------------------------
// watch
// ------------------------------------------------------------------------
gulp.task('watch', function() {
  livereload.listen();

  gulp.watch(settings.templates.valid_tree, ['templates'])
    .on('change', livereload.changed);

  gulp.watch(settings.styles.valid_tree, ['styles'])
    .on('change', livereload.changed);

  gulp.watch(settings.scripts.valid_tree, ['copy'])
    .on('change', livereload.changed);
});


// ------------------------------------------------------------------------
// default
// ------------------------------------------------------------------------
gulp.task('default', ['templates', 'styles', 'copy']);

gulp.task('deploy', ['templates', 'styles', 'requirejs']);
