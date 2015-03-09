'use strict';

// =====================================
// require gulp modules
// =====================================
var gulp = require('gulp'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	cache = require('gulp-cached'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify');

// =====================================
// path: base and dest
// =====================================
var yaml = require('js-yaml'),
	fs   = require('fs'),
	path = yaml.safeLoad(fs.readFileSync('./path.yml', 'utf-8'));


// =====================================
// JavaScript task
// =====================================
gulp.task('js', function() {
	gulp.src(path.js.base)
			.pipe(plumber())
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(uglify())
			.pipe(gulp.dest(path.js.dest))
			.pipe(notify({ message: 'js Complete' }));
});

