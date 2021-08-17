<template>
	<div class="e-menu-sub">
		<div class="e-menu-item" @click="handleCollapse">
			<div class="e-menu-item-box e-menu-item-suffix">
				<span class="text">{{ text }}</span>
				<span class="suffix-icon" v-if="isChildren" :class="{open:hasOpen}"></span>
			</div>
		</div>
		<transition-collapse v-if="isChildren">
			<div class="e-menu-children" v-show="hasOpen">
				<slot></slot>
			</div>
		</transition-collapse>
	</div>
</template>

<script>
import { defineComponent, computed, toRef, ref, watch, inject,getCurrentInstance } from 'vue';
import TransitionCollapse from '../base/transition/collapse';
import menuGroup from './group.vue';
import menuItem from './item.vue';
export default defineComponent({
	name: 'SubMenu',
	components: {
		menuGroup,
		menuItem,
		TransitionCollapse
	},
	props: {
		name: {
			type: String
		},
		text: {
			type: String
		}
	},
	emits: ['click'],
	setup: (props, ctx) => {
		const menuOpen = inject('menuOpen',[])
		const menuAccordion = inject('menuAccordion',{value:false});
		const hasOpen = ref(menuOpen.value.includes(props.name))
		watch(menuOpen,(n)=>{
			hasOpen.value = menuOpen.value.includes(props.name);
		})
		
		const { proxy } = getCurrentInstance();
		const openMenuLevel = ref([])
		const findComponents = (component)=>{
			if(component.$options.name=="Menu"){
				return component;
			}
			if(component.$options.name=="SubMenu"){
				openMenuLevel.value.push(component.name)
			}
			return findComponents(component.$parent)
		}
		
		const handleCollapse = (evt) => {
			hasOpen.value = !hasOpen.value;
			if(menuAccordion.value){
				openMenuLevel.value = [hasOpen.value?props.name:'']
				let Menu = findComponents(proxy.$parent);
				Menu.open = openMenuLevel.value
			}
		};
		return {
			menuOpen,
			hasOpen,
			isChildren:!!ctx.slots.default,
			handleCollapse
		};
	}
});
</script>

<style>
@import url('../../styles/menu.css');
</style>
