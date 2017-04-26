var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");

// sass task
gulp.task('sass', function() {
  gulp.src('sass/clear-ui.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('docs/dist'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('clear-ui.min.css'))
    .pipe(gulp.dest('dist'));
});

// run
gulp.task('default', ['sass'], function() {
  gulp.watch('sass/**/*.scss', ['sass']);
});