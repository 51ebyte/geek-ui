import {
	createApp,
	h
} from 'vue'
import App from './App.vue'

import router from './route.js'

import geekUI from './geek-ui'

let layout = import.meta.globEager('./layouts/*.vue');

import './color.css'

createApp(App).use(router).use(geekUI, {
	theme: 'primary',
	plugins: {
		layout: {
			template: layout
		},
		iconfont: {
			scriptUrl: '//at.alicdn.com/t/font_2790368_45gnwfoq013.js',
			size: 24,
			color: '#999999'
		},
		iconpark:{
			scriptUrl: 'https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/icons_2256_4.7950bdb914424bb2f30eee6b7c3ada53.js',
			size: 24,
			fill: '',
			stroke:''
		}
	},
	config: {
		breadcrumb: {
			separator: '/',
			home: 'a'
		},
		backTop: {
			bottom: 40,
			height: 100,
			vnode: h('div', {
				style: {
					padding: '10px',
					background: 'rgba(0,153,229,.7)',
					color: '#fff',
					textAlign: 'center',
					borderRadius: '2px',
				}
			}, '返回顶端')
		}
	}
}).mount('#app')
