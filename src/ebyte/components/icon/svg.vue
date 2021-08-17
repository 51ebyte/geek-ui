<template>
	<div :class="styles">
		<component :is="name" :size="size" :fill="fill"></component>
		<label :style="{ lineHeight: size + 'px', height: size + 'px', marginLeft: '4px' }">{{ title }}</label>
	</div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import component from './svg';
export default defineComponent({
	components: component,
	props: {
		name: {
			type: String,
			default: ''
		},
		title: {
			type: String
		},
		size: {
			type: [Number, String],
			default: 18
		},
		fill: {
			type: String,
			default: '#17bd08'
		}
	},
	setup(props, ctx) {
		const styles = computed(() => {
			let styles = ['e-icon-svg'];
			if (props.title) {
				styles.push('e-flex e-col-center');
			}
			return styles;
		});
		return {
			styles
		};
	}
});
</script>

<style>
.e-icon-svg {
	transition: all 0.5s;
}
</style>
