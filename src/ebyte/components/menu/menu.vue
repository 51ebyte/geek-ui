<template>
	<div :class="['e-menu',horizontal?'e-flex':'e-flex-col']">
		<template v-if="list">
			<template v-for="(item, index) in list" v-bind:key="index">
				<template v-if="item.group">
					<menu-group :text="item.group" :list="item.list"></menu-group>
				</template>
				<template v-else>
					<template v-if="item.children">
						<menu-child :text="item.text" :name="item.name" :list="item.children" @click="handleClickItem"></menu-child>
					</template>
					<template v-else>
						<menu-item :item="item" @click="handleClickItem" @collapse="handleCollapse"></menu-item>
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
import { defineComponent, computed, toRef,ref,provide,reactive } from 'vue';
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
		
		const open = ref(props.open)
		const active = ref(props.active)
		const accordion = ref(props.accordion)
		
		provide('menuOpen',reactive(open));
		provide('menuActive',reactive(active));
		provide('menuAccordion',reactive(accordion));
		
		const handleClickItem = (item,keys) => {
			ctx.emit('click');
		};
		
		const handleCollapse = (item, isOpen) => {
			console.log(item)
			if(isOpen){
				open.value.push(item.name)
			}else{
				let index=open.value.findIndex(e=>e==item.name);
				open.value.splice(index,1)
			}
			console.log(open.value)
		};

		return {
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
