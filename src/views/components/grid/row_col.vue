<template>
	<div class="example">
		<Blockquote title="Row/Col 栅格布局">
			<!-- <p>通过基础的<code>24</code>分栏，简便快捷的创建布局</p>
			<p>组件默认采用了<code>flex</code>布局，注意父容器避免使用<code>inline</code>相关样式，会导致组件宽度不能撑满</p> -->
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel title="基础布局" type="code">
					<Row :gutter="10">
						<template v-for="(i,j) in [24,12,12,8,8,8,6,6,6,6]">
							<Col :span="i" background='#99a9bf' :padding="10" color="white">{{i}} : {{100 / (24 / i)}}%</Col>
						</template>
					</Row>
					<Divider text="用法说明" left margin="36px 0 0">
						栅格系统，将区域进行24等分，每个<code>Row</code>中的<code>Col</code>总和应该为24，
						通过 <code>Row</code> 和 <code>Col</code> 组件，
						并通过 <code>Col</code> 组件的 <code>span</code> 属性可以自由地组合布局，
						通过设置<code>Col</code>的<code>span</code>参数，指定跨越的范围，其范围是1到24
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code1" skin="dark" copy toggle :height="328"></Code>
			</Col>
			<Col :span="12">
				<Panel title="间隔布局" type="code">
					<Row :gutter="10">
						<template v-for="(i,j) in [6,6,6,6]">
							<Col :span="i" background='#99a9bf' :padding="10" color="white">{{i}} : {{100 / (24 / i)}}%</Col>
						</template>
					</Row>
					<Divider text="用法说明" left margin="36px 0 0">
						通过给 <code>Row</code> 组件设置<code>gutter</code>属性，
						可以给下属的 <code>Col</code> 组件添加间距
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code2" skin="dark" copy toggle :height="165"></Code>
			</Col>
			<Col :span="12">
				<Panel title="分栏偏移" type="code">
					<div class="layout-group">
						<Row>
								<Col :span="6" background='#99a9bf' :padding="10" color="white">Col 6</Col>
								<Col :span="6" :offset="6" background='#99a9bf' :padding="10" color="white">Col 6 | offset 6</Col>
								<Col :span="6" background='#19be6b' :padding="10" color="white">Col 6 | offset 6</Col>
						</Row>
						<Row>
								<Col :span="12" :offset="3" background='#99a9bf' :padding="10" color="white">Col 12  | offset 3</Col>
								<Col :span="9" background='#19be6b' :padding="10" color="white">Col 9 </Col>
						</Row>
					</div>
					<Divider text="用法说明" left margin="36px 0 0">
						通过给 <code>Col</code> 组件设置<code>offset</code>属性，
						将列进行左偏移，偏移栅格数为<code>offset</code>的值。
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code3" skin="dark" copy toggle :height="204"></Code>
			</Col>
			<Col :span="12">
				<Panel title="flex布局" type="code">
					<Divider text="子元素向左排列" :left="20" margin="36px 0 0">
						<Row style="background-color: #d2d2d2;text-align: center;">
							<Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
						</Row>
					</Divider>
					
					<Divider text="子元素向右排列" :left="20" margin="24px 0 0">
						<Row justify="right" style="background-color: #d2d2d2;text-align: center;">
							<Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
						</Row>
					</Divider>
					
					<Divider text="子元素居中排列" :left="20" margin="24px 0 0">
						<Row justify="center" style="background-color: #d2d2d2;text-align: center;">
							<Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
						</Row>
					</Divider>
					
					<Divider text="子元素向两端对齐" :left="20" margin="24px 0 0">
						<Row justify="between" style="background-color: #d2d2d2;text-align: center;">
							<Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
						</Row>
					</Divider>
					
					<Divider text="子元素分散排列" :left="20" margin="24px 0 0">
						<Row justify="around" style="background-color: #d2d2d2;text-align: center;">
							<Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
						</Row>
					</Divider>
					
					<Divider text="子元素居中排列，向上对齐" :left="20" margin="24px 0 0">
						<Row justify="center" align="top" style="background-color: #d2d2d2;text-align: center;">
							<Col :span="4" background="#19be6b" :padding="10" color="white">
								<p style="height: 20px;line-height: 20px;">Col-4</p>
							</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">
									<p style="height: 30px;line-height: 30px;">Col-4</p>
							</Col>
							<Col :span="4" background="#19be6b" :padding="10" color="white">
									<p style="height: 40px;line-height: 40px;">Col-4</p>
							</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">
									<p style="height: 50px;line-height: 50px;">Col-4</p>
							</Col>
						</Row>
					</Divider>
					
					<Divider text="子元素居中排列，居中对齐" :left="20" margin="24px 0 0">
						<Row justify="center" align="center" style="background-color: #d2d2d2;text-align: center;">
							<Col :span="4" background="#19be6b" :padding="10" color="white">
								<p style="height: 30px;line-height: 30px;">Col-4</p>
							</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">
									<p style="height: 20px;line-height: 20px;">Col-4</p>
							</Col>
							<Col :span="4" background="#19be6b" :padding="10" color="white">
									<p style="height: 30px;line-height: 30px;">Col-4</p>
							</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">
									<p style="height: 15px;line-height: 15px;">Col-4</p>
							</Col>
						</Row>
					</Divider>
					
					<Divider text="子元素居中排列，向下对齐" :left="20" margin="24px 0 0">
						<Row justify="center" align="bottom" style="background-color: #d2d2d2;text-align: center;">
							<Col :span="4" background="#19be6b" :padding="10" color="white">
								<p style="height: 20px;line-height: 20px;">Col-4</p>
							</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">
									<p style="height: 30px;line-height: 30px;">Col-4</p>
							</Col>
							<Col :span="4" background="#19be6b" :padding="10" color="white">
									<p style="height: 40px;line-height: 40px;">Col-4</p>
							</Col>
							<Col :span="4" background="#ed4014" :padding="10" color="white">
									<p style="height: 50px;line-height: 50px;">Col-4</p>
							</Col>
						</Row>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code4" skin="dark" copy toggle :height="857"></Code>
			</Col>
			<Col :span="12">
				<Panel title="作用域插槽" type="code">
					<Row :gutter="10" :list="list" v-slot="{item,index}">
						<Col :span="item.span" :background="item.bgColor" :padding="10" color="white">{{index}}</Col>
					</Row>
					<Divider text="用法说明" left margin="36px 0 0">
						支持作用域插槽写法，<code>v-slot</code> 的参数有 2 个：当前数据 <code>item</code>，当前数据序号 <code>index</code>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code5" skin="dark" copy toggle :height="208"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Row props"></Blockquote>
				<table-props :data="table.props.row.data" :example="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Col props"></Blockquote>
				<table-props :data="table.props.col.data" :example="false" :select="false"></table-props>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps} from '../bootstrap/table.js'
	export default{
		layout:'develop',
		components:{
			TableProps
		},
		data(){
			return{
				code1:`<template>
				  <div class="layout-group">
				    <Row>
				      <Col :span="24" background='#99a9bf' :padding="10">24 : 100%</Col>
				    </Row>
				    <Row>
				      <Col :span="12" background='#ff9900' :padding="10">12 : 50%</Col>
				      <Col :span="12" background='#2d8cf0' :padding="10">12 : 50%</Col>
				    </Row>
				    <Row>
				      <Col :span="8" background='#19be6b' :padding="10">8 : 33.3333%</Col>
				      <Col :span="8" background='#ed4014' :padding="10">8 : 33.3333%</Col>
				      <Col :span="8" background='#19be6b' :padding="10">8 : 33.3333%</Col>
				    </Row>
				    <Row>
				      <Col :span="6" background='#909399' :padding="10">6 : 25%</Col>
				      <Col :span="6" background='#19be6b' :padding="10">6 : 25%</Col>
				      <Col :span="6" background='#909399' :padding="10">6 : 25%</Col>
				      <Col :span="6" background='#19be6b' :padding="10">6 : 25%</Col>
				    </Row>
				  </div>
				</template>
				<style>
				  .layout-group .e-row{
				    margin-bottom: 10px;
				  }
				</style>`,
				code2:`
					<Row :gutter="10">
					  <Col :span="6" background='#99a9bf' :padding="10" color="white">6 : 25%</Col>
					  <Col :span="6" background='#99a9bf' :padding="10" color="white">6 : 25%</Col>
					  <Col :span="6" background='#99a9bf' :padding="10" color="white">6 : 25%</Col>
					  <Col :span="6" background='#99a9bf' :padding="10" color="white">6 : 25%</Col>
					</Row>
					`,
				code3:`<template>
					<div class="layout-group">
					  <Row>
					    <Col :span="6" background='#99a9bf' :padding="10" color="white">Col 6</Col>
					    <Col :span="6" :offset="6" background='#99a9bf' :padding="10" color="white">Col 6 | offset 6</Col>
					    <Col :span="6" background='#19be6b' :padding="10" color="white">Col 6 | offset 6</Col>
					  </Row>
					  <Row>
					    <Col :span="12" :offset="3" background='#99a9bf' :padding="10" color="white">Col 12  | offset 3</Col>
					    <Col :span="9" background='#19be6b' :padding="10" color="white">Col 9 </Col>
				    </Row>
					</div>
				</template>
				<style>
				  .layout-group .e-row{
				    margin-bottom: 10px;
				  }
				</style>`,
				code4:`<Divider text="子元素向左排列" :left="20" margin="36px 0 0">
				  <Row style="background-color: #d2d2d2;text-align: center;">
				    <Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
				  </Row>
				</Divider>
				
				<Divider text="子元素向右排列" :left="20" margin="24px 0 0">
				  <Row justify="right" style="background-color: #d2d2d2;text-align: center;">
				    <Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
				  </Row>
				</Divider>
				
				<Divider text="子元素居中排列" :left="20" margin="24px 0 0">
				  <Row justify="center" style="background-color: #d2d2d2;text-align: center;">
				    <Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
				  </Row>
				</Divider>
				
				<Divider text="子元素向两端对齐" :left="20" margin="24px 0 0">
				  <Row justify="between" style="background-color: #d2d2d2;text-align: center;">
				    <Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
				  </Row>
				</Divider>
				
				<Divider text="子元素分散排列" :left="20" margin="24px 0 0">
				  <Row justify="around" style="background-color: #d2d2d2;text-align: center;">
				    <Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#19be6b" :padding="10" color="white">Col-4</Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">Col-4</Col>
				  </Row>
				</Divider>
				
				<Divider text="子元素居中排列，向上对齐" :left="20" margin="24px 0 0">
				  <Row justify="center" align="top" style="background-color: #d2d2d2;text-align: center;">
				    <Col :span="4" background="#19be6b" :padding="10" color="white">
				      <p style="height: 20px;line-height: 20px;">Col-4</p>
				    </Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">
				      <p style="height: 30px;line-height: 30px;">Col-4</p>
				    </Col>
				    <Col :span="4" background="#19be6b" :padding="10" color="white">
				      <p style="height: 40px;line-height: 40px;">Col-4</p>
				    </Col>
				    <Col :span="4" background="#ed4014" :padding="10">
				      <p style="height: 50px;line-height: 50px;">Col-4</p>
				    </Col>
					</Row>
				</Divider>
				
				<Divider text="子元素居中排列，居中对齐" :left="20" margin="24px 0 0">
				  <Row justify="center" align="center" style="background-color: #d2d2d2;text-align: center;">
				    <Col :span="4" background="#19be6b" :padding="10" color="white">
				      <p style="height: 30px;line-height: 30px;">Col-4</p>
				    </Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">
				      <p style="height: 20px;line-height: 20px;">Col-4</p>
				    </Col>
				    <Col :span="4" background="#19be6b" :padding="10" color="white">
				      <p style="height: 30px;line-height: 30px;">Col-4</p>
				    </Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">
				      <p style="height: 15px;line-height: 15px;">Col-4</p>
				    </Col>
				  </Row>
				</Divider>
				
				<Divider text="子元素居中排列，向下对齐" :left="20" margin="24px 0 0">
				  <Row justify="center" align="bottom" style="background-color: #d2d2d2;text-align: center;">
				    <Col :span="4" background="#19be6b" :padding="10" color="white">
				      <p style="height: 20px;line-height: 20px;">Col-4</p>
				    </Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">
				      <p style="height: 30px;line-height: 30px;">Col-4</p>
				    </Col>
				    <Col :span="4" background="#19be6b" :padding="10" color="white">
				      <p style="height: 40px;line-height: 40px;">Col-4</p>
				    </Col>
				    <Col :span="4" background="#ed4014" :padding="10" color="white">
				      <p style="height: 50px;line-height: 50px;">Col-4</p>
				    </Col>
				  </Row>
				</Divider>`,
				code5:`<template>
				  <Row :gutter="10" :list="list" v-slot="{item,index}">
				    <Col :span="item.span" :background="item.bgColor" :padding="10" color="white">{{index}}</Col>
				  </Row>
				</template>
				&lt;script&gt;
					export default{
					  data(){
					    return{
				      list:[
				        {span:2,bgColor:'#99a9bf'},
				        {span:4,bgColor:'#2d8cf0'},
				        {span:6,bgColor:'#19be6b'},
				        {span:12,bgColor:'#ff9900'},
				        {span:12,bgColor:'#ed4014'},
				        {span:6,bgColor:'#909399'},
				        {span:6,bgColor:'#cccccc'},
				      ]
				    }
				  }	
				}
				&lt;/script&gt;`,
				list:[
					{span:2,bgColor:'#99a9bf'},
					{span:4,bgColor:'#2d8cf0'},
					{span:6,bgColor:'#19be6b'},
					{span:12,bgColor:'#ff9900'},
					{span:12,bgColor:'#ed4014'},
					{span:6,bgColor:'#909399'},
					{span:6,bgColor:'#cccccc'},
				],
				table:{
					props:{
						row:{
							data:[
								{params:'gutter',version:'0.0.1',desc:'栅格间距，单位 px，左右平分',type:'<code>Number</code>',required:'否',default:'0'},
								{params:'wrap',version:'0.0.1',desc:'是否自动换行',type:'<code>Boolean</code>',required:'否',select:'<code>true</code> | <code>false</code>',default:'<code>true</code>'},
								{params:'justify',version:'0.0.1',desc:'flex 布局下的水平排列方式',type:'<code>Number</code>',required:'否',select:'<code>left</code> | <code>center</code> | <code>right</code> | <code>around</code> | <code>between</code>'},
								{params:'align',version:'0.0.1',desc:'flex 布局下的垂直对齐方式',type:'<code>Number</code>',required:'否',select:'<code>top</code> | <code>center</code> | <code>bottom</code>'},
								{params:'list',version:'0.0.1',desc:'插槽循环数据对象',type:'<code>Object</code>',required:'否'},
							]
						},
						col:{
							data:[
								{params:'span',version:'0.0.1',desc:'栅格的占位格数，可选值为1~24的整数',type:'<code>String</code> | <code>Number</code>',required:'否'},
								{params:'offset',version:'0.0.1',desc:'栅格左侧的间隔格数，间隔内不可以有栅格',type:'<code>Number</code>',required:'否'},
								{params:'padding',version:'0.0.1',desc:'栅格内边距',type:'<code>String</code> | <code>Number</code>',required:'否'},
								{params:'background',version:'0.0.1',desc:'栅格背景颜色',type:'<code>String</code>',required:'否'},
								{params:'color',version:'0.0.1',desc:'栅格元素字体颜色',type:'<code>String</code>',required:'否'},
							]
						}
					}
				}
			}
		}
	}
</script>

<style>
	.layout-group .e-row{
		margin-bottom: 10px;
	}
</style>
