<template>
	<div class="example">
		<Blockquote title="Button 按钮">
			请按照我的指令工作阴险！😂
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel title="基础按钮" type="code">
					<div class="e-btn-container">
						<Button>默认按钮</Button>
						<Button type="primary">主要按钮</Button>
						<Button type="success">成功按钮</Button>
						<Button type="error">错误按钮</Button>
						<Button type="warning">警告按钮</Button>
						<Button type="info">信息按钮</Button>
						<Button disabled>禁用按钮</Button>
					</div>
					<Divider left text="用法说明" margin="30px 0 0">
						<p>默认按钮、主要按钮、成功按钮、错误按钮、警告按钮、信息按钮以及禁用按钮。</p>
						<p>通过设置<code>type</code>为
							<code>primary</code>、
							<code>success</code>、
							<code>error</code>、
							<code>warning</code>、
							<code>info</code>
							生成不同样式的按钮，不设置为默认样式。
						</p>
						<p>通过设置<code>disabled</code>为禁用的按钮。</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code1" skin="dark" :height="203" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel title="按钮组" type="code">
					<ButtonGroup>
						<Button>默认按钮</Button>
						<Button type="primary">主要按钮</Button>
						<Button type="success">成功按钮</Button>
						<Button type="error">错误按钮</Button>
						<Button type="warning">警告按钮</Button>
						<Button type="info">信息按钮</Button>
						<Button disabled>禁用按钮</Button>
					</ButtonGroup>
					<Divider left text="用法说明" margin="30px 0 0">
						将多个<code>Button</code>放入<code>ButtonGroup</code>内，可实现按钮组合的效果
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code2" skin="dark" :height="150" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel title="不可用按钮" type="code">
					<div class="e-btn-container">
						<Button disabled>默认按钮</Button>
						<Button disabled type="primary">主要按钮</Button>
						<Button disabled type="success">成功按钮</Button>
						<Button disabled type="error">错误按钮</Button>
						<Button disabled type="warning">警告按钮</Button>
						<Button disabled type="info">信息按钮</Button>
					</div>
					<Divider left text="用法说明" margin="30px 0 0">
						通过设置<code>disabled</code>属性可将按钮设置为禁用状态
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code3" skin="dark" :height="150" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel title="图标按钮及按钮形状" type="code">
					<div class="e-btn-container e-flex">
						<Button icon="md-add" circle></Button>
						<Button type="primary" circle :icon="{name:'md-add'}"></Button>
						<Button type="success" :icon="{name:'md-checkmark'}"></Button>
						<Button type="error" icon="ios-close-circle-outline"></Button>
						<Button type="warning" icon="ios-alert-outline"></Button>
					  <Button disabled icon="md-close"></Button>
						<Button type="info" icon="ios-loading"></Button>
					</div>
					<ButtonGroup size="lg" circle>
						<Button icon="md-add"></Button>
						<Button type="primary" :icon="{name:'ios-search',size:14}"></Button>
						<Button type="success" :icon="{name:'md-checkmark',size:16}"></Button>
						<Button type="error" :icon="{name:'ios-close-circle-outline',size:20}"></Button>
						<Button type="warning" icon="ios-alert-outline"></Button>
					  <Button disabled icon="md-close"></Button>
						<Button type="info" icon="ios-loading"></Button>
					</ButtonGroup>
					<Divider left text="用法说明" margin="30px 0 0">
						通过设置<code>icon</code>属性可设置按钮前置图标,
						后置图标则需使用<code>Icon</code>组件。
						通过设置<code>circle</code>属性，可将按钮设置圆形、将按钮组设置为圆弧形。
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code4" skin="dark" :height="229" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel title="按钮尺寸" type="code">
					<div class="e-btn-container e-flex">
						<Button type="primary" size="xl">超大型按钮</Button>
						<Button type="success" size="lg">大型按钮</Button>
						<Button>默认按钮</Button>
						<Button type="error" size="md">中型按钮</Button>
						<Button type="info" size="sm">小型按钮</Button>
					</div>
					<ButtonGroup size="xl">
						<Button type="primary" icon="ios-search"></Button>
						<Button type="success" icon="md-checkmark"></Button>
						<Button type="error" icon="ios-close-circle-outline"></Button>
						<Button type="info" icon="ios-loading"></Button>
					</ButtonGroup>
					<Divider left text="用法说明" margin="30px 0 0">
						<p>通过设置<code>size</code>属性可设置按钮大小</p>
						<p>按钮有五种尺寸：超大型、大型、默认、中型、小型</p>
						<p>通过设置<code>size</code>为<code>xl</code>、<code>lg</code>和<code>md</code>、<code>sm</code>将按钮设置为<code>超大型</code>、<code>大型</code>和<code>中型</code>、<code>小型</code>，不设置为默认尺寸。</p>
						<p>通过按钮<code>ButtonGroup</code>组件，可批量设置按钮大小</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code5" skin="dark" :height="287" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel title="按钮组纵向排列" type="code">
					<ButtonGroup size="sm" vertical>
						<Button type="primary" icon="ios-search"></Button>
						<Button type="success" icon="md-checkmark"></Button>
						<Button type="error" icon="ios-close-circle-outline"></Button>
						<Button type="info" icon="ios-loading"></Button>
					</ButtonGroup>
					<Divider left text="用法说明" margin="30px 0 0">
						通过设置<code>ButtonGroup</code>的<code>vertical</code>可以使按钮组纵向排列
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code6" skin="dark" :height="240" copy toggle></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Button Props"></Blockquote>
				<table-props :data="table.props.button.data"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="ButtonGroup Props"></Blockquote>
				<table-props :data="table.props.group.data"></table-props>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps} from '../bootstrap/table.js'
	export default{
		components:{
			TableProps
		},
		layout:'components',
		data(){
			return{
				code1:`<div class="e-btn-container">
				  <Button>默认按钮</Button>
				  <Button type="primary">主要按钮</Button>
				  <Button type="success">成功按钮</Button>
				  <Button type="error">错误按钮</Button>
				  <Button type="warning">警告按钮</Button>
				  <Button type="info">信息按钮</Button>
				  <Button disabled>禁用按钮</Button>
				</div>`,
				code2:`<ButtonGroup>
				  <Button>默认按钮</Button>
				  <Button type="primary">主要按钮</Button>
				  <Button type="success">成功按钮</Button>
				  <Button type="error">错误按钮</Button>
				  <Button type="warning">警告按钮</Button>
				  <Button type="info">信息按钮</Button>
				  <Button disabled>禁用按钮</Button>
				</ButtonGroup>`,
				code3:`<div class="e-btn-container">
				  <Button disabled>默认按钮</Button>
				  <Button disabled type="primary">主要按钮</Button>
				  <Button disabled type="success">成功按钮</Button>
				  <Button disabled type="error">错误按钮</Button>
				  <Button disabled type="warning">警告按钮</Button>
				  <Button disabled type="info">信息按钮</Button>
				  <Button disabled>禁用按钮</Button>
				</div>`,
				code4:`<div class="e-btn-container e-flex">
					  <Button icon="md-add" circle></Button>
					  <Button type="primary" circle :icon="{name:'md-add'}"></Button>
					  <Button type="success" icon="md-checkmark"></Button>
					  <Button type="error" icon="ios-close"></Button>
					  <Button type="warning" icon="ios-alert-outline"></Button>
					  <Button type="info" icon="ios-loading"></Button>
					</div>
					<ButtonGroup size="lg" circle>
					  <Button icon="md-add"></Button>
					  <Button type="primary" :icon="{name:'ios-search',size:14}"></Button>
					  <Button type="success" :icon="{name:'md-checkmark',size:16}"></Button>
					  <Button type="error" :icon="{name:'ios-close',size:20}"></Button>
					  <Button type="warning" icon="ios-alert-outline"></Button>
					  <Button type="info" icon="ios-loading"></Button>
					  <Button disabled icon="md-alert"></Button>
					</ButtonGroup>`,
				code5:`
					<div class="e-btn-container e-flex">
					  <Button type="primary" size="xl">超大型按钮</Button>
					  <Button type="success" size="lg">大型按钮</Button>
					  <Button>默认按钮</Button>
					  <Button type="error" size="md">中型按钮</Button>
					  <Button type="info" size="sm">小型按钮</Button>
					</div>
					<ButtonGroup size="xl">
					  <Button type="primary" icon="ios-search"></Button>
					  <Button type="success" icon="md-checkmark"></Button>
					  <Button type="error" icon="ios-close-circle-outline"></Button>
					  <Button type="info" icon="ios-loading"></Button>
					</ButtonGroup>`,
				code6:`<ButtonGroup size="sm" vertical>
					  <Button type="primary" icon="ios-search"></Button>
					  <Button type="success" icon="md-checkmark"></Button>
					  <Button type="error" icon="ios-close-circle-outline"></Button>
					  <Button type="info" icon="ios-loading"></Button>
					</ButtonGroup>`,
				table:{
					props:{
						button:{
							data:[
								{params:'type',version:'0.0.1',desc:'按钮类型',type:'<code>String</code>',required:'否',select:'<code>primary</code> | <code>success</code> | <code>error</code> | <code>warning</code> | <code>info</code>'},
								{params:'size',version:'0.0.1',desc:'按钮大小',type:'<code>String</code>',required:'否',select:'<code>xl</code> | <code>lg</code> | <code>md</code> | <code>sm</code>'},
								{params:'plain',version:'0.0.1',desc:'是否朴素按钮',type:'<code>boolean</code>',required:'否',default:'<code>false</code>'},
								{params:'long',version:'0.0.1',desc:'开启后，按钮的长度为 100%',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
								{params:'disabled',version:'0.0.1',desc:'是否禁用状态',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
								{params:'circle',version:'0.0.1',desc:'是否圆形按钮',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
								{params:'radius',version:'0.0.1',desc:'圆角按钮像素值',type:'<code>String</code> | <code>Number</code> | <code>Boolean</code>',required:'否',default:'<code>false</code>',example:'100 | 100px'},
								{params:'icon',version:'0.0.1',desc:'按钮前置图标，<code>String</code>类型支持图标名称，对象支持<code>name</code>(图标名称)和<code>size</code>(图标大小)属性',type:'<code>String</code> | <code>Object</code>',required:'否',example:"{name:'ios-close',size:20}"},
							]
						},
						group:{
							data:[
								{params:'vertical',version:'0.0.1',desc:'是否纵向排列按钮组',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
								{params:'size',version:'0.0.1',desc:'按钮组合大小',type:'<code>String</code>',required:'否',select:'<code>xl</code> | <code>lg</code> | <code>md</code> | <code>sm</code>'},
								{params:'circle',version:'0.0.1',desc:'按钮组合是否圆形按钮',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							]
						}
					}
				}
			}
		},
	}
</script>

