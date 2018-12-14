var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

gulp.task('watch', function() {

  browserSync.init({
      injectChanges: true,
      notify: false,
      port: 8080,
  		proxy: 'http://local.theme.com/', // MAMP vhost
  		reloadOnRestart: true,
  });

  // Image changes
  gulp.watch('./src/images/**/*',  gulp.series('images'), function () {
    browserSync.reload();
  });

  // PHP file changes
  gulp.watch('./src/templates/**/*', gulp.series('php','phpInject'), function() {
    //browserSync.reload();
  });

  // CSS changes
  gulp.watch('./src/styles/**/*',  gulp.series('styles','cssInject'), function () {

  });

  // JavaScript main changes
  gulp.watch('./src/scripts/**/*',  gulp.series('scripts','jsInject'), function () {
    //browserSync.reload();
  });
});

gulp.task('phpInject', function() {
    return gulp.src('./dist/**/*')
      .pipe(browserSync.stream());
});

gulp.task('cssInject', function() {
    return gulp.src('./dist/assets/styles/styles.css')
      .pipe(browserSync.stream());
});

gulp.task('jsInject', function() {
    return gulp.src('./dist/assets/scripts/app.bundle.js')
      .pipe(browserSync.stream());
});
