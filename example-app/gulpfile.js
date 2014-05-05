var gulp             = require('gulp'),
    jshint           = require('gulp-jshint'),
    concat           = require('gulp-concat'),
    less             = require('gulp-less'),
    watch            = require('gulp-watch'),
    handlebars       = require('gulp-ember-handlebars'),
    runSequence      = require('run-sequence'),
    pkg              = require('./package.json'),
    gulpBowerFiles = require('gulp-bower-files');


var appPaths = {
  dist: 'dist',
  templates: 'templates/*.hbs',
  scripts: [
    'controllers/*.js',
    'router.js'
  ],
  styles: 'styles/app.less'
};

// Example App

gulp.task("app-dependencies", function(){
    gulpBowerFiles().pipe(gulp.dest("./vendor"));
});

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
    .pipe(gulp.dest(appPaths.dist));
});

gulp.task('default', function(callback) {
  runSequence('app-dependencies', 'app-templates', 'app-scripts', 'app-styles', callback);
});