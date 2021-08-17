<template>
	<div class="example">
		
		<Code code="aa">
			
		</Code>
		
		<Row :gutter="10">
			<Col span="12">
				<Panel title="这是一个面板">
					panel body
				</Panel>
			</Col>
			<Col span="12">
				<Code :code="code1" :height="300"></Code>
			</Col>
		</Row>
		
		<Panel title="这是一个面板">
			panel body
		</Panel>
		<Panel icon="md-add" title="这是一个面板">
			panel body
		</Panel>
		<Panel icon="md-add" :size="24" title="这是一个面板" :padding="20" :margin="15">
			panel body
		</Panel>
		<Panel footer :styles="{
				header:{
					background:'red',
					color:'white',
					padding:'18px'
				},
				body:{
					background:'#009688',
					color:'white',
					padding:'20px'
				},
				footer:{
					background:'#cccccc',
					color:'#333333'
				}
			}" :radius="15">
			<template v-slot:header>
				<Icon name="md-cube" title="这里是一个面板" :size="18"></Icon>
			</template>
			panel body
			<template v-slot:footer>
				这里是footer
			</template>
		</Panel>
		<Panel icon="md-add" footer title="这是一个面板" :styles="{
			background:'#009688',
			color:'white'
		}">
			panel body
			<template v-slot:footer>
				这里是footer
			</template>
		</Panel>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				code1:`<template>
	<div class="example">
		
		<Row :gutter="10">
			<Col span="12">
				<Panel title="这是一个面板">
					panel body
				</Panel>
			</Col>
			<Col span="12">
				<Code :code="code1"></Code>
			</Col>
		</Row>
		
		<Panel title="这是一个面板">
			panel body
		</Panel>
		<Panel icon="md-add" title="这是一个面板">
			panel body
		</Panel>
		<Panel icon="md-add" :size="24" title="这是一个面板" :padding="20" :margin="15">
			panel body
		</Panel>
		<Panel footer :styles="{
				header:{
					background:'red',
					color:'white',
					padding:'18px'
				},
				body:{
					background:'#009688',
					color:'white',
					padding:'20px'
				},
				footer:{
					background:'#cccccc',
					color:'#333333'
				}
			}" :radius="15">
			<template v-slot:header>
				<Icon name="md-cube" title="这里是一个面板" :size="18"></Icon>
			</template>
			panel body
			<template v-slot:footer>
				这里是footer
			</template>
		</Panel>
		<Panel icon="md-add" footer title="这是一个面板" :styles="{
			background:'#009688',
			color:'white'
		}">
			panel body
			<template v-slot:footer>
				这里是footer
			</template>
		</Panel>
	</div>
</template>


`
			}
		}
	}
</script>

<style>
</style>
