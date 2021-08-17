import * as vue from 'vue'
import ebyte from './byte.js'


ebyte.addClass = (el, cls) => {
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

ebyte.removeClass = (el, cls) => {
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

ebyte.addListener = (element, event, handler, useCapture = false) => {
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

ebyte.removeListener = (element, event, handler, useCapture = false) => {
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


export default ebyte
