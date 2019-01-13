const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

const files = ['src/**/*.ts', '!src/**/*.spec.ts'];

gulp.task('default', ['clean'], () => {
  return gulp
    .src(files)
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
  return del('dist/');
});

gulp.task('clean-coverage', () => {
  return del('coverage/');
});
