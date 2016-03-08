var browserSync = require('browser-sync');

module.exports = function(gulp, _, dir) {

    gulp.task('reload', function() {
        console.log('-----------------reload-----------------');
        browserSync.reload();
    });

    gulp.task('copy:file', ['compile:tmpl','copy:js', 'copy:html', 'copy:other', 'copy:png'], function() {
        console.log('copy:file');
    });
    gulp.task('copy:js', function() {
        console.log('js');
        var jsFilter = _.filter('**/*.js', {
            restore: true
        });
        return gulp.src(dir('build/**/*.js'))
            .pipe(_.plumber())
            // auto complete the angular's annotate
            /* jshint camelcase: false */
            .pipe(_.ngAnnotate({
                single_quotes: true
            }))
            .pipe(gulp.dest(dir('../')));
    });
    gulp.task('copy:html', function() {
        console.log('html');
        return gulp.src([dir('build/*.html'), dir('build/**/*.html')])
            .pipe(gulp.dest(dir('../')));
    });
    gulp.task('copy:png', function() {
        console.log('png');
        return gulp.src([dir('build/**/*.png')])
            .pipe(gulp.dest(dir('../')));
    });
    gulp.task('copy:other', function() {
        console.log('png');
        return gulp.src([dir('build/**/*.json'), dir('build/**/*.txt'), dir('build/**/*.md')])
            .pipe(gulp.dest(dir('../')));
    });


    gulp.task('watch', function() {
        // gulp.watch('!' + dir('../tool'), [dir('../**/*.js')], _.sync(gulp).sync(['reload']));
        gulp.watch(dir('build/**/*.js'), _.sync(gulp).sync(['copy:js', 'reload']));
        gulp.watch(dir('build/*.html'), _.sync(gulp).sync(['copy:html', 'reload']));
        gulp.watch(dir('build/**/*.html'), _.sync(gulp).sync(['copy:html', 'reload']));
        gulp.watch(dir('build/**/*.scss'), _.sync(gulp).sync(['sass', 'reload']));
        // gulp.watch(dir('build/**/*'), _.sync(gulp).sync(['reload']));
    });
};
