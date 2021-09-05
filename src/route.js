import {defineAsyncComponent} from 'vue'
import {createRouter,createWebHistory} from 'vue-router'

let context = import.meta.glob('/src/views/**/*.vue')
let views = import.meta.globEager('/src/views/**/*.vue')

let paths = [];
const routes = Object.keys(context).map(key => {
	const start = key.indexOf('/src/views/') + 10;
	const end = key.lastIndexOf('.vue');
	let path = key.substring(start, end);
	const index = path.lastIndexOf('/index');
	path = index == 0 ? '/' : (index > 0 ? path.substring(0, index) : path);
	let name = index == 0 ? 'index' : path.replaceAll('/', '_').substring(1)
	paths.push(path)
	return {
		path: path,
		fullPath: key,
		name: name,
		component: context[key],
		redirect:'',
		meta: {
			layout: views[key].default.layout || '',
			backTop: views[key].default.backTop || false
		}
	};
});

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

router.beforeEach((to, from, next) => {
	const index = paths.findIndex(e => e == to.path);
	if (index < 0) {
		next({
			path: '/'
		})
		return false;
	}
	next()
})
export default router;
