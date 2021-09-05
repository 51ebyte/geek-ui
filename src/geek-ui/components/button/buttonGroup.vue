<template>
	<div :class="classs" :style="styles"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent, provide, toRef, computed } from 'vue';

type ButtonSize = PropType<'xl' | 'lg' | 'md' | 'sm'>;

interface ButtonProps {
	size: ButtonSize;
}
export default defineComponent({
	name: 'ButtonGroup',
	props: {
		size: {
			type: String as ButtonSize,
			validator: (val: string) => {
				return ['xl', 'lg', 'md', 'sm'].includes(val);
			}
		},
		vertical: {
			type: Boolean,
			default: false
		},
		circle: {
			type: Boolean,
			default: false
		}
	},
	setup(props, ctx) {
		if (props.size) {
			provide('btnGroupSize', props.size);
		}
		const vertical = toRef(props, 'vertical').value;
		const circle = toRef(props, 'circle').value;
		const classs = computed(() => {
			var classs = ['e-button-group', 'e-flex'];
			classs.push(vertical ? 'e-flex-col e-col-top' : '');
			classs.push(circle ? 'e-button-group-radius' : '');
			return classs;
		});
		const styles = computed(() => {
			var styles = {};
			styles['border-top-left-radius'] = '20px';
			return styles;
		});
		return {
			classs,
			styles
		};
	}
});
</script>

<style>
.e-button-group .e-button {
	border-radius: 0;
	margin-left: 0px !important;
	position: relative;
	margin-right: 1px;
}

.e-button-group .e-button:first-child {
	border-radius: 2px 0 0 2px;
}
.e-button-group .e-button:last-child {
	border-radius: 0 2px 2px 0;
	margin-right: 0px !important;
}

.e-button-group.e-button-group-radius .e-button {
	border-radius: 32px;
	margin: 0px;
}

.e-button-group.e-button-group-radius:not(.e-flex-col) .e-button:not(:last-child) {
	border-bottom-right-radius: 0;
	border-top-right-radius: 0;
}

.e-button-group.e-button-group-radius:not(.e-flex-col) .e-button:not(:first-child) {
	border-bottom-left-radius: 0;
	border-top-left-radius: 0;
}
</style>
