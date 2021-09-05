<template>
	<div class="e-rate">
		<div
			:class="[
				'e-rate-item',
				{
					'e-rate-item-active': handleActive(item,value),
					'e-rate-item-half': handleHalf(value,index),
					'e-rate-item-character': character != '',
					'e-rate-item-slot': hasSlotStar
				}
			]"
			:style="{
				width: `${size}px`,
				height: `${size}px`,
				fontSize: `${size}px`,
				textAlign: 'center'
			}"
			v-for="(item, index) in count"
		>
			<span
				class="e-rate-item-star-first"
				:style="{color: color}"
				@mouseenter="handleMouseEnter(item)"
				@mouseleave="handleMouseLeave"
				@click="handleClick(item)"
			>
				<slot name="first" :item="item">
					<span v-if="character != ''">{{ character }}</span>
					<star :size="size" :color="color" :stroke="stroke" v-else></star>
				</slot>
			</span>
			
			<span
				class="e-rate-item-star-third"
				:style="{color: color}"
				@mouseenter="handleMouseEnter(item-0.5)"
				@mouseleave="handleMouseLeave"
				@click="handleClick(item-0.5)"
			>
				<slot name="first" :item="item">
					<span v-if="character != ''">{{ character }}</span>
					<star :size="size" :color="color" :stroke="stroke" v-else></star>
				</slot>
			</span>
			
			<span class="e-rate-item-star-second" 
				:style="{color: color}"
				@mouseenter="handleMouseEnter(item)"
				@mouseleave="handleMouseLeave"
				@click="handleClick(item)">
				<slot name="second" :item="item">
					<span v-if="character != ''">{{ character }}</span>
					<star :size="size" :color="color" :stroke="stroke" v-else></star>
				</slot>
			</span>
			<span class="e-rate-item-star-fourth"
				:style="{color: handleFill(item,value,index) ? stroke : color}" 
				@mouseenter="handleMouseEnter(item-0.5)"
				@mouseleave="handleMouseLeave"
				@click="handleClick(item-0.5)">
				<slot name="second" :item="item">
					<span v-if="character != ''">{{ character }}</span>
					<star v-else :fill="handleFill(item,value,index)" :half="handleHalf(value,index)" :size="size" :color="color" :stroke="stroke"></star>
				</slot>
			</span>
		</div>
		<span class="e-rate-text" v-if="text || hasText">
			<slot name="text">{{ value }}分</slot>
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRef, onMounted, nextTick } from 'vue';
import star from './star.js';
import { UPDATE_MODEL_VALUE_EVENT } from '../../lib/constants.js';
export default defineComponent({
	name: 'Rate',
	components: {
		star
	},
	props: {
		modelValue: {
			type: Number,
			default: 0
		},
		size: {
			type: Number,
			default: 24
		},
		color: {
			type: String,
			default: '#e9e9e9'
		},
		stroke: {
			type: String,
			default: '#fadb14'
		},
		character: {
			type: String,
			default: ''
		},
		count: {
			type: Number,
			default: 5
		},
		readonly: {
			type: Boolean,
			default: false
		},
		text: {
			type: Boolean,
			default: false
		}
	},
	emits: [UPDATE_MODEL_VALUE_EVENT, 'change'],
	setup(props, ctx) {
		const hovering = ref(false);
		const readonly = toRef(props, 'readonly').value;
		const value = ref(props.modelValue);
		
		const handleActive = (item,value)=>{
			return item <= value || item - 0.5 <= value;
		}
		
		const handleHalf =  (value,index)=>{
			return value - index < 1 && value - index > 0;
		}
		
		const handleFill =  (item,value,index)=>{
			return handleActive(item,value) || handleHalf(value,index);
		}
		
		const handleMouseEnter = number => {
			if (!hovering.value && !readonly) {
				value.value = number;
				hovering.value = true;
				ctx.emit('change', number);
			}
		};
		const handleMouseLeave = number => {
			if (hovering.value && !readonly) {
				value.value = props.modelValue;
				hovering.value = false;
				ctx.emit('change', props.modelValue);
			}
		};
		const handleClick = number => {
			if (readonly) return false;
			value.value = number;
			hovering.value = false;
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, number);
		};

		onMounted(() => {
			nextTick(() => {
				let fourth = document.querySelectorAll('.e-rate-item-star-fourth');
				for (let j = 0; j < fourth.length; j++) {
					if(!fourth[j].style.width){
						let width = fourth[j].offsetWidth / 2;
						fourth[j].style.width =  `${width}px`;
					}
				}
				
				let third = document.querySelectorAll('.e-rate-item-star-third');
				for (let j = 0; j < third.length; j++) {
					if(!third[j].style.width){
						let width = third[j].offsetWidth / 2;
						third[j].style.width =  `${width}px`;
					}
				}
				
			});
		});

		return {
			value,
			hasSlotStar: !!ctx.slots.first && !!ctx.slots.second,
			hasText:!!ctx.slots.text,
			handleActive,
			handleHalf,
			handleFill,
			handleClick,
			handleMouseEnter,
			handleMouseLeave
		};
	}
});
</script>

<style>
@import url('../../styles/rate.css');
</style>
