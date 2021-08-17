import { createApp } from 'vue'
import App from './App.vue'

import router from './route.js'

import ebyte from './ebyte'

let layout = import.meta.globEager('./layouts/*.vue');

createApp(App).use(router).use(ebyte,{
	theme:'primary',
	plugins:{
		layout:{
			template:layout
		}
	},
	config:{
		breadcrumb:{
			separator:'/',
			home:'a'
		}
	}
}).mount('#app')
