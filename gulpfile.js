const gulp = require('gulp')
    , CssDataURI = require('./index');

gulp.task('default', [], function () {
    gulp.src(['css/*.css'])
        .pipe(CssDataURI())
        .pipe(gulp.dest('build'));
});
