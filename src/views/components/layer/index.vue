<template>
	<div class="example">
		<Blockquote title="Layer 弹出层">
			<template #desc>网页弹出层的交互方案</template>
			<template #extra>
				<Switch v-model="example" :text="['显示示例代码','关闭示例代码']"></Switch>
			</template>
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="提示框">
					<Button type="primary" @click="alert">打开一个提示框</Button>
				</Panel>
				<Code skin="dark" :code='code1' copy toggle :height="120" v-if="example"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="确认框">
					<Button type="primary" @click="confirm">打开一个确认框</Button>
				</Panel>
				<Code skin="dark" :code='code2' copy toggle :height="120" v-if="example"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="输入框">
					<Button type="primary" @click="prompt">打开一个输入框</Button>
					<span style="margin-left: 10px;">输入框的值是：{{promptInputValue}}</span>
				</Panel>
				<Code skin="dark" :code='code3' copy toggle :height="120" v-if="example"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="自定义内容">
					<Button type="primary" @click="render">打开一个自定义内容输入框</Button>
				</Panel>
				<Code skin="dark" :code='code4' copy toggle :height="120" v-if="example"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Layer API"></Blockquote>
				<Panel  title='通过直接调用以下方法来使用组件'>
					<p><code>this.$byte.layer(type&lt;String&gt;,config&lt;Object&gt;)</code></p>
				</Panel>
				<p style="margin: 20px 0;">以上方法隐式的创建及维护 Vue 组件。参数 config 可以是字符串或对象，当为字符串时，直接显示内容，当为对象时，具体说明如下：</p>
				<Table :cols="[
					{ title: '属性', width: 160, key: 'attr', align: 'center', render: 'html' },
					{ title: '支持类型（type）', width: 210, default: '-',align: 'center', key: 'type', render: 'html' },
					{ title: '说明',minWidth:260, align: 'center', key: 'desc', render: 'html' },
					{ title: '属性类型', width: 198, default: '-', key: 'attr_type',align: 'center', render: 'html' },
					{ title: '默认值', minWidth: 160, default: '-', key: 'default', render: 'html', align: 'center' }
				]" :data="[
					{attr:'title',type:'all',attr_type:'<code>String</code> | <code>VNode</code>',desc:'顶部文字'},
					{attr:'content',type:'<code>msg</code> | <code>prompt</code> | <code>confirm</code>| <code>msg</code>',attr_type:'<code>String</code> | <code>VNode</code>',desc:'显示内容'},
					{attr:'render',type:'<code>render</code>',attr_type:'<code>String</code> | <code>VNode</code>',desc:'自定义显示内容'},
					{attr:'offset',type:'all',attr_type:'<code>Array</code>',desc:'弹出层位置，接收<code>x</code>和<code>y</code>，可以是<code>Number</code>和<code>String</code>类型，如果参数为<code>center</code>则表示居中',default:'<code>Array&lt;\'center\',\'center\'&gt;</code>'},
					{attr:'time',type:'<code>msg</code>',attr_type:'<code>Number</code>',desc:'自动关闭的延时，单位毫秒，不关闭可以写 0',default:'<code>3000</code>'},
					{attr:'btn',type:'all',attr_type:'<code>Array</code>',desc:'底部按钮'},
					{attr:'callback',type:'all',attr_type:'<code>Function</code>',desc:'底部按钮点击回调'},
					{attr:'value',type:'<code>prompt</code>',attr_type:'<code>String</code>',desc:'输入框的默认值'},
					{attr:'type',type:'<code>prompt</code>',attr_type:'<code>String</code>',desc:'输入框类型，支持原生<code>input</code>类型'},
					{attr:'inputChange',type:'<code>prompt</code>',attr_type:'<code>Function</code>',desc:'监听输入框的值变化'},
					
				]" border></Table>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {h} from 'vue'
	export default{
		layout:'develop',
		data() {
			return{
				example:true,
				promptInputValue:'',
				code1:`this.$byte.nowTime().then((nowTime)=>{
					  this.$byte.layer('alert',{
					    title:'提示',
					    content:\`你在北京时间 \${nowTime.format}\ 打开了一个提示框\`,
					  })
					})`,
				code2:`this.$byte.layer('confirm',{
					  title:'信息',
					  content:()=>{
					    return h('div',[
					      h('div',"你是如何看待程序猿这个职业的？"),
					      h('div',"你是如何看待前端这个岗位的？"),
					    ]);
					  },
					  btn:['改变世界的','搬砖的',{
					    text:'不想说话',
					    type:'error',
					  }],
					  offset:['center','center'],
					  callback(index,evt,btn){
					    console.log(index,evt,btn)
					    let message=[\`保持好奇之心，提升改变之力\`,\`码农也是搬砖的\`,\`沉默是金\`]
					    that.$byte.layer('msg',message[index])
					  }
					})`,
				code3:`this.$byte.layer('prompt',{
					  title:'请输入',
					  btn:['写完了','不写了'],
					  value:value,
					  type:'textarea',
					  inputChange(value,evt){
					    that.promptInputValue = value;
					  },
					  callback(value,index,evt,btn){
					    let message=[\`你输入的内容是：\${value\ || '啥也没写'}\`,\`你没写下任何内容\`]
					    that.$byte.layer('msg',message[index])
					    console.log(value,index,evt,btn)
					  }
					})`,
				code4:`this.$byte.layer('render',{
					  title:'信息',
					  btn:['确认','取消'],
					  render(h){
					    return h('span','自定义内容')
					  },
					  callback(index,evt,btn){
					    console.log(index,evt,btn)
					  }
					})`
				
			}
		},
		methods:{
			msg(){
				this.$byte.layer('msg',{
					content:`你在北京时间 打开了一个提示框`,
					btn:['知道了'],
					time:3000,
					callback(index,evt,btn){
						console.log(index,evt,btn)
					}
				})
			},
			alert(){
				this.$byte.nowTime().then((nowTime)=>{
					this.$byte.layer('alert',{
						title:'提示',
						content:`你在北京时间 ${nowTime.format} 打开了一个提示框`,
					})
				})
			},
			confirm(){
				let that = this;
				this.$byte.layer('confirm',{
					title:'信息',
					content:()=>{
						return h('div',[
							h('div',"你是如何看待程序猿这个职业的？"),
							h('div',"你是如何看待前端这个岗位的？"),
						]);
					},
					btn:['改变世界的','搬砖的',{
						text:'不想说话',
						type:'error',
					}],
					offset:['center','center'],
					callback(index,evt,btn){
						console.log(index,evt,btn)
						let message=[`保持好奇之心，提升改变之力`,`码农也是搬砖的`,`沉默是金`]
						that.$byte.layer('msg',message[index])
					}
				})
			},
			prompt(){
				let that = this;
				let value = this.promptInputValue;
				this.$byte.layer('prompt',{
					title:'请输入',
					btn:['写完了','不写了'],
					value:value,
					type:'textarea',
					inputChange(value,evt){
						that.promptInputValue = value;
					},
					callback(value,index,evt,btn){
						let message=[`你输入的内容是：${value || '啥也没写'}`,`你没写下任何内容`]
						that.$byte.layer('msg',message[index])
						console.log(value,index,evt,btn)
					}
				})
			},
			render(){
				this.$byte.layer('render',{
					title:'信息',
					btn:['确认','取消'],
					render(h){
						return h('span','自定义内容')
					},
					callback(index,evt,btn){
						console.log(index,evt,btn)
					}
				})
			}
		}
	}
</script>

<style>
</style>
