var fs = require('fs');
var gulp = require("gulp");
var path = require('path');
var minimist = require('minimist')
var G = require('gulp-load-plugins')();
var config = require('./config');
//更改目录路径
var changeDir = function(dir) {
    console.log(path.resolve(__dirname, dir));
    return path.resolve(__dirname, dir);
};
//获取cmdr的第三个参数（默认所有HTML）
var target = [];
var argv = minimist(process.argv.slice(2));
if (argv.f || argv.file) {
    var files = argv.f || argv.file;
    target = files.split(' ');
} else {
    target = ['*.html'];
}
//import gulp files 
var files = fs.readdirSync(path.join(__dirname, 'gulp'));
files.forEach(function(file) {
    var stat = fs.statSync(path.join(__dirname, 'gulp', file));
    if (stat.isFile() && path.extname(file) === '.js') {
        console.log("name:", file)
        require(path.join(__dirname, 'gulp', file))(gulp, G, changeDir, config, target);
    }
});
gulp.task('check', G.shell.task(['es-checker']));
