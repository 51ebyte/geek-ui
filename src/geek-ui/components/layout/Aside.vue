<template>
	<div class="e-layout-aside-component" :style="styles"><slot></slot></div>
</template>

<script>
import { defineComponent, computed } from 'vue';
export default defineComponent({
	name: 'LayoutAside',
	props: {
		width: {
			type: Number,
			default:64
		}
	},
	setup(props, ctx) {
		const styles = computed(() => {
			if (props.width) {
				return {
					width: props.width + 'px'
				};
			}
			return {};
		});
		return { styles };
	}
});
</script>

<style>
@import url('../../styles/layout.css');
</style>
