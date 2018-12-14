var gulp = require('gulp');

// image settings
var fonts = {
  src : './node_modules/@fortawesome/fontawesome-free/webfonts/**/*',
  build : './dist/assets/webfonts/'
};

// Copy fonts folder to destination
gulp.task('fonts', function() {
  return gulp.src(fonts.src)
    .pipe(gulp.dest(fonts.build));
});
