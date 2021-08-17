import * as vue from 'vue'

import byte from './lib/byte.js'

import layoutDefault from './layouts/default.vue'

let components = import.meta.globEager('./components/*/index.js')
let directives = import.meta.globEager('./directive/*.js')

import './styles/common/common.css'

const install = function(app, opts = {}) {
	if (install.installed) return;
	//配置合并
	const option = Object.assign({
		theme: 'default',
		script: 'js',
	}, opts);

	//组件注册
	Object.keys(components).forEach((key) => {
		const component = components[key].default;
		if (component.name) {
			const AsyncComponent = vue.defineAsyncComponent(component)
			app.component(component.name, component)
		} else {
			Object.keys(component).forEach((item) => {
				if (component[item].name) {
					app.component(component[item].name, component[item])
				}
			})
		}
	})
	//layou统一布局注册
	if(opts.plugins && opts.plugins.layout && opts.plugins.layout.template){
		let layouts = opts.plugins.layout.template;
		if(layouts!=""){
			Object.keys(layouts).forEach((key) => {
				const start = key.lastIndexOf('/') + 1;
				const end = key.lastIndexOf('.vue');
				let name = key.substring(start, end);
				const component = layouts[key].default;
				const AsyncComponent = vue.defineAsyncComponent(component)
				app.component("layout-" + name, component)
			})
		}
		app.component("layout-default",layoutDefault)
	}
	
	//指令注册
	Object.keys(directives).forEach((key) => {
		const directive = directives[key].default;
		app.directive(directive.name, directive);
	})

	//配置暴露给页面
	app.config.globalProperties.$ebyte = {
		theme: opts.theme,
		script: opts.script,
	}
	
	app.config.globalProperties.$byte = byte;
	
}

export default {
	install
}
