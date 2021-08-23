<template>
	<div class="e-tags">
    
    <tag>标签1</tag>
    <tag type="primary">标签2</tag>
    <tag type="success">标签3</tag>
    <tag type="warning">标签4</tag>
    <tag type="error">标签5</tag>
    <tag type="info">标签6</tag>
    
    <tag closable>标签2</tag>
    <tag closable type="primary">标签2</tag>
    <tag closable type="success">标签3</tag>
    <tag closable type="warning">标签4</tag>
    <tag closable type="error">标签5</tag>
    <tag closable type="info">标签6</tag>
    
    
		
	</div>
</template>

<script>
	import { defineComponent } from 'vue'
	import tag from './tag.vue'
	// import { blue } from '@ant-design/colors';
	// import color from '../../color/colorPalette.js'
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
				
			}
			
		}
	})
</script>

<style>
	@import url("../../styles/tag.css");
</style>
