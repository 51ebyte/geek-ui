<template>
	<div class="e-input-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
		<Icon class="icon-clear" :size="16" name="ios-close-circle" v-if="showClear" @mousedown.prevent @click="handleClear"></Icon>
		<input
			:value="modelValue"
			:class="classs"
			:style="styles"
			autocomplete="off"
			@input="handleInput"
			@focus="handleFocus"
			@blur="handleBlur"
			@change="handleChange"
			@keydown="handleKeydown"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent,toRef, ref, computed, watch, nextTick, onMounted, onUpdated } from 'vue';
import { config } from './../../lib/index.js';
import { UPDATE_MODEL_VALUE_EVENT } from './../../lib/constants.js';
export default defineComponent({
	name: 'Input',
	props: {
		modelValue: {
			type: [String, Number],
			default: ''
		},
		//是否长输入框
		long: {
			type: Boolean,
			default: false
		},
		//显示清空图标
		clearable: {
			type: Boolean,
			default: false
		}
	},
	emits: [UPDATE_MODEL_VALUE_EVENT, 'input', 'change', 'focus', 'blur', 'clear', 'mouseleave', 'mouseenter', 'keydown'],
	setup(props, ctx) {
		const theme = config.getter('theme');
		let classs = ['e-input', theme ? 'e-theme-' + theme : ''];
		let styles = {};
		const long = toRef(props, 'long').value;
		const clearable = toRef(props, 'clearable').value;
		if (long) {
			styles['width'] = '100%';
		}

		const input = ref(null);
		const textarea = ref(null);
		const focused = ref(false);
		const hovering = ref(false);

		const inputValue = computed(() => (props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue)));
		let showClear = computed(() => {
			return props.clearable && !props.readonly && (focused.value || hovering.value);
		});

		onMounted(() => {
			// setNativeInputValue()
			// updateIconOffset()
			// nextTick(resizeTextarea)
		});

		onUpdated(() => {
			// nextTick(updateIconOffset)
		});

		const handleInput = (evt: MouseEvent) => {
			const { value } = evt.target;
			if (value === inputValue.value) return;
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, value);
			ctx.emit('input', value);
		};

		const handleChange = (evt: MouseEvent) => {
			ctx.emit('change', evt.target.value);
		};

		const handleKeydown = (evt: MouseEvent) => {
			ctx.emit('keydown', evt);
		};

		const handleFocus = (evt: MouseEvent) => {
			classs.push('e-input-focus');
			focused.value = true;
			ctx.emit('focus', evt);
		};

		const handleBlur = (evt: MouseEvent) => {
			let index = classs.findIndex(e => e == 'e-input-focus');
			classs.splice(index, 1);
			focused.value = false;
			ctx.emit('blur', evt);
		};

		const handleClear = (evt: MouseEvent) => {
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, '');
			ctx.emit('change', '');
			ctx.emit('clear');
		};

		const onMouseEnter = (evt: MouseEvent) => {
			hovering.value = true;
			ctx.emit('mouseenter', evt);
		};
		const onMouseLeave = (evt: MouseEvent) => {
			hovering.value = false;
			ctx.emit('mouseleave', evt);
		};

		return {
			classs,
			styles,
			showClear,
			handleInput,
			handleFocus,
			handleBlur,
			handleChange,
			handleKeydown,
			handleClear,
			onMouseEnter,
			onMouseLeave
		};
	}
});
</script>

<style>
@import url('../../styles/input.css');
</style>
