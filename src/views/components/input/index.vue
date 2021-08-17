<template>
	<div class="example">
		<Input v-model="input.value" size="lg" clearable></Input>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				input:{
					value:''
				}
			}
		}
	}
</script>

<style>
</style>
