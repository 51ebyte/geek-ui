import { createApp } from 'vue'
import App from './App.vue'

import router from './route.js'

import ebyte from './ebyte'

createApp(App).use(ebyte,{
	theme:'primary'
}).use(router).mount('#app')
