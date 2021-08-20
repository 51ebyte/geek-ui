<template>
	<div class="e-tags">
		<template v-for="(item) in list">
			<tag></tag>
		</template>
		<template v-for="c in blue">
			<tag :style="{
				background:c,
				color:'white'
			}"></tag>
		</template>
		<template v-for="c in color">
			<tag :style="{
				background:c,
				color:'@geekblue-1'
			}"></tag>
		</template>
	</div>
</template>

<script>
	import { defineComponent } from 'vue'
	import tag from './tag.vue'
	import { blue } from '@ant-design/colors';
	import color from '../../color/colorPalette.js'
	export default defineComponent({
		name:'Tags',
		components:{
			tag
		},
		props:{
			list:{
				type:Array
			}
		},
		setup(props,ctx){
			
			return {
				blue,
				color:[
					color('blue',1),
					color('blue',2),
					color('blue',3),
					color('blue',4),
					color('blue',5),
					color('blue',6),
					color('blue',7),
					color('blue',8),
					color('blue',9),
					color('blue',10)
				],
			}
			
		}
	})
</script>

<style>
	@import url("../../styles/tag.css");
</style>
