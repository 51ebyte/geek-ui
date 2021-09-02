<template>
	<div class="example">
		<Blockquote title="Rate 评分"></Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="基本用法">
					<Rate v-model="model1"></Rate>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>使用<code>v-model&lt;Number&gt;</code>双向绑定数据</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" copy :code="code1"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="文字显示">
					<Row :gutter="10">
						<Col :span="12">
							<Rate v-model="model2" text></Rate>
						</Col>
						<Col :span="12">
							<Rate v-model="model2">
							  <template #text>{{model2}}分</template>
							</Rate>
						</Col>
					</Row>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>可以使用<code>text&lt;Boolean&gt;</code>属性可以显示文字</p>
						<p>可以使用插槽<code>text</code>自定义显示文字</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" copy :code="code2"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="自定义颜色、大小">
					<Row :gutter="10">
						<Col :span="12">
							<Rate v-model="model3" text color="#ed4014" stroke="#19be6b"></Rate>
						</Col>
						<Col :span="12">
							<Rate v-model="model3" :size="32">
							  <template #text>{{model3}}分，满意</template>
							</Rate>
						</Col>
					</Row>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>可以使用<code>color&lt;String&gt;</code>自定义未选中时颜色，使用<code>stroke&lt;String&gt;</code>自定义选中时颜色</p>
						<p>可以使用<code>size&lt;Number&gt;</code>自定义字符大小</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" copy :code="code3"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="自定义字符">
					<Row :gutter="10">
						<Col :span="12">
							<Rate v-model="model4" text :size="32" character="A"></Rate>
						</Col>
						<Col :span="12">
							<Rate v-model="model" :size="32">
								<template v-slot:first="{item}">A</template>
								<template v-slot:second="{item}">B</template>
							  <template #text>{{model4}}分，{{customText}}</template>
							</Rate>
						</Col>
					</Row>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>可以使用<code>character&lt;String&gt;</code>自定义字符</p>
						<p>可以使用插槽<code>first</code>自定义未选中时字符，使用插槽<code>second</code>自定义选中时字符</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" copy :code="code4"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Rate Props"></Blockquote>
				<table-props :data="table.props.data" :example="false" :select="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Rate Slots"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
			<Col :span="24">
				<Blockquote title="Rate Event"></Blockquote>
				<table-event :data="table.event.data"></table-event>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps,TableSlot,TableEvent} from '../bootstrap/table.js'
	export default {
		layout: 'develop',
		components:{
			TableProps,
			TableSlot,
			TableEvent
		},
		data(){
			return{
				model1:1,
				model2:2,
				model3:3,
				model4:4,
				code1:`<Rate v-model="model"></Rate>`,
				code2:`<Rate v-model="model" text></Rate>
					<Rate v-model="model">
						<template #text>{{model}}满意</template>
					</Rate>`,
				code3:`<Rate v-model="model" text color="#ed4014" stroke="#19be6b"></Rate>
					<Rate v-model="model" :size="32">
						<template #text>{{model}}满意</template>
					</Rate>`,
				code4:`<Rate v-model="model" text :size="32" character="A"></Rate>
					<Rate v-model="model" :size="32">
						<template v-slot:first="{item}">A</template>
						<template v-slot:second="{item}">B</template>
						<template #text>{{model}}分，满意</template>
					</Rate>`,
				table:{
					props:{
						data:[
							{params:'v-model',version:'0.0.1',desc:'绑定值',type:'<code>Number</code>',required:'是'},
							{params:'count',version:'0.0.1',desc:'star 总数',type:'<code>Number</code>',required:'否',default:'<code>5</code>'},
							{params:'size',version:'0.0.1',desc:'字符大小',type:'<code>Number</code>',required:'否',default:'<code>24</code>'},
							{params:'color',version:'0.0.1',desc:'字符未选中时颜色',type:'<code>String</code>',required:'否',default:'<code>#e9e9e9</code>'},
							{params:'stroke',version:'0.0.1',desc:'字符选中时颜色',type:'<code>String</code>',required:'否',default:'<code>#fadb14</code>'},
							{params:'readonly',version:'0.0.1',desc:'是否只读',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'text',version:'0.0.1',desc:'是否显示文字',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
						]
					},
					slot:{
						data:[
							{title:'first',desc:'作用域插槽，自定义未选中时字符，用法见上方'},
							{title:'second',desc:'作用域插槽，自定义选中时字符，用法见上方'},
							{title:'text',desc:'自定义文字显示插槽，用法见上方'},
						]
					},
					event:{
						data:[
							{name:'@change',desc:'在数值发生改变时触发，返回当前数值。通过修改外部的数据改变时不会触发',return:'<code>modelValue</code>'},
						]
					}
				}
			}
		},
		computed:{
			customText(){
				let text=['非常不满意','不满意','基本满意','满意','非常满意']
				return text[parseInt(this.model4)];
			}
		}
	};
</script>

<style></style>
