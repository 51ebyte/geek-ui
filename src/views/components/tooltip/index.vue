<template>
	<div class="example">
		<Blockquote title="Notice 通知提醒">
			<template #desc>全局展示通知提醒信息</template>
			<template #extra>
				<Switch v-model="example" :text="['显示示例代码','关闭示例代码']"></Switch>
			</template>
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type='code' title="基础用法">
					<div style="width: 520px;margin: 0 auto;">
						<div class="e-flex e-row-center">
							<div style="margin: 5px;">
								<Tooltip content="上左" placement="top-left">
									<Panel :header="false" margin="0px">上左<br />山有木兮木有枝</Panel>
								</Tooltip>
							</div>
							<div style="margin: 5px;">
								<Tooltip content="上边" placement="top">
									<Panel :header="false" margin="0px">上边<br />山有木兮木有枝</Panel>
								</Tooltip>
							</div>
							<div style="margin: 5px;">
								<Tooltip content="上右" placement="top-right">
									<Panel :header="false" margin="0px">上右<br />山有木兮木有枝</Panel>
								</Tooltip>
							</div>
						</div>
						<div class="e-flex e-row-between">
							<div class="center-left">
								<div style="margin: 5px;">
									<Tooltip content="左上" placement="left-top">
										<Panel :header="false" margin="0px">左上<br />山有木兮木有枝</Panel>
									</Tooltip>
								</div>
								<div style="margin: 5px;">
									<Tooltip content="左边" placement="left">
										<Panel :header="false" margin="0px">左边<br />山有木兮木有枝<br />心悦君兮君可知</Panel>
									</Tooltip>
								</div>
								<div style="margin: 5px;">
									<Tooltip content="左下" placement="left-bottom">
										<Panel :header="false" margin="0px">左下<br />山有木兮木有枝</Panel>
									</Tooltip>
								</div>
							</div>
							<div class="center-right">
								<div style="margin: 5px;">
									<Tooltip content="右上" placement="right-top">
										<Panel :header="false" margin="0px">右上<br />山有木兮木有枝</Panel>
									</Tooltip>
								</div>
								<div style="margin: 5px;">
									<Tooltip content="右边" placement="right">
										<Panel :header="false" margin="0px">右边<br />山有木兮木有枝<br />心悦君兮君可知</Panel>
									</Tooltip>
								</div>
								<div style="margin: 5px;">
									<Tooltip content="右下" placement="right-bottom">
										<Panel :header="false" margin="0px">右下<br />山有木兮木有枝</Panel>
									</Tooltip>
								</div>
							</div>
						</div>
						<div class="e-flex e-row-center">
							<div style="margin: 5px;">
								<Tooltip content="下左" placement="bottom-left">
									<Panel :header="false" margin="0px">下左<br />山有木兮木有枝</Panel>
								</Tooltip>
							</div>
							<div style="margin: 5px;">
								<Tooltip content="下边" placement="bottom">
									<Panel :header="false" margin="0px">下边<br />山有木兮木有枝</Panel>
								</Tooltip>
							</div>
							<div style="margin: 5px;">
								<Tooltip content="下右" placement="bottom-right">
									<Panel :header="false" margin="0px">下右<br />山有木兮木有枝</Panel>
								</Tooltip>
							</div>
						</div>
					</div>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>我们提供 12 种不同方向的展示方式，可以通过以上完整示例来理解，选择想要的效果</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code1" copy toggle :height="462"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="多行">
					<div class="e-flex e-row-around">
						<Tooltip placement="top">
							<Button type="primary" plain>多行-插槽渲染模式</Button>
							<template #content>
								山有木兮木有枝<br />心悦君兮君可知
							</template>
						</Tooltip>
						<Tooltip :content="multiple" placement="top">
							<Button type="primary" plain>多行-render渲染模式</Button>
						</Tooltip>
					</div>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过自定义 <code>slot=content</code> 显示多行文本或更复杂的样式</p>
						<p>通过自定义 <code>render</code> 渲染<code>content</code>属性显示多行文本或更复杂的样式</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code2" copy toggle :height="173"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="禁用/延迟">
					<div class="e-flex e-row-around">
						<Tooltip :disabled="disabled" placement="top">
							<Button type="primary" plain @click="disabled=!disabled">{{disabled?'开启':'关闭'}}-提示</Button>
							<template #content>
								山有木兮木有枝<br />心悦君兮君可知
							</template>
						</Tooltip>
						<Tooltip placement="top" :delay='1000'>
							<Button type="primary" plain>延迟提示</Button>
							<template #content>
								山有木兮木有枝<br />心悦君兮君可知
							</template>
						</Tooltip>
						<Tooltip placement="top" :width="200">
							<Button type="primary" plain>设定宽度</Button>
							<template #content>
								山有木兮木有枝，心悦君兮君可知
							</template>
						</Tooltip>
					</div>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过设置属性 <code>disabled</code> 可以禁用文字提示</p>
						<p>通过设置属性 <code>delay</code> 可以延时显示文字提示，单位毫秒</p>
						<p>通过设置属性 <code>width</code> 可以设置宽度，文本将自动换行</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code3" copy toggle :height="200"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Tooltip props"></Blockquote>
				<table-props :data="table.props.data" :example="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Tooltip slot"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
			<Col :span="24">
				<Blockquote title="Tooltip event"></Blockquote>
				<table-event :data="table.event.data"></table-event>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {h} from 'vue'
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
				multiple:h('div',[
					h('div','山有木兮木有枝'),
					h('div','心悦君兮君可知'),
				]),
				disabled:true,
				example:true,
				code1:`<div style="width: 520px;margin: 0 auto;">
					  <div class="e-flex e-row-center">
					    <div style="margin: 5px;">
					      <Tooltip content="上左" placement="top-left">
					        <Panel :header="false" margin="0px">上左<br />山有木兮木有枝</Panel>
					      </Tooltip>
					    </div>
					    <div style="margin: 5px;">
					      <Tooltip content="上边" placement="top">
					        <Panel :header="false" margin="0px">上边<br />山有木兮木有枝</Panel>
					      </Tooltip>
					    </div>
					    <div style="margin: 5px;">
					      <Tooltip content="上右" placement="top-right">
					        <Panel :header="false" margin="0px">上右<br />山有木兮木有枝</Panel>
					      </Tooltip>
					    </div>
					  </div>
					  <div class="e-flex e-row-between">
					    <div class="center-left">
					      <div style="margin: 5px;">
					        <Tooltip content="左上" placement="left-top">
					          <Panel :header="false" margin="0px">左上<br />山有木兮木有枝</Panel>
					        </Tooltip>
					      </div>
					      <div style="margin: 5px;">
					        <Tooltip content="左边" placement="left">
					          <Panel :header="false" margin="0px">左边<br />山有木兮木有枝<br />心悦君兮君可知</Panel>
					        </Tooltip>
					      </div>
					      <div style="margin: 5px;">
					        <Tooltip content="左下" placement="left-bottom">
					          <Panel :header="false" margin="0px">左下<br />山有木兮木有枝</Panel>
					        </Tooltip>
					      </div>
					    </div>
					    <div class="center-right">
					      <div style="margin: 5px;">
					        <Tooltip content="右上" placement="right-top">
					          <Panel :header="false" margin="0px">右上<br />山有木兮木有枝</Panel>
					        </Tooltip>
					      </div>
					      <div style="margin: 5px;">
					        <Tooltip content="右边" placement="right">
					          <Panel :header="false" margin="0px">右边<br />山有木兮木有枝<br />心悦君兮君可知</Panel>
					        </Tooltip>
					      </div>
					      <div style="margin: 5px;">
					        <Tooltip content="右下" placement="right-bottom">
					          <Panel :header="false" margin="0px">右下<br />山有木兮木有枝</Panel>
					        </Tooltip>
					      </div>
					    </div>
					  </div>
					  <div class="e-flex e-row-center">
					    <div style="margin: 5px;">
					      <Tooltip content="下左" placement="bottom-left">
					        <Panel :header="false" margin="0px">下左<br />山有木兮木有枝</Panel>
					      </Tooltip>
					    </div>
					    <div style="margin: 5px;">
					      <Tooltip content="下边" placement="bottom">
					        <Panel :header="false" margin="0px">下边<br />山有木兮木有枝</Panel>
					      </Tooltip>
					    </div>
					    <div style="margin: 5px;">
					      <Tooltip content="下右" placement="bottom-right">
					        <Panel :header="false" margin="0px">下右<br />山有木兮木有枝</Panel>
					      </Tooltip>
					    </div>
					  </div>
					</div>`,
				code2:`<Tooltip placement="top">
						  <Button type="primary" plain>多行-插槽渲染模式</Button>
						  <template #content>
						    山有木兮木有枝<br />心悦君兮君可知
						  </template>
						</Tooltip>
						<Tooltip :content="multiple" placement="top">
						  <Button type="primary" plain>多行-render渲染模式</Button>
						</Tooltip>`,
				code3:`<Tooltip :disabled="disabled" placement="top">
						  <Button type="primary" plain @click="disabled=!disabled">{{disabled?'开启':'关闭'}}-提示</Button>
						  <template #content>
						    山有木兮木有枝<br />心悦君兮君可知
						  </template>
						</Tooltip>
						<Tooltip placement="top" :delay='1000'>
						  <Button type="primary" plain>延迟提示</Button>
						  <template #content>
						    山有木兮木有枝<br />心悦君兮君可知
						  </template>
						</Tooltip>
						<Tooltip placement="top" :width="200">
						  <Button type="primary" plain>设定宽度</Button>
						  <template #content>
						    山有木兮木有枝，心悦君兮君可知
						  </template>
						</Tooltip>`,
				table:{
					props:{
						data:[
							{params:'content',version:'0.0.1',desc:'显示的内容',type:'<code>String</code> | <code>VNode</code>',required:'否'},
							{params:'placement',version:'0.0.1',desc:`提示框出现的位置`,type:'<code>String</code>',required:'否',
								default:'<code>bottom</code>',select:`
								<code>top</code><code>top-left</code><code>top-right</code>
								<code>bottom</code><code>bottom-left</code><code>bottom-right</code>
								<code>left</code><code>left-top</code><code>left-bottom</code>
								<code>right</code><code>right-top</code><code>right-bottom</code>`},
							{params:'disabled',version:'0.0.1',desc:'是否禁用提示框',type:'<code>Boolean</code>',default:'<code>false</code>',required:'否',},
							{params:'delay',version:'0.0.1',desc:'延迟显示，单位毫秒',type:'<code>Number</code>',default:'<code>0</code>',required:'否'},
							{params:'width',version:'0.0.1',desc:'宽度，文本将自动换行',type:'<code>Number</code>',required:'否'},
						]
					},
					slot:{
						data:[
							{title:'default',desc:'主体内容'},
							{title:'content',desc:'提示框的内容'},
						]
					},
					event:{
						data:[
							{name:'@show',desc:'在提示框显示时触发'},
							{name:'@hide',desc:'在提示框消失时触发'},
						]
					}
				}
			}
		}
	}
</script>

<style>
</style>
