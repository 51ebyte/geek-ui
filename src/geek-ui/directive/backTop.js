import { h } from 'vue'
import config from '../lib/config.js'
const random = (length = 2, prefix = '', suffix = '') => {
	let min = parseInt(1 + Array(length).join(0));
	let max = parseInt(1 + Array(length + 1).join(0) - 1);
	let number = Math.ceil(Math.random() * (max - min + 1) + min);
	return prefix + number + suffix;
}

function elNode(el, container) {
	let node = el.parentNode;
	if (node == undefined) {
		return window;
	}
	if (node.classList != undefined && node.classList.contains(container)) {
		return node;
	} else {
		return elNode(node, container)
	}
}

function scrollTop(el, from = 0, to, duration = 500, endCallback) {
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

const render = (el, modifiers = {}, value = {}) => {
	const conf = config.getter('backTop');
	console.log(h(conf.vnode))
	el.className = 'e-back_top'
	el.id = random(10, 'e-back_top-')
	el.style.position = 'fixed';
	// el.style.display = 'none';
	el.style.zIndex = 1;
	el.style.right = `${value.right || conf.right}px`;
	el.style.bottom = `${value.bottom || conf.bottom}px`;
	el.style.cursor = `pointer`;
	if(!modifiers.custom){
		let i = document.createElement('i')
				i.className='e-icon-font icon-ios-arrow-up';
				i.style.color='white';
				i.style.fontSize=`${24}px`
		let div = document.createElement('div');
				div.style.backgroundColor=`rgba(0, 0, 0, 0.6)`;
				div.style.borderRadius=`2px`;
				div.style.boxShadow=`rgb(0 0 0 / 20%) 0px 1px 3px`;
				div.style.transition=`all 0.2s ease-in-out 0s`;
				div.style.padding=`8px 12px`;
				div.appendChild(i)
		el.appendChild(div)
	}
}
export default {
	name: 'backTop',
	mounted(el, {
		modifiers,
		value
	}, vnode) {
		if (value.target == 'layout' || value.target==undefined) {
			value.target = elNode(el, 'e-layout-center-container');
		}
		const conf = config.getter('backTop');
		render(el, modifiers, value)
		value.target.onscroll = (e) => {
			if (value.target.scrollTop >= (value.height || conf.height)) {
				el.style.display = 'block';
			} else {
				el.style.display = 'none';
			}
		}

		el.onclick = () => {
			const sTop = value.target.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
			scrollTop(value.target, sTop, 0, value.duration);
		}
	}
}
