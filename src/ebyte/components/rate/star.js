import {
	defineComponent,
	createVNode,
	toRef,
	computed,
	ref
} from 'vue';
export default defineComponent({
	props: {
		size: {
			type: Number,
			default: 32
		},
		fill: {
			type: Boolean,
			default: false
		},
		color: {
			type: String,
			default: '#e9e9e9'
		},
		stroke: {
			type: String,
			default: '#fadb14'
		},
		half: {
			type: Boolean,
			default: false
		}
	},
	setup(props, ctx) {
		const size = toRef(props, 'size')
		const fill = toRef(props, 'fill');
		const color = toRef(props, 'color');
		const stroke = toRef(props, 'stroke');
		const half = toRef(props, 'half');

		return function() {
			return createVNode("svg", {
				"width": size.value,
				"height": size.value,
				"viewBox": '0 0 48 48',
				"fill": "none",
			}, [createVNode("path", {
				"d": "M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z",
				"fill": fill.value ? stroke.value : 'none',
				"stroke": fill.value ? stroke.value : color.value,
				"stroke-width": 4,
				"stroke-linejoin": "bevel"
			}, null)]);
		}
	}
});
