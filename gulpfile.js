var gulp = require('gulp');
var merge = require('merge2');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

gulp.task('lint', function() {
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report("verbose"));
});

gulp.task('build', function() {
  var tsProject = ts.createProject('tsconfig.json');
  var tsResult = gulp.src(["typings/index.d.ts", "src/**/*.ts"])
    .pipe(ts(tsProject));

  return merge([
    tsResult.dts.pipe(gulp.dest('dist')),
    tsResult.js.pipe(gulp.dest('dist'))
  ]);
});
