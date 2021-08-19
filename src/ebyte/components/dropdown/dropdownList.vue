<template>
	<div class="e-dropdown-list" @click.stop.prevent>
		<template v-if="hasSlotDefault">
			<slot></slot>
		</template>
		<template v-else>
			<template v-for="(item,index) in list">
				<template v-if="item.children">
					<dropdown :trigger="trigger">
						<dropdown-item :disabled="item.disabled" :divided="item.divided" 
							@mouseleave.native="handleMouseLeave(item,$event)"  
							@mouseenter.native="handleMouseEnter(item,$event)" 
							@click.stop.prevent="handleClickItem(item,$event)">
							{{item[keys]}}
							<Icon name="ios-arrow-forward"></Icon>
						</dropdown-item>
						<template #list>
							<transition name="transition-drop">
								<dropdown-list :list="item.children" :style="childStyles" :trigger="trigger" v-show="childShow" 
									@mouseenter.native="handleMouseEnter" 
									@mouseleave.native="handleMouseLeave">
								</dropdown-list>
							</transition>
						</template>
					</dropdown>
				</template>
				<template v-else>
					<dropdown-item :disabled="isDisabled(item)" :divided="isDivided(item)" 
						@click.stop.prevent="handleClickItem(item,$event)">
						{{item[keys]}}
					</dropdown-item>
				</template>
			</template>
		</template>
	</div>
</template>

<script lang="ts">
	import { defineComponent,ref,nextTick,inject} from 'vue';
	import dropdownItem from './dropdownItem.vue'
	export default defineComponent({
		name:'DropdownList',
		components:{
			dropdownItem
		},
		props:{
			list:{
				type:Array
			},
			keys:{
				type:String,
				default:'name'
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
			}
		},
		emits: ['click','onClick.stop.prevent'],
		setup(props, ctx) {
			const childStyles = ref()
			const childShow = ref(false)
			const timer = ref(-1);
			
			const trigger = inject("dropdownTrigger",props.trigger)
			const disabled = inject("dropdownDisabled",[])
			const divided = inject("dropdownDivided",[])
			
			const isDisabled = (item)=>{
				if(item.disabled) return true;
				return disabled.includes(item.keys) || disabled.includes(item.name);
			}
			
			const isDivided = (item)=>{
				if(item.divided) return true;
				return divided.includes(item.keys) || divided.includes(item.name);
			}
			
			const handleStyle=(evt)=>{
				childStyles.value = {
					top:'0px',
					transform:'translateX(0%)',
					left: evt.target.offsetWidth + 'px'
				};
			}
			
			const handleMouseEnter = (item,evt) => {
				if(item.disabled) return false;
				if (trigger.value == 'none') return false;
				if (trigger.value != 'hover') {
					return false;
				}
				if(item && item.children){
					nextTick(()=>{
						handleStyle(evt)
					})
				}
				if (timer.value) clearTimeout(timer.value);
				timer.value = setTimeout(() => {
					childShow.value = true;
				}, 250);
			};
			
			const handleMouseLeave = (item,evt) => {
				if(item.disabled) return false;
				if (trigger.value == 'none') return false;
				if (trigger.value != 'hover') {
					return false;
				}
				if (timer.value) {
					if(item && item.children){
						nextTick(()=>{
							handleStyle(evt)
						})
					}
					clearTimeout(timer.value);
					timer.value = setTimeout(() => {
						childShow.value = false;
					}, 150);
				}
			};
			
			const handleClickItem = (item,evt) => {
				console.log(item,trigger.value)
				if(item.disabled) return false;
				if(item && item.children && trigger.value == 'click'){
					nextTick(()=>{
						handleStyle(evt)
						childShow.value = !childShow.value;
						console.log(childShow)
					})
				} else{
					ctx.emit('click',item,evt);
				}
			};
			
			
			return {
				childStyles,
				childShow,
				isDisabled,
				isDivided,
				handleMouseEnter,
				handleMouseLeave,
				handleClickItem,
				hasSlotDefault:!!ctx.slots.default
			};
		}
	})
</script>

<style>
	@import url("../../styles/dropdown.css");
</style>
