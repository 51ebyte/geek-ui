<template>
	<div class="e-dropdown-item-divided" v-if="divided"></div>
	<div class="e-dropdown-item" :class="{
			'e-dropdown-item-disabled': disabled
		}"
		@click.stop.prevent="handleClickItem"
		@mouseleave="handleMouseLeave" 
		@mouseenter="handleMouseEnter"
	>
		<slot></slot>
	</div>
</template>

<script>
import { defineComponent,inject } from 'vue';
export default defineComponent({
	name: 'DropdownItem',
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		divided: {
			type: Boolean,
			default: false
		}
	},
	emits: ['click','mouseenter','mouseleave'],
	setup(props, ctx) {
		
		const handleMouseEnter = (evt) => {
			if(props.disabled) return false;
			ctx.emit('mouseenter',evt);
		};
		
		const handleMouseLeave = (evt) => {
			if(props.disabled) return false;
			ctx.emit('mouseleave',evt);
		};
		
		const handleClickItem = (evt) => {
			if(props.disabled) return false;
			ctx.emit('click',evt);
		};
		return {
			handleMouseEnter,
			handleMouseLeave,
			handleClickItem
		};
	}
});
</script>

<style>
@import url('../../styles/dropdown.css');
</style>
