// Gulp.js configuration
'use strict';

const

  // source and build folders
  dir = {
    src         : 'src/',
    build       : 'dist/'
  },

  // Gulp and plugins
  gulp          = require('gulp'),
  gutil         = require('gulp-util'),
  newer         = require('gulp-newer'),
  imagemin      = require('gulp-imagemin'),
  sass          = require('gulp-sass'),
  postcss       = require('gulp-postcss'),
  deporder      = require('gulp-deporder'),
  concat        = require('gulp-concat'),
  stripdebug    = require('gulp-strip-debug'),
  uglify        = require('gulp-uglify'),
  browserSync   = require('browser-sync').create();
;


//
// BrowserSync (live reload) - keeps multiple browsers & devices in sync when building websites
//
//
gulp.task('serve', function() {
  console.log('servvvving');
  browserSync.init({
    files: "./src/**/**",
    startPath: "./",
    server: {
      baseDir: "./",
    },
  })
});


// PHP settings
const php = {
  src           : dir.src + 'templates/**/*.php',
  build         : dir.build
};


// copy PHP files
gulp.task('php', function() {
  return gulp.src(php.src)
    .pipe(newer(php.build))
    .pipe(gulp.dest(php.build));
});


// image settings
const images = {
  src         : dir.src + 'images/**/*',
  build       : dir.build + 'assets/images/'
};

// image processing
gulp.task('images', function() {
  return gulp.src(images.src)
    .pipe(newer(images.build))
    .pipe(imagemin())
    .pipe(gulp.dest(images.build));
});



// CSS settings
var css = {
  src         : dir.src + 'styles/styles.scss',
  watch       : dir.src + 'styles/**/*',
  build       : dir.build + 'assets/styles/',
  sassOpts: {
    outputStyle     : 'nested',
    imagePath       : images.build,
    precision       : 3,
    errLogToConsole : true
  },
  processors: [
    require('postcss-assets')({
      loadPaths: ['images/'],
      basePath: dir.build,
      baseUrl: '/'
    }),
    require('autoprefixer')({
      browsers: ['last 2 versions', '> 2%']
    }),
    require('css-mqpacker'),
    require('cssnano')
  ]
};

// CSS processing
gulp.task('styles', gulp.series(gulp.parallel('images'), function () {

  return gulp.src(css.src)
    .pipe(sass(css.sassOpts))
    .pipe(postcss(css.processors))
    .pipe(gulp.dest(css.build))
    .pipe(browserSync.stream());
}));


// JavaScript settings
const js = {
  src         : dir.src + 'scripts/**/*',
  build       : dir.build + 'assets/scripts/',
  filename    : 'scripts.js'
};

// JavaScript processing
gulp.task('scripts', function() {

  return gulp.src(js.src)
    .pipe(deporder())
    .pipe(concat(js.filename))
    .pipe(stripdebug())
    .pipe(uglify())
    .pipe(gulp.dest(js.build))
});

var del = require('del');

gulp.task('deleteDistFolder', function () {
  return del([
    'dist'
  ]);
});

// run all tasks
gulp.task('build', gulp.series(('deleteDistFolder'), gulp.parallel('php', 'styles', 'scripts')));


gulp.task('watch', function() {

  gulp.watch(php.src, gulp.series('php')).on('change', browserSync.reload);

  // image changes
  gulp.watch(images.src,  gulp.series('images'));

  // CSS changes
  gulp.watch(css.watch,  gulp.series('styles'));

  // JavaScript main changes
  gulp.watch(js.src,  gulp.series('scripts'));

});

// default task
gulp.task('default', gulp.series(('watch','build','serve')));
