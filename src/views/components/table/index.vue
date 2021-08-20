<template>
	<div style="padding: 10px;">
		<Table :cols="cols" :data="data"></Table>
	</div>
</template>

<script>
import { toRefs,toRef } from 'vue'
export default {
	layout:'develop',
	data(){
		return{
			cols:[
				{key: 'id', title: 'id'},
				{key: 'name', title: '姓名', width: 80,
					children:[
						{key: 'province', title: '张', width: 80},
						{key: 'city', title: '三', width: 80}
					]
				},
				{key: 'age', title: '年龄', width: 80},
				{title: '地址', width: 80,children:[
					{key: 'province', title: '省', width: 80,
						children:[
							{key: 'province', title: '省', width: 80},
							{key: 'city', title: '直辖市', width: 80}
						]
					},
					{key: 'city', title: '市', width: 80,
						children:[
							{key: 'city', title: '地级市', width: 80},
						]
					},
					{key: 'region', title: '区', width: 80,
						children:[
							{key: 'province', title: '区', width: 80},
							{key: 'city', title: '县', width: 80},
							{key: 'region', title: '县级市', width: 80},
						]
					},
				]},
			],
			data:[
				{id:'1',name:'张三',age:'18'},
				{id:'2',name:'张三',age:'18'},
				{id:'3',name:'张三',age:'18'},
				{id:'4',name:'张三',age:'18'},
			]
		}
	},
	setup(props,context){
		const title = toRef(props, 'title')
	},
	mounted() {
	},
	methods:{
		handleClick(e){
			console.log(e)
		}
	}
};
</script>

<style>
</style>
