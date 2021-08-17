<template>
	<div :class="classs">
		<template v-for="(item, index) in list" v-bind:key="index">
			<template v-if="item.group">
				<menu-group :name="item.group" :list="item.list"></menu-group>
			</template>
			<template v-else>
				<menu-item :item="item" :index="index" :current="current" @click="handleClickItem"></menu-item>
			</template>
		</template>
	</div>
</template>

<script>
import { defineComponent, computed, toRef,ref } from 'vue';
import menuGroup from './group.vue';
import menuItem from './item.vue';
export default defineComponent({
	name: 'Menu',
	components: {
		menuGroup,
		menuItem
	},
	props: {
		list: {
			type: Array
		},
		horizontal: {
			type: Boolean,
			default: false
		}
	},
	emits: ['click'],
	setup: (props, ctx) => {
		const horizontal = toRef(props, 'horizontal').value;

		const classs = computed(() => {
			let classs = ['e-menu'];
			if (horizontal) {
				classs.push('e-flex');
			} else {
				classs.push('e-flex-col');
			}
			return classs;
		});
		
		const current = ref(-1)

		const handleClickItem = (item,index) => {
			current.value = item
			ctx.emit('click');
		};

		return {
			classs,
			current,
			handleClickItem
		};
	}
});
</script>

<style>
@import url('../../styles/menu.css');
</style>
