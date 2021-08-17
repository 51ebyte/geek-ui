<template>
	<Table :cols="cols" :data="data" border></Table>
</template>

<script>
	import {
		defineComponent,toRef
	} from 'vue'
	export default defineComponent({
	name: 'TableProps',
	props:{
		cols:{
			type:Array,
			default:()=>{
				return [
					{title:'名称',width:160,key:'title',align:'center'},
					{title:'说明',align:'center',key:'desc'},
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
