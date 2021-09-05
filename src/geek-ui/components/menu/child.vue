<template>
	<div class="e-menu-sub" @mouseleave="mouseLeave">
		<div ref="menuItemRef" class="e-menu-item e-menu-item-suffix"
			:class="{
				'e-menu-item-open': hasOpen
			}"
			@click="handleCollapse"
		>
			<span class="text">{{ name }}</span>
			<span class="suffix-icon" v-if="list"></span>
		</div>
		<transition-collapse v-if="list">
		<div class="e-menu-children" ref="menuChildRef" :style="styles" v-show="hasOpen">
			<template v-for="(item, index) in list">
				<template v-if="item.children">
					<menu-child :keys="item.keys" :name="item.name" :list="item.children"></menu-child>
				</template>
				<menu-item :item="item" v-else></menu-item>
			</template>
		</div>
		</transition-collapse>
	</div>
</template>

<script>
import { defineComponent, computed, toRef, ref, watch, inject, getCurrentInstance, nextTick } from 'vue';
import TransitionCollapse from '../base/transition/collapse';
import menuGroup from './group.vue';
import menuItem from './item.vue';
export default defineComponent({
	name: 'MenuChild',
	components: {
		menuGroup,
		menuItem,
		TransitionCollapse
	},
	props: {
		name: {
			type: String
		},
		keys: {
			type: String
		},
		list: {
			type: Array
		},
		left: {
			type: Number,
			default: 0
		}
	},
	emits: ['click'],
	setup: (props, ctx) => {
		const menuItemRef = ref();
		const menuChildRef = ref()

		const menuOpen = inject('menuOpen', ['']);
		const menuAccordion = inject('menuAccordion', false);
		const menuHorizontal = inject('menuHorizontal', false);

		const hasOpen = ref(menuOpen ? menuOpen.value.includes(props.name) : []);
		watch(menuOpen, n => {
			hasOpen.value = n.includes(props.name);
		});

		const styles = ref([]);

		const { proxy } = getCurrentInstance();
		const openMenuLevel = ref([]);
		const findComponents = component => {
			if (component.$options.name == 'Menu') {
				return component;
			}
			if (component.$options.name == 'MenuChild') {
				openMenuLevel.value.push(component.name);
			}
			return findComponents(component.$parent);
		};

		const handleCollapse = evt => {
			hasOpen.value = !hasOpen.value;
			if (menuAccordion.value) {
				openMenuLevel.value = [hasOpen.value ? props.name : ''];
				let Menu = findComponents(proxy.$parent);
				Menu.open = openMenuLevel.value.filter(s => s && s.trim());
			}
			
			if(menuHorizontal.value && props.list && hasOpen.value){
				nextTick(()=>{
					styles.value = {
						right: '-'+proxy.$refs.menuChildRef.offsetWidth + 'px'
					};
				})
			}
		};
		const mouseLeave = evt => {
			if(menuHorizontal.value && props.list && hasOpen.value){
				// hasOpen.value = false;
			}
		};
		return {
			styles,
			menuItemRef,
			menuOpen,
			hasOpen,
			mouseLeave,
			handleCollapse
		};
	}
});
</script>

<style>
@import url('../../styles/menu.css');
</style>
