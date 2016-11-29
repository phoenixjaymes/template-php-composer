/* 
 * File   : gulpfile.js
 * Date   : 13 Sep 16
 * Author : Jaymes Young-Liebgott
 */

"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
    maps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
     del = require('del'),
      uglifyCss = require('gulp-uglifyCss'),
    browserSync = require('browser-sync').create();


// Concatenate JS Files
gulp.task('concatScripts', function() {
  return gulp.src(['assets/js/jquery-2.2.3.min.js', 'assets/js/scripts.js'])
      .pipe(maps.init())
      .pipe(concat('app.js'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('assets/js'));
});


// Concatenate JS files for watching with browserSync
gulp.task('watchJs', ['concatScripts'], function(done) {
  browserSync.reload();
  done();
});


// Minify JS scripts
gulp.task('minifyScripts', ['concatScripts'], function() {
  return gulp.src('assets/js/app.js')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('assets/js'));
});


// Compile Sass
gulp.task('compileSass', function() {
  return gulp.src('assets/scss/styles.scss')
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('assets/css'));
});

// Complie Sass files for watching with browserSync
gulp.task('watchSass', ['compileSass'], function() {
  return gulp.src('assets/css/styles.css')
      .pipe(browserSync.stream());
});


// Minify Styles
gulp.task('minifyStyles', ['compileSass'], function() {
  return gulp.src('assets/css/styles.css')
      .pipe(uglifyCss())
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest('assets/css'));
});


// Start server and watch files
gulp.task('serve', function() {
  browserSync.init({
    proxy : 'http://localhost/?/'
  });
  
  gulp.watch('assets/scss/**/*.scss', ['watchSass']);
  gulp.watch('assets/js/scripts.js', ['watchJs']);
});


// Clean up files
gulp.task('clean', function() {
  del(['dist', 'assets/css/styles*.css*', 'assets/js/app*.js*']);
});


// Build
gulp.task('build', ['minifyScripts', 'minifyStyles'], function() {
  return gulp.src([
    'index.php',
    'assets/css/styles.min.css',
    'assets/img/**',
    'assets/js/app.min.js',
    'vendor/**',
    'views/**'
  ], {base : './'})
        .pipe(gulp.dest('dist'));
});


// Default task
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
