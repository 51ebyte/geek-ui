<template>
	<div :class="styles.class.default" :style="styles.style.default">
		<span v-if="(text && !vertical) || hasTextSlot" class="e-divider-text" :style="styles.style.text">
			<slot name="text">{{ text }}</slot>
		</span>
		<div v-if="hasSlot" class="e-divider-content"><slot></slot></div>
	</div>
</template>

<script>
import { defineComponent, computed, toRef } from 'vue';
export default defineComponent({
	name: 'Divider',
	props: {
		text: {
			type: String,
			default: ''
		},
		vertical: {
			type: Boolean,
			default: false
		},
		dashed: {
			type: Boolean,
			default: false
		},
		left: {
			type: [Boolean, Number, String],
			default: false
		},
		color: {
			type: String,
			default: '#E8EAEC'
		},
		height: {
			type: [Number, String],
			default: 1
		},
		width: {
			type: [Number, String],
			default: 1
		},
		margin: {
			type: [Number, String],
			default: ''
		}
	},
	setup(props, ctx) {
		const vertical = toRef(props, 'vertical').value;

		const styles = computed(() => {
			const dashed = toRef(props, 'dashed').value;
			const left = toRef(props, 'left').value;
			const color = toRef(props, 'color').value;
			const width = toRef(props, 'width').value;
			const height = toRef(props, 'height').value;
			const margin = toRef(props, 'margin').value;

			var classs = {
				default: ['e-divider']
			};
			classs.default.push(vertical ? 'e-divider-vertical' : 'e-divider-horizontal');
			classs.default.push(dashed && !vertical ? 'e-divider-dashed' : '');

			var style = {
				default: {},
				text: {}
			};

			if (typeof left == 'boolean' && left) {
				style.text['left'] = '5%';
				style.text['transform'] = 'translate(0px,-50%)';
			} else if (typeof left == 'number') {
				style.text['left'] = left + 'px';
				style.text['transform'] = 'translate(0px,-50%)';
			} else if (typeof left == 'string') {
				style.text['left'] = left;
				style.text['transform'] = 'translate(0px,-50%)';
			}

			if (typeof margin == 'number') {
				style.default['margin'] = `${margin}px`;
			} else if (typeof margin == 'string') {
				style.default['margin'] = margin;
			}

			if (!vertical) {
				style.default['border-top-width'] = typeof height == 'number' ? `${height}px` : height;
				style.default['border-top-style'] = dashed ? `dashed` : 'soild';
				style.default['border-color'] = color;
			} else {
				style.default['background'] = color;
				style.default['width'] = width > 1 ? width + 'px' : '';
				style.default['height'] = height > 1 ? height + 'px' : height + 'em';
			}

			return {
				class: classs,
				style
			};
		});
		return {
			styles,
			hasSlot: !!ctx.slots.default && !vertical,
			hasTextSlot: !!ctx.slots.text && !vertical
		};
	}
});
</script>

<style>
@import url('../../styles/divider.css');
</style>
