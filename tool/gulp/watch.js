var browserSync = require('browser-sync');
var htmlmin = require('html-minifier').minify;
var Transform = require('readable-stream/transform');
var fs = require('fs');
module.exports = function(gulp, _, dir) {
    //build directive html
    function replaceTmpl() {
        return new Transform({
            objectMode: true,
            transform: function(file, enc, callback) {
                if (file.isNull()) {
                    return callback(null, file);
                }
                var content = String(file.contents);
                var n = content.replace(/templateUrl\s*?:\s*?["|'](.*?)["|']/igm, function(match, url) {
                    var c = fs.readFileSync(dir('../' + url), 'utf8');
                    var min = htmlmin(c, { collapseWhitespace: true, removeComments: true, minifyJS: true, minifyCSS: true }).replace(/'/g, "\\'");
                    return 'template:\'' + min + '\'';
                });
                file.contents = new Buffer(n);

                callback(null, file);
            }
        });
    }
    gulp.task('reload', function() {
        console.log('-----------------reload-----------------');
        browserSync.reload();
    });

    gulp.task('copy:js', function() {
        console.log('js');
        var jsFilter = _.filter('**/*.js', {
            restore: true
        });
        return gulp.src(dir('build/**/*.js'))
            .pipe(_.plumber())
            //build directive html to js
            .pipe(replaceTmpl())
            // auto complete the angular's annotate
            /* jshint camelcase: false */
            .pipe(_.ngAnnotate({
                single_quotes: true
            }))
            // .pipe(_.if('*demo*', _.ngAnnotate({
            //     single_quotes: true
            // })))
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

    gulp.task('copy:file', ['copy:js', 'copy:html', 'copy:other', 'copy:png'], function() {
        console.log('copy:file');
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