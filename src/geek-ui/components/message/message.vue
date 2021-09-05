<template>
	<transition name="move-up">
		<div :class="['e-message',background?`e-message-${type}`:'']" :style="{
			top:`${top}px`,
			marginLeft:`${left}px`
		}" :id="id" v-show="visible" ref="messageRef">
			<div class="e-message-container">
				<div class="e-message-icon" v-if="icon">
					<Icon :class="{
						'e-loading-loop':type=='loading'
					}" :name="icon.name" :color="icon.color" :size="icon.size"></Icon>
				</div>
				<div class="e-message-conetent">
					<Render :render='content'></Render>
				</div>
				<div class="e-message-close" v-if="closable">
					<Icon class="close" name="md-close" :size="16" @click="handleClose"></Icon>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import Icon from '../icon/icon.vue';
import Render from '../base/render.js';
import { defineComponent,onMounted,ref,computed } from 'vue';
export default defineComponent({
	name: 'Message',
	components: {
		Icon,
		Render
	},
	props:{
		id:{
			type:String,
		},
		type:{
			type:String,
			default:'info'
		},
		content:{
			type:[String,Object]
		},
		closable: {
			type: Boolean,
			default: false
		},
		duration:{
			type: Number,
			default: 1500
		},
		top:{
			type: Number,
			default: 0	
		},
		background:{
			type: Boolean,
			default: false
		}
	},
	emits:['close','destroy'],
	setup(props,ctx){
		
		const visible = ref(true);
		const messageRef = ref()
		
		onMounted(()=>{
			if(props.duration > 0 && props.type!='loading'){
				setTimeout(()=>{
					handleClose()
				},props.duration)
			}
		})
		
		const icon = computed(()=>{
			let icon = {
				info:{name:'ios-information-circle',color:'#2d8cf0',size:16},
				success:{name:'ios-checkmark-circle',color:'#19be6b',size:16},
				error:{name:'ios-close-circle',color:'#ed4014',size:16},
				warning:{name:'ios-alert',color:'#f90',size:16},
				loading:{name:'ios-loading',color:'#2d8cf0',size:16},
			}
			return icon[props.type];
		})
		
		const left = computed(()=>{
			if(messageRef.value){
				return ~(messageRef.value.offsetWidth / 2);
			}
			return 0
		})
		
		const handleClose = ()=>{
			visible.value = false;
			ctx.emit('close')
			setTimeout(()=>{
				ctx.emit('destroy')
			},3000)
		}
		
		return{
			left,
			messageRef,
			visible,
			icon,
			handleClose
		}
	}
});
</script>

<style>
	@import url("../../styles/message.css");
</style>
