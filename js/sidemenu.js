/* @license slidemenuJS v1.0.0
 * (c) 2014 t-onizawa https://github.com/t-onizawa/
*/


var SIDE_MENU = window.MODULE || {};

SIDE_MENU.CLASS_NAME = {
	HIDE: 'is-hide',
	OPEN: 'is-open',
	TRANSITION: 'is-transition'
};

SIDE_MENU.METHOD = function() {

	function addClass(elm, cls) {
		var list = elm.className.split(' ');

		if (list.indexOf(cls) == -1) list[list.length] = cls;
		elm.className = list.join(' ');
	}

	function removeClass(elm, cls) {
		var list = elm.className.split(' ');

		if (list.indexOf(cls) !== -1) list.splice(list.indexOf(cls), 1);

		elm.className = (list.length > 1) ? list.join(' ') : list[0] || '';
	}

	function hasClass(elm, cls) {
		return elm.className.split(" ").indexOf(cls) !== -1;
	}


	function setTranslate(elm, x, y, type) {
		if (type !== 'id') {
			for (var i = 0, len = elm.length; i < len; i++) {
				elm[i].style.webkitTransform = 'translate(' + x + 'px,' + y + 'px)';
				elm[i].style.mozTransform = 'translate(' + x + 'px,' + y + 'px)';
				elm[i].style.Transform = 'translate(' + x + 'px,' + y + 'px)';
			}
		} else {
			elm.style.webkitTransform = 'translate(' + x + 'px,' + y + 'px)';
			elm.style.mozTransform = 'translate(' + x + 'px,' + y + 'px)';
			elm.style.Transform = 'translate(' + x + 'px,' + y + 'px)';
		}
	}

	function clearTranslate(elm, type) {
		if (type !== 'id') {
			for (var i = 0, len = elm.length; i < len; i++) {
				elm[i].style.webkitTransform = '';
				elm[i].style.mozTransform = '';
				elm[i].style.Transform = '';
			}
		} else {
			elm.style.webkitTransform = '';
			elm.style.mozTransform = '';
			elm.style.Transform = '';
		}
	}

	return {
		addClass: addClass,
		removeClass: removeClass,
		hasClass: hasClass,
		setTranslate: setTranslate,
		clearTranslate: clearTranslate
	};
};

SIDE_MENU.MODULE = function(options) {
	var $ = new SIDE_MENU.METHOD(),
			container = document.getElementById(options.mainId),
			target = container.getElementsByClassName(options.slideCls),
			menu = document.getElementById(options.menuId),
			btn = document.getElementById(options.btnId),
			position = {},
			flickFlag = false,
			currentX = 0;

	function toggle() {
		if (!$.hasClass(container, SIDE_MENU.CLASS_NAME.OPEN)) {
			openMenu();
		} else {
			closeMenu();
		}
	}

	function openMenu() {
		$.addClass(container, SIDE_MENU.CLASS_NAME.OPEN);
		$.removeClass(menu, SIDE_MENU.CLASS_NAME.HIDE);

		noScroll();
	}

	function closeMenu() {
		$.removeClass(container, SIDE_MENU.CLASS_NAME.OPEN);
		setTimeout(function() {
			$.addClass(menu, SIDE_MENU.CLASS_NAME.HIDE);
		}, 300);

		onScroll();
	}

	function setPreventDefault(e) {
		e.detail.event.preventDefault();
	}

	function noScroll() {

		document.addEventListener('touchmove', function(e) {
			var ev = new CustomEvent('noScroll', {
				detail: {
					event: e
				}
			});
			document.dispatchEvent(ev);
		}, false);

		document.addEventListener('noScroll', setPreventDefault, false);
	}

	function onScroll() {
		document.removeEventListener('noScroll', setPreventDefault, false);
	}


	function setPositionStart(e) {
		if (!$.hasClass(container, SIDE_MENU.CLASS_NAME.OPEN)) return;

		flickFlag = true;
		currentX = parseInt(target[0].getBoundingClientRect().left);
		position.start = e.touches[0].screenX;
	}

	function setPositionMove(e) {
		if (!$.hasClass(container, SIDE_MENU.CLASS_NAME.OPEN)) return;

		flickFlag = true;
		position.move = e.changedTouches[0].screenX;
		flick();
	}

	function setPositionEnd(e) {
		if (parseInt(target[0].getBoundingClientRect().left) === 0) return;

		flickFlag = false;
		position.end = e.changedTouches[0].screenX;
		flickEnd();
	}

	function flick() {
		if (!flickFlag) return;

		var currentMove = parseInt(position.move - position.start),
				moveNum = currentX + currentMove;

		$.removeClass(container, SIDE_MENU.CLASS_NAME.TRANSITION);
		noScroll();

		$.setTranslate(target, moveNum, 0);
	}

	function flickEnd() {
		$.addClass(container, SIDE_MENU.CLASS_NAME.TRANSITION);
		$.clearTranslate(target);

		if (parseInt(target[0].getBoundingClientRect().left) < window.innerWidth / 2) {
			closeMenu();
		}
	}

	// RUN
	(function() {
		btn.addEventListener('touchend', toggle, false);
		container.addEventListener('touchstart', setPositionStart, false);
		container.addEventListener('touchmove', setPositionMove, false);
		container.addEventListener('touchend', setPositionEnd, false);
	})();
};

SIDE_MENU.INNER_SCROLL = function(options) {
	var $ = new SIDE_MENU.METHOD(),
			target = document.getElementById(options.scrollId),
			headerHeight = (options.fixHeaderHeight) ? options.fixHeaderHeight : 0,
			position = {},
			windowHeight;

	function setWindowHeight() {
		windowHeight = window.innerHeight;
	}

	function getRunFlag() {
		return target.clientHeight + headerHeight > windowHeight;
	}

	function setPositionStart(e) {
		if (!getRunFlag()) return;

		currentY = parseInt(target.getBoundingClientRect().top);
		position.start = e.touches[0].screenY;
		position.startTime = new Date().getTime();
	}

	function setPositionMove(e) {
		if (!getRunFlag()) return;

		position.move = e.changedTouches[0].screenY;
		flick();
	}

	function setPositionEnd(e) {
		if (!getRunFlag()) return;

		position.end = e.changedTouches[0].screenY;
		position.endTime = new Date().getTime();
		flickEnd();
	}

	function flick() {

		var currentMove = parseInt(position.move - position.start),
				moveNum = currentY + currentMove;

		$.setTranslate(target, 0, moveNum, 'id');

	}

	function flickEnd() {
		var movedY = parseInt(target.getBoundingClientRect().top),
				targetHeight = target.clientHeight + headerHeight,
				time = position.endTime - position.startTime,
				resultTime = (time < 400) ? 400 / time : 1;
		inertia = currentY + (parseInt(position.end - position.start) * resultTime);


		$.addClass(target, SIDE_MENU.CLASS_NAME.TRANSITION);


		if (movedY > 0 || inertia > 0) {
			$.setTranslate(target, 0, 0, 'id');
		} else if (windowHeight - targetHeight > movedY || windowHeight - targetHeight > inertia) {
			$.setTranslate(target, 0, windowHeight - targetHeight, 'id');
		} else {
			$.setTranslate(target, 0, inertia, 'id');
		}

		setTimeout(function() {
			$.removeClass(target, SIDE_MENU.CLASS_NAME.TRANSITION);
		}, 300);
	}



	// RUN
	(function() {
		var resizeTimer,
			interval = 300;

		window.addEventListener('resize', function () {
			if (resizeTimer !== false) {
				clearTimeout(resizeTimer);
			}
			resizeTimer = setTimeout(function () {
				setWindowHeight();
			}, interval);
		});

		target.addEventListener('touchstart', setPositionStart, false);
		target.addEventListener('touchmove', setPositionMove, false);
		target.addEventListener('touchend', setPositionEnd, false);

		setWindowHeight();
	})();
};





