<template>
	<div class="e-menu-group">
		<div class="text">{{ name }}</div>
	</div>
</template>

<script>
import { defineComponent, computed, toRef, ref } from 'vue';
import menuItem from './item.vue';
export default defineComponent({
	components: {
		menuItem
	},
	props: {
		name: {
			type: String,
			default: ''
		},
	},
	setup() {
		const current = ref(-1);
		const handleClickItem = (item, index) => {
			// current.value = item;
			// ctx.emit('click');
		};
		return {
			current,
			handleClickItem
		};
	}
});
</script>

<style>
@import url('../../styles/menu.css');
</style>
