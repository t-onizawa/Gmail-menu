'use strict';

// =====================================
// require gulp modules
// =====================================
var gulp = require('gulp'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	cache = require('gulp-cached'),
	sprite = require('gulp.spritesmith');

// =====================================
// path: base and dest
// =====================================
var yaml = require('js-yaml'),
	fs   = require('fs'),
	path = yaml.safeLoad(fs.readFileSync('./path.yml', 'utf-8'));

// =====================================
// sprite task
// =====================================
gulp.task('sprite', function(){
	var spriteOptions = {
		imgName : '../img/sprite.png',
		cssName : '_sprite.scss'
	};

	var spriteData = gulp
						.src(path.sprite.base)
						.pipe(sprite(spriteOptions));

	spriteData.css
			.pipe(gulp.dest(path.css.base + 'parts' ));

	spriteData.img
			.pipe(gulp.dest(path.sprite.dest));

});
