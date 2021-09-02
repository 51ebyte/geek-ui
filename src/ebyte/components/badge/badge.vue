<template>
	<div :class="['e-badge',status?`e-badge-${status}`:'',offset==false?'e-badge-ignore':'']">
		<div class="e-badge-container e-badge-custom" :style="{
			background:color
		}" v-if="hasBadge">
			<slot name="badge"></slot>
		</div>
		<span class="e-badge-container e-badge-number" :style="{
			background:color
		}" v-else-if="count>=0">{{ number }}</span>
		<span class="e-badge-container e-badge-text" :style="{
			background:color
		}"  v-else-if="text">{{ text }}</span>
		<span class="e-badge-container e-badge-dot" :style="{
			background:color
		}"  v-else>
		</span>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent,PropType, toRef, computed } from 'vue';
export default defineComponent({
	name: 'Badge',
	props: {
		count: {
			type: Number
		},
		maxCount: {
			type: Number
		},
		text: {
			type: String
		},
		color: {
			type: String
		},
		status: {
			type: String as PropType<'primary' | 'success' | 'warning' | 'error' | 'info'>,
			validator: (val: string) => {
				if (val != '') {
					return ['primary', 'success', 'warning', 'error', 'info'].includes(val);
				}
				return true;
			}
		},
		offset:{
			type:[Array,Boolean],
			default:true
		}
	},
	setup(props, ctx) {
		const number = computed(() => {
			if (props.count && props.maxCount && props.count > props.maxCount) {
				return `${props.maxCount}+`;
			}
			return props.count;
		});
		return {
			number,
			hasSlot:!!ctx.slots.default,
			hasBadge:!!ctx.slots.badge
		};
	}
});
</script>

<style>
@import url('../../styles/badge.css');
</style>
