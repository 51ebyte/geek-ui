<template>
	<div class="example">
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="模态框/对话框使用">
					<Modal v-model="show1" title="信息">这是一个普通对话框</Modal>
					<Modal v-model="show2">这是一个普通无标题栏的对话框</Modal>
					<Modal v-model="show3" :closable="false">这是一个普通关闭按钮的对话框</Modal>
					<Modal v-model="show4" :mask='false'>这是一个无遮罩的对话框</Modal>
					<Modal v-model="show5">
						<template #header>这是自定义头部</template>
							自定义头部、底部的对话框
						<template #footer>
							<div style="text-align: right;">
								<Button style="margin-right: 10px;">自定义-取消</Button>
								<Button type="primary">自定义-确认</Button>
							</div>
						</template>
					</Modal>
					<Modal v-model="show6" footerHide>
						这是一个无底部的对话框
					</Modal>
					<Modal v-model="show7" confirmText="自定义-确认" cancelText="自定义-取消">
						这是一个自定义确认、取消按钮文字的对话框
					</Modal>
					<Modal v-model="show8" :width="500" :minHeight="320">
						这是一个自定义大小的对话框，宽度500px，高度320px
					</Modal>
					<Modal v-model="show9" @onConfirm="onConfirm">
						这是一个异步关闭的对话框
					</Modal>
					<div class="e-flex e-col-center e-flex-wrap">
						<Panel :header='false' margin="5px">
							<Button @click="show1=true">{{show1?'关闭':'打开一个普通对话框'}}</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show2=true">{{show2?'关闭':'打开一个无标题栏的对话框'}}</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show3=true">{{show3?'关闭':'打开一个无关闭按钮的对话框'}}</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show4=true">{{show4?'关闭':'打开一个无遮罩的对话框'}}</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show5=true">{{show5?'关闭':'打开一个自定义头部、底部的对话框'}}</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show6=true">{{show6?'关闭':'打开一个无底部的对话框'}}</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show7=true">{{show7?'关闭':'打开一个自定义确认、取消按钮文字的对话框'}}</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show8=true">{{show8?'关闭':'打开一个自定义大小的对话框'}}</Button>
						</Panel>
						<Panel :header='false' margin="5px">
							<Button @click="show9=true">{{show9?'关闭':'打开一个异步关闭的对话框'}}</Button>
						</Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>使用 <code>v-model&lt;Boolean&gt;</code> 属性双向绑定显示、隐藏对话框</p>
						<p>使用 <code>title&lt;String&gt;</code> 属性设置对话框标题</p>
						<p>使用 <code>closable&lt;Boolean&gt;</code> 属性设置显示、隐藏关闭按钮</p>
						<p>使用 <code>mask&lt;Boolean&gt;</code> 属性设置显示、隐藏遮罩</p>
						<p>使用 <code>width&lt;Number&gt;</code> | <code>maxHeight&lt;Number&gt;</code> | <code>minHeight&lt;Number&gt;</code> 属性设置对话框大小</p>
						<p>使用 <code>confirmText&lt;String&gt;</code> | <code>cancelText&lt;String&gt;</code> 属性设置确认、取消按钮文字</p>
						<p>使用 <code>footerHide&lt;Boolean&gt;</code> 属性设置显示、隐藏底部</p>
						<p>使用 <code>header&lt;Slot&gt;</code> | <code>footer&lt;Slot&gt;</code> 插槽自定义头部、底部</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin='dark' :code='code'></Code>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default{
		layout:'develop',
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
				code:`<Modal v-model="show1" title="信息">这是一个普通对话框</Modal>
					<Modal v-model="show2">这是一个普通无标题栏的对话框</Modal>
					<Modal v-model="show3" :closable="false">这是一个普通关闭按钮的对话框</Modal>
					<Modal v-model="show4" :mask='false'>这是一个无遮罩的对话框</Modal>
					  
					<Modal v-model="show5">
					  <template #header>这是自定义头部</template>
					    自定义头部、底部的对话框
					  <template #footer>
					    <div style="text-align: right;">
					      <Button style="margin-right: 10px;">自定义-取消</Button>
					      <Button type="primary">自定义-确认</Button>
					    </div>
					  </template>
					</Modal>
					  
					<Modal v-model="show6" footerHide>
					  这是一个无底部的对话框
					</Modal>
					  
					<Modal v-model="show7" confirmText="自定义-确认" cancelText="自定义-取消">
					  这是一个自定义确认、取消按钮文字的对话框
					</Modal>
				  
					<Modal v-model="show8" :width="500" :minHeight="320">
					  这是一个自定义大小的对话框，宽度500px，高度320px
					</Modal>
				  
					<Modal v-model="show9" @onConfirm="onConfirm">
					  这是一个异步关闭的对话框
					</Modal>`
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
