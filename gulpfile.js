var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');


var paths = {
  sass: ['./scss/**/*.scss'],
  javascript: ['./www/js/**/*.js'],
  css: ['./www/css/**/*.css', '!/www/css/']
};

gulp.task('default', ['sass','index','bower']);

gulp.task('sass', function(done) {
  gulp.src('./scss/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

// add bower components to index (in the order listed in bower.json dependencies)
gulp.task('bower', function () {
  console.log("Running bower task.  Adds bower components to index in the order listed in bower.json dependencies...")
  gulp.src('./www/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./www'));
});


// add first party js and css to index
gulp.task('index', function(){
  console.log("Running index task.  Adds /www/js/**/*.js and www/css/**/*.css to index...")
  return gulp.src('./www/index.html')
    .pipe(inject(
      gulp.src(paths.javascript,
        {read: false}), {relative: true}))
    .pipe(inject(
      gulp.src(paths.css,
        {read: false}), {relative: true}))
    .pipe(gulp.dest('./www'));
});
