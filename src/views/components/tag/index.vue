<template>
	<div class="example">
		<Tags :list="list"></Tags>
	</div>
</template>

<script>
	import { defineComponent } from 'vue'
	export default defineComponent({
		layout:'develop',
		data(){
			return{
				list:[
					{text:'世界你好'},
					{text:'世界你好'},
					{text:'世界你好'},
					{text:'世界你好'},
				]
			}
		},
	})
</script>

<style lang="less">
	@import url("./index.less");
</style>
