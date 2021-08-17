<template>
	<div :class="classs" :style="styles.default">
		<div :style="styles.childnre"><slot></slot></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRef, computed, inject } from 'vue';
export default defineComponent({
	name: 'Col',
	props: {
		span: {
			type: Number
		},
		offset: {
			type: Number
		},
		color: {
			type: String
		},
		background: {
			type: String
		},
		padding: {
			type: Number
		}
	},
	setup(props, ctx) {
		const { gutter } = inject('Row', { gutter: { value: 0 } });

		const span = toRef(props, 'span').value;
		const offset = toRef(props, 'offset').value;
		const color = toRef(props, 'color').value;
		const padding = toRef(props, 'padding').value;
		const background = toRef(props, 'background').value;
		const styles = computed(() => {
			var option = {
				default: {},
				childnre: {}
			};
			if (gutter) {
				option.default['padding'] = gutter / 2 + 'px';
			}
			option.childnre['color'] = color || '';
			option.childnre['background'] = background || '';
			option.childnre['padding'] = padding ? padding + 'px' : '';
			return option;
		});
		const classs = computed(() => {
			var option = ['e-row-col'];
			option.push(span ? 'e-row-col-span-' + span : '');
			option.push(offset ? 'e-row-col-offset-' + offset : '');
			return option;
		});

		return {
			classs,
			styles
		};
	}
});
</script>

<style>
@import url('../../styles/row.css');
</style>
