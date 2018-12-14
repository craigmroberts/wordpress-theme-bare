var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer');

// image settings
const images = {
  src : './src/images/**/*',
  build : './dist/assets/images/'
};

// image processing
gulp.task('images', function() {
  return gulp.src(images.src)
    .pipe(newer(images.build))
    .pipe(imagemin())
    .pipe(gulp.dest(images.build));
});
