<template>
	<blockquote class="e-blockquote">
		<slot name="title"><h3>{{title}}</h3></slot>
		<div class="e-blockquote-context">
			<div class="e-blockquote-desc">
				<slot></slot>
				<slot name="desc"></slot>
			</div>
			<div class="e-blockquote-extra" v-if="hasExtra">
				<slot name="extra"></slot>
			</div>
		</div>
	</blockquote>
</template>

<script>
	import {defineComponent} from 'vue'
	export default defineComponent({
		name:'Blockquote',
		props:{
			title:{
				type:String
			}
		},
		setup(props,ctx){
			return {
				hasExtra:!! ctx.slots.extra,
				hasDesc:!! ctx.slots.desc
			}
		}
	})
</script>

<style>
	@import url("../../styles/blockquote.css");
</style>
