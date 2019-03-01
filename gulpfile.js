const gulp = require('gulp')
const watch = require('gulp-watch')

// CSS extension language
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// error handling
const plumber = require('gulp-plumber');

// server
const connectSSI = require('connect-ssi');
const bs = require('browser-sync').create();

const _browser = [
  'ie >= 11',
  'ios >= 10',
  'android >= 4.0'
];

gulp.task('sass', function () {
  return gulp.src('src/assets/css/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: _browser,
      cascade: false
    }))
    .pipe(gulp.dest('dist/assets/css/'))
    .pipe(bs.stream());
})



gulp.task('default', function () {

  watch(['src/assets/css/**/*.scss'], function () {
    gulp.start(['sass']);
  })

  gulp.watch("dist/**/*.html").on('change', bs.reload);

  bs.init({
    ui: false,
    port: 5400,
    notify: false,
    startPath: "/",
    server: {
      baseDir: 'dist',
      middleware: [
        connectSSI({
          baseDir: 'dist',
          ext: '.html'
        })
      ]
    },
    https: true
  })

})
