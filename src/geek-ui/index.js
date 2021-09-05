import * as vue from 'vue'

import geek from './lib/geek.js'
import config from './lib/config.js'
import {createFromIconfontCN} from './lib/iconfont.js'
import {createFromIconPark} from './lib/iconpark.js'



import layoutDefault from './layouts/default.vue'

let components = import.meta.globEager('./components/*/index.js')
let directives = import.meta.globEager('./directive/*.js')

import './styles/skin/default.css'
import './styles/common/common.css'



const install = function(app, opts = {}) {
	if (install.installed) return;
	//配置合并
	config.setter(opts)
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
	//注册插件
	if (opts.plugins) {
		//注册layout统一布局
		if (opts.plugins.layout && opts.plugins.layout.template) {
			let layouts = opts.plugins.layout.template;
			if (layouts != "") {
				Object.keys(layouts).forEach((key) => {
					const start = key.lastIndexOf('/') + 1;
					const end = key.lastIndexOf('.vue');
					let name = key.substring(start, end);
					const component = layouts[key].default;
					const AsyncComponent = vue.defineAsyncComponent(component)
					app.component("layout-" + name, component)
				})
			}
			app.component("layout-default", layoutDefault)
		}
		//注册iconfont
		if (opts.plugins.iconfont && opts.plugins.iconfont.scriptUrl) {
			createFromIconfontCN(app,opts.plugins.iconfont)
		}
		//注册iconpark
		if (opts.plugins.iconpark && opts.plugins.iconpark.scriptUrl) {
			createFromIconPark(app,opts.plugins.iconpark)
		}
	}

	//指令注册
	Object.keys(directives).forEach((key) => {
		const directive = directives[key].default;
		app.directive(directive.name, directive);
	})
	//方法暴漏给用户
	app.config.globalProperties.$geek = geek;
	
	app.config.warnHandler = function(msg, vm, trace) {
		if(msg.search('iconpark-icon')<0){
			console.warn(msg)
		}
	}
	
}

import Layer from './lib/layer.js'
import Message from './lib/message.js'
import Notice from './lib/notice.js'

export {
	Layer,Message,Notice
}

export default {
	install
}
