<template>
	<div class="example">
		<Blockquote title="Switch 开关">
			这是开✌，这是关👊，这是开还是关🤞
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type='code' title="基础用法">
					<div class="e-flex">
						<Panel :header="false" margin="5px" :styles="{body:{textAlign:'center'}}">
							简单用法：<Switch v-model="model"></Switch>
						</Panel>
						<Panel :header="false" margin="5px" :styles="{body:{textAlign:'center'}}">
							禁用状态：<Switch v-model="disabled" disabled></Switch>
						</Panel>
						<Panel :header="false" margin="5px" :styles="{body:{textAlign:'center'}}">
							加载中状态：<Switch v-model="loading" loading></Switch>
						</Panel>
					</div>
					<Divider text="用法说明" left margin="26px 0 0">
						<p>基本用法，使用<code>v-model&lt;Boolean&gt</code>双向绑定状态，切换时会触发<code>change</code>事件，
						设置<code>disabled&lt;Boolean&gt</code>属性为禁用状态，
						设置<code>loading&lt;Boolean&gt</code>属性为加载中状态</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code1" :height="193" copy></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="自定义文字">
					<div class="e-flex">
						<Panel :header="false" margin="5px">
							<Switch v-model="text" :text="['开','关']"></Switch>
						</Panel>
						<Panel :header="false" margin="5px">
							<Switch v-model="disabled" :text="['开','关']" disabled></Switch>
						</Panel>
						<Panel :header="false" margin="5px">
							<Switch v-model="loading" :text="['开','关']" loading></Switch>
						</Panel>
						<Panel :header="false" margin="5px">
							<Switch v-model="outside" :text="['按年付费','按月付费']"></Switch>
						</Panel>
					</div>
					<Divider text="用法说明" left margin="26px 0 0">
						设置属性<code>text&lt;Array&lt;String success,String fail&gt;&gt;</code>可以自定义文字
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code2" :height="164" copy></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="自定义颜色">
					<div class="e-flex">
						<Panel :header="false" margin="5px">
							<Switch v-model="color" :color="['#13ce66','#FF0000']" :text="['成功颜色','失败颜色']"></Switch>
						</Panel>
						<Panel :header="false" margin="5px">
							<Switch v-model="color2" :color="['#13ce66']" :text="['成功颜色','失败颜色']"></Switch>
						</Panel>
					</div>
					<Divider text="用法说明" left margin="26px 0 0">
						设置属性<code>color&lt;Array&lt;String success,String fail&gt;&gt;</code>可以自定义背景色
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code3" :height="164" copy></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="阻止切换">
					<div class="e-flex">
						<Panel :header="false" margin="5px">
							<Switch v-model="before" :color="['#13ce66','#FF0000']" :text="['按年付费','按月付费']" :before="beforeChange"></Switch>
						</Panel>
					</div>
					<Divider text="用法说明" left margin="26px 0 0">
						设置属性<code>before&lt;Function&gt</code>并返回<code>Promise</code>，可以阻止切换
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code4" :height="164" copy toggle></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Switch Props"></Blockquote>
				<table-props :data="table.props.data" :select="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Switch Slots"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
			<Col :span="24">
				<Blockquote title="Switch Event"></Blockquote>
				<table-event :data="table.event.data"></table-event>
			</Col>
		</Row>
	</div>
</template>
<script>
	import {TableProps,TableSlot,TableEvent} from '../bootstrap/table.js'
	export default{
		layout:'develop',
		components:{
			TableProps,
			TableSlot,
			TableEvent
		},
		data(){
			return{
				model:true,
				text:true,
				disabled:true,
				loading:true,
				color:true,
				color2:false,
				before:true,
				outside:true,
				code1:`<Switch v-model="model"></Switch>
				<Switch v-model="disabled" disabled></Switch>
				<Switch v-model="loading" loading></Switch>`,
				code2:`<Switch v-model="text" :text="['开','关']"></Switch>
				<Switch v-model="disabled" :text="['开','关']" disabled></Switch>
				<Switch v-model="loading" :text="['开','关']" loading></Switch>
				<Switch v-model="outside" :text="['按年付费','按月付费']"></Switch>`,
				code3:`<Switch v-model="color" :color="['#13ce66','#FF0000']" :text="['成功颜色','失败颜色']"></Switch>
				<Switch v-model="color2" :color="['#13ce66']" :text="['成功颜色','失败颜色']"></Switch>`,
				code4:`&lt;template&gt;
				  <Switch v-model="before" :before="beforeChange"></Switch>
				&lt;/template&gt;
				&lt;script&gt;
				  export default{
				    data(){
				      return{
				        before:true	
				      }
				    },
				    methods:{
				      beforeChange(){
				        return new Promise((resolve) => {
				          setTimeout(()=>{
				            resolve();
				          },3000)
				        });
				      }
				    }
				  }
				&lt;/script&gt;`,
				table:{
					props:{
						data:[
							{params:'v-model',version:'0.0.1',desc:'绑定值',type:'<code>Boolean</code>',required:'是'},
							{params:'text',version:'0.0.1',desc:'选中、没有选中时的值',type:'<code>Array</code>',required:'否',example:"<code>['开','关']</code>"},
							{params:'disabled',version:'0.0.1',desc:'是否禁用开关',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'loading',version:'0.0.1',desc:'是否加载状态',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'color',version:'0.0.1',desc:'选中、没有选中时的背景颜色',type:'<code>Array</code>',required:'否',example:"<code>['#13ce66','#FF0000']</code>"},
							{params:'before',version:'0.0.1',desc:'切换前置操作，并返回<code>Promise</code>',type:'<code>Function</code>',required:'否'},
						]
					},
					slot:{
						data:[
							{title:'open',desc:'自定义显示打开时的内容'},
							{title:'close',desc:'自定义显示关闭时的内容'},
						]
					},
					event:{
						data:[
							{name:'@change',desc:'在选项状态发生改变时触发，返回当前状态',return:'<code>true</code> | <code>false</code>'},
						]
					}
				}
			}
		},
		methods:{
			beforeChange(){
				return new Promise((resolve) => {
					setTimeout(()=>{
						resolve();
					},3000)
				});
			}
		}
	}
</script>

<style>
</style>
