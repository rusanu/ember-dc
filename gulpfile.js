var gulp             = require('gulp'),
    jshint           = require('gulp-jshint'),
    concat           = require('gulp-concat'),
    less             = require('gulp-less'),
    watch            = require('gulp-watch'),
    handlebars       = require('gulp-ember-handlebars'),
    header           = require('gulp-header'),
    runSequence      = require('run-sequence'),
    pkg              = require('./package.json');

var banner = [
'// ==========================================================================',
'// Project:   Ember DC Components',
'// Copyright: © 2014 Andrew Reedy',
'// License:   MIT (see LICENSE)',
'// ==========================================================================\n',
].join('\n');

var paths = {
  dist: '',
  templates: 'templates/**/*.hbs',
  scripts: [
    'src/mixins/*.js',
    'src/components/*.js'
  ],
  styles: 'src/ember-dc.less'
};

// Ember DC
gulp.task('templates', function() {
  gulp.src([paths.templates])
    .pipe(handlebars({
      outputType: 'browser',
      processName: function(path) {
        return ('components/' + path ).replace('.hbs', '');
      }
     }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('tmp'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    //.pipe(watch())
    .pipe(concat("components.js"))
    .pipe(gulp.dest('tmp'))
});

gulp.task('release', function() {
  return gulp.src([
      'tmp/components.js',
      'tmp/templates.js'
    ])
    .pipe(concat("ember-dc.js"))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(less())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('default', function(callback) {
  runSequence('templates', 'scripts', 'release', 'styles', callback);
});