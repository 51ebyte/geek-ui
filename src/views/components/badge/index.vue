<template>
	<div class="example">
		<Blockquote title="Badge 徽标">
			组件、元素右上角的圆形徽标数字
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type='code' title="基础用法-圆点">
					<div class="e-flex e-col-center">
						<Panel :header='false' margin="0" :border='false'>
							<Badge>
								<Avatar></Avatar>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0 10px" :border='false'>
							<Badge>
								<a href="javascript:;">这是一个<code>a</code>标签</a>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge>这是一段文字</Badge>
						</Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>默认小红点，没有具体的数值</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code1" :height="155" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="基础用法-数字">
					<div class="e-flex">
						<Panel :header='false' margin="0" :border='false'>
							<Badge :count="0">
								<Avatar></Avatar>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge :count="5">
								<Avatar></Avatar>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0 10px" :border='false'>
							<Badge :count="500" :maxCount="99">
								<Avatar></Avatar>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge :count="1500" :maxCount="999">
								<Avatar></Avatar>
							</Badge>
						</Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>使用 <code>count&lt;Number&gt;</code> 属性设置具体的数值</p>
						<p>使用 <code>maxCount&lt;Number&gt;</code> 属性设置封顶数字，默认不设置</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code2" :height="187" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="自定义内容">
					<div class="e-flex">
						<Panel :header='false' margin="0" :border='false'>
							<Badge text="new">
								<Avatar :size="48"></Avatar>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge text="hot">
								<Avatar :size="48"></Avatar>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge text="推荐">
								<Avatar :size="48"></Avatar>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge text="男" color='#19be6b'>
								<Avatar :size="48"></Avatar>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge text="女" color='#FFC0CB'>
								<Avatar :size="48"></Avatar>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge>
								<Avatar :size="48"></Avatar>
								<template #badge>自定义</template>
							</Badge>
						</Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>使用 <code>text&lt;String&gt;</code> 属性和插槽 <code>badge</code> 自定义徽标文本内容</p>
						<p>使用 <code>color&lt;String&gt;</code> 属性设置徽标文本背景色</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code3" :height="203" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="徽标状态">
					<div class="e-flex">
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="primary">
								<Avatar></Avatar>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="success">
								<Avatar></Avatar>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="error">
								<Avatar></Avatar>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="warning">
								<Avatar></Avatar>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="info">
								<Avatar></Avatar>
							</Badge>
						</Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>使用 <code>status&lt;String&gt;</code> 属性表示徽标状态，
							内置 <code style="background-color: #1890ff;color: white;">primary</code>
							<code style="background-color: #19be6b;color: white;">success</code>
							<code style="background-color: #ed4014;color: white;">error</code>
							<code style="background-color: #ff9900;color: white;">warning</code>
							<code style="background-color: #909399;color: white;">info</code> 五种状态，
							更多颜色请使用<code>color&lt;String&gt;</code>属性
						</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code4" :height="187" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="单独使用">
					<div class="e-flex">
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="primary" text="主要" :offset="false"></Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="success" text="成功" :offset="false"></Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="error" :offset="false">
								<template #badge>失败</template>
							</Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="warning" text="警告" :offset="false"></Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="info" text="信息" :offset="false"></Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="primary" :count="10" :offset="false"></Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="success" :count="20" :offset="false"></Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="error" :count="30" :offset="false"></Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="warning" :count="40" :offset="false"></Badge>
						</Panel>
						<Panel :header='false' margin="0" :border='false'>
							<Badge status="info" :count="50" :offset="false"></Badge>
						</Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>使用 <code>offset&lt;Boolean&gt;=false</code> 属性可独立使用徽标</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code5" :height="147" copy toggle></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Badge props"></Blockquote>
				<table-props :data="table.props.data" :select='false' :example="false"></table-props>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Badge slot"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
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
				code1:`<Badge><Avatar></Avatar></Badge>
					<Badge>
					  <a href="javascript:;">这是一个<code>a</code>标签</a>
					</Badge>
					<Badge>这是一段文字</Badge>`,
				code2:`<Badge :count="0"><Avatar></Avatar></Badge>
					<Badge :count="5"><Avatar></Avatar></Badge>
					<Badge :count="500" :maxCount="99"><Avatar></Avatar></Badge>
					<Badge :count="1500" :maxCount="999"><Avatar></Avatar></Badge>`,
				code3:`<Badge text="new"><Avatar :size="48"></Avatar></Badge>
					<Badge text="hot"><Avatar :size="48"></Avatar></Badge>
					<Badge text="推荐"><Avatar :size="48"></Avatar></Badge>
					<Badge text="男" color='#19be6b'><Avatar :size="48"></Avatar></Badge>
					<Badge text="女" color='#FFC0CB'><Avatar :size="48"></Avatar></Badge>
					<Badge>
					  <Avatar :size="48"></Avatar>
					  <template #badge>自定义</template>
					</Badge>`,
				code4:`<Badge status="primary"><Avatar></Avatar></Badge>
					<Badge status="success"><Avatar></Avatar></Badge>
					<Badge status="error"><Avatar></Avatar></Badge>
					<Badge status="wraning"><Avatar></Avatar></Badge>
					<Badge status="info"><Avatar></Avatar></Badge>`,
				code5:`<Badge status="primary" text="主要" :offset="false"></Badge>
					<Badge status="success" text="成功" :offset="false"></Badge>
					<Badge status="error" text="错误" :offset="false"></Badge>
					<Badge status="warning" text="警告" :offset="false"></Badge>
					<Badge status="info" text="信息" :offset="false"></Badge>
					<Badge status="primary" :count="10" :offset="false"></Badge>
					<Badge status="success" :count="20" :offset="false"></Badge>
					<Badge status="error" :count="30" :offset="false"></Badge>
					<Badge status="warning" :count="40" :offset="false"></Badge>
					<Badge status="info" :count="50" :offset="false"></Badge>`,
				table:{
					props:{
						data:[
							{params:'count',version:'0.0.1',desc:'显示的数字，大于<code>maxCount</code>时，显示<code>{{{maxCount}}}+</code>',type:'<code>Number</code>',required:'否'},
							{params:'maxCount',version:'0.0.1',desc:'展示封顶的数字值',type:'<code>Number</code>',required:'否'},
							{params:'status',version:'0.0.1',desc:'使用预设的状态，可选值为 <code>primary</code>、<code>success</code>、<code>error</code>、<code>warning</code>、<code>info</code>',type:'<code>String</code>',required:'否'},
							{params:'text',version:'0.0.1',desc:'自定义内容',type:'<code>String</code>',required:'否'},
							{params:'color',version:'0.0.1',desc:'设置更多状态点的颜色或自定义颜色',type:'<code>String</code>',required:'否'},
							{params:'offset',version:'0.0.1',desc:'设置徽标独立使用，<code>false</code>表示独立使用',type:'<code>Boolean</code>',required:'否'},
						]
					},
					slot:{
						data:[
							{title:'--',desc:'相对于徽标的组件'},
							{title:'badge',desc:'自定义角标显示内容（带角标背景），数值 count 将无效。亦可自定义状态点模式下的 text 内容。'},
						]
					}
				}
			}
		}
	}
</script>

<style>
</style>
