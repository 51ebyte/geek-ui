<template>
	<div class="e-layout-west"><slot></slot></div>
</template>

<script>
import { defineComponent,computed } from 'vue';
export default defineComponent({
	name: 'LayoutWest',
	props: {
		width: {
			type: Number,
			default: 0
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
