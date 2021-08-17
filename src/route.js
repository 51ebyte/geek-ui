import {defineAsyncComponent} from 'vue'
import {createRouter,createWebHistory} from 'vue-router'

let context = import.meta.globEager('/src/views/**/*.vue')

const router = Object.keys(context).map(key=>{
	let start = key.indexOf('/src/views/')+10;
	let end = key.lastIndexOf('.vue');
	let path = key.substring(start,end);
	let index = path.lastIndexOf('/index')+1;
	if(index > 0){
		path = path.substring(0,index)
	}
	return {
		path:path,
		component: () => import(key)
	}
});


export default createRouter({
	history: createWebHistory(),
	routes: router,
});