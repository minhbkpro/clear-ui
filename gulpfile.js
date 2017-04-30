var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

// sass build task
gulp.task('sass-build', function() {
  gulp.src('sass/clear-ui.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('docs/dist'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('clear-ui.min.css'))
    .pipe(gulp.dest('dist'));
});

// sass watch task
gulp.task('sass-watch', function() {
  gulp.watch('sass/**/*.scss', ['sass-build']);
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

// run
gulp.task('default', ['sass-build', 'sass-watch', 'jekyll', 'browserSync']);