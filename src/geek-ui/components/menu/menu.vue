<template>
	<div :class="['e-menu',horizontal?'e-menu-horizontal':'e-menu-vertical']">
		<template v-if="list">
			<template v-for="(item, index) in list" v-bind:key="index">
				<template v-if="item.group">
					<menu-group :name="item.group" :list="item.list" :key="index"></menu-group>
				</template>
				<template v-else>
					<template v-if="item.children">
						<menu-child :key="index" :keys="item.keys" :name="item.name" :list="item.children" @click="handleClickItem"></menu-child>
					</template>
					<template v-else>
						<menu-item :key="index" :item="item" @click="handleClickItem" @collapse="handleCollapse"></menu-item>
					</template>
				</template>
			</template>
		</template>
		<template v-else>
			<slot></slot>
		</template>
	</div>
</template>

<script>
import { defineComponent, computed, toRef,ref,provide,reactive,watch } from 'vue';
import menuGroup from './group.vue';
import menuItem from './item.vue';
import menuChild from './child.vue';
export default defineComponent({
	name: 'Menu',
	components: {
		menuGroup,
		menuItem,
		menuChild,
	},
	props: {
		list: {
			type: Array
		},
		horizontal: {
			type: Boolean,
			default: false
		},
		accordion:{
			type: Boolean,
			default: false
		},
		active:{
			type: String,
			default:''
		},
		open:{
			type: Array,
			default:()=>{
				return [];
			}
		}
	},
	emits: ['click'],
	setup: (props, ctx) => {
		
		const list = ref(props.list)
		watch(()=>props.list,(n)=>{
			list.value = n;
		})
		
		const open = ref(props.open)
		const active = ref(props.active)
		const accordion = ref(props.accordion)
		const horizontal = ref(props.horizontal)
		
		provide('menuOpen',reactive(open));
		provide('menuActive',reactive(active));
		provide('menuAccordion',reactive(accordion));
		provide('menuHorizontal',reactive(horizontal));
		
		const handleClickItem = (item,keys) => {
			ctx.emit('click');
		};
		
		const handleCollapse = (item, isOpen) => {
			if(isOpen){
				open.value.push(item.name)
			}else{
				let index=open.value.findIndex(e=>e==item.name);
				open.value.splice(index,1)
			}
		};

		return {
			list,
			active,
			open,
			handleClickItem,
			handleCollapse
		};
	}
});
</script>

<style>
@import url('../../styles/menu.css');
</style>
