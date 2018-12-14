var gulp = require('gulp'),
    del = require('del');

gulp.task('deleteDistFolder', function () {
  return del([
    'dist'
  ]);
});
