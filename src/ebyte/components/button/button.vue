<template>
	<button :class="classs" :style="styles" :disabled="disabled" @click="handleClick">
		<div class="e-flex e-col-center">
			<Icon :option="icon" v-if="icon"></Icon>
			<slot></slot>
		</div>
	</button>
</template>

<script lang="ts">
import { defineComponent,h, toRef, computed, inject } from 'vue';
import Icon from '../icon/font.vue'
import byte from '../../lib/byte.js';

type ButtonType = PropType<'primary' | 'success' | 'warning' | 'error' | 'info'>;
type ButtonSize = PropType<'xl' | 'lg' | 'md' | 'sm'>;

interface ButtonProps {
	type: ButtonType;
	size: ButtonSize;
}

export default defineComponent({
	name: 'Button',
	components:{Icon},
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
				return ['xl', 'lg', 'md', 'sm','mini'].includes(val);
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
	emits:['click'],
	setup(props: ButtonProps, ctx) {
		const type = toRef(props, 'type').value;
		const plain = toRef(props, 'plain').value;
		const long = toRef(props, 'long').value;
		const circle = toRef(props, 'circle').value;
		const disabled = toRef(props, 'disabled').value;
		const size = computed(() => {
			return props.size || inject('btnGroupSize', props.size) || '';
		});

		const classs = computed(() => {
			const classs = ['e-button'];
			classs.push(type ? 'e-button-type--' + type : '');
			classs.push(plain ? 'e-button-plain' : '');
			classs.push(long ? 'e-button-long' : '');
			classs.push(circle ? 'e-button-circle' : '');
			classs.push(disabled ? 'e-button-disabled' : '');
			classs.push(size.value ? 'e-button-size--' + size.value : '');
			return classs;
		});

		const styles = computed(() => {
			let styles = {};
			let radius = toRef(props, 'radius').value;
			if (typeof radius == 'boolean' && radius === true) {
				styles['border-radius'] = '100px';
			} else if (typeof radius == 'number') {
				styles['border-radius'] = radius + 'px';
			} else if (typeof radius == 'string' && byte.isPercentage(radius)) {
				styles['border-radius'] = radius;
			}
			return styles;
		});

		let icon = toRef(props, 'icon').value;
		if (typeof icon == 'string') {
			const iconSize = {xl:28,lg:28,md:18,sm:14}
			icon = {
				name: icon,
				size: iconSize[size.value] || 18
			};
		}
		if(typeof icon == 'object'){
			if(['primary', 'success', 'warning', 'error', 'info'].includes(type) && !icon.color){
				icon.color = '#ffffff'
			}
			if(disabled && !icon.color){
				icon.color = '#d2d2d2 '
			}
		}
		
		
		const handleClick = (evt:MouseEvent)=>{
			ctx.emit('click',evt)
		}
		
		return {
			classs,
			styles,
			icon,
			handleClick
		};
	}
});
</script>

<style>
@import url('../../styles/button.css');
</style>
