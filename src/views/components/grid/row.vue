<template>
	<div class="example">
		<Row :gutter="16" justify="right" align='top' wrap>
			<Col :span="2" :offset="1" background='red'>2</Col>
			<Col :span="4" :padding="6" color="white" background='green'>4</Col>
			<Col :span="6">6</Col>
			<Col :span="8">8</Col>
			<Col :span="10">10</Col>
			<Col :span="12">12</Col>
			<Col :span="24">24</Col>
		</Row>
	</div>
	<div class="example">
		<Row :gutter="16" :list="list" v-slot="{item,index}">
			<Col :span="index">{{index}}</Col>
		</Row>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				list:[
					{id:1,name:'张三',span:12},
					{id:1,name:'张三'},
					{id:1,name:'张三'},
					{id:1,name:'张三'},
					{id:1,name:'张三'},
					{id:1,name:'张三'},
					{id:1,name:'张三'},
				]
			}
		}
	}
</script>

<style>
</style>
