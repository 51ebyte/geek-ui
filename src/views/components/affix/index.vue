<template>
	<div class="example">
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="吸顶">
					<Affix :top="20" el="layout">
						<Button type="primary">offsetTop:20</Button>
					</Affix>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>设置 <code>top&lt;Number&gt;</code>属性可以设置距离顶部的位置</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code='code1'></Code>
			</Col>
			<Col :span="12">、
				<Panel type="code" title="吸顶、粘贴右边">
					<Affix :top="200" :right="10" el="layout">
						<Button type="success">offsetTop:200,offsetRight:10</Button>
					</Affix>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>设置 <code>top&lt;Number&gt;</code>属性可以设置距离顶部的位置，
						设置 <code>right&lt;Number&gt;</code>属性可以设置距离右边的位置，
						粘贴右边需同时设置<code>top&lt;Number&gt;</code>和<code>right&lt;Number&gt;</code>属性</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code='code2'></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="贴底">
					<Affix :bottom="300" el="layout">
						<Button type="error">offsetBottom:300</Button>
					</Affix>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>设置 <code>bottom&lt;Number&gt;</code>属性可以设置距离底部的位置，<code>top&lt;Number&gt;</code>和<code>right&lt;Number&gt;</code>属性会自动失效</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code='code3'></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="在 Layout 组件中使用">
					<p>设置 <code>el&lt;String&gt;='layout'</code>属性可以<code>Layout</code>组件中使用，否则默认浮动位置相对在<code>document</code>元素</p>
				</Panel>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Affix Props"></Blockquote>
				<table-props :data="table.props.data" :example="false" :select="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Affix Event"></Blockquote>
				<table-event :data="table.event.data"></table-event>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps,TableSlot,TableEvent} from '../bootstrap/table.js'
	export default{
		layout:'develop',
		components: {
			TableProps,
			TableSlot,
			TableEvent
		},
		data(){
			return{
				top:20,
				code1:`<Affix :top="20">
					  <Button type="primary">offsetTop:20</Button>
					</Affix>`,
				code2:`<Affix :top="200" :right="10">
					  <Button type="success">offsetTop:200,offsetRight:10</Button>
					</Affix>`,
				code3:`<Affix :bottom="300" :right="10">
					  <Button type="error">offsetBottom:300</Button>
					</Affix>`,
				table:{
					props:{
						data:[
							{params:'top',version:'0.0.1',desc:'距离窗口顶部达到指定偏移量后触发',type:'<code>Number</code>',required:'否'},
							{params:'right',version:'0.0.1',desc:'距离窗口顶部达到指定偏移量后距离右边的距离',type:'<code>Number</code>',required:'否'},
							{params:'bottom',version:'0.0.1',desc:'距离窗口底部达到指定偏移量后触发',type:'<code>Number</code>',required:'否'},
							{params:'el',version:'0.0.1',desc:'<code>Layout</code>组件中使用',type:'<code>Number</code>',required:'否'},
							{params:'index',version:'0.0.1',desc:'图钉浮动的层级，同<code>z-index</code>属性',type:'<code>Boolean</code>',required:'否',default:'<code>1</code>'},
							{params:'use-capture',version:'0.0.1',desc:'<code>addEventListener</code> 原生的 <code>useCapture</code> 选项',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
						],
						upload:{
							cols:[
								{title:'参数',width:160,key:'params',align:'center'},
								{title:'版本',width:80,align:'center',key:'version'},
								{title:'说明',align:'center',key:'desc',render:'html'},
								{title:'类型',width:100,align:'center',key:'type',render:'html'},
								{title:'是否必需',width:78,key:'required',align:'center'},
								{title:'默认值',width:120,default:'-',key:'default',render:'html',align:'center'},
							],
							data:[
								{params:'url',version:'0.0.1',desc:'头像上传地址',type:'<code>String</code>',required:'是'},
								{params:'name',version:'0.0.1',desc:'头像上传的文件字段名',type:'<code>String</code>',required:'否',default:'avatar'},
								{params:'headers',version:'0.0.1',desc:'头像上传的请求头部',type:'<code>Object</code>',required:'否'},
								{params:'size',version:'0.0.1',desc:'头像上传限制大小 <code>kb</code>',type:'<code>Number</code>',required:'否',default:'200'},
								{params:'withCredentials',version:'0.0.1',desc:'头像上传支持发送 <code>cookie</code> 凭证信息',type:'<code>String</code>',required:'否'},
								{params:'before',version:'0.0.1',desc:'上传文件之前的钩子，参数为上传的文件，若返回 <code>Promise.reject</code> 则停止上传',type:'<code>Function</code>',required:'否'},
								{params:'complete',version:'0.0.1',desc:'文件上传成功时的钩子，返回字段为 <code>file&lt;File&gt;</code>, <code>response&lt;Object&gt;</code>',type:'<code>Function</code>',required:'否'},
								{params:'progress',version:'0.0.1',desc:'文件上传时的钩子，返回字段为 <code>file&lt;File&gt;</code>, <code>progress&lt;ProgressEvent &gt;</code>',type:'<code>Function</code>',required:'否'},
								{params:'error',version:'0.0.1',desc:'文件上传失败时的钩子，返回字段为 <code>file&lt;File&gt;</code>, <code>err&lt;Error&gt;</code>, <code>xhr&lt;XMLHttpRequest&gt;</code>',type:'<code>Function</code>',required:'否'},
							],
						}
					},
					event:{
						data:[
							{name:'@change',desc:'	在固定状态发生改变时触发',return:''},
						]
					}
				}
			}
		}
	}
</script>

<style>
</style>
