<template>
	<component :is="layoutName"></component>
</template>

<script>
import { defineComponent } from 'vue';
import util from '../../lib/util.js'
import backTop from './backTop.js'
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
		},
		backTopContainer(){
			return document.createElement('div');
		}
	},
	beforeUpdate(){
		backTop.clear()
	},
	updated() {
		let backTopConf = this.$route.meta.backTop;
		if (backTopConf != false) {
			let target = util.next(this.$el,'.e-layout-center-container')[0]
			backTop.handle(this.backTopContainer,target,backTopConf)
		}
	},
});
</script>
