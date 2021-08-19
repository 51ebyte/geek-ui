<template>
	<div class="e-dropdown" @mouseleave.native="handleMouseLeave">
		<div class="e-dropdown-rel" @click.stop.parent="handleClickToggle" @mouseenter.native="handleMouseEnter">
			<slot>
				<div class="e-flex e-col-center">
					<span class="text">{{ name }}</span>
					<Icon name="ios-arrow-down" v-if="list.length>0 || hasList"></Icon>
				</div>
			</slot>
		</div>
		<template v-if="!hasList">
			<transition-collapse>
				<dropdown-list v-show="show" :list="list" :keys="keys" :trigger="trigger" @mouseenter.native="handleMouseEnter" @mouseleave.native="handleMouseLeave" @click.parent="handleClickItem"></dropdown-list>
			</transition-collapse>
		</template>
		<template v-else>
			<transition-collapse name="transition-drop">
				<slot name="list"></slot>
			</transition-collapse>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref,provide,reactive } from 'vue';
import dropdownList from './dropdownList.vue';
import TransitionCollapse from '../base/transition/drop.vue';
export default defineComponent({
	name: 'Dropdown',
	components: {
		dropdownList,
		TransitionCollapse
	},
	props: {
		name: {
			type: String
		},
		list: {
			type: Array
		},
		keys: {
			type: String,
			default: 'name'
		},
		trigger: {
			type: String,
			default: 'hover',
			validator: (value: string) => {
				if (value != '') {
					return ['click', 'hover', 'none'].includes(value);
				}
				return true;
			}
		},
		disabled:{
			type:Array,
			default(){
				return [];
			}
		},
		divided:{
			type:Array,
			default(){
				return [];
			}
		},
	},
	setup(props, ctx) {
		const show = ref(false);
		const timer = ref(-1);
		
		provide("dropdownTrigger",reactive({
			value:props.trigger
		}))
		provide("dropdownDisabled",reactive(props.disabled))
		provide("dropdownDivided",reactive(props.divided))

		const handleClickToggle = () => {
			if (props.trigger == 'none') return false;
			if (props.trigger !== 'click') {
				return false;
			}
			show.value = !show.value;
		};

		const handleMouseEnter = () => {
			if (props.trigger == 'none') return false;
			if (props.trigger !== 'hover') {
				return false;
			}
			if (timer.value) clearTimeout(timer.value);
			timer.value = setTimeout(() => {
				show.value = true;
			}, 150);
		};

		const handleMouseLeave = () => {
			
			if (props.trigger == 'none') return false;
			if (props.trigger !== 'hover') {
				return false;
			}
			if (timer.value) {
				clearTimeout(timer.value);
				timer.value = setTimeout(() => {
					show.value = false;
				}, 200);
			}
		};
		
		const handleClickItem = (item,evt) => {
			if(item.disabled) return false;
			ctx.emit('click',item,evt);
		};

		return {
			show,
			handleMouseEnter,
			handleMouseLeave,
			handleClickToggle,
			handleClickItem,
			hasList:!!ctx.slots.list
		};
	}
});
</script>

<style>
@import url('../../styles/dropdown.css');
@import url('../../styles/transition.css');
</style>
