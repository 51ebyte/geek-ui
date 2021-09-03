import {
	h,isVNode,
	defineComponent
} from 'vue'
export default defineComponent({
	name: 'Render',
	render(params) {
		if (typeof this.render == 'function') {
			return this.render(params.params);
		} else if (isVNode(this.render)) {
			return this.render;
		} else if (typeof this.render == 'string') {
			return this.render;
		}
	},
	props: {
		render: [Function, Object, String],
		params: [Array, Object, String, Number]
	}
});
