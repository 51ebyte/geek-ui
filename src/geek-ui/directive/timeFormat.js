import { timeFormat } from '../lib/geek.js'
export default {
	name: 'timeFormat',
	beforeMount(el, binding, {props}) {
		let timestamp = binding.value.timestamp || binding.value.date || binding.value;
		if(timestamp instanceof Date){
			timestamp = timestamp.getTime();
		}
		let format = binding.value.format || props.format;
		timeFormat(timestamp,format).then(res=>{
			let html = `<div style="display:flex;align-items:center;">`;
			html += `<span>${res.format}</span>`;
			if (binding.week!=false && (props!=null && props.week!=false)) {
				html += `<span style="margin-left:6px;">星期${res.week}</span>`;
			}
			html += `</div>`;
			el.innerHTML = html;
		})
		
	}
}
