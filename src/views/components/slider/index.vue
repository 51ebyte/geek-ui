<template>
	<div class="example">
		<Blockquote title="Slider 滑块">
			我能选择吃火锅吗？可以，不仅能选择吃火锅还能选择吃海鲜和搜索你心里想吃的东西！😃
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type='code' title="基础用法">
					<Panel :header="false">
						<Slider v-model="value"></Slider>
					</Panel>
					<Panel :header="false">
						<Slider v-model="value1" disabled></Slider>
					</Panel>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>滑块的基本用法，可以使用 <code>v-model&lt;Number&gt;</code> 双向绑定数据</p>
						<p>通过设置属性 <code>disabled&lt;Boolean&gt;</code> 禁用滑块</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code1" copy toggle :height="261"></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="最大值和最小值">
					<Panel :title="'最小值：10，最大值：1000，当前值：'+value2+''">
						<Slider v-model="value2" :max="1000" :min="10"></Slider>
					</Panel>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过设置属性 <code>max&lt;Number&gt;</code>和<code>min&lt;Number&gt;</code> 可以控制最大和最小值</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code2" copy toggle :height="166"></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="滑动间隔">
					<Panel :title="'最小值：10，最大值：1000，当前值：'+value3+''">
						<Slider v-model="value3" :max="1000" :min="10" :step="10"></Slider>
					</Panel>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过设置属性 <code>step&lt;Number&gt;</code> 可以控制每次滑动的间隔</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code3" copy toggle :height="166"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Slider Props"></Blockquote>
				<table-props :data="table.props.data" :example="false" :select="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Select Event"></Blockquote>
				<table-event :data="table.event.data"></table-event>
			</Col>
		</Row>
	</div>
</template>
<script>
import {TableProps,TableEvent} from '../bootstrap/table.js'
	export default{
		layout:'develop',
		components:{
			TableProps,
			TableEvent
		},
		data(){
			return{
				value:20,
				value1:30,
				value2:200,
				value3:280,
				code1:`<template>,
				  <Slider v-model="value1"></Slider>,
				  <Slider v-model="value2" disabled></Slider>
				</template>
				&lt;script&gt;
				  export default {
				    data () {
				      return {
				        value1: 20,
				        value2: 30
				      }
				    }
				  }
				&lt;/script&gt;`,
				code2:`<template>,
				  <Slider v-model="value" :max="1000" :min="10"></Slider>
				</template>
				&lt;script&gt;
				  export default {
				    data () {
				      return {
				        value: 200
				      }
				    }
				  }
				&lt;/script&gt;`,
				code3:`<template>,
				  <Slider v-model="value3" :max="1000" :min="10" :step="10"></Slider>
				</template>
				&lt;script&gt;
				  export default {
				    data () {
				      return {
				        value: 280
				      }
				    }
				  }
				&lt;/script&gt;`,
				table:{
					props:{
						data:[
							{params:'v-model',version:'0.0.1',desc:'绑定值',type:'<code>String</code> | <code>Number</code>',required:'是'},
							{params:'max',version:'0.0.1',desc:'最大值',type:'<code>Number</code>',required:'否',default:'<code>100</code>'},
							{params:'min',version:'0.0.1',desc:'最小值',type:'<code>Number</code>',required:'否',default:'<code>0</code>'},
							{params:'step',version:'0.0.1',desc:'步长',type:'<code>Number</code>',required:'否',default:'<code>1</code>'},
							{params:'disabled',version:'0.0.1',desc:'是否禁用',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
						]
					},
					event:{
						data:[
							{name:'@change',desc:'值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发）',return:'改变后的值'},
						]
					},
				}
			}
		},
		methods:{
		}
	}
</script>

<style>
</style>
