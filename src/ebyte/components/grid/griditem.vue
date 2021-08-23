<template>
	<template v-if="list">
		<div :class="{
				'e-grid-item': true,
				'e-grid-item-hover': hover
			}"
			:style="styles"
			v-for="(item, index) in list"
			v-bind:key="index"
			@click="handleClickItem(item, index, $event)"
		>
			<slot :item="item" :index="index">{{ item }}</slot>
		</div>
	</template>
	<div v-else :class="{
			'e-grid-item': true,
			'e-grid-item-hover': hover
		}" :style="styles" @click="handleClickItem(item, index, $event)"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent, toRef, computed, inject } from 'vue';
export default defineComponent({
	name: 'GridItem',
	props: {
		list: {
			type: Array
		},
		gap: {
			type: Number
		},
		col: {
			type: Number,
			default: 12
		},
		border: {
			type: [Boolean, Object],
			default: true
		},
		hover: {
			type: Boolean,
			default: true
		},
		padding: {
			type: [String, Number]
		},
		background: {
			type: String
		}
	},
	emits: ['click'],
	setup(props, ctx) {
		const list = toRef(props, 'list').value;
		const gap = inject('gridGap', props.gap);
		const col = inject('gridCol', props.col);
		const border = inject('gridBorder', props.border);
		const hover = inject('gridHover', props.hover);
		const padding = inject('gridPadding', props.padding);
		const background = toRef(props,'background').value;
		
		const styles = computed(() => {
			var styles = {};
			if (gap) {
				styles['padding'] = gap / 2 + 'px';
			}
			if (col > 1) {
				styles['width'] = 'calc(100% / ' + col + ')';
			}
			if (border) {
				if ((typeof border == 'object' || typeof props.border == 'object') && (border.color || props.border.color)) {
					const color = border.color || props.border.color
					styles['box-shadow'] =
						'1px 0 0 0 ' +
						color +
						', 0 1px 0 0 ' +
						color +
						', 1px 1px 0 0 ' +
						color +
						', inset 1px 0 0 0 ' +
						color +
						', inset 0 1px 0 0 ' +
						color +
						'';
				}
				if (typeof border == 'object' && border.postion == 'outside') {
					styles['box-shadow'] = 'none';
				}
			}else{
        styles['box-shadow'] = 'none';
      }
			if(!hover){
				styles['box-shadow'] = 'none';
			}
			if (padding || props.padding) {
				const paddi = padding || props.padding;
				styles['padding'] = typeof paddi == 'number' ? paddi + 'px' : paddi;
			}
			if (background) {
				styles['background'] = background;
			}
			return styles;
		});

		const handleClickItem = (item, index, evt:MouseEvent) => {
			ctx.emit('click', item, index, evt);
		};
		return {
			styles,
			hover,
			handleClickItem
		};
	}
});
</script>

<style>
@import url('../../styles/grid.css');
</style>
