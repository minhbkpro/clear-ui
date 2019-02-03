let gulp = require('gulp');
let sass = require('gulp-sass');
let rename = require("gulp-rename");
let shell = require('gulp-shell');
let browserSync = require('browser-sync').create();
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let autoprefixer = require('gulp-autoprefixer');

// sass build task
gulp.task('sass-build', function() {
  gulp.src('sass/clear-ui.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
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
    .pipe(gulp.dest('dist/js'));

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