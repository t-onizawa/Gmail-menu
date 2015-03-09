'use strict';

// =====================================
// require gulp modules
// =====================================
var gulp = require('gulp'),
	paths = require('path'),
	cache = require('gulp-cached'),
	requireDir = require('require-dir'),
	dir = requireDir('./tasks', {recurse: true});

// =====================================
// path: base and dest
// =====================================
var yaml = require('js-yaml'),
	fs   = require('fs'),
	path = yaml.safeLoad(fs.readFileSync('./path.yml', 'utf-8'));

// =====================================
// watch
// =====================================
gulp.task("watch", function() {
	gulp.watch('../javascript/*.js', ['js']);
	gulp.watch('../javascript/**/*.js', ['js']);
	gulp.watch('../scss/**/*.scss', ['css']);
});

// =====================================
// do task
// =====================================
// defalut task
gulp.task('default', ['watch', 'js', 'css', 'img']);
