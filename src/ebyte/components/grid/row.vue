<template>
	<div :class="classs" :style="styles">
		<template v-if="list">
			<template v-for="(item, index) in list">
				<slot :item="item" :index="index">{{ item }}</slot>
			</template>
		</template>
		<template v-else>
			<slot></slot>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRef, computed, provide } from 'vue';
export default defineComponent({
	name: 'Row',
	props: {
		gutter: {
			type: Number
		},
		list: {
			type: Array
		},
		justify: {
			type: String
		},
		align: {
			type: String
		},
		wrap: {
			type: Boolean,
			default: false
		}
	},
	setup(props, ctx) {
		const wrap = toRef(props, 'wrap').value;
		const gutter = toRef(props, 'gutter').value;
		const justify = toRef(props, 'justify').value;
		const align = toRef(props, 'align').value;
		provide('Row', {
			gutter
		});

		const styles = computed(() => {
			var option = {};
			if (gutter) {
				option['margin-left'] = -gutter / 2 + 'px';
				option['margin-right'] = -gutter / 2 + 'px';
			}
			return option;
		});
		const classs = computed(() => {
			var option = ['e-row', 'e-flex'];
			option.push(wrap ? 'e-flex-wrap' : '');
			option.push(justify ? 'e-row-' + justify : '');
			option.push(align ? 'e-col-' + align : '');
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
