<template>
	<div class="example">
		<Row :gutter="20">
			<Col :span="12">
				<Panel>
					<Popover title="title" content="content">
						<Button>click 激活</Button>
					</Popover>
				</Panel>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default{
		layout:'develop'
	}
</script>

<style>
</style>
