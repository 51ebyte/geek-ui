<template>
	<div :class="['e-tabs',skin?`e-tabs-skin-${skin}`:'']">
		<div class="e-tabs-header">
			<span class="e-tabs-nav-prev" v-if="hasScroll" @click="handlePrevNav">
				<Icon name='ios-arrow-back'></Icon>
			</span>
			<div class="e-tabs-nav-scroll" ref="navScrollRef">
				<div class="e-tabs-nav" ref="navRef">
					<template v-for="(item,index) in slots">
						<div :class="['e-tabs-nav-item',{
							'e-tabs-nav-item-active':item.name == active,
							'e-tabs-nav-item-disabled':item.props.disabled
						}]" :name="item.name" :disabled="item.props.disabled" 
						@click="handleClickItem(item,index,$event)">
							<Render :render="item.props.label" v-if="typeof item.props.label=='function'"></Render>
							<template v-else>{{item.props.label || item.name}}</template>
						</div>
					</template>
				</div>
			</div>
			<span class="e-tabs-nav-next" v-if="hasScroll" @click="handleNextNav">
				<Icon name='ios-arrow-forward'></Icon>
			</span>
		</div>
		<div class="e-tabs-body">
			<template v-for="(item,index) in slots">
				<div :class="['e-tabs-item',{
					'e-tabs-item-disabled':item.props.disabled
				}]" v-show="item.name==active">
					<Render :params="item" :render="allTabsPane[index]"></Render>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import {defineComponent,computed,ref,onMounted,nextTick} from 'vue'
	import Render from '../base/render.js'
	import util from '../../lib/util.js'
	export default{
		name:'Tabs',
		components:{
			Render
		},
		props:{
			name:{
				type:[String,Number]
			},
			skin:{
				type:String
			},
			list:{
				type:Array
			}
		},
		emits:['click'],
		setup(props,ctx){
			
			const navRef = ref()
			const navScrollRef = ref()
			
			let slots = [],allTabsPane=[];
			const handleTabsItem = (slot) => {
				for(let i=0;i<slot.length;i++){
					if(slot[i].type && slot[i].type.name=="TabsItem"){
						slots.push({
							index:i,
							name:slot[i].props?slot[i].props.name:index,
							props:slot[i].props
						})
						allTabsPane.push(slot[i])
					}
					if(typeof (slot[i]['children'])=='object' && slot[i]['children'].length>0){
						handleTabsItem(slot[i]['children'])
					}
				}
			}
			if(ctx.slots.default != undefined){
				handleTabsItem(ctx.slots.default())
			}else if(props.list){
				for(let i in props.list){
					slots.push({
						index:i,
						name:props.list[i].name || i,
						props:{
							label:props.list[i].label || '',
							disabled:props.list[i].disabled || false
						}
					})
					allTabsPane.push(props.list[i].render || props.list[i].content)
				}
			}
			
			const navActive = ref('');
			const active = computed(()=>{
				return navActive.value || props.name || slots[0]['name'] || 0;
			})
			
			const handlePrevNav = () =>{
				let navActiveEl = document.querySelector('.e-tabs-nav-item-active');
				prev(navActiveEl.previousSibling)
				function prev(el){
					if(el instanceof Element){
						if(el.getAttribute('disabled')=='true'){
							prev(el.previousSibling)
						}else{
							navScrollRef.value.scrollLeft -= el.offsetWidth + 16;
							navActive.value = el.getAttribute('name');
						}
					}
				}
			}
			
			const handleNextNav = () =>{
				let navActiveEl = document.querySelector('.e-tabs-nav-item-active');
				next(navActiveEl.nextSibling)
				function next(el){
					if(el instanceof Element){
						if(el.getAttribute('disabled')=='true'){
							next(el.nextSibling)
						}else{
							navScrollRef.value.scrollLeft += el.offsetWidth + 16;
							navActive.value = el.getAttribute('name');
						}
					}
				}
			}
			
			const handleClickItem = (item,index,evt) =>{
				if(item.props.disabled) return false;
				let offsetWidth = 0;
				function parent(el,className){
					if(util.hasClass(el,className)){
						return el;
					}
					return parent(el.parentNode,className)
				}
				let childNodes = parent(evt.target,'e-tabs-nav').childNodes;
				for(let i in childNodes){
					if(childNodes[i] instanceof Element){
						if(i<index){
							offsetWidth += childNodes[i].offsetWidth + 16
						}
						util.removeClass('e-tabs-nav-item-active')
					}
				}
				navScrollRef.value.scrollLeft = offsetWidth;
				navActive.value = item.name;
				ctx.emit('click',item)
			}
			
			const hasScroll = ref(false)
			
			onMounted(()=>{
				nextTick(()=>{
					hasScroll.value = navScrollRef.value.scrollWidth > navScrollRef.value.clientWidth;
				})
			})
			
			return {
				navRef,
				navScrollRef,
				active,
				slots,
				allTabsPane,
				handlePrevNav,
				handleNextNav,
				handleClickItem,
				hasScroll
			}
		}
	}
</script>

<style>
	@import url("../../styles/tabs.css");
</style>
