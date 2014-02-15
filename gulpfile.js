var gulp             = require('gulp'),
    jshint           = require('gulp-jshint'),
    uglify           = require('gulp-uglify'),
    concat           = require('gulp-concat'),
    less             = require('gulp-less'),
    watch            = require('gulp-watch'),
    size             = require('gulp-size'),
    handlebars       = require('gulp-ember-handlebars'),
    header           = require('gulp-header'),
    clean            = require('gulp-clean'),
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
  dist: 'dist/',
  templates: 'templates/**/*.hbs',
  scripts: [
    'app/components/*.js'
  ],
  styles: 'graph.less'
};

gulp.task('templates', function() {
  gulp.src(['app/templates/**/*.hbs'])
    //.pipe(watch())
    .pipe(handlebars({
      outputType: 'browser',
      processName: function(path) {
        var files = path.split('/');
        if(files[0] == 'components' || files[0] == 'admin'){
          var fixpath = path.replace('.hbs', '');
        } else {
          var fixpath = path.replace(files[0]+'/', '').replace('.hbs', '');
        }
        return fixpath;
      }
     }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('clean', function() {
  return gulp.src('', {read: false})
    .pipe(clean(paths.dist));
});


gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    //.pipe(watch())
    .pipe(concat("app.js"))
    .pipe(size())
    .pipe(gulp.dest(paths.dist))
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(watch())
    .pipe(less())
    .pipe(size())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('default', function(callback) {
  runSequence('clean', 'templates', 'scripts', 'styles', callback);
});
