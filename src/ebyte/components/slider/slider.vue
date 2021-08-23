<template>
	<div :class="classs" :style="style.default" ref="sliderRef">
		<div class="e-slider-warp">
			<div class="e-slider-bar" :style="style.bar"></div>
      <div
      	class="e-slider-bar-btn"
        :style="style.btn"
      	@mouseenter="handleMouseEnter"
      	@mouseleave="handleMouseLeave"
      	@mousedown="onButtonDown"
      	@touchstart="onButtonDown"
      	@focus="handleMouseEnter"
      	@blur="handleMouseLeave"
      	@keydown.left="onLeftKeyDown"
      	@keydown.right="onRightKeyDown"
      	@keydown.down.prevent="onLeftKeyDown"
      	@keydown.up.prevent="onRightKeyDown"
      ></div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRefs, toRef, onMounted } from 'vue';
import { UPDATE_MODEL_VALUE_EVENT } from './../../lib/constants.js';
import util from './../../lib/util.js';
import slider from './slider.js';

export default defineComponent({
	name: 'Slider',
	props: {
		modelValue: {
			type: Number,
			default: 0
		},
		disabled: {
			type: Boolean,
			default: false
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		step: {
			type: Number,
			default: 1
		}
	},
	emits: [UPDATE_MODEL_VALUE_EVENT, 'change'],
	setup(props, ctx) {
		const option = {
			hovering: false,
			dragging: false,
			isClick: false,
			startX: 0,
			currentX: 0,
			startY: 0,
			currentY: 0,
			startPosition: 0,
			newPosition: 0,
			oldValue: 0
		};

		const sliderRef = ref(null);
		const disabled = toRef(props, 'disabled').value;
		const inputValue = computed(() => (props.modelValue === null || props.modelValue === undefined ? '' : props.modelValue));

		const classs = computed(() => {
			let classs = ['e-slider'];
			if (disabled) {
				classs.push('e-slider-disabled');
			}
			return classs;
		});

		const style = computed(() => {
			let style = { default: {}, bar: {},btn:{} };
			style.bar.width = currentPosition.value;
			style.btn.left = currentPosition.value;
			return style;
		});

		const sliderRefWidth = computed(() => {
			return sliderRef.value.offsetWidth;
		});

		const on = function(element, event, handler, useCapture = false) {
			if (element && event && handler) {
				element.addEventListener(event, handler, useCapture);
			}
		};
		const off = function(element, event, handler, useCapture = false) {
			if (element && event && handler) {
				element.removeEventListener(event, handler, useCapture);
			}
		};

		const currentPosition = computed(() => {
			return `${((inputValue.value - props.min) / (props.max - props.min)) * 100}%`;
		});

		const handleMouseEnter = () => {
			option.hovering = true;
		};

		const handleMouseLeave = () => {
			option.hovering = false;
		};

		const onLeftKeyDown = () => {
			if (disabled.value) return;
			option.newPosition = parseFloat(currentPosition.value) - (props.step / (props.max - props.min)) * 100;
			setPosition(option.newPosition);
		};

		const onRightKeyDown = () => {
			if (disabled.value) return;
			option.newPosition = parseFloat(currentPosition.value) + (props.step / (props.max - props.min)) * 100;
			setPosition(option.newPosition);
		};

		const getClientXY = (event: MouseEvent | TouchEvent) => {
			let clientX: number;
			let clientY: number;
			if (event.type.startsWith('touch')) {
				clientY = (event as TouchEvent).touches[0].clientY;
				clientX = (event as TouchEvent).touches[0].clientX;
			} else {
				clientY = (event as MouseEvent).clientY;
				clientX = (event as MouseEvent).clientX;
			}
			return {
				clientX,
				clientY
			};
		};

		const onButtonDown = (event: MouseEvent | TouchEvent) => {
			if (disabled) return;
			event.preventDefault();
			onDragStart(event);
			on(window, 'mousemove', onDragging);
			on(window, 'touchmove', onDragging);
			on(window, 'mouseup', onDragEnd);
			on(window, 'touchend', onDragEnd);
			on(window, 'contextmenu', onDragEnd);
		};

		const onDragStart = (event: MouseEvent | TouchEvent) => {
			option.isClick = true;
			const { clientX, clientY } = getClientXY(event);
			option.startX = clientX;
			option.startPosition = parseFloat(currentPosition.value);
			option.newPosition = option.startPosition;
			option.dragging = true;
			option.oldValue = inputValue.value;
		};

		const onDragging = (event: MouseEvent | TouchEvent) => {
			if (option.dragging) {
				option.isClick = false;
				const { clientX, clientY } = getClientXY(event);
				let diff = ((clientX - option.startX) / sliderRefWidth.value) * 100;
				option.newPosition = option.startPosition + diff;
				setPosition(option.newPosition);
			}
		};

		const onDragEnd = () => {
			if (option.dragging) {
				setTimeout(() => {
					option.dragging = false;
					if (!option.hovering) {
						// hideTooltip();
					}
					if (!option.isClick) {
						const tmp = inputValue.value > option.oldValue ? 1 : 0;
						const rand = (parseInt(inputValue.value / props.step) + tmp) * props.step;
						const value = ((rand - props.min) / (props.max - props.min)) * 100;
						setPosition(value);
						ctx.emit('change',value)
					}
				}, 0);
				off(window, 'mousemove', onDragging);
				off(window, 'touchmove', onDragging);
				off(window, 'mouseup', onDragEnd);
				off(window, 'touchend', onDragEnd);
				off(window, 'contextmenu', onDragEnd);
			}
		};

		const setPosition = newPosition => {
			if (newPosition === null || isNaN(newPosition)) return;
			if (newPosition < 0) {
				newPosition = 0;
			} else if (newPosition > 100) {
				newPosition = 100;
			}
			const lengthPerStep = 100 / (props.max - props.min);
			const steps = Math.round(newPosition / lengthPerStep);
			let value = steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min;
			value = parseFloat(value.toFixed(2));
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, value);
		};

		return {
			classs,
			style,
			sliderRef,
			inputValue,
			handleMouseEnter,
			handleMouseLeave,
			onButtonDown,
			onLeftKeyDown,
			onRightKeyDown
		};
	}
});
</script>

<style>
@import url('../../styles/slider.css');
</style>
