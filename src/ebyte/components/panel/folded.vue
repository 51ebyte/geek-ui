<template>
	<div>
		<div :class="['e-panel-folded-title',{
			border:isOpen
		}]">
			<slot name="title">
				<Icon :name="(isOpen?'ios-arrow-down':'ios-arrow-forward')" :title="title" @click="handleClickIcon"></Icon>
			</slot>
		</div>
		<transition-collapse>
			<div class="e-panel-folded-body" v-show="isOpen">
				<slot></slot>
			</div>
		</transition-collapse>
	</div>
</template>

<script lang="ts">
	import TransitionCollapse from './../base/transition/collapse';
import { defineComponent, computed } from 'vue';
export default defineComponent({
	components:{
		TransitionCollapse
	},
	data() {
		return {
			isOpen: false
		};
	},
	props: {
		title: {
			type: String,
			default: ''
		},
		styles: {
			type: Object,
			default: {}
		}
	},
	setup(props, ctx) {
		return {
			
		};
	},
	methods:{
		handleClickIcon(evt){
			this.isOpen=!this.isOpen;
		},
	}
});
</script>

<style>
@import url('../../styles/panel.css');
</style>
