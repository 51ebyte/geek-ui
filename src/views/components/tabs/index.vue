<template>
	<div class="example">
		<Blockquote title="Tabs 标签页面">
			<template #desc>展示实时数据的变化情况</template>
			<template #extra>
				<Switch v-model="example" :text="['显示示例代码','关闭示例代码']"></Switch>
			</template>
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type='code' title="基础使用">
					<Panel :header='false'>
						<Tabs>
							<TabsItem name="标签-1">标签 1 的内容</TabsItem>
							<TabsItem name="标签-2">标签 2 的内容</TabsItem>
							<TabsItem name="标签-3">标签 3 的内容</TabsItem>
						</Tabs>
					</Panel>
					<Panel :header='false'>
						<Tabs name="标签-2" skin="pane">
							<TabsItem name="标签-1">标签 1 的内容</TabsItem>
							<TabsItem name="标签-2">标签 2 的内容</TabsItem>
							<TabsItem name="标签-3">标签 3 的内容</TabsItem>
						</Tabs>
					</Panel>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>name&lt;String | Number&gt;</code> 属性激活选项卡，<code>name</code> 与 <code>TabsItem</code> 的 <code>name</code> 属性对应</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-if="example">
				<Code skin="dark" :code="code1" copy toggle :height="351"></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="禁用选项">
					<Panel :header='false'>
						<Tabs>
							<TabsItem name="标签-1">标签 1 的内容</TabsItem>
							<TabsItem name="标签-2" :disabled="true">标签 2 的内容</TabsItem>
							<TabsItem name="标签-3">标签 3 的内容</TabsItem>
						</Tabs>
					</Panel>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>TabsItem&lt;Component&gt;</code> 组件 <code>:disabled="true"</code> 属性可禁用选项卡，<Badge status="error" :offset="false" text="disabled属性必须完整"></Badge></p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-if="example">
				<Code skin="dark" :code="code2" copy toggle :height="221"></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="自定义选项卡名称">
					<Panel :header='false'>
						<Tabs>
							<TabsItem name="标签-1">标签 1 的内容</TabsItem>
							<TabsItem name="标签-2" label="自定义-标签-2">标签 2 的内容</TabsItem>
							<TabsItem name="标签-3">标签 3 的内容</TabsItem>
						</Tabs>
					</Panel>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>label&lt;String | Function&gt;</code> 属性可自定义选项卡名称，接受<code>render</code>渲染</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-if="example">
				<Code skin="dark" :code="code3" copy toggle :height="221"></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="列表渲染">
					<Panel :header='false'>
						<Tabs name="标签3" :list="list"></Tabs>
					</Panel>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>list&lt;Array&gt;</code> 属性可通过数据列表渲染，层级低于插槽渲染</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-if="example">
				<Code skin="dark" :code="code4" copy toggle :height="221"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Tabs props"></Blockquote>
				<table-props :data="table.props.tabs" :select='false' :example="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="TabsItem props"></Blockquote>
				<table-props :data="table.props.tabsItem" :select='false' :example="false"></table-props>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Tabs events"></Blockquote>
				<table-event :data="table.event.data" :select='false' :example="false"></table-event>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps,TableEvent} from '../bootstrap/table.js'
	import {h} from 'vue'
	export default{
		layout:'develop',
		components: {
			TableProps,
			TableEvent
		},
		data() {
			return{
				example:true,
				code1:`<Panel :header='false'>
					  <Tabs>
					    <TabsItem name="标签-1">标签 1 的内容</TabsItem>
					    <TabsItem name="标签-2">标签 2 的内容</TabsItem>
					    <TabsItem name="标签-3">标签 3 的内容</TabsItem>
					  </Tabs>
					</Panel>
					<Panel :header='false'>
					  <Tabs skin="pane">
					    <TabsItem name="标签-1">标签 1 的内容</TabsItem>
					    <TabsItem name="标签-2">标签 2 的内容</TabsItem>
					    <TabsItem name="标签-3">标签 3 的内容</TabsItem>
					  </Tabs>
					</Panel>`,
				code2:`<Panel :header='false'>
					  <Tabs>
					    <TabsItem name="标签-1">标签 1 的内容</TabsItem>
					    <TabsItem name="标签-2" :disabled="true">标签 2 的内容</TabsItem>
					    <TabsItem name="标签-3">标签 3 的内容</TabsItem>
					  </Tabs>
					</Panel>`,
				code3:`<Panel :header='false'>
					  <Tabs>
					    <TabsItem name="标签-1">标签 1 的内容</TabsItem>
					    <TabsItem name="标签-2" label="自定义-标签-2">标签 2 的内容</TabsItem>
					    <TabsItem name="标签-3">标签 3 的内容</TabsItem>
					  </Tabs>
					</Panel>`,
				code4:`<templat>
					  <Tabs name="标签3" :list="list"></Tabs>
					</templat>
					&lt;script&gt;
					  export default({
					    data(){
					      return{
					        list:[
					          {name:'标签1',render:(params)=>{
					            return h('span','标签1的内容');
					          }},
					          {name:'标签2',disabled:true,render:()=>{
					            return h('span','标签2的内容');
					          }},
					          {name:'标签3',label:()=>{
					            return h('span','标签33');
					          },content:'标签3的内容'},
					        ]
					      }
					    }
					  })
					&lt;/script&gt;
				`,
				table:{
					props:{
						tabs:[
							{params:'name',version:'0.0.1',desc:'当前激活 <code>TabsItem</code> 面板的 <code>name</code>',type:'<code>Number</code> | <code>String</code>',required:'否'},
							{params:'skin',version:'0.0.1',desc:'选项卡样式，可选值<code>pane</code>',type:'<code>String</code>',required:'否'},
							{params:'list',version:'0.0.1',desc:'选项卡列表渲染数据，见上方示例',type:'<code>Array</code>',required:'否'},
						],
						tabsItem:[
							{params:'name',version:'0.0.1',desc:'用于标识当前面板，对应 <code>name</code>，默认为其索引值',type:'<code>Number</code> | <code>String</code>',required:'否'},
							{params:'label',version:'0.0.1',desc:'选项卡头显示文字，支持 <code>Render</code> 函数',type:'<code>String</code> <code>Function</code>',required:'否'},
							{params:'disabled',version:'0.0.1',desc:'是否禁用该选项卡',type:'<code>Boolean</code>',required:'否'},
						]
					},
					event:{
						data:[
							{name:'@click',desc:'tab 被点击时触发',return:'<code>name</code>'}
						]
					}
				},
				list:[
					{name:'标签1',render:(params)=>{
						return h('span','标签1的内容');
					}},
					{name:'标签2',disabled:true,render:()=>{
						return h('span','标签2的内容');
					}},
					{name:'标签3',label:()=>{
						return h('span','标签33');
					},content:'标签3的内容'},
				]
			}
		},
		mounted() {
		},
		methods:{
			label(){
				return h('div',[
					h('span','世界你好'),
					h('Badge',{
						props:{
							count:5
						}
					})
				])
			}
		}
	}
</script>

<style>
	
</style>
