<template>
	<div class="example">
		<Blockquote title="Dropdown 下拉菜单">
			打开看看里面有什么
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="基础用法">
					<div class="e-flex e-col-center">
						<Panel :header="false" :border="false">
							<Dropdown :list="list" name="下拉菜单"></Dropdown>
						</Panel>
						<Panel :header="false" :border="false" margin="0">
							<Dropdown :list="list" name="下拉菜单">
								<a href="javascript:void(0)" class="e-flex e-col-center">
									下拉菜单
									<Icon name="ios-arrow-down"></Icon>
								</a>
							</Dropdown>
						</Panel>
						<Panel :header="false" :border="false" margin="0">
							<Dropdown :list="list">
								<Button type="primary">
									下拉菜单
									<Icon name="ios-arrow-down"></Icon>
								</Button>
							</Dropdown>
						</Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过<code>name&lt;String&gt;</code>可设置触发对象为文字；通过默认插槽<code>default</code>可自定义触发对象</p>
						<p>通过<code>list&lt;Array&gt;</code>设置展开对象的值，通过<code>keys&lt;String&gt;</code>设置展开项要显示文本的对象键，用法见示例</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code1" skin="dark" copy toggle :height="193"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="触发方式">
					<Panel :header="false" :border="false">
						<Row>
							<Col :span="12">
								<Dropdown :list="list">
									<a href="javascript:void(0)" class="e-flex e-col-center">
										hover触发
										<Icon name="ios-arrow-down"></Icon>
									</a>
								</Dropdown>
							</Col>
							<Col :span="12">
								<Dropdown :list="list" trigger="click">
									<a href="javascript:void(0)" class="e-flex e-col-center">
										click触发
										<Icon name="ios-arrow-down"></Icon>
									</a>
								</Dropdown>
							</Col>
						</Row>
					</Panel>
					<Divider left text="用法说明" margin="26px 0 0">
						默认是移入触发菜单，可以点击触发。
						通过设置属性 <code>trigger&lt;String&gt;</code> 可以更改触发方式，可选项为<code>click</code>|<code>hover</code>(默认)。
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code2" skin="dark" copy toggle :height="174"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="禁用和分割线">
					<Panel :header="false" :border="false">
						<Row>
							<Col :span="12">
								<Dropdown :list="list" :disabled="['hulu']" :divided="['冰糖葫芦','豆汁儿']">
									<a href="javascript:void(0)" class="e-flex e-col-center">
										hover触发
										<Icon name="ios-arrow-down"></Icon>
									</a>
								</Dropdown>
							</Col>
							<Col :span="12">
								<Dropdown :list="list" trigger="click" :disabled="['hulu']" :divided="['冰糖葫芦','豆汁儿']">
									<a href="javascript:void(0)" class="e-flex e-col-center">
										click触发
										<Icon name="ios-arrow-down"></Icon>
									</a>
								</Dropdown>
							</Col>
						</Row>
					</Panel>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过属性 <code>disabled&lt;Array&gt;</code> 可以设置选项为禁用状态，匹配值与<code>list&lt;Array&lt;Object&gt;&gt;</code>=><code>name</code> | <code>keys</code>对应</p>
						<p>通过属性 <code>divided&lt;Array&gt;</code> 可以设置选项分割线，匹配值与<code>list&lt;Array&lt;Object&gt;&gt;</code>=><code>name</code> | <code>keys</code>对应</p>
						<p>通过属性 <code>list&lt;Array&gt;</code>{<code>disabled&lt;Boolean&gt;</code>} 可以设置选项禁用</p>
						<p>通过属性 <code>list&lt;Array&gt;</code>{<code>divided&lt;Boolean&gt;</code>} 可以设置选项分割线</p>
						
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code :code="code2" skin="dark" copy toggle :height="226"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Dropdown props"></Blockquote>
				<table-props :data="table.props.data" :example="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Dropdown slot"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
			<Col :span="24">
				<Blockquote title="Dropdown event"></Blockquote>
				<table-event :data="table.event.data"></table-event>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps,TableSlot,TableEvent} from '../bootstrap/table.js'
	export default {
		layout:'develop',
		components:{
			TableProps,
			TableSlot,
			TableEvent
		},
		data(){
			return{
				list:[
					{name:'驴打滚'},
					{name:'炸酱面'},
					{name:'豆汁儿',disabled:true},
					{name:'冰糖葫芦',keys:'hulu'},
					{name:'北京烤鸭',divided:true,children:[
						{name:'果木烤鸭'},
						{name:'挂炉烤鸭'},
						{name:'北京烤鸭2',divided:true,children:[
							{name:'果木烤鸭2'},
							{name:'挂炉烤鸭2'},
						]},
					]},
				],
				code1:`<template>
				  <Dropdown :list="list" name="下拉菜单"></Dropdown>
				  <Dropdown :list="list">
				    <a href="javascript:void(0)" class="e-flex e-col-center">
				      下拉菜单
				      <Icon name="ios-arrow-down"></Icon>
				    </a>
				  </Dropdown>
				  <Dropdown :list="list">
				    <Button type="primary">
				      下拉菜单
				      <Icon name="ios-arrow-down"></Icon>
					  </Button>
					</Dropdown>
				</template>
				&lt;script&gt;
				  export default{
				    list:[
				      {name:'驴打滚'},
				      {name:'炸酱面'},
				      {name:'豆汁儿',disabled:true},
				      {name:'冰糖葫芦',keys:'a'},
				      {name:'北京烤鸭',divided:true,children:[
				        {name:'果木烤鸭'},
				        {name:'挂炉烤鸭'},
				        {name:'北京烤鸭2',divided:true,children:[
				          {name:'果木烤鸭2'},
				          {name:'挂炉烤鸭2'},
				        ]},
				      ]},
				    ],
				  }
				&lt;/script&gt;`,
				code2:`<Dropdown :list="list" trigger="hover">
				    <a href="javascript:void(0)" class="e-flex e-col-center">
				      下拉菜单
				      <Icon name="ios-arrow-down"></Icon>
				    </a>
				  </Dropdown>
				  <Dropdown :list="list" trigger="click">
				    <Button type="primary">
				      下拉菜单
				      <Icon name="ios-arrow-down"></Icon>
					  </Button>
					</Dropdown>`,
				code3:`<template>
				  <Dropdown :list="list" :disabled="['hulu']" :divided="['冰糖葫芦','豆汁儿']">
				    <a href="javascript:void(0)" class="e-flex e-col-center">
				      下拉菜单
				      <Icon name="ios-arrow-down"></Icon>
				    </a>
				  </Dropdown>
				  <Dropdown :list="list" trigger="click" :disabled="['hulu']" :divided="['冰糖葫芦','豆汁儿']">
				    <Button type="primary">
				      下拉菜单
				      <Icon name="ios-arrow-down"></Icon>
					  </Button>
					</Dropdown>
				</template>
				&lt;script&gt;
				  export default{
				    list:[
				      {name:'驴打滚'},
				      {name:'炸酱面'},
				      {name:'豆汁儿',disabled:true},
				      {name:'冰糖葫芦',keys:'hulu'},
				      {name:'北京烤鸭',divided:true,children:[
				        {name:'果木烤鸭'},
				        {name:'挂炉烤鸭'},
				        {name:'北京烤鸭2',divided:true,children:[
				          {name:'果木烤鸭2'},
				          {name:'挂炉烤鸭2'},
				        ]},
				      ]},
				    ],
				  }
				&lt;/script&gt;`,
				table:{
					props:{
						data:[
							{params:'list',version:'0.0.1',desc:'下拉菜单数据对象',type:'<code>Array</code>',required:'是'},
							{params:'name',version:'0.0.1',desc:'触发对象文字',type:'<code>String</code>',required:'否'},
							{params:'keys',version:'0.0.1',desc:'数据对象显示文本键',type:'<code>String</code>',required:'否',select:'dark'},
							{params:'trigger',version:'0.0.1',desc:'触发方式，可选值为 <code>hover</code>（悬停）<code>click</code>（点击）',type:'<code>String</code>',required:'否',select:'<code>hover</code> | <code>click</code>',default:'<code>hover</code>'},
							{params:'disabled',version:'0.0.1',desc:'禁用选项，匹配数据对象<code>name</code>或<code>keys</code>',type:'<code>Array</code>',required:'否'},
							{params:'divided',version:'0.0.1',desc:'显示分割线，匹配数据对象<code>name</code>或<code>keys</code>',type:'<code>Array</code>',required:'否'},
						]
					},
					slot:{
						data:[
							{title:'default',desc:'自定义触发对象'},
						]
					},
					event:{
						data:[
							{name:'@click',desc:'点击菜单项时触发',return:'<code>list&lt;Array&gt;</code>对象'},
						]
					}
				}
			}
		},
		methods:{
			handleClickItem(item,evt){
				console.log(item,evt)
			}
		}
	}
</script>

<style>
</style>
