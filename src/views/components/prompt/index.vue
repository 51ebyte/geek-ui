<template>
	<div class="example">
		<Blockquote title="Prompt 页面提示">
			<template #desc>网页弹出层的交互方案</template>
			<template #extra>
				<Switch v-model="example" :text="['显示示例代码','关闭示例代码']"></Switch>
			</template>
		</Blockquote>
		<Row :gutter="20">
			<Col :span="example?12:24">
				<Panel type='code' title="基本用法-适用于简短的警告提示">
					<Prompt>信息提示的文案</Prompt>
					<Prompt type="success">成功提示的文案</Prompt>
					<Prompt type="error">错误提示的文案</Prompt>
					<Prompt type="warning">警告提示的文案</Prompt>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>共有四种样式 <code>success</code>、<code>info</code>、<code>warning</code>、<code>error</code></p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code1" copy toogle></Code>
			</Col>
			<Col :span="example?12:24">
				<Panel type='code' title="辅助性文字介绍的提示">
					<Prompt>
						信息提示的文案
						<template #desc>山有木兮木有枝，心悦君兮君不知</template>
					</Prompt>
					<Prompt type="success">
						成功提示的文案
						<template #desc>山有木兮木有枝，心悦君兮君不知</template>
					</Prompt>
					<Prompt type="error">
						错误提示的文案
						<template #desc>山有木兮木有枝，心悦君兮君不知</template>
					</Prompt>
					<Prompt type="warning">
						警告提示的文案
						<template #desc>
							山有木兮木有枝，心悦君兮君不知
						</template>
					</Prompt>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code2" copy toogle></Code>
			</Col>
			<Col :span="example?12:24">
				<Panel type='code' title="带图标的提示">
					<Prompt icon>信息提示的文案</Prompt>
					<Prompt icon type="success">成功提示的文案</Prompt>
					<Prompt icon type="error">错误提示的文案</Prompt>
					<Prompt icon type="warning">警告提示的文案</Prompt>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code3" copy toogle></Code>
			</Col>
			<Col :span="example?12:24">
				<Panel type='code' title="带图标的辅助性文字介绍的提示">
					<Prompt icon>
						信息提示的文案
						<template #desc>山有木兮木有枝，心悦君兮君不知</template>
					</Prompt>
					<Prompt icon type="success">
						成功提示的文案
						<template #desc>山有木兮木有枝，心悦君兮君不知</template>
					</Prompt>
					<Prompt icon type="error">
						错误提示的文案
						<template #desc>山有木兮木有枝，心悦君兮君不知</template>
					</Prompt>
					<Prompt icon type="warning">
						警告提示的文案
						<template #desc>
							山有木兮木有枝，心悦君兮君不知
						</template>
					</Prompt>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code4" copy toogle></Code>
			</Col>
			<Col :span="example?12:24">
				<Panel type='code' title="可关闭的带图标的辅助性文字介绍的提示">
					<Prompt icon closable>信息提示的文案</Prompt>
					<Prompt icon closable type="success">成功提示的文案</Prompt>
					<Prompt icon closable type="error">
						错误提示的文案
						<template #desc>山有木兮木有枝，心悦君兮君不知</template>
					</Prompt>
					<Prompt icon closable type="warning">
						警告提示的文案
						<template #desc>
							山有木兮木有枝，心悦君兮君不知
						</template>
					</Prompt>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code5" copy toogle></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Prompt props"></Blockquote>
				<table-props :data="table.props.data" :example="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Prompt slot"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
			<Col :span="24">
				<Blockquote title="Prompt event"></Blockquote>
				<table-event :data="table.event.data"></table-event>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps,TableSlot,TableEvent} from '../bootstrap/table.js'
	export default{
		layout:'develop',
		components:{
			TableProps,
			TableSlot,
			TableEvent
		},
		data() {
			return{
				example:true,
				code1:`<Prompt>信息提示的文案</Prompt>
				  	<Prompt type="success">成功提示的文案</Prompt>
				  	<Prompt type="error">错误提示的文案</Prompt>
				  	<Prompt type="warning">警告提示的文案</Prompt>`,
				code2:`<Prompt>信息提示的文案<template #desc>山有木兮木有枝，心悦君兮君不知</template></Prompt>
				  	<Prompt type="success">成功提示的文案<template #desc>山有木兮木有枝，心悦君兮君不知</template></Prompt>
				  	<Prompt type="error">错误提示的文案<template #desc>山有木兮木有枝，心悦君兮君不知</template></Prompt>
				  	<Prompt type="warning">警告提示的文案<template #desc>山有木兮木有枝，心悦君兮君不知</template></Prompt>`,
				code3:`<Prompt icon>信息提示的文案</Prompt>
				  	<Prompt icon icon type="success">成功提示的文案</Prompt>
				  	<Prompt icon type="error">错误提示的文案</Prompt>
				  	<Prompt icon type="warning">警告提示的文案</Prompt>`,
				code4:`<Prompt icon>信息提示的文案<template #desc>山有木兮木有枝，心悦君兮君不知</template></Prompt>
				  	<Prompt icon type="success">成功提示的文案<template #desc>山有木兮木有枝，心悦君兮君不知</template></Prompt>
				  	<Prompt icon type="error">错误提示的文案<template #desc>山有木兮木有枝，心悦君兮君不知</template></Prompt>
				  	<Prompt icon type="warning">警告提示的文案<template #desc>山有木兮木有枝，心悦君兮君不知</template></Prompt>`,
				code5:`<Prompt icon closable>信息提示的文案</Prompt>
				  	<Prompt icon closable type="success">成功提示的文案</Prompt>
				  	<Prompt icon closable type="error">错误提示的文案<template #desc>山有木兮木有枝，心悦君兮君不知</template></Prompt>
				  	<Prompt icon closable type="warning">警告提示的文案<template #desc>山有木兮木有枝，心悦君兮君不知</template></Prompt>`,
				table:{
					props:{
						data:[
							{params:'type',version:'0.0.1',desc:'提示样式',type:'<code>String</code>',required:'否',select:'<code>info</code> | <code>success</code> | <code>error</code> | <code>warning</code>',default:'<code>info</code>'},
							{params:'icon',version:'0.0.1',desc:'是否显示图标',type:'<code>String</code>',default:'<code>false</code>',required:'否'},
							{params:'closable',version:'0.0.1',desc:'是否可关闭',type:'<code>Boolean</code>',default:'<code>false</code>	',required:'否'},
						]
					},
					slot:{
						data:[
							{title:'default',desc:'提示内容'},
							{title:'desc',desc:'提示辅助性文字介绍'},
							{title:'icon',desc:'自定义图标内容'},
							{title:'close',desc:'自定义关闭内容'},
						]
					},
					event:{
						data:[
							{name:'@close',desc:'关闭时触发',return:'<code>event</code>'},
						]
					}
				}
			}
		}
	}
</script>

<style>
</style>
