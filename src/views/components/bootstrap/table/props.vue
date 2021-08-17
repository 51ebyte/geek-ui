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
					{title:'参数',width:120,key:'params',align:'center',render:'html'},
					{title:'版本',width:80,align:'center',key:'version'},
					{title:'说明',align:'center',key:'desc',render:'html'},
					{title:'类型',width:210,default:'-',key:'type',render:'html'},
					{title:'是否必需',width:78,default:'-',key:'required',align:'center'},
					{title:'默认值',width:120,default:'-',key:'default',render:'html',align:'center'},
					{title:'可选值',width:320,default:'-',key:'select',render:'html'},
					{title:'示例',width:360,default:'-',key:'example',render:'html',align:'center'},
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
