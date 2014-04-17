var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var browserify = require('gulp-browserify');
var minifyHTML = require('gulp-minify-html');
var rename = require("gulp-rename");


var paths = {
  scripts: {
    head:  ['js/head/*.js'],
    modules: ['js/modules/*.js']
  },
  less: {
    modules:['css/less/*.less'],
    compile: ['css/less/site.less']
  }
};

gulp.task('head.js', function() {
  // Create head file  
  return gulp.src(paths.scripts.head)
    .pipe(uglify())
    .pipe(concat('head.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('minify-html', function() {

  var opts = {quotes:true};

  gulp.src('index-dev.html')
    .pipe(minifyHTML(opts))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(''));
});

// gulp.task('site.js', function() {
//   // Create site.js
//   return gulp.src(paths.scripts.modules)
//     .pipe(uglify())
//     .pipe(concat('site.js'))
//     .pipe(gulp.dest('js'));
// });
// 
gulp.task('browserify', function(){

  return gulp.src('js/app/app.js')
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('js/'));

});



gulp.task('site.css', function(){

  return gulp.src(paths.less.compile)
    .pipe(less({
      sourceMap: true
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('css'));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(['css/less/*.less'], ['site.css']);
  gulp.watch(['js/head/*.js'], ['head.js']);
  gulp.watch(['js/modules/**/*.js'], ['browserify']);
  gulp.watch(['index-dev.html'], ['minify-html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['head.js', 'browserify', 'site.css', 'minify-html']);