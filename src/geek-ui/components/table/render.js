import {
	h,
	defineComponent
} from 'vue';
export default defineComponent({
	name: 'TableRender',
	props:{
		render:Object
	},
	setup(props) {
		return ()=>{
			return props.render;
		};
	}
});
