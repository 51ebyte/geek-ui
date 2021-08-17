<template>
	<div class="example">
		<Blockquote title="Card 卡片">
			热菜放第一格，冷菜放第二格，蒸菜放第三格...。还有我最喜欢的小龙虾另外放一格😀。
			<p>那么问题来了？卡片和面板得区别在哪里呢</p>
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel title="默认卡片" type="code">
					<Card title="这是一个卡片" :width="350">
						Card body
					</Card>
					<Divider left text="用法说明" margin="36px 0 0">
						默认卡片使用，设置属性<code>title</code>可以设置卡片标题
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code1" skin="dark" :height="212" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel title="基础设置" type="code">
					<Card icon="md-add" title="这是一个卡片" :padding="20" :margin="15" :size="24">
						Card body
					</Card>
					<Divider left text="用法说明" margin="36px 0 0">
						设置属性<code>icon</code>可以设置图标，
						设置属性<code>size</code>可以设置图标的大小；
						设置属性<code>margin</code>可以设置卡片的外边距，
						设置属性<code>padding</code>可以设置卡片的内边距。
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code2" skin="dark" :height="284" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel title="卡片插槽" type="code">
					<Card>
						<template #header>
							<Icon name="md-cube" title="这里是一个卡片" :size="18"></Icon>
						</template>
							Card body
						<template #footer>
							这里是footer
						</template>
					</Card>
					<Divider left text="用法说明" margin="36px 0 0">
						设置slot<code>header</code>可以自定义头部，
						设置slot<code>default</code>可以自定义中间部分，
						设置slot<code>footer</code>可以自定义底部；
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code3" skin="dark" :height="257" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel title="卡片样式" type="code">
					<Card :styles="{
							header:{
								background:'red',
								color:'white',
								padding:'18px'
							},
							body:{
								background:'#19be6b',
								color:'white',
								padding:'16px'
							},
							footer:{
								background:'#F0F0F0',
								color:'#333333',
								padding:'16px'
							}
						}" :radius="15">
						<template #header>
							<Icon name="md-cube" title="这里是一个卡片" :size="18" color="white"></Icon>
						</template>
							Card body
						<template #footer>
							这里是footer
						</template>
					</Card>
					<Divider left text="用法说明" margin="36px 0 0">
						设置属性<code>styles</code>可以自定义头部、中部、底部样式，
						设置属性<code>radius</code>可以设置外层元素圆角，设置<code>:radius="false"</code>则取消圆角；
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code4" skin="dark" :height="304" copy toggle></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Card props"></Blockquote>
				<table-props :data="table.props.data"></table-props>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Card slot"></Blockquote>
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
				code1:`
					<Card title="这是一个卡片">
					  panel body
					</Card>
				`,
				code2:`
					<Card icon="md-add" title="这是一个卡片" :padding="20" :margin="15" :size="24">
				    Card body
				  </Card>`,
				code3:`
				<Card>
				  <template v-slot:header>
				    <Icon name="md-cube" title="这里是一个卡片" :size="18"></Icon>
				  </template>
				    Card body
				  <template v-slot:footer>
				    这里是footer
				  </template>
				</Card>
				`,
				code4:`<Card :styles="{
				  header:{
				    background:'red',
				    color:'white',
				    padding:'18px'
				  },
				  body:{
				    background:'#19be6b',
				    color:'white',
				    padding:'20px'
				  },
				  footer:{
				    background:'#F0F0F0',
				    color:'#333333',
				    padding:'20px'
				  }
					}" :radius="15">
					  <template v-slot:header>
					    <Icon name="md-cube" title="这里是一个卡片" :size="18"></Icon>
					  </template>
					    Card body
					  <template v-slot:footer>
					    这里是footer
					  </template>
				</Card>`,
				code5:`
					<Card title="这是可以折叠的卡片" collapse>
					  Card body
					</Card>`
			}
		},
		setup(props,ctx){
			const table = {
				props:{
					data:[
						{params:'width',version:'0.0.1',desc:'设置卡片宽度',type:'<code>Number</code> | <code>String</code>'},
						{params:'title',version:'0.0.1',desc:'头部显示文字',type:'<code>String</code>',required:'否'},
						{params:'header',version:'0.0.1',desc:'是否显示 <code>header</code> 部分',type:'<code>Boolean</code>',required:'否',select:'<code>true</code> | <code>false</code>',default:'<code>true</code>'},
						{params:'icon',version:'0.0.1',desc:'卡片头部图标',type:'<code>String</code>',default:'<code>false</code>',required:'否'},
						{params:'size',version:'0.0.1',desc:'卡片头部图标大小',type:'<code>Number</code>',default:'22',required:'否'},
						{params:'radius',version:'0.0.1',desc:'卡片圆角，<code>false</code>表示关闭圆角',type:'<code>String</code> | <code>Number</code> | <code>Boolean</code>',default:'6',required:'否',example:'10px | 10 | <code>false</code>'},
						{params:'padding',version:'0.0.1',desc:'卡片外边距',type:'<code>String</code> | <code>Number</code>',default:'12px 15px',required:'否'},
						{params:'margin',version:'0.0.1',desc:'卡片内边距',type:'<code>String</code> | <code>Number</code>',example:'10px | 10px 20px 30px 40px',required:'否'},
						{params:'styles',version:'0.0.1',desc:'设置卡片 <code>header</code>，<code>body</code>，<code>footer</code> 样式',type:'<code>Object</code>',example:'参见上方示例'},
					]
				},
				slot:{
					data:[
						{title:'header',desc:'卡片头部'},
						{title:'extra',desc:'额外显示的内容，默认位置在卡片头部右边'},
						{title:'default',desc:'卡片中部'},
						{title:'footer',desc:'卡片底部'},
					]
				}
			}
			return {
				table
			}
		}
	}
</script>

<style>
</style>
