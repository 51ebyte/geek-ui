<template>
	<div class="example">
		<Blockquote title="Panel 面板（折叠）">
			热菜放第一格，冷菜放第二格，蒸菜放第三格...。还有我最喜欢的小龙虾另外放一格😀
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel title="默认面板" type="code">
					<Panel title="这是一个面板">
						panel body
					</Panel>
					<Divider left text="用法说明" margin="36px 0 0">
						默认面板使用，设置属性<code>title</code>可以设置面板标题
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code1" skin="dark" :height="200" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel title="基础设置" type="code">
					<Panel icon="md-add" title="这是一个面板" :padding="20" :margin="15" :size="24">
						panel body
					</Panel>
					<Divider left text="用法说明" margin="36px 0 0">
						设置属性<code>icon</code>可以设置图标，
						设置属性<code>size</code>可以设置图标的大小；
						设置属性<code>margin</code>可以设置面板的外边距，
						设置属性<code>padding</code>可以设置面板的内边距。
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code2" skin="dark" :height="275" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel title="面板插槽" type="code">
					<Panel>
						<template #header>
							<Icon name="md-cube" title="这里是一个面板" :size="18"></Icon>
						</template>
							panel body
						<template #footer>
							这里是footer
						</template>
					</Panel>
					<Divider left text="用法说明" margin="36px 0 0">
						设置slot<code>header</code>可以自定义头部，
						设置slot<code>default</code>可以自定义中间部分，
						设置slot<code>footer</code>可以自定义底部；
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code3" skin="dark" :height="240" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel title="面板样式" type="code">
					<Panel :styles="{
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
							<Icon name="md-cube" title="这里是一个面板" :size="18"></Icon>
						</template>
							panel body
						<template #footer>
							这里是footer
						</template>
					</Panel>
					<Divider left text="用法说明" margin="36px 0 0">
						设置属性<code>styles</code>可以自定义头部、中部、底部样式，
						设置属性<code>radius</code>可以设置外层元素圆角，设置<code>:radius="false"</code>则取消圆角；
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code4" skin="dark" :height="275" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel title="折叠面板" type="code">
					<Panel title="这是可以折叠的面板" collapse>
						panel body
					</Panel>
					<Divider left text="用法说明" margin="36px 0 0">
						设置属性<code>collapse</code>可以设置面板为折叠面板<br />
						设置<code>collapse="open"</code>可以设置折叠面板为展开状态，
						设置<code>collapse="close"</code>可以设置折叠面板默认为关闭状态
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code5" skin="dark" :height="230" copy toggle></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Panel props"></Blockquote>
				<table-props :data="table.props.data"></table-props>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Panel slot"></Blockquote>
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
					<Panel title="这是一个面板">
					  panel body
					</Panel>
				`,
				code2:`
					<Panel icon="md-add" title="这是一个面板" :padding="20" :margin="15" :size="24">
				    panel body
				  </Panel>`,
				code3:`
				<Panel>
				  <template v-slot:header>
				    <Icon name="md-cube" title="这里是一个面板" :size="18"></Icon>
				  </template>
				    panel body
				  <template v-slot:footer>
				    这里是footer
				  </template>
				</Panel>
				`,
				code4:`<Panel :styles="{
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
					    <Icon name="md-cube" title="这里是一个面板" :size="18"></Icon>
					  </template>
					    panel body
					  <template v-slot:footer>
					    这里是footer
					  </template>
				</Panel>`,
				code5:`
					<Panel title="这是可以折叠的面板" collapse>
					  panel body
					</Panel>`
			}
		},
		setup(props,ctx){
			const table = {
				props:{
					data:[
						{params:'type',version:'0.0.1',desc:'面板类型',type:'<code>String</code>',required:'否',select:'code'},
						{params:'title',version:'0.0.1',desc:'头部显示文字',type:'<code>String</code>',required:'否'},
						{params:'skin',version:'0.0.1',desc:'面板内置皮肤',type:'<code>String</code>',required:'否',select:'dark'},
						{params:'header',version:'0.0.1',desc:'是否显示 <code>header</code> 部分',type:'<code>Boolean</code>',required:'否',select:'<code>true</code> | <code>false</code>',default:'<code>true</code>'},
						{params:'icon',version:'0.0.1',desc:'面板头部图标',type:'<code>String</code>',default:'<code>false</code>',required:'否'},
						{params:'size',version:'0.0.1',desc:'面板头部图标大小',type:'<code>Number</code>',default:'22',required:'否'},
						{params:'radius',version:'0.0.1',desc:'面板圆角，<code>false</code>表示关闭圆角',type:'<code>String</code> | <code>Number</code> | <code>Boolean</code>',default:'6',required:'否',example:'10px | 10 | <code>false</code>'},
						{params:'padding',version:'0.0.1',desc:'面板外边距',type:'<code>String</code> | <code>Number</code>',default:'12px 15px',required:'否'},
						{params:'margin',version:'0.0.1',desc:'面板内边距',type:'<code>String</code> | <code>Number</code>',example:'10px | 10px 20px 30px 40px',required:'否'},
						{params:'styles',version:'0.0.1',desc:'设置面板 <code>header</code>，<code>body</code>，<code>footer</code> 样式',type:'<code>Object</code>',example:'参见上方示例'},
						{params:'collapse',version:'0.0.1',desc:'设置折叠面板',type:'<code>Boolean</code> | <code>String</code>',select:'<code>true</code> | <code>open</code> | <code>close</code>',default:'<code>false</code>'},
					]
				},
				slot:{
					data:[
						{title:'header',desc:'面板头部'},
						{title:'extra',desc:'额外显示的内容，默认位置在面板头部右边'},
						{title:'default',desc:'面板中部'},
						{title:'footer',desc:'面板底部'},
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
