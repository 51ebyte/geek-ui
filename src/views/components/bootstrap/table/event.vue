<template>
	<Table :cols="cols" :data="data" border></Table>
</template>

<script>
	import {
		defineComponent,toRef
	} from 'vue'
	export default defineComponent({
	name: 'TableEvent',
	props:{
		cols:{
			type:Array,
			default:()=>{
				return [
					{title:'事件名',width:160,key:'name',align:'center'},
					{title:'说明',align:'center',key:'desc',render:'html'},
					{title:'返回值',width:380,align:'center',key:'return',default:'-',render:'html'},
				]
			}
		},
		data:Object
	},
	setup(props, ctx) {
		const cols = toRef(props,'cols').value
		const data = toRef(props,'data').value
		return {cols,data}
	}
})
</script>

<style>
</style>
