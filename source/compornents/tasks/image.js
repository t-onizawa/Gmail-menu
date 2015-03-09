'use strict';

// =====================================
// require gulp modules
// =====================================
var gulp = require('gulp'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	cache = require('gulp-cached'),
	imagemin = require('gulp-imagemin'),
	changed  = require('gulp-changed');



// =====================================
// path: base and dest
// =====================================
var yaml = require('js-yaml'),
	fs   = require('fs'),
	path = yaml.safeLoad(fs.readFileSync('./path.yml', 'utf-8'));

var dstGlob = path.img.base + '/**/*.+(jpg|jpeg|png|gif|svg)';

// =====================================
// img
// =====================================
gulp.task('img', function() {
	gulp.src(path.img.base)
		.pipe(changed( dstGlob ))
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest(path.img.dest));
});