<template>
	<component :is="layoutName"></component>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'App',
	props: {
		layout: {
			type: String,
			default: 'layout-default'
		}
	},
	computed: {
		layoutName() {
			const layout = this.$route.meta.layout;
			return layout ? 'layout-' + layout : this.layout;
		}
	}
});
</script>
