<template>
	<div :class="['e-popover', `e-popover-${placement}`]" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
		<div class="e-popover-warp" ref="warpRef"><slot></slot></div>
		<transition name="fade">
		<div
			class="e-popover-poper"
			ref="poperRef" v-show="visible"
			
		>
			<div class="e-popover-arrow"></div>
			<div class="e-popover-body" :style="{
				width:`${width}px`,
				whiteSpace:`${width?'unset':'nowrap'}`
			}">
				<div class="e-popover-title"><slot name="content"><Render :render="title"></Render></slot></div>
				<div class="e-popover-content">
					<slot name="content"><Render :render="content"></Render></slot>
				</div>
			</div>
		</div>
		</transition>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, ref, watch } from 'vue';
import Render from '../base/render.js';
export default defineComponent({
	name: 'Popover',
	components: {
		Render
	},
	props: {
		title: {
			type: [String, Object]
		},
		content: {
			type: [String, Object]
		},
		placement: {
			type: String,
			default: 'bottom',
			validator: (val: string) => {
				let placement = 'top/top-left/top-right/bottom/bottom-left/bottom-right/left/left-top/left-bottom/right/right-top/right-bottom';
				if (val != '') {
					return placement.split('/').includes(val);
				}
				return true;
			}
		},
		trigger:{
			type: String,
			default:'hover'
		},
		width: {
			type: Number
		},
		disabled: {
			type: Boolean,
			default: false
		},
		delay: {
			type: Number,
			default: 0
		}
	},
	emits: ['show', 'hide'],
	setup(props, ctx) {
		const visible = ref(true);
		const warpRef = ref();
		const poperRef = ref();

		watch(
			() => props.disabled,
			n => {
				if (!n) {
					visible.value = true;
					ctx.emit('show')
					setTimeout(()=>{
						handlePostion();
					},0)
				} else {
					// visible.value = false;
					ctx.emit('hide')
				}
			}
		);

		const handlePostion = () => {
			if (!!/^(top)?$/g.test(props.placement)) {
				let x = (warpRef.value.offsetWidth - poperRef.value.offsetWidth) / 2;
				let y = poperRef.value.offsetHeight + warpRef.value.offsetHeight + 3;
				poperRef.value.style.transform = `translate(${x}px,-${y}px)`;
			}
			if (!!/^(top-left)?$/g.test(props.placement)) {
				let y = poperRef.value.offsetHeight + warpRef.value.offsetHeight + 3;
				poperRef.value.style.transform = `translate(${0}px,-${y}px)`;
			}
			if (!!/^(top-right)?$/g.test(props.placement)) {
				let x = warpRef.value.offsetWidth - poperRef.value.offsetWidth;
				let y = poperRef.value.offsetHeight + warpRef.value.offsetHeight + 3;
				poperRef.value.style.transform = `translate(${x}px,-${y}px)`;
			}

			if (!!/^(right)?$/g.test(props.placement)) {
				let x = warpRef.value.offsetWidth + 3;
				let y = (poperRef.value.offsetHeight + warpRef.value.offsetHeight) / 2;
				poperRef.value.style.transform = `translate(${x}px,-${y}px)`;
			}
			if (!!/^(right-top)?$/g.test(props.placement)) {
				let x = warpRef.value.offsetWidth + 3;
				let y = warpRef.value.offsetHeight;
				poperRef.value.style.transform = `translate(${x}px,-${y}px)`;
			}
			if (!!/^(right-bottom)?$/g.test(props.placement)) {
				let x = warpRef.value.offsetWidth + 3;
				let y = poperRef.value.offsetHeight;
				poperRef.value.style.transform = `translate(${x}px,-${y}px)`;
			}

			if (!!/^(bottom)?$/g.test(props.placement)) {
				let x = (warpRef.value.offsetWidth - poperRef.value.offsetWidth) / 2;
				poperRef.value.style.transform = `translate(${x}px,-${0}px)`;
			}
			if (!!/^(bottom-left)?$/g.test(props.placement)) {
				poperRef.value.style.transform = `translate(-${0}px,-${0}px)`;
			}
			if (!!/^(bottom-right)?$/g.test(props.placement)) {
				let x = warpRef.value.offsetWidth - poperRef.value.offsetWidth;
				poperRef.value.style.transform = `translate(${x}px,-${0}px)`;
			}

			if (!!/^(left)?$/g.test(props.placement)) {
				let x = poperRef.value.offsetWidth + 3;
				let y = (poperRef.value.offsetHeight + warpRef.value.offsetHeight) / 2;
				poperRef.value.style.transform = `translate(-${x}px,-${y}px)`;
			}
			if (!!/^(left-top)?$/g.test(props.placement)) {
				let x = poperRef.value.offsetWidth + 3;
				let y = warpRef.value.offsetHeight;
				poperRef.value.style.transform = `translate(-${x}px,-${y}px)`;
			}
			if (!!/^(left-bottom)?$/g.test(props.placement)) {
				let x = poperRef.value.offsetWidth + 3;
				let y = poperRef.value.offsetHeight;
				poperRef.value.style.transform = `translate(-${x}px,-${y}px)`;
			}
		};

		const handleMouseEnter = () => {
			if (props.disabled) return false;
			setTimeout(()=>{
				visible.value = true;
				setTimeout(()=>{
					handlePostion();
					ctx.emit('show')
				},0)
			},props.delay)
		};
		const handleMouseLeave = () => {
			if (props.disabled) return false;
			// visible.value = false;
			ctx.emit('hide')
		};
		return {
			visible,
			warpRef,
			poperRef,
			handleMouseEnter,
			handleMouseLeave
		};
	}
});
</script>

<style>
@import url('../../styles/popover.css');
</style>
