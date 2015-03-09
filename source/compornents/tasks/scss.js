'use strict';

// =====================================
// require gulp modules
// =====================================
var gulp = require('gulp'),
	notify = require('gulp-notify'),
	cache = require('gulp-cached'),
	sass = require('gulp-ruby-sass'),
	minifycss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	csscomb = require('gulp-csscomb');

// =====================================
// path: base and dest
// =====================================
var yaml = require('js-yaml'),
	fs   = require('fs'),
	path = yaml.safeLoad(fs.readFileSync('./path.yml', 'utf-8'));

// =====================================
// css task
// =====================================
gulp.task('css', function () {
	sass(path.css.base, { style: 'expanded'})
			.on('error', function (err) {
				console.log('Hey error! ' + err);
			})
			.pipe(cache('sass'))
			.pipe(autoprefixer(
					"IE >= 8",
					"Firefox last 1 versions",
					"Chrome last 1 versions",
					"Safari last 1 versions"
			))
			.pipe(csscomb())
			.pipe(minifycss())
			.pipe(gulp.dest(path.css.dest))
			.pipe(notify({ message: 'css Complete' }));
});
