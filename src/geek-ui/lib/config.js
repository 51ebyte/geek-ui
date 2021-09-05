import {
	h
} from 'vue'

import {
	deepMerge
} from './geek.js'

import Icon from '../components/icon/icon.vue'

const conf = {
	breadcrumb: {
		separator: '/',
		home: 'b'
	},
	backTop: {
		right: 30,
		bottom: 40,
		height: 100,
		duration: 1000,
		vnode: h('div', {
			style: {
				backgroundColor: 'rgba(0,0,0,.6)',
				borderRadius: '2px',
				boxShadow: '0 1px 3px rgb(0 0 0 / 20%)',
				transition: 'all .2s ease-in-out',
				padding: '8px 12px'
			}
		}, [
			h(Icon, {
				name: 'ios-arrow-up',
				color: 'white',
				size: 24
			})
		])
	}
}

let opts = {}
let effect = {};
export default {
	setter(opt) {
		opts = opt;
		effect = deepMerge(conf, opt.config);
	},
	getter(key) {
		return effect[key]
	},
	opts(key) {
		return key ? opts[key] : opts;
	}
}
