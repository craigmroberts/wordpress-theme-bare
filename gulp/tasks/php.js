var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    newer = require('gulp-newer');

// PHP settings
var php = {
  src : './src/templates/**/*',
  build : './dist/'
};

// copy PHP files
gulp.task('php', function() {
  return gulp.src(php.src)
    .pipe(newer(php.build))
    .pipe(gulp.dest(php.build));
});
