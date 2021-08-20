<template>
	<div class="example">
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="基础用法">
					<Affix :top="100">
						<Button type="primary">offsetTop:100</Button>
					</Affix>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code='code1'></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="基础用法">
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code='code1'></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="基础用法">
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code='code1'></Code>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default{
		layout:'develop',
		data(){
			return{
				code1:`<Affix :top="100" right>
						<Button type="primary">offsetTop:100</Button>
					</Affix>`
			}
		}
	}
</script>

<style>
</style>
