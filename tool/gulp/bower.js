module.exports = function (gulp, _, dir) {

    gulp.task('bower', _.shell.task(['bower install']));
    
    gulp.task('init', ['bower']);
};