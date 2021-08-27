<template>
	<div class="example">
		<Blockquote title="InputNumber 数字输入框">
			喜欢吃什么随便写😊
			<template #extra>
				<Switch v-model="mode" :text="['Input[type=\'number\'] 渲染','InputNumber 渲染']"></Switch>
			</template>
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type='code' title="基础用法">
					<Input v-model="number" type="number"></Input>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>给组件<code>Input</Code>设置<code>type=number</code>即可，使用<code>v-model</code>绑定变量，变量的初始值即为默认值</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code1" copy></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' :title="`最小:${1}、最大:${30}、步长值:${5}、精度：${2}`">
					<Input v-model="number" type="number" :min="1" :max="30" :setp="5.5" :precision="2"></Input>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>设置 <code>min</code> 属性可以设置一个最小值，接受一个<code>Number</code></p>
						<p>设置 <code>max</code> 属性可以设置一个最大值，接受一个<code>Number</code></p>
						<p>设置 <code>step</code> 属性可以控制步长，接受一个<code>Number</code></p>
						<p>设置 <code>precision</code> 属性可以控制数值精度，接受一个<code>Number</code></p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code2" copy></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' :title="`严格步长:${3}`">
					<Input v-model="number" type="number" :min="1" :max="100" :strictly="3"></Input>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>设置 <code>strictly</code> 属性可以控制数值必须是<code>strictly</code>的倍数，接受一个<code>Number</code></p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code3" copy></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="按钮位置">
					<Input v-model="number" type="number" controls="right"></Input>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>设置 <code>controls='right'</code> 属性可以控制按钮位置</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code4" copy></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="禁用组件">
					<Row :gutter="10">
						<Col :span="12">
							<Input v-model="number" type="number" disabled></Input>
						</Col>
						<Col :span="12">
							<Input v-model="number" type="number" disabled controls="right"></Input>
						</Col>
					</Row>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>设置 <code>disabled</code> 属性可以禁用整个组件</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code5" copy></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="组件宽度">
					<Row :gutter="10">
						<Col :span="12">
							<Input v-model="number" type="number" :width="180"></Input>
						</Col>
						<Col :span="12">
							<Input v-model="number" type="number" controls="right" :width="180"></Input>
						</Col>
					</Row>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>设置 <code>width</code> 属性可以设置组件宽度</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code6" copy></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="InputNumber Props"></Blockquote>
				<table-props :data="table.props.data" :example="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="InputNumber Event"></Blockquote>
				<table-event :data="table.event.data"></table-event>
			</Col>
		</Row>
		
	</div>
</template>

<script>
	import {TableProps,TableEvent} from '../bootstrap/table.js'
	export default{
		layout:"develop",
		components:{
			TableProps,
			TableEvent
		},
		data(){
			return{
				mode:true,
				number:1,
				code1:`<Input v-model="number" type="number"></Input>`,
				code2:`<Input v-model="number" type="number" :min="1" :max="30" :setp="5.5" :precision="2"></Input>`,
				code3:`<Input v-model="number" type="number" :min="1" :max="100" :strictly="3"></Input>`,
				code4:`<Input v-model="number" type="number" controls="right"></Input>`,
				code5:`<Input v-model="number" type="number" disabled></Input>
					<Input v-model="number" type="number" disabled controls="right"></Input>`,
				code6:`<Input v-model="number" type="number" :width="180"></Input>
					<Input v-model="number" type="number" controls="right" :width="180"></Input>`,
				table:{
					props:{
						data:[
							{params:'v-model',version:'0.0.1',desc:'绑定值',type:'<code>Number</code>',required:'是'},
							{params:'width',version:'0.0.1',desc:'组件宽度',type:'<code>String</code> | <code>Number</code>',required:'否'},
							{params:'min',version:'0.0.1',desc:'最小值',type:'<code>Number</code>',required:'否'},
							{params:'max',version:'0.0.1',desc:'最大值',type:'<code>Number</code>',required:'否'},
							{params:'setp',version:'0.0.1',desc:'步长值',type:'<code>Number</code>',required:'否',default:'<code>1</code>'},
							{params:'strictly',version:'0.0.1',desc:'严格步长值',type:'<code>Number</code>',required:'否',default:'<code>1</code>'},
							{params:'precision',version:'0.0.1',desc:'数值精度',type:'<code>Number</code>',required:'否',default:'<code>0</code>'},
							{params:'align',version:'0.0.1',desc:'组件数值的位置，同 <code>text-align</code>',type:'<code>Number</code>',required:'否'},
							{params:'disabled',version:'0.0.1',desc:'是否禁用组件',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'controls',version:'0.0.1',desc:'控制按钮的位置',type:'<code>String</code>',required:'否',default:'<code>outside</code>',select:'<code>right</code>'},
						]
					},
					event:{
						data:[
							{name:'@change',desc:'在数值发生改变时触发。通过修改外部的数据改变时不会触发',return:''},
						]
					}
				}
			}
		}
	}
</script>

<style>
</style>
