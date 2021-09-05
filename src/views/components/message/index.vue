<template>
	<div class="example">
		<Blockquote title="Message 全局提示">
			<template #desc>全局展示操作反馈信息</template>
			<template #extra>
				<Switch v-model="example" :text="['显示示例代码','关闭示例代码']"></Switch>
			</template>
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type='code' title="普通提示">
					<Button type="primary" @click="open('info','这是一个普通提示，1.5秒后消失')">显示一个普通提示</Button>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>信息提醒反馈</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code1" copy toggle :height="140"></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="提示类型">
					<Button type="success" @click="open('success','这是一个成功提示，1.5秒后消失')">成功提示</Button>
					<Button type="error" @click="open('error','这是一个错误提示，1.5秒后消失')">错误提示</Button>
					<Button type="warning" @click="open('warning','这是一个警告提示，1.5秒后消失')">警告提示</Button>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>不同的提示状态：成功、警告、错误</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code2" copy toggle :height="140"></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="显示背景">
					<Button type="success" @click="open('success_bg','这是一个成功提示，1.5秒后消失')">成功提示</Button>
					<Button type="error" @click="open('error_bg','这是一个错误提示，1.5秒后消失')">错误提示</Button>
					<Button type="warning" @click="open('warning_bg','这是一个警告提示，1.5秒后消失')">警告提示</Button>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>设置属性 <code>background</code> 后，通知提示会显示背景色</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code4" copy toggle :height="140"></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="加载中">
					<Button type="primary" @click="open('loading','这是一个加载中的提示，不会主动消失')">Loading...</Button>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>Loading 的状态，需异步关闭</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code3" copy toggle :height="140"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Message API"></Blockquote>
				<Row :gutter="10">
					<Col :span="12">
						<Panel title='通过直接调用以下方法来使用组件'>
							<p><Badge :offset='false'></Badge>&nbsp;&nbsp;<code>this.$geek.$Message.info(config&lt;Object&gt;)</code></p>
							<p><Badge :offset='false'></Badge>&nbsp;&nbsp;<code>this.$geek.$Message.success(config&lt;Object&gt;)</code></p>
							<p><Badge :offset='false'></Badge>&nbsp;&nbsp;<code>this.$geek.$Message.error(config&lt;Object&gt;)</code></p>
							<p><Badge :offset='false'></Badge>&nbsp;&nbsp;<code>this.$geek.$Message.warning(config&lt;Object&gt;)</code></p>
							<p><Badge :offset='false'></Badge>&nbsp;&nbsp;<code>this.$geek.$Message.loading(config&lt;Object&gt;)</code></p>
						</Panel>
					</Col>
					<Col :span="12">
						<Panel title='注意'>
							<Prompt type="error" style="margin: 0px;">
								<Badge :offset='false'></Badge>&nbsp;&nbsp;<code>loading 状态下需手动关闭提示</code>
								<p><code>const instance = this.$geek.$Message.loading('这是一个加载中的提示，不会主动消失')</code></p>
								<p><code>setTimeout(instance.close,2500)</code></p>
							</Prompt>
						</Panel>
					</Col>
				</Row>
				<p style="margin: 20px 0;">以上方法隐式的创建及维护 Vue 组件。参数 config 可以是字符串或对象，当为字符串时，直接显示内容，当为对象时，具体说明如下：</p>
				<Table :cols="[
					{ title: '属性', width: 160, key: 'attr', align: 'center', render: 'html' },
					{ title: '说明',minWidth:260, align: 'center', key: 'desc', render: 'html' },
					{ title: '属性类型', width: 198, default: '-', key: 'type',align: 'center', render: 'html' },
					{ title: '默认值', minWidth: 160, default: '-', key: 'default', render: 'html', align: 'center' }
				]" :data="[
					{attr:'content',type:'<code>String</code> | <code>VNode</code>',desc:'显示内容'},
					{attr:'duration',type:'<code>Number</code>',desc:'自动关闭的延时，单位毫秒，不关闭可以写 0',default:'<code>1500</code>'},
					{attr:'background',type:'<code>Boolean</code>',desc:'是否显示背景色',default:'<code>false</code>'},
					{attr:'closable',type:'<code>Boolean</code>',desc:'是否显示关闭按钮',default:'<code>false</code>'},
				]" border></Table>
				
			</Col>
		</Row>
	</div>
</template>

<script>
	import {Message} from '../../../geek-ui'
	export default{
		layout:'develop',
		data() {
			return{
				example:true,
				code1:`<template>
					  <Button type="primary" @click="info">显示一个普通提示</Button>
					</template>
					&lt;script&gt;
					  export default{
					    methods:{
					      info(){
					        this.$geek.$Message.info('这是一个普通提示，1.5秒后消失')
					      }
					    }
					  }
					&lt;/script&gt;`,
				code2:`<template>
					  <Button type="success" @click="success">成功提示</Button>
					  <Button type="error" @click="error">错误提示</Button>
					  <Button type="warning" @click="warning">警告提示</Button>
					</template>
					&lt;script&gt;
					  export default{
					    methods:{
					      success(){
					        this.$geek.$Message.success('这是一个成功提示，1.5秒后消失')
					      },
					      error(){
					        this.$geek.$Message.error('这是一个错误提示，1.5秒后消失')
					      },
					      warning(){
					        this.$geek.$Message.warning('这是一个警告提示，1.5秒后消失')
					      },
					    }
					  }
					&lt;/script&gt;`,
				code3:`<template>
					  <Button type="primary" @click="loading">Loading...</Button>
					</template>
					&lt;script&gt;
					  export default{
					    methods:{
					      loading(){
					        const instance = this.$geek.$Message.loading('这是一个加载中的提示，不会主动消失')
					        setTimeout(instance.close,2500)
					      },
					    }
					  }
					&lt;/script&gt;`,
				code4:`<template>
					  <Button type="success" @click="success">成功提示</Button>
					  <Button type="error" @click="error">错误提示</Button>
					  <Button type="warning" @click="warning">警告提示</Button>
					</template>
					&lt;script&gt;
					  export default{
					    methods:{
					      success(){
					        this.$geek.$Message.success({
					          content:content,
					          background:true
					        })
					      },
					      error(){
					        this.$geek.$Message.error({
					          content:content,
					          background:true
					        })
					      },
					      warning(){
					        this.$geek.$Message.warning({
					          content:content,
					          background:true
					        })
					      },
					    }
					  }
					&lt;/script&gt;`,
				
			}
		},
		methods:{
			open(type,content){
				let that = this;
				switch(type){
					case 'info':
						Message.info(content)
					break;
					case 'success':
						Message.success(content)
					break;
					case 'error':
						Message.error(content)
					break;
					case 'warning':
						Message.warning(content)
					break;
					case 'loading':
						const instance = Message.loading(content)
						setTimeout(instance.close,2500)
					break;
					case 'success_bg':
						Message.success({
							content:content,
							background:true
						})
					break;
					case 'error_bg':
						Message.error({
							content:content,
							background:true
						})
					break;
					case 'warning_bg':
						Message.warning({
							content:content,
							background:true
						})
					break;
				}
			}
		}
	}
</script>

<style>
</style>
