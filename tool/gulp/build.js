module.exports = function(gulp, _, dir) {
    gulp.task('compile:tmpl', function() {
        return gulp.src(['!' + dir('build/*.html'), dir('build/**/*.html')])
            .pipe(_.minifyHtml({ empty: true, quotes: true }))
            .pipe(_.ngTemplate({
                moduleName: 'tmpl',
                standalone: true,
                filePath: 'template.js'
            }))
            .pipe(gulp.dest('../demo'));
    });
};
