module.exports = function (gulp, _, dir, config, target) {
    // inject bower's dependencies to html files
    function injectBowerFile () {
        return _.inject(gulp.src(dir('../www/application/module/common/vendor*'), {read: false}), {
            name: 'bower',
            transform: function (filepath, file, i, length, target) {
                // /../www/
                filepath    = filepath.substring(8); 
                return _.inject.transform.call(_.inject.transform, filepath, file, i, length, target);
            }
        });
    }

    function injectCommon () {
        var source = [];
        config.common.forEach(function (item) {
            source.push(dir('dist/' + item));
        });
        return _.inject(gulp.src(source, {read: false}), {
            name: 'common',
            transform: function (filepath, file, index, length, targetFile) {
                filepath = filepath.substring(6);
                return _.inject.transform.call(_.inject.transform, filepath, file, index, length, targetFile);
            }
        });
    }

    gulp.task('compile:html', function () {
        var t = [];

        target.forEach(function (item) {
            t.push(dir('src/' + item));
        });

        return gulp.src(t)
        .pipe(_.changed(dir('dist')))
        // replace the assets' placeholder to the actual code
        .pipe(injectBowerFile())
        .pipe(injectCommon())
                
        .pipe(gulp.dest(dir('dist')));
    }); 
};