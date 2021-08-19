<template>
	<div class="example">
		<Blockquote title="Select 选择框">
			我能选择吃火锅吗？可以，不仅能选择吃火锅还能选择吃海鲜和搜索你心里想吃的东西！😃
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="基础用法">
					<Select v-model="value1" :list="list"></Select>
					<Divider text="用法说明" left margin="36px 0 6px">
						<p>可以使用<code>v-model&lt;String|Number&gt;</code>双向绑定数据，单选时<code>v-model</code>只接受字符串和数字类型</p>
						<p>多选时，只接受数组类型，组件会自动根据原生<code>option</code>标签的<code>value</code>来返回选中的数据</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code='code1' :height="189"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="进阶用法">
					<Divider text="输入过滤" left margin="20px 0 0px">
						<Select v-model="value2" :list="list" filter></Select>
					</Divider>
					<Divider text="选项多选" left margin="20px 0 0px">
						<Select v-model="value3" :list="list" multiple></Select>
					</Divider>
					<Divider text="组件禁用" left margin="20px 0 0px">
						<Select v-model="value4" :list="list" disabled></Select>
					</Divider>
					<Divider text="选项禁用" left margin="20px 0 0px">
						<Select v-model="value5" :list="disabled"></Select>
					</Divider>
					<Divider text="用法说明" left margin="36px 0 6px">
						<p>设置<code>filter&lt;Boolean&gt;</code>属性开启单选、多选搜索模式；多选可以使用键盘<code>Delete</code>快捷删除最后一个已选项，使用<code>Backspace</code>可依次删除已选项，亦可使用鼠标删除任一已选项</p>
						<p>通过设置属性<code>multiple&lt;Boolean&gt;</code>可以开启多选模式。多选模式下，<code>v-model</code>接受数组类型的数据，所返回的也是数组</p>
						<p>通过设置<code>disabled&lt;Boolean&gt;</code>属性可将组件为禁用模式</p>
						<p>通过设置 [<code>list&lt;Array&gt;</code>{<code>disabled&lt;Boolean&gt;:true</code>}] 可将<code>option</code>项为禁用模式</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code='code2' :height="602"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="高阶用法">
					<Divider text="作用域插槽" left margin="20px 0 0px">
						<Select v-model="value6" :list="slot" v-slot="{item,index}">
							<Icon :name="item.icon"></Icon>
							<span>我想吃{{item.label}}</span>
						</Select>
					</Divider>
					<Divider text="用法说明" left margin="36px 0 6px">
						支持作用域插槽写法，<code>v-slot</code> 的参数有 2 个：当前数据 <code>item&lt;T&gt;</code>，当前数据序号 <code>index&lt;Number&gt;</code>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code='code3' :height="211"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Select Props"></Blockquote>
				<table-props :data="table.props.data" :example="false" :select="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Select Slots"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
			<Col :span="24">
				<Blockquote title="Select Event"></Blockquote>
				<table-event :data="table.event.data"></table-event>
			</Col>
		</Row>
	</div>
</template>

<script>
import {TableProps,TableSlot,TableEvent} from '../bootstrap/table.js'
export default {
	layout:'components',
	components:{
		TableProps,
		TableSlot,
		TableEvent
	},
	data(){
		return{
			value1:1,
			value2:2,
			value3:[1,2,4],
			value4:3,
			value5:4,
			value6:1,
			list:[
				{value:1,label:'火锅'},
				{value:2,label:'烧烤'},
				{value:3,label:'海鲜'},
				{value:4,label:'干锅'}
			],
			disabled:[
				{value:1,label:'火锅'},
				{value:2,label:'烧烤',disabled:true},
				{value:3,label:'海鲜'},
				{value:4,label:'干锅'}
			],
			slot:[
				{value:1,label:'火锅',icon:'md-camera'},
				{value:2,label:'烧烤',disabled:true},
				{value:3,label:'海鲜'},
				{value:4,label:'干锅'}
			],
			code1:`<template>,
			  <Select v-model="value" :list="list"></Select>
			</template>
			&lt;script&gt;
			  export default {
			    data(){
			      value:1,
			      list:[
			        {value:1,label:'火锅'},
			        {value:2,label:'烧烤'},
			        {value:3,label:'海鲜'},
			        {value:4,label:'干锅'}
			      ],	
			    }		
			  }
			&lt;/script&gt;`,
			code2:`<template>,
			  <Select v-model="value" :list="list" filter></Select>
			  <Select v-model="value" :list="list" multiple></Select>
			  <Select v-model="value" :list="list" disabled></Select>
			  <Select v-model="value" :list="disabled"></Select>
			</template>
			&lt;script&gt;
			  export default {
			    data(){
			      value:1,
			      list:[
			        {value:1,label:'火锅'},
			        {value:2,label:'烧烤'},
			        {value:3,label:'海鲜'},
			        {value:4,label:'干锅'}
			      ],
			      disabled:[
			        {value:1,label:'火锅'},
			        {value:2,label:'烧烤',disabled:true},
			        {value:3,label:'海鲜'},
			        {value:4,label:'干锅'}
			      ],
			    }		
			  }
			&lt;/script&gt;`,
			code3:`<template>,
			  <Select v-model="value" :list="list" v-slot="{item,index}">
			    <Icon :name="item.icon"></Icon>
			    <span>我想吃{{item.label}}</span>
			  </Select>
			</template>
			&lt;script&gt;
			  export default {
			    data(){
			      value:1,
			      list:[
			        {value:1,label:'火锅',icon:'md-camera'},
			        {value:2,label:'烧烤',disabled:true},
			        {value:3,label:'海鲜'},
			        {value:4,label:'干锅'}
			      ],
			    }		
			  }
			&lt;/script&gt;`,
			table:{
				props:{
					data:[
						{params:'v-model',version:'0.0.1',desc:'绑定值',type:'<code>String</code> | <code>Number</code>',required:'是'},
						{params:'list',version:'0.0.1',desc:'数据列表',type:'<code>Array</code>',required:'是'},
						{params:'filter',version:'0.0.1',desc:'是否可搜索',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
						{params:'multipe',version:'0.0.1',desc:'是否多选',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
						{params:'disabled',version:'0.0.1',desc:'是否禁用',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
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
	},
	mounted() {
	},
	methods:{
	}
};
</script>

<style>
</style>
