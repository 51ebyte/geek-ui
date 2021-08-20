<template>
	<div class="example">
		<Blockquote title="Input 输入框">
			喜欢吃什么随便写😊
		</Blockquote>
		
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="基础用法">
					<Input v-model="input.text" required></Input>
					<Input v-model="input.clear" clearable></Input>
					<Input v-model="input.readonly" readonly></Input>
					<Input v-model="input.disabled" disabled></Input>
					<Divider left text="用法说明" margin="30px 0 0">
						<p>通过<code>clearable</code>属性设置为可清空</p>
						<p>通过<code>readonly</code>属性设置为只读状态</p>
						<p>通过<code>disabled</code>属性设置为禁用</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code1" skin="dark" :height="366" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="密码框">
					<Input v-model="input.password" type='password' upperCase></Input>
					<Divider left text="用法说明" margin="30px 0 0">
						<p>通过<code>type="password"</code>可设置为密码框</p>
						<p>通过<code>upperCase</code>属性可设置为密码框监听是否开启大写锁定</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code2" skin="dark" :height="178" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="行内元素">
					<Input v-model="input.inline" inline :width="260"></Input>
					<Divider left text="用法说明" margin="30px 0 0">
						<p>通过<code>inline</code>属性可设置行内元素</p>
						<p>通过<code>width</code>属性可设置元素宽度</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code3" skin="dark" :height="178" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="自定义前置后置图标">
					
					<Panel title="基础用法">
						<Input v-model="input.icon" prefix="ios-contact" suffix="ios-clock-outline"></Input>
					</Panel>
					
					<Panel title="使用对象图标">
						<Input v-model="input.icon" :prefix="{name:'ios-contact',size:20,color:'#FF0000'}" :suffix="{name:'ios-clock-outline',size:16}"></Input>
					</Panel>
					
					<Panel title="使用插槽图标">
						<Input v-model="input.icon">
							<template #prefix>
								<Icon name="ios-contact" color="#FF0000" :size="18"></Icon>
							</template>
							<template #suffix>
								<Icon name="ios-clock-outline" :size="22"></Icon>
							</template>
						</Input>
					</Panel>
					<Divider text="用法说明" left>
						<p>可以通过<code>prefix</code>和<code>suffix</code>属性在<code>input</code>组件首部和尾部增加显示图标，
						属性分别支持<code>String</code>和<code>Object</code>，也可以通过 <code>slot</code> 来放置图标。</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code4" skin="dark" :height="493" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="组合输入框">
					<Input v-model="input.prepend">
						<template #prepend>http://</template>
						<template #append>.com</template>
					</Input>
					<Divider text="用法说明" left>
						<p>可以通过插槽<code>prepend</code><code>append</code>分别放置前置后置内容</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code5" skin="dark" :height="168" copy toggle></Code>
			</Col>
			<Col :span="12" v-if="false">
				<Panel type="code" title="输入建议">
					<Input v-model="input.filter" :prompt="prompt">
						<template #prompt="{item}">
							{{item.value}}
						</template>
					</Input>
					<Input v-model="input.filter2" :prompt="prompt2"></Input>
				</Panel>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Input Props"></Blockquote>
				<table-props :data="table.props.data"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Input Slots"></Blockquote>
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
		data(){
			return{
				input:{
					text:'基础用法',
					clear:'可清空',
					readonly:'只读',
					disabled:'禁用',
					inline:'行内元素',
					password:'这是一个密码框',
					icon:'前置图标、后置图标',
					prepend:'前置、后置组合输入框',
					filter:'',
					filter2:'',
				},
				prompt:[
					{id:1,value:'帝高阳之苗裔兮，朕皇考曰伯庸'},
					{id:2,value:'摄提贞于孟陬兮，惟庚寅吾以降'},
					{id:3,value:'皇览揆余初度兮，肇锡余以嘉名'},
					{id:4,value:'名余曰正则兮，字余曰灵均'},
				],
				prompt2:{
					key:'name',
					list:[
						{id:1,name:'路漫漫其修远兮，吾将上下而求索'},
						{id:2,name:'饮余马于咸池兮，总余辔乎扶桑'},
						{id:3,name:'折若木以拂日兮，聊逍遥以相羊'},
						{id:4,name:'前望舒使先驱兮，后飞廉使奔属'},
					]
				},
				code1:`<template>
					  <Input v-model="input.text"></Input>
					  <Input v-model="input.clear" clearable></Input>
					  <Input v-model="input.readonly" readonly></Input>
					  <Input v-model="input.disabled" disabled></Input>
					</template>
					&lt;script&gt;
				  export default{
				    data(){
				      return{
				        input:{
				          text:'基础用法',
				          clear:'可清空',
				          readonly:'只读',
				          disabled:'禁用'
				        }
				      }
				    }
				  }
					&lt;/script&gt;`,
				code2:`<template>
					  <Input v-model="input.password" type='password' upperCase></Input>
					</template>
					&lt;script&gt;
				  export default{
				    data(){
				      return{
				        input:{
				          password:'这是一个密码框'
				        }
				      }
				    }
				  }
					&lt;/script&gt;`,
				code3:`<template>
					  <Input v-model="input.inline" inline :width="260"></Input>
					</template>
					&lt;script&gt;
				  export default{
				    data(){
				      return{
				        input:{
				          inline:'行内元素'
				        }
				      }
				    }
				  }
					&lt;/script&gt;`,
				code4:`<template>,
					  <Panel title="基础用法">
					    <Input v-model="input.icon" prefix="ios-contact" suffix="ios-clock-outline"></Input>
					  </Panel>
					
					  <Panel title="使用对象图标">
					    <Input v-model="input.icon" 
				      :prefix="{name:'ios-contact',size:20,color:'#FF0000'}" 
				      :suffix="{name:'ios-clock-outline',size:16}"></Input>
					  </Panel>
					
					  <Panel title="使用插槽图标">
					    <Input v-model="input.icon">
					      <template #prefix>
					        <Icon name="ios-contact" color="#FF0000" :size="18"></Icon>
					      </template>
					      <template #suffix>
					        <Icon name="ios-clock-outline" :size="22"></Icon>
					      </template>
					    </Input>
					  </Panel>
					</template>
					&lt;script&gt;
					  export default{
					    data(){
					      return{
					        input:{
					          icon:'前置图标、后置图标'
					        }
					      }
					    }
					  }
					&lt;/script&gt;`,
				code5:`<template>
					  <Input v-model="input.prepend">
					    <template #prepend>http://</template>
					    <template #append>.com</template>
					  </Input>
					</template>
					&lt;script&gt;
					  export default{
					    data(){
					      return{
					        input:{
					          prepend:'前置、后置组合输入框'
					        }
					      }
					    }
					  }
					&lt;/script&gt;`,
				table:{
					props:{
						data:[
							{params:'v-model',version:'0.0.1',desc:'绑定值',type:'<code>String</code> | <code>Number</code>',required:'是'},
							{params:'type',version:'0.0.1',desc:'类型',type:'<code>String</code>',required:'否',select:'<code>text</code> | <code>textarea</code> | <code>password</code>'},
							{params:'placeholder',version:'0.0.1',desc:'占位符',type:'<code>String</code>',required:'否',default:'请输入内容'},
							// {params:'required',version:'0.0.1',desc:'是否必填',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'wdith',version:'0.0.1',desc:'宽度',type:'<code>String</code> | <code>Number</code>',required:'否'},
							{params:'clearable',version:'0.0.1',desc:'是否可清空',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'disabled',version:'0.0.1',desc:'禁用',type:'<code>boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'readonly',version:'0.0.1',desc:'只读',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'disabled',version:'0.0.1',desc:'是否禁用状态',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'upperCase',version:'0.0.1',desc:'开启大写提示，仅<code>type="password"</code>有效',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'prefix',version:'0.0.1',desc:'输入框头部图标',type:'<code>Boolean</code> | <code>Object</code>',example:'<code>{name:"ios-contact",size:20,color:"#FF0000"}</code>'},
							{params:'suffix',version:'0.0.1',desc:'输入框尾部图标',type:'<code>Boolean</code> | <code>Object</code>',example:'<code>{name:"ios-contact",size:20,color:"#FF0000"}</code>'},
						]
					},
					slot:{
						data:[
							{title:'prefix',desc:'前置图标'},
							{title:'suffix',desc:'后置图标'},
							{title:'prepend',desc:'前置内容'},
							{title:'append',desc:'后置内容'},
						]
					},
				}
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>
