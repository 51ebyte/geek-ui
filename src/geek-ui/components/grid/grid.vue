<template>
	<div :class="classs" :style="styles">
		<template v-if="list">
			<GridItem :col="col" :gap="gap" :border="border" :list="list" v-slot="{ item, index }" @click="handleClickItem">
				<slot :item="item" :index="index">{{ item }}</slot>
			</GridItem>
		</template>
		<template v-else>
			<slot></slot>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRef, computed, provide } from 'vue';
import GridItem from './griditem.vue';
export default defineComponent({
	name: 'Grid',
	components: {
		GridItem
	},
	props: {
		list: {
			type: Array
		},
		gap: {
			type: Number
		},
		justify: {
			type: String,
			default:'center'
		},
		align: {
			type: String,
			default: 'center'
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
	},
	emits: ['click'],
	setup(props, ctx) {
		const list = toRef(props, 'list').value;
		const justify = toRef(props, 'justify').value;
		const align = toRef(props, 'align').value;
		const border = toRef(props, 'border').value;
		const hover = toRef(props, 'hover').value;
		const padding = toRef(props, 'padding').value;
		const gap = toRef(props, 'gap').value;
		const col = toRef(props, 'col').value;

		provide('gridCol', col);
		provide('gridGap', gap);
		provide('gridBorder', border);
		provide('gridHover', hover);
		provide('gridPadding', padding);

		const styles = computed(() => {
			var styles = {};
			if (gap) {
				styles['margin'] = '-' + gap / 2 + 'px';
			}
			if (border) {
				if (typeof border == 'object' && border.postion == 'outside') {
					styles['border'] = '1px solid ' + (border.color || '#e8eaec');
				}
			}
			return styles;
		});

		const classs = computed(() => {
			var option = ['e-grid', col > 1 ? 'e-flex' : 'e-flex-col', 'e-flex-wrap'];
			option.push(justify ? 'e-grid-' + justify : '');
			option.push(align ? 'e-grid-item-' + align : '');
			return option;
		});

		const handleClickItem = (item, index, evt) => {
			ctx.emit('click', item, index, evt);
		};

		return {
			styles,
			classs,
			handleClickItem
		};
	}
});
</script>

<style>
@import url('../../styles/grid.css');
</style>
