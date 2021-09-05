const util = {}

util.hasClass = (el, cls) => {
	return el.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

util.addClass = (el, cls) => {
	if (!el) return;
	let curClass = el.className;
	const classes = (cls || '').split(' ');

	for (let i = 0, j = classes.length; i < j; i++) {
		const clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.add(clsName);
		} else {
			if (!hasClass(el, clsName)) {
				curClass += ' ' + clsName;
			}
		}
	}
	if (!el.classList) {
		el.className = curClass;
	}
}

util.removeClass = (el, cls) => {
	if (!el || !cls) return;
	const classes = cls.split(' ');
	let curClass = ' ' + el.className + ' ';

	for (let i = 0, j = classes.length; i < j; i++) {
		const clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.remove(clsName);
		} else {
			if (hasClass(el, clsName)) {
				curClass = curClass.replace(' ' + clsName + ' ', ' ');
			}
		}
	}
	if (!el.classList) {
		el.className = trim(curClass);
	}
}

util.addListener = (element, event, handler, useCapture = false) => {
	if (document.addEventListener) {
		if (element && event && handler) {
			element.addEventListener(event, handler, useCapture);
		}
	} else {
		if (element && event && handler) {
			element.attachEvent('on' + event, handler);
		}
	}
};

util.removeListener = (element, event, handler, useCapture = false) => {
	if (document.removeEventListener) {
		if (element && event) {
			element.removeEventListener(event, handler, useCapture);
		}
	} else {
		if (element && event) {
			element.detachEvent('on' + event, handler);
		}
	}
};
/**
 * 寻找子级元素
 */
let nodes = [];
util.next = (el, selector) => {
	for (let i = 0; i < el.childElementCount; i++) {
		let node = el.childNodes[i];
		if (node instanceof Element) {
			if (node.matches(selector)) {
				nodes.push(node)
			}
			if (node.childElementCount > 0) {
				util.next(node, selector);
			}
		}
	}
	return nodes;
}
/**
 * 寻找上级元素
 */
util.prev = (el, selector) => {
	var retval = null;
	while (el) {
		if (el.matches(selector)) {
			retval = el;
			break
		}
		el = el.parentElement;
	}
	return retval;
}


util.scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = (
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				return window.setTimeout(callback, 1000 / 60);
			}
		);
	}
	const difference = Math.abs(from - to);
	const step = Math.ceil(difference / duration * 50);

	function scroll(start, end, step) {
		if (start === end) {
			endCallback && endCallback();
			return;
		}

		let d = (start + step > end) ? end : start + step;
		if (start > end) {
			d = (start - step < end) ? end : start - step;
		}

		if (el === window) {
			window.scrollTo(d, d);
		} else {
			el.scrollTop = d;
		}
		window.requestAnimationFrame(() => scroll(d, end, step));
	}
	scroll(from, to, step);
}


util.isImage = (file) => {
	return /\.(jpg|jpeg|png|bmp|gif)$/.test(file.name.toLowerCase());
}

util.isExcel = (file) => {
	return /\.(xls|xlsx|csv)$/.test(file.name.toLowerCase());
}

util.isWord = (file) => {
	return /\.(doc|docx)$/.test(file.name.toLowerCase());
}

util.isPPT = (file) => {
	return /\.(ppt|pptx)$/.test(file.name.toLowerCase());
}

util.isTxt = (file) => {
	return /\.(txt)$/.test(file.name.toLowerCase());
}

export default util
