<template>
	<div class="e-layout-center-component" :class="{
		'e-layout-hasSider':has.sider,
		'e-layout-hasWest':has.west,
		'e-layout-hasEast':has.east,
	}">
		<slot></slot>
	</div>
</template>

<script>
	import {defineComponent,computed} from 'vue'
	export default defineComponent({
		name:'LayoutCenter',
		props:{
			
		},
		setup(props,ctx){
			const has = computed(()=>{
				let has = {sider:false,west:false,east:false};
				ctx.slots.default().forEach((c)=>{
					if(c.type.name=='LayoutSider'){
						has.sider = true
					}
					if(c.type.name=='LayoutWest'){
						has.west = true
					}
					if(c.type.name=='LayoutEast'){
						has.east = true
					}
				})
				return has;
			})
			
			return {
				has,
			};
		}
	})
</script>

<style>
	@import url('../../styles/layout.css');
</style>
