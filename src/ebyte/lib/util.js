import * as vue from 'vue'
/**
 * 判断是否是16进制颜色
 */
const isColor = (val) => {
	return /^#[0-9A-F]{6}$/i.test(val);
}
/**
 * 判断是否百分比
 */
const isPercentage = (val) => {
	return new RegExp(/^\d+%$/).test(val);
}


/* istanbul ignore next */
const addClass = (el, cls) => {
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
	console.log(el.className)
}

/* istanbul ignore next */
const removeClass = (el, cls) => {
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

export default {
	isColor,
	isPercentage,
	addClass,
	removeClass
}
