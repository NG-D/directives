var Transform = require('readable-stream/transform');
var fs = require('fs');
var htmlmin = require('html-minifier').minify;
module.exports = function(gulp, _, dir) {
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
    gulp.task('directive:buildTmpl', function() {
        return gulp.src(['!'+dir('../*.js'), '!' + dir('../tool/**/*.js'),'!' + dir('../libs/**/*.js'), '!' + dir('../oldDirective/**/*.js'),dir('../**/*.js'),])
            // .pipe(_.plumber())
            .pipe(replaceTmpl())
            .pipe(gulp.dest(dir('../')));
    });
};