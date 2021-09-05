<template>
	<div class="e-layout-south-component" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
	import {defineComponent,computed} from 'vue'
	export default defineComponent({
		name:'LayoutSouth',
		props: {
			height: {
				type: Number,
				default: 40
			}
		},
		setup(props, ctx) {
			const styles = computed(() => {
				if (props.height) {
					return {
						height: props.height + 'px'
					};
				}
				return {};
			});
			return { styles };
		}
	})
</script>

<style>
	@import url('../../styles/layout.css');
</style>
