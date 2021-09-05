<template>
	<div ref="affixRef" :style="{
		zIndex:index
	}" class="e-affix">
		<div :class="{
			'e-affix-fixed':affix
		}" :style="styles.default">
			<slot></slot>
		</div>
		<div class="aria" :style="styles.aria" v-if="affix && right<0"></div>
	</div>
</template>

<script>
import { defineComponent, ref, toRef, onMounted,computed } from 'vue';
import util from '../../lib/util.js';
export default defineComponent({
	name: 'Affix',
	props: {
		el:{
			type:[Element,Window,String],
			default(){
				return window;
			}
		},
		top: {
			type: [Number,Boolean],
			default: -1
		},
		bottom: {
			type: [Number,Boolean],
			default: -1
		},
		right: {
			type: [Number,Boolean],
			default: -1
		},
		index:{
			type: Number
		},
		useCapture:{
			type: Boolean,
			default: false
		}
	},
	emits: ['change'],
	setup(props, ctx) {
		
		const affix = ref(false);
		const showAria = ref(false);
		const affixRef = ref(null);
		const offsetTop = toRef(props, 'top').value;
		const offsetBottom = toRef(props, 'bottom').value;
		const offsetRight = toRef(props, 'right').value;
		const scrollElement = ref()

		const styles = ref({ default: {}, aria: {} });

		const offset = element => {
			const rect = element.getBoundingClientRect();

			const scrollTop = document.documentElement.scrollTop;
			const scrollLeft = document.documentElement.scrollLeft;

			const body = window.document.body;
			const clientTop = body.clientTop || 0;
			const clientLeft = body.clientLeft || 0;

			return {
				top: rect.top + scrollTop - clientTop,
				left: rect.left + scrollLeft - clientLeft
			};
		};

		const handleScrollTop = () => {
			let scrollTop = 0,scrollElementOffset={}
			if(scrollElement.value instanceof Window){
				scrollTop = document.documentElement.scrollTop;
				scrollElementOffset = {top:0,left:0}
			}else{
				scrollTop = scrollElement.value.scrollTop;
				scrollElementOffset = offset(scrollElement.value);
			}
			const affixOffset = offset(affixRef.value);
			if (offsetTop >= 0 && affixOffset.top + scrollElementOffset.top < scrollElementOffset.top + scrollTop + offsetTop && !affix.value) {
				affix.value = true;
				styles.value.default = {
					top: `${offsetTop+scrollElementOffset.top}px`,
					width: `${affixRef.value.offsetWidth}px`
				};
				if (offsetRight >= 0 || offsetRight === true) {
					let right = typeof offsetRight == 'boolean' ? 0 : offsetRight;
					styles.value.default['right'] = `${right || 0}px`;
				} else {
					styles.value.default['left'] = `${affixOffset.left}px`;
				}
				styles.value.aria = {
					width: `${affixRef.value.offsetWidth}px`,
					height: `${affixRef.value.offsetHeight}px`
				};
				ctx.emit('change', affix.value);
			}else if(offsetTop >= 0 && affix.value && affixOffset.top + scrollElementOffset.top - offsetTop > scrollElementOffset.top + scrollTop){
				affix.value = false;
				styles.value.default = {};
				styles.value.aria = {};
				ctx.emit('change', affix.value);
			}
		};

		const handleScrollBottom = () => {
			
			let scrollTop = 0,scrollElementOffset={}
			if(scrollElement.value instanceof Window){
				scrollTop = document.documentElement.scrollTop;
				scrollElementOffset = {top:0,left:0}
			}else{
				scrollTop = scrollElement.value.scrollTop;
				scrollElementOffset = offset(scrollElement.value);
			}
			
			const affixOffset = offset(affixRef.value);
			const windowHeight = window.innerHeight;
			
			if (offsetBottom > 0 && affixOffset.top + offsetBottom + scrollElementOffset.top + affixRef.value.offsetHeight > scrollTop + windowHeight && !affix.value) {
				affix.value = true;
				styles.value.default = {
					bottom: `${offsetBottom}px`,
					width: `${affixRef.value.offsetWidth}px`,
					left:`${affixOffset.left}px`
				};
				styles.value.aria = {
					width: `${affixRef.value.offsetWidth}px`,
					height: `${affixRef.value.offsetHeight}px`
				};
				ctx.emit('change', affix.value);
			} else if (offsetBottom > 0 && affixOffset.top + offsetBottom + scrollElementOffset.top + affixRef.value.offsetHeight < scrollTop + windowHeight && affix.value) {
				affix.value = false;
				styles.value.default = {};
				styles.value.aria = {};
				ctx.emit('change', affix.value);
			}
		};

		const handleScroll = () => {
			if (offsetBottom >= 0) {
				handleScrollBottom();
			} else if (offsetTop >= 0) {
				handleScrollTop();
			}
		};
		onMounted(() => {
			let element = ()=>{
				function elNode(el,container){
					let node  = el.parentNode;
					if(node == undefined){
						return window;
					}
					if(node.classList!=undefined && node.classList.contains(container)){
						return node;
					}else{
						return elNode(node,container)
					}
				}
				if(typeof props.el =='string'){
					if(props.el == 'layout'){
						return elNode(affixRef.value,'e-layout-center-container');
					}else{
						return elNode(affixRef.value,props.el.substr(1));
					}
				}
				return props.el;
			}
			scrollElement.value = element()
			util.addListener(element(), 'scroll', handleScroll, props.useCapture);
			util.addListener(element(), 'resize', handleScroll, props.useCapture);
			handleScroll();
		});

		return {
			affix,
			affixRef,
			handleScroll,
			styles
		};
	}
});
</script>

<style>
@import url('../../styles/affix.css');
</style>
