<template>
	<div class="example">
		<Affix :top="200" :right="27">
			<Panel type='code' collapse title="目录" style='width: 168px;'>
				<ul class="directory">
					<li><a href="javascript;;">layout</a></li>
					<li><a href="javascript;;">backTop</a></li>
				</ul>
			</Panel>
		</Affix>
	</div>
</template>

<script>
	export default{
		layout:'develop',
		data(){
			return{
			}
		},
		mounted() {
		}
	}
</script>

<style>
</style>
