import {
	inject
} from 'vue'
const getter = function(key,def='') {
	key = key.split('.');
	const opts = inject('opts')
	let option = {...opts};
	for (let i in key) {
		option = option[key[i]];
	}
	return option || def;
}

export default {
	getter
}
