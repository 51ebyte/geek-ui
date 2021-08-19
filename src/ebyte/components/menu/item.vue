<template>
	<div class="e-menu-item" :class="{
				'e-menu-item-prefix': item.icon,
				'e-menu-item-active': isActive(item)
			}" @click="handleClickItem">
			<Icon class="prefix-icon" :name="item.icon"></Icon>
			<span class="text">{{item.name}}</span>
	</div>
</template>

<script>
import { defineComponent, computed, toRef, ref, getCurrentInstance, inject } from 'vue';
export default defineComponent({
	name: 'MenuItem',
	props: {
		item: {
			type: Object
		},
	},
	emits: ['click', 'collapse'],
	setup: (props, ctx) => {
		const item = toRef(props, 'item').value;
		const { proxy } = getCurrentInstance();
		const menuActive = inject('menuActive',{value:''})
		
		const openMenuLevel = ref([])
		const isActive = (item)=>{
			let is = false
			if(menuActive.value && item.name){
				is = item.keys == menuActive.value 
			}else{
				is = (proxy.$route.name == item.keys || proxy.$route.name == item.to);
			}
			
			if(is){
				openMenuLevel.value = [menuActive.value]
				let Menu = findComponents(proxy.$parent);
				Menu.open = openMenuLevel.value
			}
			return is
		}
		
		const findComponents = component => {
			if (component.$options.name == 'Menu') {
				return component;
			}
			if(component.$options.name == "MenuChild"){
				openMenuLevel.value.push(component.name)
			}
			return findComponents(component.$parent);
		};
		

		const handleClickItem = () => {
			let Menu = findComponents(proxy.$parent);
			Menu.active = item.keys;
			
			if (item.children) {
				hasOpen.value = !hasOpen.value;
				ctx.emit('collapse', item, hasOpen.value);
				return;
			}
			ctx.emit('click', item, props.keys);
			if (typeof item.to == 'object') {
				let _target = item.to.target || '';
				if (typeof item.to.href == 'string') {
					if (_target == '_blank') {
						window.open(item.to.href, '_blank');
					} else {
						window.open(item.to.href, '_self');
					}
					return;
				}
				let routes = proxy.$router.getRoutes();
				if (routes.findIndex(e => e.name == item.to.name || e.path == item.to.path) >= 0) {
					if (_target == '_blank') {
						const { href } = proxy.$router.resolve(item.to);
						window.open(href, '_blank');
					} else {
						proxy.$router.push(item.to);
					}
				} else {
					console.error('路由地址不存在');
				}
			} else if (typeof item.to == 'string') {
				let _target = item.target || '';
				if (_target == '_blank') {
					const { href } = proxy.$router.resolve({
						name: item.to
					});
					window.open(href, '_blank');
				} else {
					proxy.$router.push({
						name: item.to
					});
				}
			} else if (typeof item.href == 'string') {
				let _target = item.target || '';
				if (_target == '_blank') {
					window.open(item.href, '_blank');
				} else {
					window.open(item.href, '_self');
				}
			}
		};

		return {
			isActive,
			handleClickItem
		};
	}
});
</script>

<style>
@import url('../../styles/menu.css');
</style>
