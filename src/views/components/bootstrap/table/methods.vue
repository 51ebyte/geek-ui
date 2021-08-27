<template>
	<Table :cols="cols" :data="data" border></Table>
</template>

<script>
	import {
		defineComponent,toRef
	} from 'vue'
	export default defineComponent({
	name: 'TableMethods',
	props:{
		cols:{
			type:Array,
			default:()=>{
				return [
					{title:'方法名',width:160,key:'name',align:'center'},
					{title:'说明',align:'center',key:'desc',render:'html'},
					{title:'参数',width:380,align:'center',key:'params',default:'-',render:'html'},
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
