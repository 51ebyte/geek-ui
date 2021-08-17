<template>
	<div class="example">
		
		<Blockquote title="Divider 分割线">
			<p>我们会分开吗？/(ㄒoㄒ)/~~</p>
		</Blockquote>
		
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" :header="false">
					
					<div style="padding-bottom: 5px;">
						<Divider :left="20" :height="1" color="red" text="有颜色的实线"></Divider>
						<Divider :left="30" :height="2" color="#909399" text="有颜色的实线"></Divider>
						<Divider :left="40" :height="3" color="#2d8cf0" text="有颜色的实线"></Divider>
						<Divider left="20%" height="4px" color="#19be6b" text="有颜色的实线"></Divider>
						<Divider left="30%" height="5px" color="#ff9900" text="有颜色的实线"></Divider>
						<Divider left="40%" height="6px" color="#ed4014" text="有颜色的实线"></Divider>
					</div>
					
					<div style="padding-bottom: 5px;">
						<Divider :left="20" :height="1" color="red" dashed text="有颜色的虚线"></Divider>
						<Divider :left="30" :height="2" color="#909399" dashed text="有颜色的虚线"></Divider>
						<Divider :left="40" :height="3" color="#2d8cf0" dashed text="有颜色的虚线"></Divider>
						<Divider left="20%" height="4px" color="#19be6b" dashed text="有颜色的虚线"></Divider>
						<Divider left="30%" height="5px" color="#ff9900" dashed text="有颜色的虚线"></Divider>
						<Divider left="40%" height="6px" color="#ed4014" dashed text="有颜色的虚线"></Divider>
					</div>
					
					<div>
						<Divider text="有插槽的分割线" color="#333333" :height="4">
							有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线
							有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线
							有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线
						</Divider>
					</div>
					
					<Blockquote>
						<p>水平分割线</p>
						<Divider margin="10px 0" />
						<p style="font-size: 14px;">
							使用<code>text</code>属性可在线段中间加入文字，
							使用<code>left</code>属性可设置文字位置，
							使用<code>height</code>属性可设置水平线的高度，
							使用<code>color</code>属性可设置水平线的颜色，
							使用<code>dashed</code>属性可设置水平线为虚线
						</p>
					</Blockquote>
					
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code1" skin="dark" :height="651" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel :header="false" type="code">
					
					<div style="margin: 10px 0px 20px 0;">
						<span>Text</span>
						<Divider vertical />
						<a href="#">Link</a>
						<Divider vertical color="#19be6b" />
						<a href="#">Link</a>
						<Divider vertical color="#ed4014" :width="2" :height="16" />
						<a href="#">Link</a>
					</div>
					
					<Blockquote>
						<p>垂直分割线</p>
						<Divider margin="10px 0" />
						<p style="font-size: 14px;">
							使用<code>vertical</code>属性设置为行内的垂直分割线
						</p>
					</Blockquote>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code2" skin="dark" :height="138" copy toggle></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Divider props"></Blockquote>
				<table-props :data="table.props.data"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Divider slot"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps,TableSlot} from '../bootstrap/table.js'
	export default{
		layout:'components',
		components:{
			TableProps,
			TableSlot
		},
		data(){
			return{
				code1:`<div style="padding-bottom: 5px;">
					  <Divider :left="20" :height="1" color="red" text="有颜色的实线"></Divider>
					  <Divider :left="30" :height="2" color="#909399" text="有颜色的实线"></Divider>
					  <Divider :left="40" :height="3" color="#2d8cf0" text="有颜色的实线"></Divider>
					  <Divider left="20%" height="4px" color="#19be6b" text="有颜色的实线"></Divider>
					  <Divider left="30%" height="5px" color="#ff9900" text="有颜色的实线"></Divider>
					  <Divider left="40%" height="6px" color="#ed4014" text="有颜色的实线"></Divider>
					</div>
					
					<div style="padding-bottom: 5px;">
					  <Divider :left="20" :height="1" color="red" dashed text="有颜色的实线"></Divider>
					  <Divider :left="30" :height="2" color="#909399" dashed text="有颜色的实线"></Divider>
					  <Divider :left="40" :height="3" color="#2d8cf0" dashed text="有颜色的实线"></Divider>
					  <Divider left="20%" height="4px" color="#19be6b" dashed text="有颜色的实线"></Divider>
					  <Divider left="30%" height="5px" color="#ff9900" dashed text="有颜色的实线"></Divider>
					  <Divider left="40%" height="6px" color="#ed4014" dashed text="有颜色的实线"></Divider>
					</div>
					
					<div>
					  <Divider text="有插槽的分割线" color="#333333" :height="4">
						有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线
						有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线
						有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线有插槽的分割线
					  </Divider>
					</div>`,
				code2:`<span>Text</span>
					<Divider vertical />
					<a href="#">Link</a>
					<Divider vertical color="#19be6b" />
					<a href="#">Link</a>
					<Divider vertical color="#ed4014" :width="2" :height="16" />
					<a href="#">Link</a>`,
				table:{
					props:{
						data:[
							{params:'vertical',version:'0.0.1',desc:'是否垂直类型',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'color',version:'0.0.1',desc:'分割线颜色',type:'<code>String</code>',default:'#E8EAEC',required:'否'},
							{params:'text',version:'0.0.1',desc:'分割线文字，<code>vertical</code>属性为<code>false</code>时有效',type:'<code>String</code>',required:'否',example:'世界你好'},
							{params:'dashed',version:'0.0.1',desc:'是否虚线<code>vertical</code>属性为<code>false</code>时有效',type:'<code>Boolean</code>',required:'否'},
							{params:'left',version:'0.0.1',desc:'分割线标题的位置，当参数类型为<code>Number</code>时单位是<code>px</code>，<code>vertical</code>属性为<code>false</code>时有效',type:'<code>String</code> | <code>Number</code> | <code>Boolean</code>',required:'否',default:'5%',example:'5px | 10% | 10'},
							{params:'height',version:'0.0.1',desc:'分割线高度，当参数类型为<code>自定义</code>时单位是<code>px</code>，<code>vertical</code>属性为<code>false</code>时有效',type:'<code>String</code> | <code>Number</code>',default:'1em',required:'否',example:'10px | 10'},
							{params:'width',version:'0.0.1',desc:'分割线宽度，当参数类型为<code>Number</code>时单位是<code>px</code>，<code>vertical</code>属性为<code>false</code>时有效',type:'<code>String</code> | <code>Number</code>',default:'1px',required:'否',example:'10px | 10'},
							{params:'margin',version:'0.0.1',desc:'分割线外边距，当参数类型为<code>Number</code>时单位是<code>px</code>，<code>vertical</code>属性为<code>false</code>时有效',type:'<code>String</code> | <code>Number</code>',default:'24px 0px',required:'否'},
						]
					},
					slot:{
						data:[
							{title:'default',desc:''},
						]
					}
				}
			}
		}
	}
</script>

<style>
</style>
