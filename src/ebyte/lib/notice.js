import {
	h,
	render,
	ref
} from 'vue'

import byte from './byte.js'

import notice from '../components/notice/notice.vue'

const instances = [];

export default {
	open(opts) {
		return this.handle('open', opts);
	},
	info(opts) {
		this.handle('info', opts);
	},
	success(opts) {
		this.handle('success', opts);
	},
	error(opts) {
		this.handle('error', opts);
	},
	warning(opts) {
		this.handle('warning', opts);
	},
	handle(type, opts) {
		if (typeof opts === "string") {
			opts = {
				title: opts
			};
		}
		opts.type = type;
		opts.id = `notice_${type}_${byte.random(10)}`;

		let verticalOffset = opts.offset || 20;
		instances.forEach(({
			vm: vm2
		}) => {
			verticalOffset += (vm2.el.offsetHeight || 0) + 16;
		});
		verticalOffset += 16;
		opts.top = verticalOffset
		opts.onClose = (() => {
			close(opts.id)
		})
		let div = document.createElement('div');
		div.className = 'notice_info_container'
		const vm = h(notice, opts);
		vm.props.onDestroy = () => {
			render(null, div);
		};
		render(vm, div)
		instances.push({
			vm
		});
		document.body.appendChild(div.firstElementChild);
		return {
			vnode: vm.component,
		  close: () => {
				vm.component.ctx.handleClose();
			}
		};
	}
}

const close = (id) => {
	const idx = instances.findIndex(({
		vm: vm2
	}) => {
		const {
			id: _id
		} = vm2.component.props;
		return id === _id;
	});
	if (idx === -1) {
		return;
	}
	const {
		vm
	} = instances[idx];
	if (!vm)
		return;
	const removedHeight = vm.el.offsetHeight;
	instances.splice(idx, 1);
	const len = instances.length;
	if (len < 1)
		return;
	for (let i = idx; i < len; i++) {
		const pos = parseInt(instances[i].vm.el.style["top"], 10) - removedHeight - 16;
		instances[i].vm.component.props.top = pos;
	}
}
