<template>
	<div class="example">
		<Blockquote title="Flop 翻牌器">
			<template #desc>展示实时数据的变化情况</template>
			<template #extra>
				<Switch v-model="example" :text="['显示示例代码','关闭示例代码']"></Switch>
			</template>
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type='code' title="时钟翻牌器">
					<Panel :header="false">
						<Flop v-model="time" type="clock" bgColor="#1890ff" separColor="#ff4d4f" color="#ffffff"></Flop>
					</Panel>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>type&lt;String&gt;=clock</code> 设置翻牌器样式为时钟样式</p>
						<p>通过 <code>v-model&lt;Number | String&gt;</code> 双向绑定数据</p>
						<p>通过 <code>color&lt;String&gt;</code> 属性设置翻牌器字体颜色</p>
						<p>通过 <code>bgColor&lt;String&gt;</code> 属性设置翻牌器背景色</p>
						<p>通过 <code>separColor&lt;String&gt;</code> 属性设置翻牌器分隔符颜色</p>
						<p>通过 <code>duration&lt;Number&gt;</code> 属性设置翻牌器持续翻牌时间</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-if="example">
				<Code skin="dark" :code="code1" copy toggle :height="368"></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="数字步进器">
					<Panel :header="false">
						<Flop v-model="step" type="step" bgColor="#1890ff" separColor="#ff4d4f" color="#ffffff"></Flop>
					</Panel>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>type&lt;String&gt;=step</code> 设置翻牌器样式为步进样式</p>
						<p>通过 <code>v-model&lt;Number | String&gt;</code> 双向绑定数据</p>
						<p>通过 <code>color&lt;String&gt;</code> 属性设置翻牌器字符颜色</p>
						<p>通过 <code>bgColor&lt;String&gt;</code> 属性设置翻牌器背景色</p>
						<p>通过 <code>separColor&lt;String&gt;</code> 属性设置翻牌器分隔符颜色</p>
						<p>通过 <code>duration&lt;Number&gt;</code> 属性设置翻牌器持续翻牌时间</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12" v-if="example">
				<Code skin="dark" :code="code2" copy toggle :height="368"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Flop props"></Blockquote>
				<table-props :data="table.props.data" :select='false' :example="false"></table-props>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps} from '../bootstrap/table.js'
	export default{
		layout:'develop',
		components: {
			TableProps
		},
		data() {
			return{
				example:true,
				time:'123456',
				step:123456,
				code1:`<template>
					  <Flop v-model="time" type="clock"></Flop>
					  <Flop v-model="time" type="clock"  bgColor="#1890ff" separColor="#ff4d4f" color="#ffffff"></Flop>
					</template>
					&lt;script&gt;
					  export default{
					    data(){
					      return{
					        time:123456
					      }
					    },
					    mounted(){
					      let that = this;
					      setInterval(()=>{
					        that.$geek.nowTime('hh:MM:ss').then(nextTime=>{
					          that.time = nextTime.format
					        })
					      },1000)
					    }
					  }
					&lt;/script&gt;`,
				code2:`<template>
					  <Flop v-model="step" type="step"></Flop>
					  <Flop v-model="step" type="step" bgColor="#1890ff" separColor="#ff4d4f" color="#ffffff"></Flop>
					</template>
					&lt;script&gt;
					  export default{
					    data(){
					      return{
					        step:123456
					      }
					    },
					    mounted(){
					      let that = this;
					      setInterval(()=>{
					        that.$geek.nowTime('hh:MM:ss').then(nextTime=>{
					          that.step = nextTime.format
					        })
					      },3000)
					    }
					  }
					&lt;/script&gt;`,
				table:{
					props:{
						data:[
							{params:'v-model',version:'0.0.1',desc:'要显示的双向绑定数据',type:'<code>Number</code> | <code>String</code>',required:'是'},
							{params:'type',version:'0.0.1',desc:'翻牌器样式，可选值<code>clock</code> | <code>setp</code>',type:'<code>String</code>',required:'否'},
							{params:'bgColor',version:'0.0.1',desc:'翻牌器背景色',type:'<code>String</code>',required:'否'},
							{params:'separColor',version:'0.0.1',desc:'翻牌器分隔符颜色',type:'<code>String</code>',required:'否'},
							{params:'color',version:'0.0.1',desc:'翻牌器字符颜色',type:'<code>String</code>',required:'否'},
							{params:'duration',version:'0.0.1',desc:'翻牌器持续翻牌时间，单位 <code>ms</code>',type:'<code>number</code>',required:'否',default:'<code>500</code>'},
						]
					}
				}
			}
		},
		mounted() {
			let that = this;
			setInterval(()=>{
				that.$geek.nowTime('hh:MM:ss').then(nextTime=>{
					that.time = nextTime.format
				})
			},1000)
			setInterval(()=>{
				that.$geek.nowTime('hh:MM:ss').then(nextTime=>{
					that.step = nextTime.format
				})
			},3000)
		}
	}
</script>

<style>
</style>
