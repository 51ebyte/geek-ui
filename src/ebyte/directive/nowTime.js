import {nowTime} from '../lib/byte.js'
const render = (el, binding = {}) => {
	nowTime(binding.format).then(res => {
		let html = `<div style="display:flex;align-items:center;">`;
		html += `<span>${binding.prefix || ''}</span>`;
		html += `<span>${res.format}</span>`;
		if (binding.week !== false) {
			html += `<span style="margin-left:6px;">${binding.week || '星期'}${res.week}</span>`;
		}
		html += `</div>`;
		el.innerHTML = html;
	})
}
export default {
	name: 'nowTime',
	beforeMount(el, binding, vnode) {
		render(el, binding.value)
		if (binding.value && binding.value.dynamic || vnode && vnode.props.dynamic!=undefined) {
			setInterval(() => {
				render(el, binding.value)
			}, 1000)
		}
	}
}
