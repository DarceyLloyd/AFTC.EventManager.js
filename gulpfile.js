var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var jsFIles = [
    './node_modules/aftc.js/src/debug.js',
    './node_modules/aftc.js/src/debug.js',
    './node_modules/aftc.js/src/debug.js',
    './src/AFTC.EventManager.js'
];

gulp.task('build', function () {
    gulp.src(jsFIles)
        .pipe(concat('aftc.eventmanager.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    gulp.watch(jsFIles, ['build']);
});