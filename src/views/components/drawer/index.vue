<template>
	<div class="example">
		<Blockquote title="Drawe 抽屉">
			<template #desc>展示实时数据的变化情况</template>
			<template #extra>
				<Switch v-model="example" :text="['显示示例代码','关闭示例代码']"></Switch>
			</template>
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="基础使用">
					<Drawer v-model="right" title="Basic Drawer">
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Drawer>
					<Button type="primary" @click="right = !right">打开</Button>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭。</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin="dark" :code="code1" :height="141" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="弹出方向">
					<Drawer v-model="left" placement="left" title="Basic Drawer">
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Drawer>
					<Drawer v-model="top" placement="top" title="Basic Drawer">
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Drawer>
					<Drawer v-model="bottom" placement="bottom" title="Basic Drawer">
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Drawer>
					<Button type="primary" @click="left = !left">打开左边</Button>&nbsp;
					<Button type="primary" @click="top = !top">打开上边</Button>&nbsp;
					<Button type="primary" @click="bottom = !bottom">打开下边</Button>&nbsp;
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>placement&lt;String&gt;</code> 属性设置抽屉弹出方向，默认方向 <code>right</code></p>
						<p>点击触发按钮抽屉从其它方向滑出，点击遮罩区关闭</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin="dark" :code="code2" :height="166" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="抽屉大小">
					<Drawer v-model="leftWidth" title="Basic Drawer" placement="left" width="100%">
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Drawer>
					<Drawer v-model="rightWidth" title="Basic Drawer" :width="680">
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Drawer>
					<Drawer v-model="topHeight" title="Basic Drawer" placement="top" :height="680">
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Drawer>
					<Drawer v-model="bottomHeight" title="Basic Drawer" placement="bottom" height="100%">
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Drawer>
					<Button type="primary" @click="leftWidth = !leftWidth">打开左边&nbsp;/&nbsp;宽度100%</Button>&nbsp;
					<Button type="primary" @click="rightWidth = !rightWidth">打开右边&nbsp;/&nbsp;宽度680px</Button>&nbsp;
					<Button type="primary" @click="topHeight = !topHeight">打开上边&nbsp;/&nbsp;高度680px</Button>&nbsp;
					<Button type="primary" @click="bottomHeight = !bottomHeight">打开下边&nbsp;/&nbsp;高度100%</Button>&nbsp;
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>width&lt;String | Number&gt;</code> 属性设置抽屉宽度</p>
						<p>通过 <code>height&lt;String | Number&gt;</code> 属性设置抽屉高度</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin="dark" :code="code3" :height="172" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="多层抽屉">
					<Drawer v-model="multi" title="Basic Drawer" width="680px">
						<Button type="primary" @click="multiple=!multiple">打开第二层</Button>
					</Drawer>
					<Drawer v-model="multiple" title="Basic Drawer">
						<p>这是第二层...</p>
						<p>这是第二层...</p>
						<p>这是第二层...</p>
					</Drawer>
					<Button type="primary" @click="multi=!multi">打开第一层</Button>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况。</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin="dark" :code="code4" :height="140" copy toggle></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Drawer props"></Blockquote>
				<table-props :data="table.props.data" :example="false" :select="false"></table-props>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Drawer slot"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps,TableSlot} from '../bootstrap/table.js'
	export default{
		layout:'develop',
		components:{
			TableProps,
			TableSlot
		},
		data() {
			return{
				example:true,
				top:false,
				right:false,
				bottom:false,
				left:false,
				leftWidth:false,
				rightWidth:false,
				topHeight:false,
				bottomHeight:false,
				multi:false,
				multiple:false,
				code1:`<Drawer v-model="right" title="Basic Drawer">
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					</Drawer>`,
				code2:`<Drawer v-model="left" placement="left" title="Basic Drawer">
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					</Drawer>
					<Drawer v-model="top" placement="top" title="Basic Drawer">
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					</Drawer>
					<Drawer v-model="bottom" placement="bottom" title="Basic Drawer">
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					</Drawer>`,
				code3:`<Drawer v-model="leftWidth" title="Basic Drawer" placement="left" width="100%">
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					</Drawer>
					<Drawer v-model="rightWidth" title="Basic Drawer" :width="680">
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					</Drawer>
					<Drawer v-model="topHeight" title="Basic Drawer" placement="top" :height="680">
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					</Drawer>
					<Drawer v-model="bottomHeight" title="Basic Drawer" placement="bottom" height="100%">
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					  <p>Some contents...</p>
					</Drawer>`,
				code4:`<Drawer v-model="multi" title="Basic Drawer" width="680px">
					  <Button type="primary" @click="multiple=!multiple">打开第二层</Button>
					</Drawer>
					<Drawer v-model="multiple" title="Basic Drawer">
					  <p>这是第二层...</p>
					  <p>这是第二层...</p>
					  <p>这是第二层...</p>
					</Drawer>`,
				table:{
					props:{
						data:[
							{params:'v-model',version:'0.0.1',desc:'抽屉是否显示',type:'<code>Boolean</code>',required:'是'},
							{params:'title',version:'0.0.1',desc:'抽屉标题，如果使用 <code>slot</code> 自定义了标题 <code>title</code>，则 <code>title</code> 无效',type:'<code>String</code>',required:'否'},
							{params:'closable',version:'0.0.1',desc:'是否显示右上角的关闭按钮',type:'<code>Boolean</code>',required:'否',default:'<code>360</code>'},
							{params:'mask',version:'0.0.1',desc:'是否显示遮罩层',type:'<code>Boolean</code>',required:'否',default:'<code>true</code>'},
							{params:'maskClosable',version:'0.0.1',desc:'是否允许点击遮罩层关闭',type:'<code>Boolean</code>',default:'<code>true</code>',required:'否'},
							{params:'width',version:'0.0.1',desc:'抽屉宽度，<code>Number</code>类型单位是<code>px</code>，<code>String</code>需携带单位',type:'<code>String</code> | <code>Number</code>',default:'<code>360</code>',required:'否'},
							{params:'height',version:'0.0.1',desc:'抽屉高度，<code>Number</code>类型单位是<code>px</code>，<code>String</code>需携带单位',type:'<code>String</code> | <code>Number</code>',default:'<code>100%</code>',required:'否'},
							{params:'placement',version:'0.0.1',desc:'抽屉的方向，可选值为 <code>left</code> | <code>right</code> | <code>top</code>| <code>bottom</code>',type:'<code>String</code>',required:'否',default:'<code>right</code>'},
						]
					},
					slot:{
						data:[
							{title:'--',desc:'抽屉内容'},
							{title:'title',desc:'抽屉标题，不含关闭按钮'},
							{title:'header',desc:'抽屉头部，含关闭按钮'},
						]
					}
				}
			}
		}
	}
</script>

<style>
</style>
