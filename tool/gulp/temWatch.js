var browserSync = require('browser-sync');

module.exports = function(gulp, _, dir) {

    gulp.task('reload', function() {
        console.log('-----------------reload-----------------');
        browserSync.reload();
    });
    gulp.task('l:sass', function() {
        console.log('build scss');
        return gulp.src(dir('../L/**/*.scss'))
            .pipe(_.plumber())

        // use sourcemaps to help developer to debug.
        // .pipe(sourcemaps.init())

        // compile the sass file to css file.
        .pipe(_.sass({ outputStyle: 'expanded' }))

        // add vendor prefixes to the css file
        .pipe(_.autoprefixer({ browsers: ['chrome > 35', 'ff > 10', 'opera > 10', 'ie > 6'] }))

        // .pipe(sourcemaps.write('./', {
        //     sourceMappingURL: function (file) {
        //         return '/styles/' + file.relative + '.map';
        //     }
        // }))

        .pipe(gulp.dest(dir('../L')));
    });
    gulp.task('L', ['s'], function() {
        // gulp.watch('!' + dir('../tool'), [dir('../**/*.js')], _.sync(gulp).sync(['reload']));
        gulp.watch(dir('../L/**/*.js'), _.sync(gulp).sync(['reload']));
        gulp.watch(dir('../L/*.html'), _.sync(gulp).sync(['reload']));
        gulp.watch(dir('../L/**/*.html'), _.sync(gulp).sync(['reload']));
        gulp.watch(dir('../L/**/*.scss'), _.sync(gulp).sync(['l:sass', 'reload']));
        gulp.watch(dir('../L/**/*.*'), _.sync(gulp).sync(['reload']));
    });
    gulp.task('s', _.sync(gulp).sync([
        'l:sass'
    ]), function() {
        console.log('serve:hello world');
        browserSync.init({
            server: {
                // routes: {
                //     '/bower_components': 'bower_components'
                // },
                baseDir: '../L'
            },
            // proxy: {
            //     target: 'http://localhost:8080',
            //     reqHeaders: function (config) {
            //         return {
            //             agent: false
            //         };
            //     }
            // }, 
            ghostMode: false,
            port: 1238,
            ui: {
                port: 4399
            },
            open: false
        });
    });
};
