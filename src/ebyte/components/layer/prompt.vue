<template>
	<input class="e-input" :type="type" :value="value" @input="handleInput" />
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'LayerPrompt',
	props: {
		value: {
			type: [String, Number]
		},
		type:{
			type:String,
			default:'text'
		},
		inputValue:{
			type:Function,
			default(){
				return ()=>{}
			}
		}
	},
	setup(props) {
		const handleInput = (evt) => {
			let {value} = evt.target;
			props.inputValue(value,evt)
		};
		return {
			handleInput
		};
	}
});
</script>

<style>
@import url('../../styles/layer.css');
</style>
