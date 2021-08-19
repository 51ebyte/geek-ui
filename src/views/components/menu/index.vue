<template>
	<div class="example">
		<Row :gutter="20">
			<Col :span="12">
				
				<Panel type="code" title="基本用法【虚拟DOM渲染模式】">
					<Panel :header="false" style="width: 350px;">
						<Menu accordion :list="list" :active="active" :open="open"></Menu>
					</Panel>
				</Panel>
				<Code :code="code3" skin="dark" toggle copy :height="0"></Code>
				
				
				<Panel type="code" title="水平导航" margin="10px 0">
					<Menu :list="list" horizontal></Menu>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>horizontal&lt;Boolean&gt;</code> 属性设置水平的导航菜单</p>
					</Divider>
				</Panel>
				<Code :code="code1" skin="dark" toggle copy :height="0"></Code>
				
			</Col>
			<Col :span="12">
				<Panel type="code" title="基本用法【组件渲染模式】">
					<Panel :header="false" style="width: 350px;">
						<Menu accordion :active="active2" :open="open">
							<SubMenu keys="doc" name="文档">
								<MenuItem keys="guide" :to="{}" replace>指南</MenuItem>
								<MenuItem keys="install" :to="{}" replace>安装</MenuItem>
							</SubMenu>
							<SubMenu keys="components" name="组件">
								<MenuItem keys="button" :to="{name:'components_button'}" replace>按钮</MenuItem>
								<MenuItem keys="icon" :to="{name:'components_icon'}" replace>图标</MenuItem>
								<SubMenu keys="grid" name="grid">
									<MenuItem keys="layout" :to="{name:'components_layout'}" replace>布局</MenuItem>
									<MenuItem keys="row" :to="{name:'components_grid_row_col'}" replace>栅格</MenuItem>
								</SubMenu>
							</SubMenu>
							<SubMenu keys="JS" name="JS">
								<MenuItem keys="random" :to="{}" replace>随机数</MenuItem>
								<MenuItem keys="debounce" :to="{}" replace>节流防抖</MenuItem>
							</SubMenu>
							<MenuItem keys="resource" :to="{}" replace>资源</MenuItem>
							<MenuItem keys="baidu" :to="{href:'//www.baidu.com',target:'_blank'}" replace>百度一下</MenuItem>
						</Menu>
					</Panel>
				</Panel>
				<Code :code="code2" skin="dark" toggle copy :height="0"></Code>
				
				<Panel type="code" title="导航分组" margin="10px 0">
					<Menu :list="group"></Menu>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>horizontal&lt;Boolean&gt;</code> 属性设置水平的导航菜单</p>
					</Divider>
				</Panel>
				<Code :code="code1" skin="dark" toggle copy :height="0"></Code>
				
			</Col>
		</Row>
	</div>
</template>

<script>
	export default{
		layout:'components',
		data(){
			return{
				show:false,
				active:'button',
				active2:'install',
				open:[],
				list:[
					{keys:'doc',name:'文档',
						children:[
							{keys:'guide',name:'指南'},
							{keys:'install',name:'安装'},
						],
					},
					{keys:'components',name:'组件',
						children:[
							{keys:'button',name:'按钮',to:{name:'components_button'}},
							{keys:'icon',name:'图标',to:{name:'components_icon'}},
							{keys:'grid',name:'宫格2',
								children:[
									{keys:'layout',name:'布局',to:{name:'components_layout'}},
									{keys:'row',name:'栅格',to:{name:'components_grid_row_col'}},
									{keys:'row2',name:'栅格2栅格2栅格2栅格2',children:[
										{keys:'layout2',name:'布局',to:{name:'components_layout'}},
										{keys:'row2',name:'栅格',to:{name:'components_grid_row_col'}},
									]},
								]
							},
						],
					},
					{keys:'js',name:'JS',
						children:[
							{keys:'random',name:'随机数'},
							{keys:'debounce',name:'节流防抖'},
						],
					},
					{keys:'resource',name:'资源'},
					{keys:'baidu',name:'百度一下',to:{href:'//www.baidu.com',target:'_blank'}},
				],
				group:[
						
					{name:'组件总览',to:'components'},
				
					{group:'基本'},
					{name:'按钮 Button',keys:'components_button',to:'components_button'},
					
					{group:'布局'},
					{name:'栅格 Row/Col',to:'components_grid_row_col'},
					{name:'宫格 Grid',to:'components_grid'},
				],
				code1:`<Menu :list="list" horizontal></Menu>`,
				code2:`<Menu accordion active="install" :open="[]">
				  <SubMenu name="doc" text="文档">
				    <MenuItem name="guide" :to="{}">指南</MenuItem>
				    <MenuItem name="install" :to="{}">安装</MenuItem>
				  </SubMenu>
				  <SubMenu name="components" text="组件">
				    <MenuItem name="button" :to="{name:'components_button'}">按钮</MenuItem>
				    <MenuItem name="icon" :to="{name:'components_icon'}">图标</MenuItem>
				    <SubMenu name="grid" text="grid">
				      <MenuItem name="layout" :to="{name:'components_layout'}">布局</MenuItem>
				      <MenuItem name="row" :to="{name:'components_grid_row_col'}">栅格</MenuItem>
				    </SubMenu>
				  </SubMenu>
				  <SubMenu name="JS" text="JS">
				    <MenuItem name="random" :to="{}">随机数</MenuItem>
				    <MenuItem name="debounce" :to="{}">节流防抖</MenuItem>
				  </SubMenu>
				  <MenuItem name="resource" :to="{}">资源</MenuItem>
				  <MenuItem name="baidu" :to="{href:'//baidu.com',target:'_blank'}">百度一下</MenuItem>
				</Menu>`,
				code3:`<Menu accordion :list="list" active="button" :open="[]"></Menu>`
			}
		},
		methods:{
			toggle(){
				this.active = 'JS'
			}
		}
	}
</script>

<style>
</style>
