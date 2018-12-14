var gulp = require('gulp'),
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
  src : './src/styles/styles.scss',
  watch : './src/styles/**/*',
  build : './dist/assets/styles/',
  sassOpts: {
    outputStyle : 'compressed',
    imagePath : './dist/assets/images/',
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
    .pipe(sourcemaps.write('./dist/assets/styles/')) // Write a sourcemap
    .pipe(gulp.dest('./dist/assets/styles/'))       // Save to the dist directory
    .pipe(gulp.dest(css.build))
    .pipe(browserSync.stream());
}));
