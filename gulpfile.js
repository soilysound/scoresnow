var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

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

gulp.task('site.js', function() {
  // Create site.js
  return gulp.src(paths.scripts.modules)
    .pipe(uglify())
    .pipe(concat('site.js'))
    .pipe(gulp.dest('js'));
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
  gulp.watch(['js/modules/*.js'], ['site.js']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('build', ['head.js', 'site.js', 'site.css']);