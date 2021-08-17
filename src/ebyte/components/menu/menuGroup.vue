<template>
	<div class="e-menu-group">
		<div class="text">{{ name }}</div>
		<div class="list">
			<template v-for="(item, index) in list" v-bind:key="index">
				<menu-item :item="item" :index="index" :current="current" @click="handleClickItem"></menu-item>
			</template>
		</div>
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
		list: {
			type: Array
		}
	},
	setup() {
		const current = ref(-1);
		const handleClickItem = (item, index) => {
			current.value = item;
			ctx.emit('click');
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
