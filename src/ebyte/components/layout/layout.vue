<template>
	<div :class="['e-layout',{
			'e-layout-hasAside': has.aside
		}]" :style="{width:`${width}px`,height:`${height}px`}">
	<div class="e-layout-aside" :style="{width:`${asideWidth}px`,flex:`0 0 ${asideWidth}px`}" v-if="showAside">
    <slot name="aside"></slot>
  </div>
	<div class="e-layout-container">
		<div class="e-layout-north" :style="{height:`${northHeight}px`,flex:`0 0 ${northHeight}px`}" v-if="showNorth">
			<slot name="north"></slot>
		</div>
		<div class="e-layout-center">
			<div :class="['e-layout-west',{'e-layout-west-close':isCollapseClose}]" 
        :style="{width: `${westRealityWidth}px`,flex:`0 0 ${westRealityWidth}px`}" v-if="showWest && westRealityWidth>0">
				<div class="e-layout-west-collapse" v-if="collapse || collapseClose" @click="toggleCollapseWest">
					<slot name="west-collapse">
						<span></span>
					</slot>
				</div>
				<div class="e-layout-west-container">
					<slot name="west"></slot>
				</div>
			</div>
			<div :class="['e-layout-center-container',{
					'e-layout-hasAside': has.aside,
					'e-layout-hasWest': has.west,
					'e-layout-hasEast': has.east
				}]">
				<slot></slot>
			</div>
			<div class="e-layout-east" :style="{width:`${eastWidth}px`,flex:`0 0 ${eastWidth}px`}" v-if="showEast && eastWidth>0">
        <slot name="east"></slot>
      </div>
		</div>
		<div class="e-layout-south" :style="{height:`${southHeight}px`,flex:`0 0 ${southHeight}px`}" v-if="showSouth && southHeight>0">
      <slot name="south"></slot>
    </div>
	</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed,ref,toRef } from 'vue';
export default defineComponent({
	name: 'Layout',
	props:{
    width:{
      type:Number
    },
    height:{
      type:Number
    },
    asideWidth:{
      type:Number,
      default:64
    },
    westWidth:{
    	type:Number,
    	default:220
    },
    northHeight:{
    	type:Number,
      default:64
    },
    southHeight:{
    	type:Number,
      default:40
    },
    eastWidth:{
    	type:Number,
    	default:0
    },
    collapse:{
      type:Boolean,
      default:false
    },
		collapseWidth:{
			type:Number,
			default:36
		},
		collapseClose:{
			type:Boolean,
			default:false
		},
	},
	emits:['toggle'],
	setup(props, ctx) {
		const westWidth = toRef(props,'westWidth')
		const collapseWidth = toRef(props,'collapseWidth')
		
		const isCollapseClose = ref(props.collapseClose)
		
		const westRealityWidth = computed(()=>{
			return isCollapseClose.value?collapseWidth.value:westWidth.value;
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
