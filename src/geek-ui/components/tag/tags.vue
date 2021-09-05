<template>
	<div class="e-tags">
		<tag v-for="(item,index) in list" :type="item.type" v-bind:key="index"
			:closable="item.closable || closable" :plain="item.plain || plain"
			:disabled="item.disabled" :bgColor="item.bgColor" :color="item.color"
			@click="handleClick(item,index,$event)" @close="handleClick(item,index,$event)">
			<slot :item="item" :index="index">{{item.text}}</slot>
		</tag>
	</div>
</template>

<script>
	import { defineComponent } from 'vue'
	import tag from './tag.vue'
	export default defineComponent({
		name:'Tags',
		components:{
			tag
		},
		props:{
			list:{
				type:Array
			},
			closable: {
				type: Boolean,
				default: false
			},
			plain: {
				type: Boolean,
				default: false
			},
		},
		emits:['click','close'],
		setup(props,ctx){
			const handleClick = (item,index,evt) =>{
				if(item.disabled || item.type=='disabled') return false;
				ctx.emit('click',item,index,evt)
			}
			const handleClose = (item,index,evt) => {
				if(item.disabled || item.type=='disabled') return false;
				ctx.emit('close', item,index,evt);
			};
			return {
				handleClick
			}
		}
	})
</script>

<style>
	.e-tags {
		display: flex;
	}
	.e-tags .e-tag{
		margin-right: 1px;
		border-radius: 0px;
	}
	.e-tags .e-tag:first-child{
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
	}
	.e-tags .e-tag:last-child{
		margin-right: 0px;
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
	}
</style>
