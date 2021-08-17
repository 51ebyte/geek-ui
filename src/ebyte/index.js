import * as vue from 'vue'

let context = import.meta.globEager('./components/*/index.js')

import './styles/common/common.css'

const install = function(app, opts = {}) {
	if (install.installed) return;
	//配置合并
	const option = Object.assign({
		theme: 'default',
		script: 'js',
	}, opts);
	//组件注册
	Object.keys(context).forEach((key) => {
		const component = context[key].default;
		
		if(component.name){
			const AsyncComponent = vue.defineAsyncComponent(component)
			app.component(component.name, component)
		}else{
			Object.keys(component).forEach((item)=>{
				app.component(component[item].name, component[item])
			})
		}
	})
	
	//配置暴露给页面
	app.config.globalProperties.$ebyte = {
		theme: opts.theme,
		script: opts.script,
	}
}

export default {
	install
}
