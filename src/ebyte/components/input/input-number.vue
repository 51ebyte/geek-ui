<template>
	<div :class="['e-input-number',`e-input-${controls}`,{
		'e-input-disabled':disabled
	}]" :style="styles">
		<input class="e-input" type="number" :value="inputValue" :disabled="disabled" @input="handleInput" @change="handleChange" />
		<span class="decrease" @click="handleDecrease"></span>
		<span class="increase" @click="handleIncrease"></span>
	</div>
</template>

<script>
	import {defineComponent,computed,ref,reactive} from 'vue'
	import { UPDATE_MODEL_VALUE_EVENT } from './../../lib/constants.js';
	
	export default defineComponent({
		name:"InputNumber",
		props:{
			modelValue: {
				type: [Number,String],
				default: 1
			},
			width:{
				type:[String,Number]
			},
			max:{
				type:Number
			},
			min:{
				type:Number
			},
			setp:{
				type:Number,
				default: 1
			},
			controls:{
				type: String,
				default: 'outside'
			},
			strictly:{
				type:Number,
				default:1
			},
			precision:{
				type:Number,
				default:0
			},
			align:{
				type:String,
				default:'left'
			},
			disabled:{
				type:Boolean,
				default:false
			}
		},
		emits: ['input','change'],
		setup(props,ctx){
			const modelValue = reactive({
				value:props.modelValue
			})
			
			const inputValue = computed(()=>{
				let value = modelValue.value;
				if(modelValue.value < props.min){
					value = props.min;
				}
				if(modelValue.value > props.max){
					value = props.max;
				}
				if(props.precision>0){
					value = value.toFixed(props.precision)
				}
				return value;
			})
			
			const handleDecrease = (evt)=>{
				if(props.disabled) return false;
				let value = ((inputValue.value * Math.pow(10,props.precision) - props.setp * Math.pow(10,props.precision)) / Math.pow(10,props.precision));
				
				if(props.strictly && value % props.strictly!=0){
					value = Math.floor(value/props.strictly)*props.strictly;
				}
				if(value < props.min) {
					evt.target.value = modelValue.value = props.min;
				}else{
					evt.target.value = modelValue.value = value;
				}
				ctx.emit('input',evt)
			}
			
			const handleInput =(evt)=>{
				ctx.emit('input',evt)
			}
			
			const handleChange = (evt) => {
				ctx.emit('change', evt);
			};
			
			const handleIncrease = (evt)=>{
				if(props.disabled) return false;
				let value = ((inputValue.value * Math.pow(10,props.precision) + props.setp * Math.pow(10,props.precision)) / Math.pow(10,props.precision));
				
				if(props.strictly && value % props.strictly!=0){
					value = Math.ceil(value/props.strictly)*props.strictly;
				}
				
				if(value > props.max) {
					evt.target.value = modelValue.value = props.max;
				}else{
					evt.target.value = modelValue.value = value;
				}
				ctx.emit('input',evt)
			}
			
			const styles = computed(()=>{
				let styles = {};
				if(props.width && typeof props.width =='number'){
					styles['width'] = `${props.width}px`
				}
				if(props.width && typeof props.width =='string'){
					styles['width'] = `${props.width}`
				}
				styles['text-align'] = `${props.align}`
				return styles;
			})
			
			return{
				styles,
				inputValue,
				handleDecrease,
				handleInput,
				handleChange,
				handleIncrease
			}
		}
	})
</script>

<style>
	@import url("../../styles/input.css");
</style>
