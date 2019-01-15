const gulp = require('gulp');
// const babel = require('gulp-babel');
const del = require('del');
const ts = require('gulp-typescript');

const files = ['src/**/*.ts', '!src/**/*.spec.ts'];

gulp.task('default', ['clean'], () => {
  // return gulp
  //   .src(files)
  //   .pipe(babel())
  //   .pipe(gulp.dest('lib'));
  const tsProject = ts.createProject('tsconfig.json');
  return gulp
    .src(files)
    .pipe(tsProject())
    .pipe(gulp.dest('lib'));
});

gulp.task('clean', () => {
  return del('lib/');
});

gulp.task('clean-coverage', () => {
  return del('coverage/');
});
