<template>
</template>

<script>
import { defineComponent,createVNode } from 'vue';
export default defineComponent({
	name: 'check-out',
	props:{
		size:{
			type:Number,
			default:24
		},
		fill:{
			type:String,
			default:'#17bd08'
		}
	},
	setup(props, ctx) {
		return function(){
			
			return createVNode("svg", {
			  "width": props.size,
			  "height": props.size,
			  "viewBox": "0 0 48 48",
			  "fill": "none"
			}, [createVNode("path", {
			  "d": "M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z",
			  "fill": props.fill,
				"stroke": props.fill,
			  "stroke-width": 4,
			  "stroke-linecap": "round"
			}, null), createVNode("path", {
			  "d": "M16 24L22 30L34 18",
			  "stroke": "#FFF",
			  "stroke-width": 4,
			  "stroke-linecap": "round",
			  "stroke-linejoin": "round"
			}, null)]);
			
			
		}
	}
});
</script>