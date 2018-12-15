var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// sass build task
gulp.task('sass-build', function() {
  gulp.src('sass/clear-ui.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest('docs/dist/css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('clear-ui.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest('docs/dist/css'));
});

// jekyll task
gulp.task('jekyll', shell.task(['cd docs;jekyll build --watch']));

// browserSync task
gulp.task('browserSync', function () {
  browserSync.init({
    server: {baseDir: 'docs/_site'},
    reloadDebounce: 500
  });

  // Reloads page when some of the already built files changed:
  gulp.watch('docs/_site/**/*.*').on('change', browserSync.reload);
});

// javascript task
gulp.task('minify-js', function() {
  gulp.src('js/*.js')
    .pipe(concat('clear-ui.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))

  gulp.src([
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'js/*.js'
  ])
    .pipe(concat('clear-ui.min.js'))
    .pipe(gulp.dest('docs/dist/js'));
});

// sass watch task
gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', ['sass-build']);
  gulp.watch('js/**/*.js', ['minify-js']);
});

// run
gulp.task('default', ['sass-build', 'minify-js', 'watch', 'jekyll', 'browserSync']);