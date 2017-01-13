const gulp = require('gulp')
    , CssDataURI = require('./dist/index.js');

console.log(CssDataURI);

gulp.task('default', [], function () {
    gulp.src(['css/*.css'])
        .pipe(CssDataURI())
        .pipe(gulp.dest('build'));
});
