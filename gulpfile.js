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
  dist: 'dist',
  templates: 'templates/**/*.hbs',
  scripts: [
    'mixins/*.js',
    'components/*.js'
  ],
  styles: 'style.less'
};

var appPaths = {
  dist: 'example-app/dist',
  templates: 'example-app/templates/*.hbs',
  scripts: [
    'example-app/controllers/*.js',
    'example-app/router.js'
  ],
  styles: 'example-app/styles/app.less'
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
    .pipe(gulp.dest(paths.dist));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    //.pipe(watch())
    .pipe(concat("components.js"))
    .pipe(gulp.dest(paths.dist))
});

gulp.task('release', function() {
  return gulp.src([
      'dist/components.js',
      'dist/templates.js'
    ])
    .pipe(concat("ember-dc.js"))
    .pipe(gulp.dest(paths.dist))
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(less())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest(paths.dist));
});

// Example App
gulp.task('app-templates', function() {
  gulp.src([appPaths.templates])
    .pipe(handlebars({
      outputType: 'browser',
      processName: function(path) {
        return path.replace('.hbs', '');
      }
     }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(appPaths.dist));
});

gulp.task('app-scripts', function() {
  return gulp.src(appPaths.scripts)
    .pipe(concat("app.js"))
    .pipe(gulp.dest(appPaths.dist))
});

gulp.task('app-styles', function() {
  return gulp.src(appPaths.styles)
    .pipe(less())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest(appPaths.dist));
});


gulp.task('default', function(callback) {
  runSequence('templates', 'scripts', 'release', 'styles', callback);
});

gulp.task('example-app', function(callback) {
  runSequence('app-templates', 'app-scripts', 'app-styles', callback);
});