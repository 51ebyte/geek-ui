import * as vue from 'vue'
let svgComponent = {};
let components = import.meta.globEager('./*.vue')
Object.keys(components).forEach((key) => {
	const component = components[key].default;
	if (component.name) {
		const AsyncComponent = vue.defineAsyncComponent(component)
		svgComponent[component.name]=component
	} else {
		Object.keys(component).forEach((item) => {
			if (component[item].name) {
				svgComponent[component[item].name]=component[item]
			}
		})
	}
})
export default svgComponent