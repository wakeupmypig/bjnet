var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();
var fs = require('fs');
gulp.task('server',function(){
    $.connect.server({
        root:'./dist',
        port:8080,
        livereload:true
    });
});
gulp.task('copy-less', function () {
        return gulp.src('./app/**/*.less')
        .pipe($.less())
        .pipe($.concat('main.min.css'))
        .pipe(gulp.dest('./app/lib/less'))
        .pipe($.cssSpriter({
            'spriteSheet': './dist/lib/images/spritesheet.png',
            'pathToSpriteSheetFromCSS': '../images/spritesheet.png'
        }))
        .pipe($.minifyCss())
        .pipe(gulp.dest('dist/lib/css'))
        .pipe($.connect.reload());
});
gulp.task('copy-html', function () {
    gulp.src('app/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe($.connect.reload());
});
gulp.task('copy-js', function () {
    gulp.src('app/lib/public/*.js')
        .pipe($.uglify())
        .pipe(gulp.dest('./dist'));
    gulp.src('app/lib/js/*.js')
        .pipe($.concat('main.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('./dist'))
});
gulp.task('copy-images', function () {
    return gulp.src('app/**/*.{jpg,png}')
        .pipe($.imagemin())
        .pipe(gulp.dest('./dist'))
        .pipe($.connect.reload());
});
gulp.task('watch',function(){
    gulp.watch('app/**/*.html',['copy-html']);
    gulp.watch('app/**/*.less',['copy-less']);
    gulp.watch('app/**/*..{jpg,png}',['copy-images']);
    gulp.watch('app/**/*.js',['copy-js']);
});
gulp.task('default',['copy-images','copy-less','copy-html','copy-js','server','watch']);





