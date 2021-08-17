<template>
	<div>
		<div :class="['e-panel-folded-title',{
			border:isOpen
		}]">
			<slot name="title">
				<Icon :name="(isOpen?'ios-arrow-down':'ios-arrow-forward')" :title="title" @click="handleClickIcon"></Icon>
			</slot>
		</div>
		<e-transition>
			<div class="e-panel-folded-body" v-show="isOpen">
				<slot></slot>
			</div>
		</e-transition>
	</div>
</template>

<script lang="ts">
	import ETransition from './../base/transition/folded';
import { defineComponent, computed } from 'vue';
export default defineComponent({
	data() {
		return {
			isOpen: false
		};
	},
	components:{
		ETransition
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
