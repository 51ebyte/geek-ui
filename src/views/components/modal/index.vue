<template>
	<div class="example">
		<Blockquote title="Modal 模态/对话框">
			热菜放第一格，冷菜放第二格，蒸菜放第三格...。还有我最喜欢的小龙虾另外放一格😀
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" :header="false">
					<Modal v-model="show1">这是一个普通模态框</Modal>
					<Modal v-model="show2" title="信息">这是一个普通有标题栏的模态框</Modal>
					<Modal v-model="show3" :closable="false">这是一个普通无关闭按钮的模态框</Modal>
					<Modal v-model="show4" :mask='false'>这是一个无遮罩的模态框</Modal>
					<Modal v-model="show5">
						<template #header>这是自定义头部</template>
							自定义头部、底部的模态框
						<template #footer>
							<div style="text-align: right;">
								<Button style="margin-right: 10px;">自定义-取消</Button>
								<Button type="primary">自定义-确认</Button>
							</div>
						</template>
					</Modal>
					<Modal v-model="show6" footerHide>
						这是一个无底部的模态框
					</Modal>
					<Modal v-model="show7" confirmText="自定义-确认" cancelText="自定义-取消">
						这是一个自定义确认、取消按钮文字的模态框
					</Modal>
					<Modal v-model="show8" :width="500" :minHeight="320">
						这是一个自定义大小的模态框，宽度500px，高度320px
					</Modal>
					<Modal v-model="show9" @onConfirm="onConfirm">
						这是一个异步关闭的模态框
					</Modal>
					<Modal v-model="show10" fullscreen title="全屏模态框">
						这是一个全屏模态框
					</Modal>
					<div class="e-flex e-col-center e-flex-wrap">
						<Panel :header='false' margin="5px">
							<Button @click="show1=!show1">{{show1?'关闭':'打开一个'}}普通模态框</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show2=!show2">{{show2?'关闭':'打开一个'}}有标题栏的模态框</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show3=!show3">{{show3?'关闭':'打开一个'}}无关闭按钮的模态框</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show4=!show4">{{show4?'关闭':'打开一个'}}无遮罩的模态框</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show5=!show5">{{show5?'关闭':'打开一个'}}自定义头部、底部的模态框</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show6=!show6">{{show6?'关闭':'打开一个'}}无底部的模态框</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show7=!show7">{{show7?'关闭':'打开一个'}}自定义确认、取消按钮文字的模态框</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show8=!show8">{{show8?'关闭':'打开一个'}}自定义大小的模态框</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show9=!show9">{{show9?'关闭':'打开一个'}}异步关闭的模态框</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show10=!show10">{{show10?'关闭':'打开一个'}}全屏模态框</Button>
						</Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>使用 <code>v-model&lt;Boolean&gt;</code> 属性双向绑定显示、隐藏模态框</p>
						<p>使用 <code>title&lt;String&gt;</code> 属性设置模态框标题</p>
						<p>使用 <code>closable&lt;Boolean&gt;</code> 属性设置显示、隐藏关闭按钮</p>
						<p>使用 <code>mask&lt;Boolean&gt;</code> 属性设置显示、隐藏遮罩</p>
						<p>使用 <code>maskClosable&lt;Boolean&gt;</code> 属性设置点击遮罩是否关闭模态框</p>
						<p>使用 <code>width&lt;Number&gt;</code> | <code>maxHeight&lt;Number&gt;</code> | <code>minHeight&lt;Number&gt;</code> 属性设置模态框大小</p>
						<p>使用 <code>confirmText&lt;String&gt;</code> | <code>cancelText&lt;String&gt;</code> 属性设置确认、取消按钮文字</p>
						<p>使用 <code>confirmType&lt;String&gt;</code> 属性设置确认按钮类型，支持 <code>primary</code> | <code>success</code> | <code>error</code> | <code>warning</code> | <code>info</code></p>
						<p>使用 <code>confirmLoading&lt;String&gt;</code> 属性设置异步关闭时是否显示 <code>loading</code></p>
						<p>使用 <code>footerHide&lt;Boolean&gt;</code> 属性设置显示、隐藏底部</p>
						<p>使用 <code>header&lt;Slot&gt;</code> | <code>footer&lt;Slot&gt;</code> 插槽自定义头部、底部</p>
						<p>使用 <code>maxmin&lt;Boolean&gt;</code> 属性设置显示、隐藏最大最小化</p>
						<p>使用 <code>fullscreen&lt;Boolean&gt;</code> 属性设置打开即全屏</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin='dark' :code='code'></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Modal props"></Blockquote>
				<table-props :data="table.props.data" :example="false"></table-props>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Modal slot"></Blockquote>
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
				show1:false,
				show2:false,
				show3:false,
				show4:false,
				show5:false,
				show6:false,
				show7:false,
				show8:false,
				show9:false,
				show10:false,
				code:`<Modal v-model="show1" title="信息">这是一个普通模态框</Modal>
					<Modal v-model="show2">这是一个普通无标题栏的模态框</Modal>
					<Modal v-model="show3" :closable="false">这是一个普通关闭按钮的模态框</Modal>
					<Modal v-model="show4" :mask='false'>这是一个无遮罩的模态框</Modal>
					  
					<Modal v-model="show5">
					  <template #header>这是自定义头部</template>
					    自定义头部、底部的模态框
					  <template #footer>
					    <div style="text-align: right;">
					      <Button style="margin-right: 10px;">自定义-取消</Button>
					      <Button type="primary">自定义-确认</Button>
					    </div>
					  </template>
					</Modal>
					  
					<Modal v-model="show6" footerHide>
					  这是一个无底部的模态框
					</Modal>
					  
					<Modal v-model="show7" confirmText="自定义-确认" cancelText="自定义-取消">
					  这是一个自定义确认、取消按钮文字的模态框
					</Modal>
				  
					<Modal v-model="show8" :width="500" :minHeight="320">
					  这是一个自定义大小的模态框，宽度500px，高度320px
					</Modal>
				  
					<Modal v-model="show9" @onConfirm="onConfirm">
					  这是一个异步关闭的模态框
					</Modal>`,
				table:{
					props:{
						data:[
							{params:'v-model',version:'0.0.1',desc:'模态框是否显示',type:'<code>Boolean</code>',required:'是'},
							{params:'title',version:'0.0.1',desc:'模态框标题，如果使用 <code>slot</code> 自定义了页头 <code>header</code>，则 title 无效',type:'<code>String</code>',required:'否'},
							{params:'closable',version:'0.0.1',desc:'是否显示右上角的关闭按钮',type:'<code>Boolean</code>',required:'否',},
							{params:'mask',version:'0.0.1',desc:'是否显示遮罩层',type:'<code>Boolean</code>',required:'否',default:'<code>true</code>'},
							{params:'maskClosable',version:'0.0.1',desc:'是否允许点击遮罩层关闭',type:'<code>Boolean</code>',default:'<code>true</code>',required:'否'},
							{params:'width',version:'0.0.1',desc:'模态框宽度，<code>Number</code>类型单位是<code>px</code>，<code>String</code>需携带单位',type:'<code>String</code> | <code>Number</code>',default:'<code>680</code>',required:'否'},
							{params:'minHeight',version:'0.0.1',desc:'模态框最小高度，<code>Number</code>类型单位是<code>px</code>，<code>String</code>需携带单位',type:'<code>String</code> | <code>Number</code>',default:'<code>480</code>',required:'否'},
							{params:'maxHeight',version:'0.0.1',desc:'模态框最大高度，<code>Number</code>类型单位是<code>px</code>，<code>String</code>需携带单位',type:'<code>String</code> | <code>Number</code>',required:'否'},
							{params:'confirmText',version:'0.0.1',desc:'确定按钮文字',type:'<code>String</code>',required:'否',default:'<code>确认</code>'},
							{params:'cancelText',version:'0.0.1',desc:'取消按钮文字',type:'<code>String</code>',required:'否',default:'<code>取消</code>'},
							{params:'confirmType',version:'0.0.1',desc:'确定按钮类型，支持 <code>primary</code> | <code>success</code> | <code>error</code> | <code>warning</code> | <code>info</code>',type:'<code>String</code>',select:'<code>primary</code> | <code>success</code> | <code>error</code> | <code>warning</code> | <code>info</code>',default:'<code>primary</code>',required:'否'},
							{params:'confirmLoading',version:'0.0.1',desc:'点击确定按钮时，确定按钮是否显示 <code></code> 状态，开启则需手动设置 <code>v-model</code>来关闭模态框',type:'<code>Boolean</code>',default:'<code>true</code>',required:'否'},
							{params:'footerHide',version:'0.0.1',desc:'不显示底部',type:'<code>Boolean</code>',default:'<code>false</code>',required:'否'},
							{params:'maxmin',version:'0.0.1',desc:'开启最大最小化',type:'<code>Boolean</code>',default:'<code>true</code>',required:'否'},
							{params:'zIndex',version:'0.0.1',desc:'层级',type:'<code>Number</code>',default:'<code>1000</code>',required:'否'},
							{params:'fullscreen',version:'0.0.1',desc:'是否全屏显示',type:'<code>Boolean</code>',default:'<code>false</code>',required:'否'},
						]
					},
					slot:{
						data:[
							{title:'header',desc:'模态框头部'},
							{title:'default',desc:'模态框中部'},
							{title:'footer',desc:'模态框底部'},
						]
					}
				}
			}
		},
		methods:{
			onConfirm(){
				setTimeout(() => {
					this.show9 = false;
				}, 2000);
			}
		}
	}
</script>

<style>
</style>
