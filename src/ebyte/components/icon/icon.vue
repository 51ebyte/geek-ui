<template>
	<template v-if="title">
		<span class="e-flex e-col-center" style="cursor: pointer;" @click="handleClick">
			<i :class="['e-icon','icon-'+name]" :style="styles"></i>
			<label :style="{ lineHeight: size + 'px', marginLeft: '4px' }">{{ title }}</label>
		</span>
	</template>
	<template v-else>
		<i :class="classs" :style="styles"></i>
	</template>
</template>

<script lang="ts">
import { h, toRef, defineComponent, computed, watch,ref } from 'vue';
import { config } from '../../lib/index.js';
export default defineComponent({
	name: 'Icon',
	props: {
		name: {
			type: String
		},
		size: {
			type: [Number, String],
			default: 24
		},
		color: {
			type: String
		},
		title: {
			type: String
		}
	},

	emits: ['click','update'],

	setup(props, ctx) {

		const name = toRef(props, 'name').value;
		const size = toRef(props, 'size').value;
		const color = toRef(props, 'color').value;

		var styles = computed(() => {
			return {
				color: color,
				fontSize: size + 'px'
			};
		});

		const handleClick = (evt: MouseEvent) => {
			ctx.emit('click', evt);
		};

		return {
			styles,
			handleClick
		};
	}
});
</script>

<style>
	.e-icon{
		transition: all 0.5s;
	}
</style>
