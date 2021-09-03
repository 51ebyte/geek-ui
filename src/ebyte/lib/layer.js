import {
	h,
	render,
	ref
} from 'vue'

import * as vue from 'vue'

import layer from '../components/layer/layer.vue'

import prompt from '../components/layer/prompt.vue'
import message from '../components/layer/msg.vue'

export default (type, opts = {}) => {
	const container = document.createElement("div");
	container.className = `layer_${type}_container`;
	if (typeof opts === "string") {
		opts = {
			content: opts
		};
	}
	let promptInputValue = ref('');
	if (type == 'prompt') {
		promptInputValue.value = opts.value || ''
		opts.content = h(prompt, {
			type: opts.type,
			value: opts.value,
			inputValue: (val, evt) => {
				evt.preventDefault();
				opts.inputChange(val);
				promptInputValue.value = val;
			}
		});
	} else if (type == 'alert') {
		opts.btn = opts.btn || ['确认']
	} else if (type == 'render') {
		opts.content = opts.render(h);
	} else if (type == 'msg' || type == 'message') {
		render(h(message, {
			btn: opts.btn,
			time: opts.time,
			content: opts.content,
			btnClick(index, evt, btn) {
				if (typeof opts.callback == 'function') {
					opts.callback(index, evt, btn)
				}
			},
			onDestroy() {
				render(null, container);
			}
		}), container);
		document.body.appendChild(container.firstElementChild);
		return false;
	}
	const vm = h(layer, opts);
	vm.props.onBtnClick = (index, evt, btn) => {
		// vm.props.onDestroy();
		console.log(vm)
		if (typeof opts.callback != 'function') {
			return false;
		}
		switch (type) {
			case 'confirm':
			case 'alert':
			case 'render':
				opts.callback(index, evt, btn)
				break;
			case 'prompt':
				opts.callback(promptInputValue.value, index, evt, btn)
				break;
		}
	};
	vm.props.onDestroy = () => {
		render(null, container);
	};
	render(vm, container);
	document.body.appendChild(container.firstElementChild);
}
