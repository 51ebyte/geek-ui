import {
	nextTick
} from 'vue'

let opts = {}
let option = {};

const on = function(element, event, handler, useCapture = false) {
	if (element && event && handler) {
		element.addEventListener(event, handler, useCapture);
	}
};

const off = function(element, event, handler, useCapture = false) {
	if (element && event && handler) {
		element.removeEventListener(event, handler, useCapture);
	}
};

const getClientXY = (event) => {
	let clientX;
	let clientY;
	if (event.type.startsWith('touch')) {
		clientY = event.touches[0].clientY;
		clientX = event.touches[0].clientX;
	} else {
		clientY = event.clientY;
		clientX = event.clientX;
	}
	return {
		clientX,
		clientY
	};
};

const onMouseDown = (id, event) => {
	event.preventDefault();
	option = opts[id];
	onDragStart(event)
	on(window, 'mousemove', onDragging);
	on(window, 'touchmove', onDragging);
	on(window, 'mouseup', onDragEnd);
	on(window, 'touchend', onDragEnd);
	on(window, 'contextmenu', onDragEnd);
}

const onDragStart = (event) => {
	option.isClick = true;
	const {
		clientX,
		clientY
	} = getClientXY(event);
	option.startX = clientX;
	option.startY = clientY;
	option.dragging = true;
};

const onDragging = (event) => {
	if (option.dragging) {
		option.isClick = false;
		const {
			clientX,
			clientY
		} = getClientXY(event);
		let elementLeft = option.elementX + (clientX - option.startX);
		let elementTop = option.elementY + (clientY - option.startY);
		if(option.scope == 'parent'){
			elementLeft = elementLeft < 0 ? 0 : elementLeft;
			elementLeft = (option.elementWidth + elementLeft) > option.bodyWidth ? (option.bodyWidth - option
				.elementWidth) : elementLeft;
			elementTop = elementTop < 0 ? 0 : elementTop;
			elementTop = (option.elementHeight + elementTop) > option.bodyHeight ? (option.bodyHeight - option
				.elementHeight) : elementTop;
		}
		option.el.style.left = `${elementLeft}px`
		option.el.style.top = `${elementTop}px`

	}
};

const onDragEnd = (event) => {
	if (option.dragging) {
		option.dragging = false;
		option.elementX = option.el.offsetLeft;
		option.elementY = option.el.offsetTop;
		off(window, 'mousemove', onDragging);
		off(window, 'touchmove', onDragging);
		off(window, 'mouseup', onDragEnd);
		off(window, 'touchend', onDragEnd);
		off(window, 'contextmenu', onDragEnd);
	}
}

const parent = (el, selector) => {
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

const random = (length = 2, prefix = '', suffix = '') => {
	let min = parseInt(1 + Array(length).join(0));
	let max = parseInt(1 + Array(length + 1).join(0) - 1);
	let number = Math.ceil(Math.random() * (max - min + 1) + min);
	return prefix + number + suffix;
}

const initialize = (element, modifiers, value) => {
	const option = {
		el: null,
		dragging: false,
		isClick: false,
		startX: 0,
		startY: 0,
	};

	nextTick(() => {
		setTimeout(() => {
			element.style.width = `${element.offsetWidth}px`;
			element.style.height = `${element.offsetHeight}px`;
			if (modifiers.affix) {
				element.parentNode.style.position = 'relative';
				element.style.position = 'absolute';
				element.style.zIndex = 1;
				option.scope = 'parent';
				option.bodyWidth = element.parentNode.clientWidth;
				option.bodyHeight = element.parentNode.clientHeight;
			} else if (modifiers.fixed) {
				element.style.position = 'fixed';
				element.style.zIndex = 1000;
				option.scope = 'fixed';
				option.bodyWidth = document.body.clientWidth;
				option.bodyHeight = document.body.clientHeight;
			} else {
				element.parentNode.style.position = 'relative';
				element.style.position = 'absolute';
				element.style.zIndex = 1;
				option.scope = '';
				option.bodyWidth = document.body.clientWidth;
				option.bodyHeight = document.body.clientHeight;
			}
			option.elementWidth = element.offsetWidth;
			option.elementHeight = element.offsetHeight;
			option.elementX = element.offsetLeft;
			option.elementY = element.offsetTop;
			option.el = element;

			opts[element.id] = option;

		}, 50)
	})
}

export default {
	name: 'drag',
	mounted(el, {
		modifiers,
		value
	}, vnode) {
		let element = el;
		el.style.cursor = 'move'
		if (value != undefined && value.target != '') {
			let effEl = parent(el.parentNode, value.target)
			element = effEl || el;
		}
		
		element.id = random(10, 'e-drag-')
		initialize(element, modifiers, value)
		el.onmousedown = function(event) {
			onMouseDown(element.id, event)
		}
		window.onresize = () => {
			initialize(element, modifiers, value)
		}
	},
}
