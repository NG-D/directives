var browserSync = require('browser-sync');
var path = require('path');
module.exports = function(gulp, _, dir) {
    gulp.task('default', ['serve'], function() {
        console.log('default:hello world');
    });

    gulp.task('serve', _.sync(gulp).sync([
        // 'copyimage', 
        // 'directive:css', 
        // 'directive:tmpl', 
        // 'compile:js', 
        // 'compile:html', 
        'sass',
        'copy:file',
        'watch'
    ]), function() {
        console.log('serve:hello world');
        browserSync.init({
            server: {
                // routes: {
                //     '/bower_components': 'bower_components'
                // },
                baseDir: '../'
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
            port: 1239,
            ui: {
                port: 4400
            },
            open: false
        });
    });
};
