<template>
	<button :class="classs" :style="styles" :disabled="disabled" @click="$emit('click')">
		<icon :option="icon" v-if="icon"></icon>
		<span><slot></slot></span>
	</button>
</template>

<script lang="ts">
import { h, toRef } from 'vue';
import { config, util } from '../../lib/index.js';

type ButtonType = PropType<'primary' | 'success' | 'warning' | 'error' | 'info'>;
type ButtonSize = PropType<'xl' | 'lg' | 'md' | 'sm'>;

interface ButtonProps {
	type: ButtonType;
	size: ButtonSize;
}

export default {
	name: 'Button',
	props: {
		type: {
			type: String as ButtonType,
			validator: (val: string) => {
				if (val != '') {
					return ['primary', 'success', 'warning', 'error', 'info'].includes(val);
				}
				return true;
			}
		},
		size: {
			type: String as ButtonSize,
			validator: (val: string) => {
				return ['xl', 'lg', 'md', 'sm'].includes(val);
			}
		},
		plain: {
			type: Boolean,
			default: false
		},
		long: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		circle: {
			type: Boolean,
			default: false
		},
		radius: {
			type: [Number, Boolean, String]
		},
		icon: {
			type: [Object, String]
		}
	},
	setup(props: ButtonProps, context) {
		let propsType = toRef(props, 'type').value;
		let propsPlain = toRef(props, 'plain').value;
		let propsLong = toRef(props, 'long').value;
		let propsCircle = toRef(props, 'circle').value;
		let propsDisabled = toRef(props, 'disabled').value;
		let propsSize = toRef(props, 'size').value;

		const theme = config.getter('theme');
		const classs = ['ebyte','e-button'];
		classs.push(theme ? 'e-button-theme--' + theme : '');
		classs.push(propsType ? 'e-button-type--' + propsType : '');
		classs.push(propsPlain ? 'e-button-plain' : '');
		classs.push(propsLong ? 'e-button-long' : '');
		classs.push(propsCircle ? 'e-button-circle' : '');
		classs.push(propsDisabled ? 'e-button-disabled' : '');
		classs.push(propsSize ? 'e-button-size--' + propsSize : '');
		const styles = {};

		let radius = toRef(props, 'radius').value;
		if (typeof radius == 'boolean' && radius === true) {
			styles['border-radius'] = '100px';
		} else if (typeof radius == 'number') {
			styles['border-radius'] = radius + 'px';
		} else if (typeof radius == 'string' && util.isPercentage(radius)) {
			styles['border-radius'] = radius;
		}

		let icon = toRef(props, 'icon').value;
		if (typeof icon == 'string') {
			icon = {
				name: icon,
				size: 16
			};
		}

		return {
			classs,
			styles,
			icon
		};
	}
};
</script>

<style>
@import url('../../styles/button.css');
</style>
