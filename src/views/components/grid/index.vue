<template>
	<div class="example">
		<Blockquote title="Grid 宫格布局">
			热菜放第一格，冷菜放第二格，蒸菜放第三格...  每格都是一样多
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel title="基础布局" type="code">
					<Grid :list="list" padding="24px 0"></Grid>
					<div style="height: 10px;width: 100%;"></div>
					<Grid :col="6" :list="list" padding="24px 0"></Grid>
					<Divider text="用法说明" left margin="36px 0 0">
						<p>宫格系统，将区域进行12等分，每个<code>GridItem&lt;Component&gt;</code>的总和应该为12</p>
						<p>通过设置<code>col&lt;Number&gt;</code>属性，可指定将区域划分多少指定等分</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code1" skin="dark" copy toggle :height="347"></Code>
			</Col>
			<Col :span="12">
				<Panel title="边框" type="code">
					<Panel title="无边框">
						<Grid :list="list" :border="false"  padding="24px 0"></Grid>
					</Panel>
					<Panel title="只显示外边框">
						<Grid :list="list" :border="{postion:'outside'}" padding="12px 0">
						</Grid>
					</Panel>
					
					<Panel title="自定义边框颜色">
						<Grid :col="6" :list="list" :border="{color:'red'}" padding="12px 0">
						</Grid>
					</Panel>
					<Divider text="用法说明" left margin="36px 0 0">
						<p>通过<code>border&lt;Boolean&gt;</code>属性，设置显示/隐藏边框</p>
						<p>通过<code>border&lt;Object&gt;{postion&lt;String&gt;:'outside',color&lt;String&gt;:'red'}</code>属性，设置显示外边框/自定义边框颜色</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code2" skin="dark" copy toggle :height="552"></Code>
			</Col>
			<Col :span="12">
				<Panel title="作用域插槽" type="code">
					<Grid :col="6" :list="['#99a9bf','#2d8cf0','#19be6b','#ff9900','#ed4014','#909399']" :border="false" v-slot="{item,index}" @click="hanleClick">
						<div style="padding: 12px 0;color: white;" :style="{background:item}">{{index+1}}</div>
					</Grid>
					<Divider text="用法说明" left margin="36px 0 0">
						支持作用域插槽写法，<code>v-slot&lt;Object&gt;</code> 的参数有 2 个：当前数据 <code>item&lt;T&gt;</code>，当前数据序号 <code>index&lt;Number&gt;</code>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code3" skin="dark" copy toggle :height="158"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Grid props"></Blockquote>
				<table-props :data="table.props.grid.data"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="GridItem props"></Blockquote>
				<table-props :data="table.props.griditem.data"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Grid/GridItem event"></Blockquote>
				<table-event :data="table.event.data"></table-event>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps,TableEvent} from '../bootstrap/table.js'
	export default{
		layout:'components',
		components:{
			TableProps,
			TableEvent
		},
		data(){
			return{
				code1:`<Grid padding="24px 0">
					  <GridItem>1</GridItem>
					  <GridItem>2</GridItem>
					  <GridItem>3</GridItem>
					  <GridItem>4</GridItem>
					  <GridItem>5</GridItem>
					  <GridItem>6</GridItem>
					  <GridItem>7</GridItem>
					  <GridItem>8</GridItem>
					  <GridItem>9</GridItem>
					  <GridItem>10</GridItem>
					  <GridItem>11</GridItem>
					  <GridItem>12</GridItem>
					</Grid>`,
				code2:`<Grid padding="24px 0" :border="false">
				  <GridItem>1</GridItem>
				  <GridItem>2</GridItem>
				  <GridItem>3</GridItem>
				  <GridItem>4</GridItem>
				  <GridItem>5</GridItem>
				  <GridItem>6</GridItem>
				  <GridItem>7</GridItem>
				  <GridItem>8</GridItem>
				  <GridItem>9</GridItem>
				  <GridItem>10</GridItem>
				  <GridItem>11</GridItem>
				  <GridItem>12</GridItem>
				</Grid>
				<Grid :border="{postion:'outside',color:'red'}">
				  <GridItem>1</GridItem>
				  <GridItem>2</GridItem>
				  <GridItem>3</GridItem>
				  <GridItem>4</GridItem>
				  <GridItem>5</GridItem>
				  <GridItem>6</GridItem>
				  <GridItem>7</GridItem>
				  <GridItem>8</GridItem>
				  <GridItem>9</GridItem>
				  <GridItem>10</GridItem>
				  <GridItem>11</GridItem>
				  <GridItem>12</GridItem>
				</Grid>`,
				code3:`<Grid :col="6" :list="['#99a9bf','#2d8cf0','#19be6b','#ff9900','#ed4014','#909399']" :border="false" v-slot="{item,index}">
					  <div style="padding: 12px 0;color: white;" :style="{background:item}">{{index+1}}</div>
					</Grid>`,
				list:[1,2,3,4,5,6,7,7,9,10,11,12],
				table:{
					props:{
						grid:{
							data:[
								{params:'col',version:'0.0.1',desc:'宫格的占位格数，可选值为1~12的整数',type:'<code>Number</code>',required:'否',default:'12'},
								{params:'gap',version:'0.0.1',desc:'宫格间隔距离，单位<code>px</code>',type:'<code>Number</code>',required:'否'},
								{params:'justify',version:'0.0.1',desc:'flex 布局下的水平排列方式',type:'<code>Number</code>',required:'否',default:'<code>center</code>',select:'<code>left</code> | <code>center</code> | <code>right</code> | <code>around</code> | <code>between</code>'},
								{params:'align',version:'0.0.1',desc:'flex 布局下的垂直对齐方式',type:'<code>Number</code>',required:'否',default:'<code>center</code>',select:'<code>top</code> | <code>center</code> | <code>bottom</code>'},
								{params:'list',version:'0.0.1',desc:'插槽循环数据对象',type:'<code>Object</code>',required:'否'},
								{params:'border',version:'0.0.1',desc:'自定义边框，属性为对象时支持位置<code>postion&lt;String&gt</code>和颜色<code>color&lt;String&gt</code>和属性，<code>postion</code>属性固定值为<code>outside</code>，表示只显示外边框',type:'<code>Object</code> | <code>Boolean</code>',required:'否',default:'<code>true</code>',example:"<code>{postion:'outside',color:'#FF0000'}</code>"},
								{params:'hover',version:'0.0.1',desc:'悬停效果，自定义边框时无效',type:'<code>Boolean</code>',required:'否'},
								{params:'padding',version:'0.0.1',desc:'<code>GridItem&lt;Component&gt;</code>组件内边距',type:'<code>String</code> | <code>Number</code>',required:'否'},
							]
						},
						griditem:{
							data:[
								{params:'list',version:'0.0.1',desc:'插槽循环数据对象',type:'<code>Object</code>',required:'否'},
								{params:'border',version:'0.0.1',desc:'边框，属性为对象时支持颜色<code>color&lt;String&gt</code>和属性',type:'<code>Object</code>',required:'否',example:"<code>{color:'#FF0000'}</code>"},
								{params:'hover',version:'0.0.1',desc:'悬停效果',type:'<code>Boolean</code>',required:'否',default:'<code>true</code>'},
								{params:'padding',version:'0.0.1',desc:'组件内边距',type:'<code>String</code> | <code>Number</code>',required:'否'},
								{params:'background',version:'0.0.1',desc:'组件背景色',type:'<code>String</code>',required:'否'},
							]
						}
					},
					event:{
						data:[
							{name:'@click',desc:'点击宫格触发',return:'<code>item&lt;T&gt;</code>,<code>index&lt;Number&gt;</code>,<code>$event&lt;MouseEvent&gt;</code>'}
						]
					}
				}
			}
		},
		methods:{
			hanleClick(item,index,evt){
				alert('我是第'+index+'个格子')
			}
		}
	}
</script>

<style>
	.layout-group .e-row{
		margin-bottom: 10px;
	}
</style>
