import { timeFrom } from '../lib/byte.js'
export default {
	name: 'timeFrom',
	beforeMount(el, binding, vnode) {
		let timestamp = binding.value.timestamp || binding.value;
		let format = binding.value.format;
		return new Promise(resolve => {
			timeFrom(timestamp,format).then(res=>{
				resolve(res)
			})
		});
	}
}
