<template>
	<div class="example">
		这里是组件
	</div>
</template>

<script>
	export default{
		layout:'develop',
		data(){
			return{
				code:'1'
			}
		},
		mounted() {
			this.code = JSON.stringify(this.$route);
		}
	}
</script>

<style>
</style>
