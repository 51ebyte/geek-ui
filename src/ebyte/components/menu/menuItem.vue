<template>
	<div class="e-menu-item" :class="{
			'e-menu-item-active': isActive
		}" @click="handleClickItem">
			<slot></slot>
	</div>
</template>

<script>
	import { defineComponent,toRef,getCurrentInstance,inject,computed,ref } from 'vue';
	export default defineComponent({
		name: 'MenuItem',
		props:{
			keys:{
				type:String
			},
			to:{
				type:Object
			},
			replace:{
				type:Boolean
			},
			isActive: {
				type: Boolean,
				default: false
			},
		},
		setup(props,ctx){
			const to = toRef(props,'to').value;
			
			const { proxy } = getCurrentInstance();
			
			const menuActive = inject('menuActive',{value:''})
			
			const openMenuLevel = ref([])
			const isActive = computed(()=>{
				let is = props.keys == menuActive.value;
				if(is){
					openMenuLevel.value = [menuActive.value]
					let Menu = findComponents(proxy.$parent);
					Menu.open = openMenuLevel.value
				}
				return is
			})
			
			const findComponents = component => {
				if (component.$options.name == 'Menu') {
					return component;
				}
				if(component.$options.name == "SubMenu"){
					openMenuLevel.value.push(component.name)
				}
				return findComponents(component.$parent);
			};
			
			const handleClickItem = (evt) => {
				let Menu = findComponents(proxy.$parent);
				Menu.active = props.keys;
				
				if (typeof to == 'object') {
					let _target = to.target || '';
					if (typeof to.href == 'string') {
						if (_target == '_blank') {
							window.open(to.href, '_blank');
						} else {
							window.open(to.href, '_self');
						}
						return;
					}
					let routes = proxy.$router.getRoutes();
					if (routes.findIndex(e => e.name == to.name || e.path == to.path) >= 0) {
						if (_target == '_blank') {
							const { href } = proxy.$router.resolve(to);
							window.open(href, '_blank');
						} else {
							proxy.$router.push(to);
						}
					} else {
						console.error('路由地址不存在');
					}
				} else if (typeof to == 'string') {
					let _target = target || '';
					if (_target == '_blank') {
						const { href } = proxy.$router.resolve({
							name: to
						});
						window.open(href, '_blank');
					} else {
						console.log(to)
						proxy.$router.push({
							name: to
						});
					}
				} 
			};
			return {
				isActive,
				handleClickItem
			}
		}
	})
</script>

<style>
</style>
