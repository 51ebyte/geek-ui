<template>
	<div :class="classs" :style="style" @click="handleClick">
		<span class="open" v-if="inputValue">
			<slot name="open">{{ text[0] || '' }}</slot>
		</span>
		<span class="close" v-else>
			<slot name="close">{{ text[1] || '' }}</slot>
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRefs, toRef, onMounted } from 'vue';
import { UPDATE_MODEL_VALUE_EVENT } from './../../lib/constants.js';
export default defineComponent({
	name: 'Switch',
	props: {
		modelValue: {
			type: Boolean,
			default: false
		},
		text: {
			type: Array,
			default: ['', '']
		},
		outside: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		color: {
			type: Array,
			default: []
		},
		before: {
			type: Function
		}
	},
	emits: [UPDATE_MODEL_VALUE_EVENT, 'change'],
	setup(props, ctx) {
		const isLoading = ref(false)
		const color = toRef(props, 'color').value;
		const outside = toRef(props, 'outside').value;
		const loading = toRef(props, 'loading').value;
		const disabled = toRef(props, 'disabled').value;
		const inputValue = computed(() => (props.modelValue === null || props.modelValue === undefined ? '' : props.modelValue));

		const classs = computed(() => {
			let classs = ['e-switch'];
			if (inputValue.value) {
				classs.push('e-switch-checked');
			}
			if (loading || isLoading.value) {
				classs.push('e-switch-loading');
			}
			if (disabled) {
				classs.push('e-switch-disabled');
			}
			if (outside) {
				classs.push('e-switch-outside');
			}
			return classs;
		});

		const style = computed(() => {
			let style = {};
			if (color[0] && inputValue.value) {
				style['border-color'] = color[0];
				style['background-color'] = color[0];
			}
			if (color[1] && !inputValue.value) {
				style['border-color'] = color[1];
				style['background-color'] = color[1];
			}
			return style;
		});
		const handleClick = (evt: MouseEvent) => {
			if (!disabled && !isLoading.value) {
				if (props.before != undefined) {
					isLoading.value = true;
					props.before().then(() => {
						let value = !inputValue.value;
						ctx.emit(UPDATE_MODEL_VALUE_EVENT, value);
						ctx.emit('change', value);
						isLoading.value = false;
					});
				} else {
					let value = !inputValue.value;
					ctx.emit(UPDATE_MODEL_VALUE_EVENT, value);
					ctx.emit('change', value);
				}
			}
		};
		return {
			classs,
			style,
			inputValue,
			handleClick
		};
	}
});
</script>

<style>
@import url('../../styles/switch.css');
</style>
