<template>
	<div class="example">
		<Blockquote title="Breadcrumb 面包屑">
			显示网站的层级结构，告知用户当前所在位置，以及在需要向上级导航时使用。
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="基础用法">
					<Breadcrumb :list="['首页','组件','面包屑']"></Breadcrumb>
					<Divider left text="用法说明" margin="26px 0 0">
						最简单的用法
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code1" skin="dark"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="自动路由跳转">
					<Breadcrumb :list="[
						{name:'首页',to:{path:'/'}},
						{name:'组件',to:{name:'components'}},
						{name:'面包屑',to:{name:'components_breadcrumb'}},
					]"></Breadcrumb>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>给<code>list&lt;Array&gt;</code>属性数组设置<code>to&lt;Object&gt;</code>即可，<code>to&lt;Object&gt;</code>用法参考<code>router-link</code>组件用法</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code2" skin="dark"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="自定义分隔符">
					<Breadcrumb :list="list" separator="<strong style='color: red;'>&gt;</strong>"></Breadcrumb>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过设置 <code>separator&lt;String&gt;</code> 属性可自定义分隔符</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code3" skin="dark"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Breadcrumb Props"></Blockquote>
				<table-props :data="table.props.data" :example="false" :select="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Breadcrumb Slots"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
			<Col :span="24">
				<Blockquote title="Breadcrumb Event"></Blockquote>
				<table-event :data="table.event.data"></table-event>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps,TableSlot,TableEvent} from '../bootstrap/table.js'
	export default{
		layout:'components',
		components:{
			TableProps,
			TableSlot,
			TableEvent
		},
		data(){
			return{
				list:[
					{name:'组件'},
					{name:'组件',to:{name:'components'}},
					{name:'面包屑',to:{name:'components_avatar'}},
				],
				code1:`<Breadcrumb :list="['首页','组件','面包屑']"></Breadcrumb>`,
				code2:`<Breadcrumb :list="[
				  {name:'首页',to:{path:'/'}},
				  {name:'组件',to:{name:'components'}},
				  {name:'面包屑',to:{name:'components_breadcrumb'}}
				]"></Breadcrumb>`,
				code3:`<Breadcrumb :list="[
				  {name:'首页',to:{path:'/'}},
				  {name:'组件',to:{name:'components'}},
				  {name:'面包屑',to:{name:'components_breadcrumb'}}
				]" separator="<strong style='color: red;'></Breadcrumb>`,
				table:{
					props:{
						data:[
							{params:'list',version:'0.0.1',desc:'数据列表',type:'<code>Array</code>',required:'是'},
							{params:'separator',version:'0.0.1',desc:'自定义分隔符',type:'<code>String</code> | <code>Element String</code>',required:'否',default:'<code>/</code>'},
						]
					},
					slot:{
						data:[
							{title:'--',desc:'作用域插槽，用法见上方'},
						]
					},
					event:{
						data:[
							{name:'@click',desc:'在选项状态发生改变时触发，返回当前选中的项。通过修改外部的数据改变时不会触发',return:''},
						]
					}
				}
			}
		}
	}
</script>

<style>
</style>
