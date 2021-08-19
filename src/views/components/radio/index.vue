<template>
	<div class="example">
		<Blockquote title="Radio 单选框">
			火锅、烧烤、海鲜和干锅请选择一个吧！😀
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="基本使用">
					<Row :gutter="10">
						<Col :span="12">
							<Panel title="水平使用">
								<Radio v-model="value1" :list="list"></Radio>
							</Panel>
						</Col>
						<Col :span="12">
							<Panel title="垂直使用">
								<Radio v-model="value1" :list="list" vertical></Radio>
							</Panel>
						</Col>
					</Row>
					<Divider left text="用法说明" margin="30px 0 0">
						<p>使用<code>v-model</code>可以双向绑定数据</p>
						<p>通过设置<code>list&lt;Array&gt;</code>可自动完成渲染</p>
						<p>设置<code>list&lt;Array&gt;</code>数据<code>disabled&lt;Boolean&gt;</code>属性可设置为禁用状态</p>
						<p>通过设置<code>vertical&lt;Boolean&gt;</code>属性可以垂直显示</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code1" skin="dark" :height="390" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="作用域插槽">
					<Row :gutter="10">
						<Col :span="12">
							<Panel :header="false">
								<Radio v-model="value2" :list="list" v-slot="{item,index}">
									<span>{{item.label}}</span>
								</Radio>
							</Panel>
						</Col>
						<Col :span="12">
							<Panel :header="false">
								<Radio v-model="value2" :list="list" v-slot="{item,index}" vertical>
									<span>{{item.label}}</span>
								</Radio>
							</Panel>
						</Col>
					</Row>
					<Divider text="用法说明" left margin="36px 0 0">
						支持作用域插槽写法，<code>v-slot</code> 的参数有 2 个：当前数据 <code>item&lt;T&gt;</code>，当前数据序号 <code>index&lt;Number&gt;</code>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code2" skin="dark" :height="270" copy toggle></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Radio Props"></Blockquote>
				<table-props :data="table.props.data" :example="false" :select="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Radio Slots"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
			<Col :span="24">
				<Blockquote title="Radio Event"></Blockquote>
				<table-event :data="table.event.data"></table-event>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps,TableSlot,TableEvent} from '../bootstrap/table.js'
	export default{
		layout:'components',
		components:{
			TableProps,
			TableSlot,
			TableEvent
		},
		data(){
			return{
				value1:1,
				value2:1,
				value3:1,
				list:[
					{value:1,label:'火锅'},
					{value:2,label:'烧烤',disabled:true},
					{value:3,label:'海鲜'},
					{value:4,label:'干锅'}
				],
				code1:`<template>
				  <Radio v-model="value" :list="list"></Radio>
				  <Radio v-model="value" :list="list" vertical></Radio>
				</template>
				&lt;script&gt;
				  export default{
				    data(){
				      return{
				        value:1,
				        list:[
				          {value:1,label:'火锅'},
				          {value:2,label:'烧烤',disabled:true},
				          {value:3,label:'海鲜'},
				          {value:4,label:'干锅'}
				        ]
				      }
				    }
				  }
					&lt;/script&gt;`,
				code2:`<template>
					  <Radio v-model="value" :list="list" v-slot="{item,index}">
					    <span>{{item.label}}</span>
					  </Radio>
					</template>
					&lt;script&gt;
					  export default{
					    data(){
					      return{
					        value:1,
					        list:[
					          {value:1,label:'火锅'},
					          {value:2,label:'烧烤',disabled:true},
					          {value:3,label:'海鲜'},
					          {value:4,label:'干锅'}
					        ]
					      }
					    }
					  }
						&lt;/script&gt;`,
				table:{
					props:{
						data:[
							{params:'v-model',version:'0.0.1',desc:'绑定值',type:'<code>String</code> | <code>Number</code>',required:'是'},
							{params:'list',version:'0.0.1',desc:'数据列表',type:'<code>Array</code>',required:'是'},
							{params:'vertical',version:'0.0.1',desc:'是否垂直排列',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
						]
					},
					slot:{
						data:[
							{title:'--',desc:'作用域插槽，用法见上方'},
						]
					},
					event:{
						data:[
							{name:'@change',desc:'在选项状态发生改变时触发，返回当前选中的项。通过修改外部的数据改变时不会触发',return:''},
						]
					}
				}
			}
		}
	}
</script>

<style>
</style>
