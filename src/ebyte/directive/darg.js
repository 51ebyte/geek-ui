import {
	nextTick
} from 'vue'

const option = {
	el: null,
	dragging: false,
	isClick: false,
	startX: 0,
	startY: 0,
	elementX: 0,
	elementY: 0,
	elementWidth: 0,
	elementHeight: 0,
	bodyWidth: 0,
	bodyHeight: 0
};

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

const onMouseDown = (event) => {
	event.preventDefault();
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
		elementLeft = elementLeft < 0 ? 0 : elementLeft;
		elementLeft = (option.elementWidth + elementLeft) > option.bodyWidth ? (option.bodyWidth - option
			.elementWidth) : elementLeft;
		let elementTop = option.elementY + (clientY - option.startY);
		elementTop = elementTop < 0 ? 0 : elementTop;
		elementTop = (option.elementHeight + elementTop) > option.bodyHeight ? (option.bodyHeight - option
			.elementHeight) : elementTop;
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

const initialize = (binding) => {
	nextTick(() => {
		setTimeout(() => {
			if (binding != null && binding.affix == true) {
				option.el.parentNode.style.position = 'relative';
				option.el.style.position = 'absolute';
				option.el.style.zIndex = 1;
				option.bodyWidth = option.el.parentNode.clientWidth;
				option.bodyHeight = option.el.parentNode.clientHeight;
			} else {
				option.el.style.position = 'fixed';
				option.el.style.zIndex = 1000;
				option.bodyWidth = document.body.clientWidth;
				option.bodyHeight = document.body.clientHeight;
			}
			option.elementWidth = option.el.offsetWidth;
			option.elementHeight = option.el.offsetHeight;
			option.elementX = option.el.offsetLeft;
			option.elementY = option.el.offsetTop;
		}, 50)
	})
}

export default {
	name: 'drag',
	beforeMount(el, binding, vnode) {
		el.style.cursor = 'move'
	},
	mounted(el, binding, vnode) {
		if (binding.value != undefined && binding.value.target != '') {
			let effEl = parent(el.parentNode, binding.value.target)
			option.el = effEl || el;
		} else {
			option.el = el;
		}
		initialize(binding.value)

		el.onmousedown = function(event) {
			onMouseDown(event)
		}
		window.onresize = () => {
			initialize(binding.value)
		}
	}
}
