<template>
	<div class="example">
		<Blockquote title="Icon 图标">
			你是最可爱的人吗？😯
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type='code' title="字体图标">
					<Blockquote>
						字体图标使用开源项目 <a href="http://ionicons.com/" target="_blank"><code>ionicons 3.x</code></a> 版本
					</Blockquote>
					<Divider text="用法说明" left margin="28px 0 0">
						使用<code>&lt;Icon /&gt;</code>组件，指定图标对应的<code>name</code>属性
						<p>通过<code>title</code>属性设置图标名称，通过<code>size</code>属性设置图标大小，通过<code>color</code>属性设置图标颜色</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" copy :code='code1'></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="矢量图标">
					<Blockquote>
						矢量图标使用字节跳动开源项目 <a href="https://github.com/bytedance/iconpark" target="_blank"><code>IconPark</code></a> 版本
					</Blockquote>
					<Divider text="用法说明" left margin="28px 0 0">
						使用<code>&lt;Icon /&gt;</code>组件，指定图标对应的<code>name</code>属性
						<p>通过<code>title</code>属性设置图标名称，通过<code>size</code>属性设置图标大小</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" copy :code='code2'></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Icon props"></Blockquote>
				<table-props :data="table.props.data" :example="false" :select="false"></table-props>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps} from '../bootstrap/table.js'
	export default{
		layout:'develop',
		components:{
			TableProps
		},
		data(){
			return{
				code1:`
				<Icon name="md-add"></Icon>
				<Icon name="md-add" size="16"></Icon>
				<Icon name="md-add" color="red"></Icon>
				<Icon name="md-add" title="添加"></Icon>
				<Icon name="md-add" title="添加" size="16"></Icon>
				<Icon name="md-add" title="添加" color="red"></Icon>
				`,
				code2:`
				<Icon svg name="check-out"></Icon>
				<Icon svg name="check-out" size="16"></Icon>
				<Icon svg name="check-out" fill="#17bd08"></Icon>
				<Icon svg name="check-out" title="选择"></Icon>
				<Icon svg name="check-out" title="选择" size="16"></Icon>
				<Icon svg name="check-out" title="选择" fill="#17bd08"></Icon>
				`,
				table:{
					props:{
						data:[
							{params:'name',version:'0.0.1',desc:'图标名称',type:'<code>String</code>',required:'是'},
							{params:'title',version:'0.0.1',desc:'图标文字名称',type:'<code>String</code>',required:'否'},
							{params:'size',version:'0.0.1',desc:'图标的大小，单位是 px',type:'<code>String</code>',required:'否',default:'18'},
							{params:'color',version:'0.0.1',desc:'图标的颜色，仅字体图标有效',type:'<code>String</code>',required:'否',default:'<code>#808695</code>'},
							{params:'svg',version:'0.0.1',desc:'是否矢量图标',type:'<code>Boolean</code>',default:'<code>false</code>',required:'否'},
							{params:'fill',version:'0.0.1',desc:'图标线条颜色，仅矢量图标有效',type:'<code>String</code>',required:'否'},
						]
					}
				}
			}
		}
	}
</script>

<style>
</style>
