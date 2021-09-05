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
				<Panel type='code' title="普通提示">
					<Button type="primary" @click="open('open')">收到一条提醒，4.5 秒后自动关闭</Button>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>最简单的用法，4.5 秒后自动关闭</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code1" copy toggle :height="140"></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="带图标的提醒类型">
					<Button type="primary" @click="open('info')">信息提醒</Button>
					<Button type="success" @click="open('success')">成功提醒</Button>
					<Button type="error" @click="open('error')">错误提醒</Button>
					<Button type="warning" @click="open('warning')">警告提醒</Button>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>不同的提示状态：信息、成功、警告、错误</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code2" copy toggle :height="140"></Code>
			</Col>
			
			<Col :span="12">
				<Panel type='code' title="不同的位置">
					<Button type="primary" @click="open('info',{placement:'topLeft'})">信息提醒</Button>
					<Button type="success" @click="open('success',{placement:'topLeft'})">成功提醒</Button>
					<Button type="error" @click="open('error',{placement:'topLeft'})">错误提醒</Button>
					<Button type="warning" @click="open('warning',{placement:'topLeft'})">警告提醒</Button>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>placement&lt;String&gt;</code> 设置通知从右上角、左上角弹出。</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code3" copy toggle :height="140"></Code>
			</Col>
			
			<Col :span="12">
				<Panel type='code' title="自定义时长">
					<Button type="primary" @click="open('info',{
						duration:0,
						closable:true,
						title:'这条通知不会主动关闭',
						desc:'这条通知不会主动关闭,这条通知不会主动关闭,这条通知不会主动关闭'
					})">信息提醒</Button>
					<Button type="success" @click="open('success',{
						duration:0,
						closable:true,
						title:'这条通知不会主动关闭',
						desc:'这条通知不会主动关闭,这条通知不会主动关闭,这条通知不会主动关闭'
					})">成功提醒</Button>
					<Button type="error" @click="open('error',{
						duration:10000,
						closable:true,
						title:'这条通知10s后关闭',
						desc:'这条通知10s后关闭'
					})">错误提醒</Button>
					<Button type="warning" @click="open('warning',{
						duration:8000,
						closable:true,
						title:'这条通知8s后关闭',
						desc:'这条通知8s后关闭'
					})">警告提醒</Button>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>自定义通知框自动关闭的延时，默认 4.5s，取消自动关闭只要将该<code>duration</code>设为 0 即可。</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-show="example">
				<Code skin='dark' :code="code3" copy toggle :height="140"></Code>
			</Col>
			
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Notice API"></Blockquote>
				<Panel title='通过直接调用以下方法来使用组件'>
					<p><Badge :offset='false'></Badge>&nbsp;&nbsp;<code>this.$geek.$Notice.open(config&lt;Object&gt;)</code></p>
					<p><Badge :offset='false'></Badge>&nbsp;&nbsp;<code>this.$geek.$Notice.info(config&lt;Object&gt;)</code></p>
					<p><Badge :offset='false'></Badge>&nbsp;&nbsp;<code>this.$geek.$Notice.success(config&lt;Object&gt;)</code></p>
					<p><Badge :offset='false'></Badge>&nbsp;&nbsp;<code>this.$geek.$Notice.error(config&lt;Object&gt;)</code></p>
					<p><Badge :offset='false'></Badge>&nbsp;&nbsp;<code>this.$geek.$Notice.warning(config&lt;Object&gt;)</code></p>
				</Panel>
				<p style="margin: 20px 0;">以上方法隐式的创建及维护 Vue 组件。参数 config 可以是字符串或对象，当为字符串时，直接显示内容，当为对象时，具体说明如下：</p>
				<Table :cols="[
					{ title: '属性', width: 160, key: 'attr', align: 'center', render: 'html' },
					{ title: '说明',minWidth:260, align: 'center', key: 'desc', render: 'html' },
					{ title: '属性类型', width: 198, default: '-', key: 'type',align: 'center', render: 'html' },
					{ title: '默认值', minWidth: 160, default: '-', key: 'default', render: 'html', align: 'center' }
				]" :data="[
					{attr:'title',type:'<code>String</code> | <code>VNode</code>',desc:'通知标题'},
					{attr:'desc',type:'<code>String</code> | <code>VNode</code>',desc:'通知内容'},
					{attr:'duration',type:'<code>Number</code>',desc:'自动关闭的延时，单位毫秒，不关闭可以写 0',default:'<code>4500</code>'},
					{attr:'placement',type:'<code>String</code>',desc:'弹出方向,可选<code>topLeft</code> | <code>topRight</code>',default:'<code>topRight</code>'},
					{attr:'closable',type:'<code>Boolean</code>',desc:'是否显示关闭按钮',default:'<code>false</code>'},
				]" border></Table>
				
			</Col>
		</Row>
	</div>
</template>

<script>
	import {Notice} from '../../../geek-ui'
	export default{
		layout:'develop',
		data() {
			return{
				example:true,
				code1:`<template>
					  <Button type="primary" @click="open">收到一条提醒，4.5 秒后自动关闭</Button>
					</template>
					&lt;script&gt;
					  export default{
					    methods:{
					      open(){
					        this.$geek.$Message.open({
					          title:'这是通知标题',
					          desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
					        })
					      }
					    }
					  }
					&lt;/script&gt;`,
				code2:`<template>
					  <Button type="primary" @click="info">信息提示</Button>
					  <Button type="success" @click="success">成功提示</Button>
					  <Button type="error" @click="error">错误提示</Button>
					  <Button type="warning" @click="warning">警告提示</Button>
					</template>
					&lt;script&gt;
					  export default{
					    methods:{
					      info(){
					        this.$geek.$Message.info({
					          title:'这是通知标题',
					          desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
					        })
					      },
					      success(){
					        this.$geek.$Message.success({
					          title:'这是通知标题',
					          desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
					        })
					      },
					      error(){
					        this.$geek.$Message.error({
					          title:'这是通知标题',
					          desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
					        })
					      },
					      warning(){
					        this.$geek.$Message.warning({
					          title:'这是通知标题',
					          desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
					        })
					      },
					    }
					  }
					&lt;/script&gt;`,
				code3:`<template>
					  <Button type="primary" @click="info">信息提示</Button>
					  <Button type="success" @click="success">成功提示</Button>
					  <Button type="error" @click="error">错误提示</Button>
					  <Button type="warning" @click="warning">警告提示</Button>
					</template>
					&lt;script&gt;
					  export default{
					    methods:{
					      info(){
					        this.$geek.$Message.info({
					          title:'这是通知标题',
					          placement:'topLeft',
					          desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
					        })
					      },
					      success(){
					        this.$geek.$Message.success({
					          title:'这是通知标题',
					          placement:'topLeft',
					          desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
					        })
					      },
					      error(){
					        this.$geek.$Message.error({
					          title:'这是通知标题',
					          placement:'topLeft',
					          desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
					        })
					      },
					      warning(){
					        this.$geek.$Message.warning({
					          title:'这是通知标题',
					          placement:'topLeft',
					          desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
					        })
					      },
					    }
					  }
					&lt;/script&gt;`,
				code3:`<template>
					  <Button type="primary" @click="info">信息提示</Button>
					  <Button type="success" @click="success">成功提示</Button>
					  <Button type="error" @click="error">错误提示</Button>
					  <Button type="warning" @click="warning">警告提示</Button>
					</template>
					&lt;script&gt;
					  export default{
					    methods:{
					      info(){
					        this.$geek.$Message.info({
					          duration:0,
					          title:'这是通知标题',
					          placement:'topLeft',
					          desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
					        })
					      },
					      success(){
					        this.$geek.$Message.success({
					          duration:0,
					          title:'这是通知标题',
					          placement:'topLeft',
					          desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
					        })
					      },
					      error(){
					        this.$geek.$Message.error({
					          duration:10000,
					          title:'这是通知标题',
					          placement:'topLeft',
					          desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
					        })
					      },
					      warning(){
					        this.$geek.$Message.warning({
					          duration:8000,
					          title:'这是通知标题',
					          placement:'topLeft',
					          desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
					        })
					      },
					    }
					  }
					&lt;/script&gt;`
				
			}
		},
		methods:{
			open(type,opts={}){
				
				let option = Object.assign({
					title:'这是通知标题',
					desc:'这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容，这是通知内容'
				},opts)
				
				switch(type){
					case 'info':
						Notice.info(option)
					break;
					case 'success':
						Notice.success(option)
					break;
					case 'error':
						Notice.error(option)
					break;
					case 'warning':
						Notice.warning(option)
					break;
					case 'open':
						Notice.open(option)
					break;
				}
			}
		}
	}
</script>

<style>
</style>
