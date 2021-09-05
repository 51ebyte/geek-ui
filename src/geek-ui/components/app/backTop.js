import {
	h,
	isVNode,
	render
} from 'vue';
import config from '../../lib/config.js';
import {
	random
} from '../../lib/geek.js';
import util from '../../lib/util.js'
import Icon from '../icon/icon.vue'

let option = {
	target: null,
	container: null,
	opts: null,
	vm: null
}

export default {
	clear() {
		if (option.container != null) {
			render(null, option.container);
		}
		if (option.target != null) {
			util.removeListener(option.target, 'scroll', this.onScroll)
		}
	},
	handle(container, target, opts) {
		if (opts == false || !target) {
			option.opts = false
			return false;
		}
		let conf = config.getter('backTop');

		let vnode = conf.vnode;
		if (typeof opts == 'function') {
			let res = backTop(h);
			if (isVNode(res)) {
				vnode = res;
			} else if (typeof res == 'object') {
				vnode = res.vnode;
				conf = Object.assign(conf, res);
			}
		}
		let vm = h('div', {
				style: {
					position: 'fixed',
					right: `${conf.right || 30}px`,
					bottom: `${conf.bottom || 70}px`,
					cursor: 'pointer',
					display: 'none'
				},
				id: random(10, 'e-back_top-'),
				onClick() {
					const sTop = target.scrollTop;
					util.scrollTop(target, sTop, 0, conf.duration);
				}
			},
			vnode
		);
		option.vm = vm;
		option.opts = conf
		option.target = target
		option.container = container
		render(vm, container);
		document.body.appendChild(container.firstElementChild);
		util.addListener(target, 'scroll', this.onScroll)
	},
	onScroll(e) {
		if (option.target.scrollTop >= option.opts.height && option.opts != false) {
			option.vm.el.style.display = 'block'
		} else {
			option.vm.el.style.display = 'none'
		}
	}
}
