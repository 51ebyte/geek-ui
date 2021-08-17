import {
	getCurrentInstance
} from 'vue'
const getter = function(option) {
	const {proxy} = getCurrentInstance();
	if ('$ebyte' in proxy) {
		return proxy.$ebyte[option] || '';
	}
	return proxy[option] || '';
}

export default {
	getter
}
