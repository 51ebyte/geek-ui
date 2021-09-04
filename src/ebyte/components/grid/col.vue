<template>
	<div :class="classs" :style="styles.default">
		<div :style="styles.childnre"><slot></slot></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRef, computed, inject,watch } from 'vue';
export default defineComponent({
	name: 'Col',
	props: {
		span: {
			type: [String, Number]
		},
		offset: {
			type: [String, Number]
		},
		color: {
			type: String
		},
		background: {
			type: String
		},
		padding: {
			type: [String, Number]
		}
	},
	setup(props, ctx) {
		const { gutter } = inject('Row', { gutter: { value: 0 } });

		const span = toRef(props, 'span');
		const offset = toRef(props, 'offset');
		const color = toRef(props, 'color');
		const padding = toRef(props, 'padding');
		const background = toRef(props, 'background');
		const styles = computed(() => {
			var option = {
				default: {},
				childnre: {}
			};
			if (gutter) {
				option.default['padding'] = gutter / 2 + 'px';
			}
			option.childnre['color'] = color.value || '';
			option.childnre['background'] = background.value || '';
			option.childnre['padding'] = padding.value ? (typeof padding.value == 'string' ? padding.value : padding.value + 'px') : '';
			return option;
		});
		const classs = computed(() => {
			var option = ['e-row-col'];
			option.push(span.value ? 'e-row-col-span-' + span.value : '');
			option.push(offset.value ? 'e-row-col-offset-' + offset.value : '');
			return option.filter(e=>e && e.trim());
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
