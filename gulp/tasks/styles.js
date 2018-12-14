var gulp = require('gulp'),
    cons = require('../constants.js'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    postCss = require('gulp-postcss'),
    postCssImport = require('postcss-import'),
    cssnano = require('cssnano'),
    browserSync = require('browser-sync').create();

// CSS settings
var css = {
  src : cons.src + '/styles/styles.scss',
  watch : cons.src + '/styles/**/*',
  build : cons.dist + '/assets/styles/',
  sassOpts: {
    outputStyle : 'compressed',
    imagePath : cons.dist + '/assets/images/',
    precision : 3,
    errLogToConsole : true
  }
};

// CSS processing
gulp.task('styles', gulp.series(function () {

  return gulp.src(css.src)
    .pipe(sass(css.sassOpts)
      .on('error', function(error) {            // Error reporting that won't stop your watch task
        gutil.log(error.message);
      this.emit('end');
    }))
    .pipe(postCss([postCssImport,cssnano()]))
    .pipe(autoprefixer('last 2 versions'))            // Autoprefix for the latest 2 browsers
//    .pipe(rename('layout.css'))                   // Rename our file
    .pipe(sourcemaps.write(cons.dist + '/assets/styles/')) // Write a sourcemap
    .pipe(gulp.dest(cons.dist + '/assets/styles/'))       // Save to the dist directory
    .pipe(gulp.dest(css.build))
    .pipe(browserSync.stream());
}));
