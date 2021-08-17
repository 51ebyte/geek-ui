<template>
	<div class="example">
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="基本用法">
					<Panel :header="false" style="width: 350px;">
						<Menu accordion :list="list" :active="active" :open="open"></Menu>
					</Panel>
				</Panel>
			</Col>
			<Col :span="12">
				<Panel type="code" title="基本用法">
					<Panel :header="false" style="width: 350px;">
						<Menu accordion :active="active2" :open="open">
							<SubMenu name="doc" text="文档">
								<MenuItem name="guide" :to="{}" replace>指南</MenuItem>
								<MenuItem name="install" :to="{}" replace>安装</MenuItem>
							</SubMenu>
							<SubMenu name="components" text="组件">
								<MenuItem name="button" :to="{name:'components_button'}" replace>按钮</MenuItem>
								<MenuItem name="icon" :to="{name:'components_icon'}" replace>图标</MenuItem>
								<SubMenu name="grid" text="grid">
									<MenuItem name="layout" :to="{name:'components_layout'}" replace>布局</MenuItem>
									<MenuItem name="row" :to="{name:'components_grid_row_col'}" replace>栅格</MenuItem>
								</SubMenu>
							</SubMenu>
							<SubMenu name="JS" text="JS">
								<MenuItem name="random" :to="{}" replace>随机数</MenuItem>
								<MenuItem name="debounce" :to="{}" replace>节流防抖</MenuItem>
							</SubMenu>
							<MenuItem name="resource" :to="{}" replace>资源</MenuItem>
							<MenuItem name="baidu" :to="{href:'//www.baidu.com',target:'_blank'}" replace>百度一下</MenuItem>
						</Menu>
					</Panel>
				</Panel>
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
				active:'install',
				active2:'install',
				open:[],
				list:[
					{name:'doc',text:'文档',
						children:[
							{name:'guide',text:'指南'},
							{name:'install',text:'安装'},
						],
					},
					{name:'components',text:'组件',
						children:[
							{name:'button',text:'按钮',to:{name:'components_button'}},
							{name:'icon',text:'图标',to:{name:'components_icon'}},
							{name:'grid',text:'宫格',
								children:[
									{name:'layout',text:'布局',to:{name:'components_layout'}},
									{name:'row',text:'栅格',to:{name:'components_grid_row_col'}},
								]
							},
						],
					},
					{name:'js',text:'JS',
						children:[
							{name:'random',text:'随机数'},
							{name:'debounce',text:'节流防抖'},
						],
					},
					{name:'resource',text:'资源'},
					{name:'baidu',text:'百度一下',to:{href:'//www.baidu.com',target:'_blank'}},
				]
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
