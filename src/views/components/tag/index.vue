<template>
	<div class="example">
		<Blockquote title="Tag 标签">
			火锅、烧烤、海鲜和干锅请选择一个吧！😀
		</Blockquote>
		
		<Row :gutter="20">
			<Col :span="12">
				<Panel type='code' title="基础用法">
					<Tag>默认标签</Tag>
					<Tag type="primary">主要标签</Tag>
					<Tag type="success">成功标签</Tag>
					<Tag type="warning">警告标签</Tag>
					<Tag type="error">错误标签</Tag>
					<Tag type="info">信息标签</Tag>
					<Tag type="disabled">禁用标签</Tag>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>默认标签、主要标签、成功标签、错误标签、警告标签、信息标签以及禁用标签。</p>
						<p>通过设置 <code>type</code> 为 <code>primary</code>、 <code>success</code>、 <code>error</code>、 <code>warning</code>、 <code>info</code> 生成不同样式的标签，不设置为默认样式。</p>
						<p>通过设置 <code>disabled</code> 为禁用的标签。</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin='dark' :code="code1" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="可关闭的标签">
					<Tag closable>默认标签</Tag>
					<Tag closable type="primary">主要标签</Tag>
					<Tag closable type="success">成功标签</Tag>
					<Tag closable type="warning">警告标签</Tag>
					<Tag closable type="error">错误标签</Tag>
					<Tag closable type="info">信息标签</Tag>
					<Tag closable type="disabled">禁用标签</Tag>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>plain&lt;Boolean&gt;</code> 属性设置标签为可关闭样式</p>
						<p>通过 <code>@click&lt;Function&gt;</code> 为标签设置回调方法</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin='dark' :code="code2" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="镂空的标签">
					<Panel :header="false">
						<Tag plain>默认标签</Tag>
						<Tag plain type="primary">主要标签</Tag>
						<Tag plain type="success">成功标签</Tag>
						<Tag plain type="warning">警告标签</Tag>
						<Tag plain type="error">错误标签</Tag>
						<Tag plain type="info">信息标签</Tag>
						<Tag plain type="disabled">禁用标签</Tag>
					</Panel>
					<Panel :header="false">
						<Tag closable plain>默认标签</Tag>
						<Tag closable plain type="primary">主要标签</Tag>
						<Tag closable plain type="success">成功标签</Tag>
						<Tag closable plain type="warning">警告标签</Tag>
						<Tag closable plain type="error">错误标签</Tag>
						<Tag closable plain type="info">信息标签</Tag>
						<Tag closable plain type="disabled">禁用标签</Tag>
					</Panel>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>plain&lt;Boolean&gt;</code> 属性设置标签为镂空样式</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin='dark' :code="code3" :height="234" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="作用域插槽">
					<Panel :header="false">
						<Tags :list="list" v-slot="{item,index}">
							{{item.text}}
						</Tags>
					</Panel>
					<Panel :header="false">
						<Tags :list="list" closable plain v-slot="{item,index}">
							{{item.text}}
						</Tags>
					</Panel>
					<Panel :header="false">
						<Tags :list="list1" v-slot="{item,index}">
							{{item.text}}
						</Tags>
					</Panel>
					<Divider text="用法说明" left margin="36px 0 0">
						支持作用域插槽写法，<code>v-slot</code> 的参数有 2 个：当前数据 <code>item&lt;T&gt;</code>，当前数据序号 <code>index&lt;Number&gt;</code>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin='dark' :code="code4" :height="312" copy toggle></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Tags Props"></Blockquote>
				<table-props :data="table.props.tags.data" :example="false" :select="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Tag Props"></Blockquote>
				<table-props :data="table.props.tag.data" :example="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Tags Slots"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
			<Col :span="24">
				<Blockquote title="Tags Event"></Blockquote>
				<table-event :data="table.event.tags.data"></table-event>
			</Col>
			<Col :span="24">
				<Blockquote title="Tag Event"></Blockquote>
				<table-event :data="table.event.tag.data"></table-event>
			</Col>
		</Row>
		
	</div>
</template>

<script>
	import { defineComponent } from 'vue'
	import {TableProps,TableSlot,TableEvent} from '../bootstrap/table.js'
	export default defineComponent({
		layout:'develop',
		components:{
			TableProps,
			TableSlot,
			TableEvent
		},
		data(){
			return{
				list:[
					{text:'默认标签'},
					{text:'主要标签',type:'primary'},
					{text:'成功标签',type:'success'},
					{text:'警告标签',type:'warning'},
					{text:'错误标签',type:'error'},
					{text:'信息标签',type:'info'},
					{text:'禁用标签',type:'disabled'},
				],
				list1:[
				  {text:'默认标签'},
				  {text:'主要标签',type:'primary',closable:true},
				  {text:'成功标签',type:'success',plain:true},
				  {text:'警告标签',type:'warning'},
				  {text:'错误标签',type:'error'},
				  {text:'信息标签',type:'info'},
				  {text:'禁用标签',disabled:true},
				],
				code1:`<Tag>默认标签</Tag>
					<Tag type="primary">主要标签</Tag>
					<Tag type="success">成功标签</Tag>
					<Tag type="warning">警告标签</Tag>
					<Tag type="error">错误标签</Tag>
					<Tag type="info">信息标签</Tag>
					<Tag type="disabled">禁用标签</Tag>`,
				code2:`<Tag closable>默认标签</Tag>
					<Tag closable type="primary">主要标签</Tag>
					<Tag closable type="success">成功标签</Tag>
					<Tag closable type="warning">警告标签</Tag>
					<Tag closable type="error">错误标签</Tag>
					<Tag closable type="info">信息标签</Tag>
					<Tag closable type="disabled">禁用标签</Tag>`,
				code3:`<Panel :header="false">
					  <Tag plain>默认标签</Tag>
					  <Tag plain type="primary">主要标签</Tag>
					  <Tag plain type="success">成功标签</Tag>
					  <Tag plain type="warning">警告标签</Tag>
					  <Tag plain type="error">错误标签</Tag>
					  <Tag plain type="info">信息标签</Tag>
					  <Tag plain type="disabled">禁用标签</Tag>
					</Panel>
					<Panel :header="false">
					  <Tag closable plain>默认标签</Tag>
					  <Tag closable plain type="primary">主要标签</Tag>
					  <Tag closable plain type="success">成功标签</Tag>
					  <Tag closable plain type="warning">警告标签</Tag>
					  <Tag closable plain type="error">错误标签</Tag>
					  <Tag closable plain type="info">信息标签</Tag>
					  <Tag closable plain type="disabled">禁用标签</Tag>
					</Panel>`,
				code4:`<template>
					  <Tags :list="list" v-slot="{item,index}">
						    {{item.text}}
					  </Tags>
					  <Tags :list="list" closable plain v-slot="{item,index}">
						    {{item.text}}
					  </Tags>
					  <Tags :list="list1" v-slot="{item,index}">
						    {{item.text}}
					  </Tags>
					</template>
					&lt;script&gt;
					  data(){
					    return{
					      list:[
					        {text:'默认标签'},
					        {text:'主要标签',type:'primary'},
					        {text:'成功标签',type:'success'},
					        {text:'警告标签',type:'warning'},
					        {text:'错误标签',type:'error'},
					        {text:'信息标签',type:'info'},
					        {text:'禁用标签',type:'disabled'},
					      ],
					      list1:[
					        {text:'默认标签'},
					        {text:'主要标签',type:'primary',closable:true},
					        {text:'成功标签',type:'success',plain:true},
					        {text:'警告标签',type:'warning'},
					        {text:'错误标签',type:'error'},
					        {text:'信息标签',type:'info'},
					        {text:'禁用标签',disabled:true},
					      ],
					    }
					  }
					&lt;/script&gt;`,
				table:{
					props:{
						tags:{
							data:[
								{params:'list',version:'0.0.1',desc:'数据列表',type:'<code>Array</code>',required:'是'},
								{params:'closable',version:'0.0.1',desc:'是否是可关闭的标签',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
								{params:'plain',version:'0.0.1',desc:'是否是镂空的标签',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							]
						},
						tag:{
							data:[
								{params:'type',version:'0.0.1',desc:'标签类型',type:'<code>String</code>',required:'否',select:'<code>primary</code> | <code>success</code> | <code>warning</code> | <code>error</code> | <code>info</code> | <code>disabled</code>'},
								{params:'closable',version:'0.0.1',desc:'是否是可关闭的标签',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
								{params:'plain',version:'0.0.1',desc:'是否是镂空的标签',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
								{params:'disabled',version:'0.0.1',desc:'是否是禁用的标签',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
								{params:'bgColor',version:'0.0.1',desc:'自定义标签背景色',type:'<code>String</code>',required:'否'},
								{params:'color',version:'0.0.1',desc:'自定义标签字体颜色',type:'<code>String</code>',required:'否'},
							]
						}
					},
					slot:{
						data:[
							{title:'--',desc:'作用域插槽，用法见上方'},
						]
					},
					event:{
						tags:{
							data:[
								{name:'@click',desc:'点击标签时触发，返回当前选中的项',return:'<code>item&lt;T&gt;</code> | <code>index&lt;Number&gt;</code>'},
								{name:'@close',desc:'点击关闭标签时触发，返回当前选中的项',return:'<code>item&lt;T&gt;</code> | <code>index&lt;Number&gt;</code>'},
							]
						},
						tag:{
							data:[
								{name:'@click',desc:'点击标签时触发',return:''},
								{name:'@close',desc:'点击关闭标签时触发',return:''},
							]
						}
					}
				}
			}
		},
	})
</script>

<style>
</style>
