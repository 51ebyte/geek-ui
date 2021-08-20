<template>
	<div class="e-layout"
		:class="{
			'e-layout-hasAside': has.aside
		}"
	>
	<div class="e-layout-aside" v-if="showAside"><slot name="aside"></slot></div>
	<div class="e-layout-container">
		<div class="e-layout-north" :style="{
			height:northHeight+'px'
		}" v-if="showNorth">
			<slot name="north"></slot>
		</div>
		<div class="e-layout-center">
			<div class="e-layout-west" :class="{
				'e-layout-west-close':isCollapseClose
			}" :style="{width:westRealityWidth +'px'}" v-if="showWest && westWdith>0">
				<div class="e-layout-west-collapse" v-if="!westHideCollapse" @click="toggleCollapseWest">
					<slot name="west-collapse">
						<span></span>
					</slot>
				</div>
				<div class="e-layout-west-container">
					<slot name="west"></slot>
				</div>
			</div>
			<div class="e-layout-center-container"
				:class="{
					'e-layout-hasAside': has.aside,
					'e-layout-hasWest': has.west,
					'e-layout-hasEast': has.east
				}">
				<slot></slot>
			</div>
			<div class="e-layout-east" v-if="showEast"><slot name="east"></slot></div>
		</div>
		<div class="e-layout-south" v-if="showSouth"><slot name="south"></slot></div>
	</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed,ref,toRef } from 'vue';
export default defineComponent({
	name: 'Layout',
	props:{
		westWdith:{
			type:Number,
			default:220
		},
		westCollapseWidth:{
			type:Number,
			default:36
		},
		westCollapseClose:{
			type:Boolean,
			default:false
		},
		westHideCollapse:{
			type:Boolean,
			default:false
		},
		northHeight:{
			type:Number
		}
	},
	emits:['toggle'],
	setup(props, ctx) {
		const westWdith = toRef(props,'westWdith')
		const westCollapseWidth = toRef(props,'westCollapseWidth')
		
		const isCollapseClose = ref(props.westCollapseClose)
		
		const westRealityWidth = computed(()=>{
			return isCollapseClose.value?westCollapseWidth.value:westWdith.value;
		})
		
		
		const has = computed(() => {
			let has = { aside: false, west: false, east: false };
			ctx.slots.default().forEach(c => {
				if (c.type.name == 'LayoutAside') {
					has.aside = true;
				}
				if (c.type.name == 'LayoutWest') {
					has.west = true;
				}
				if (c.type.name == 'LayoutEast') {
					has.east = true;
				}
			});
			return has;
		});
		
		const toggleCollapseWest = ()=>{
			isCollapseClose.value=!isCollapseClose.value;
			ctx.emit('toggle',isCollapseClose.value)
		}
		
		return {
			has,
			showAside: !!ctx.slots.aside,
			showNorth: !!ctx.slots.north,
			showSouth: !!ctx.slots.south,
			showEast: !!ctx.slots.east,
			showWest: !!ctx.slots.west,
			isCollapseClose,
			westRealityWidth,
			toggleCollapseWest
		};
	}
});
</script>

<style scoped="scoped">
@import url('../../styles/layout.css');
</style>
