<template>
	<Layout>
		<template #aside>
			<div class="slider e-flex-col e-col-center">
				<div class="logo e-flex e-col-center">
					<Avatar :src="src" circle :size="48" @click="handleAvatar"></Avatar>
				</div>
				<Grid :col="1" align="center" :list="menu.sider" v-slot="{item,index}" @click="handleClickGridItem">
					<div class="text" :class="{active:active==index}">
						{{item.text}}
					</div>
				</Grid>
			</div>
		</template>
		<template #north>
			<div style="height: 64px;width: 100%;padding: 0 20px;" class="e-flex e-col-center e-row-between">
				<div class="e-flex-1">
					<Input></Input>
				</div>
				<div class="navlist" style="height: 100%;">
					<Menu :list="menu.north" horizontal></Menu>
				</div>
			</div>
		</template>
		<template #west>
			<div style="height: 100%;width: 220px;padding-top: 10px;overflow: auto;">
				<Menu :list="menu.west"></Menu>
			</div>
		</template>
		<template #default>
			<router-view></router-view>
		</template>
		<template #south>
			<div style="height: 38px;width: 100%;line-height: 38px;text-align: center;">
				<p class="copyright">Copyright © 2020-{{new Date().getFullYear()}} 众芯智合/zxzhihe.com  版权所有</p>
			</div>
		</template>
	</Layout>
</template>

<script>
	import image from './../logo.png'
	export default{
		data(){
			return{
				src:'https://portrait.gitee.com/uploads/avatars/namespace/2350/7050961_responsibility-of-sichuan-muhe_1623835668.png',
				menu:{
					sider:[
						{text:'文档',name:'doc_guide',children:[
								{text:'指南',to:'doc_guide'},
								{text:'安装',to:'doc_install'},
								{text:'快速上手',to:'doc_quick'},
								{text:'全局配置',to:'doc_config'},
								{text:'国际化',to:'doc_i18n'},
								{text:'更新日志',to:'doc_update'},
							],
						},
						{text:'布局',name:'layout',children:[
								{text:'颜色',to:'layout_color'},
								{text:'样式',to:'layout_styles'},
							],
						},
						{text:'组件',name:'components',
							children:[
							
								{text:'组件总览',to:'components'},
							
								{group:'基本'},
								{text:'按钮 Button',name:'components_button',to:'components_button'},
								{text:'图标 Icon',to:'components_icon'},
								
								{group:'布局'},
								{text:'布局 Layout',to:'components_layout'},
								{text:'栅格 Row/Col',to:'components_grid_row_col'},
								{text:'宫格 Grid',to:'components_grid'},
								
								{group:'导航'},
								{text:'固钉 Affix',to:'components_affix'},
								{text:'面包屑 Breadcrumb',to:'components_breadcrumb'},
								{text:'菜单 Menu',to:'components_menu'},
								{text:'下拉菜单 Dropdown',to:'components_dropdown'},
								
								{group:'表单'},
								{text:'输入框 Input',to:'components_input'},
								{text:'数字输入框 InputNumber',to:'components_input_number'},
								{text:'单选框 Radio',to:'components_radio'},
								{text:'多选框 Check',to:'components_check'},
								{text:'选择框 Select',to:'components_select'},
								{text:'开关 Switch',to:'components_switch'},
								{text:'滑块 Slider',to:'components_slider'},
								{text:'上传 Upload',to:'components_table'},
								{text:'时间选择 Date',to:'components_date'},
								{text:'评分 Rate',to:'components_rate'},
								{text:'颜色选择 Color',to:'components_color'},
								{text:'穿梭框 Transfer',to:'components_transfer'},
								{text:'表单 Form',to:'components_form'},
								
								{group:'视图'},
								{text:'头像 Avatar',to:'components_avatar'},
								{text:'徽标数 Badge',to:'components_badge'},
								{text:'进度条 Progress',to:'components_progress'},
								{text:'日历 Calendar',to:'components_calendar'},
								{text:'卡片 Card',to:'components_card'},
								{text:'面板/折叠面板 Panel',to:'components_panel'},
								{text:'分割线 Divider',to:'components_divider'},
								{text:'翻牌器 Flop',to:'components_flop'},
								{text:'标签页面 Tabs',to:'components_tabs'},
								{text:'标签 Tag',to:'components_tag'},
								{text:'时间线 Timeline',to:'components_timeline'},
								{text:'骨架屏 Skeleton',to:'components_skeleton'},
								{text:'图标选择 IconSelect',to:'components_icon_select'},
								
								{group:'数据'},
								{text:'表格 Table',to:'components_table'},
								{text:'分页 Paging',to:'components_paging'},
								
								{group:'弹出层'},
								{text:'模态框 Modal/Dialog',to:'components_modal'},
								{text:'抽屉 Drawer',to:'components_drawer'},
								
								{group:'提示反馈'},
								{text:'页面提示 Alert',to:'components_alert'},
								{text:'全局提示 Message',to:'components_message'},
								{text:'通知提醒 Notice',to:'components_notice'},
								{text:'文字提示 Tooltip',to:'components_tooltip'},
								{text:'气泡提示 Popover',to:'components_popover'},
								{text:'气泡确认 Popconfirm',to:'components_popconfirm'},
								{text:'加载提示 Spin',to:'components_spin'},
								
								{group:'其他'},
								{text:'回到顶部 BackTop',to:'components_backtop'},
								{text:'流加载 Flow',to:'components_flow'},
								{text:'倒计时 countdown',to:'components_countdown'},
								{text:'行政区划选择 Region',to:'components_region'},
								{text:'城市选择 City',to:'components_city'},
							],
						},
						{text:'JS',name:'js',children:[
								{text:'节流防抖',to:'js_debounce'},
								{text:'深拷贝',to:'js_deepClone'},
								{text:'深合并',to:'js_deepMerge'},
								{text:'时间处理',to:'js_time'},
								{text:'随机处理',to:'js_random'},
								{text:'规则校验',to:'js_verify'},
								{text:'复制到剪切板',to:'js_copy'},
								{text:'局部打印',to:'js_print'},
							],
						},
						{name:'模板',key:'template',children:[
								{name:'登录',to:'template_login'},
								{name:'滑动验证',to:'template_drag'},
							],
						},
						{name:'资源',key:'resource',children:[
								{name:'Axure',to:'resource_axure'},
							],
						},
					],
					north:[
						{name:'API',href:"http://www.baidu.com",target:'_blank'},
						{name:'社区',href:"http://www.baidu.com",target:'_blank'},
						{name:'支持',href:"http://www.baidu.com",target:'_blank'},
						{name:'生态',
							children:[
								{name:'颜色',to:'doc_guide'},
							]
						},
						{name:'Gitee',href:"http://www.baidu.com",target:'_blank'},
						{name:'Github',href:"http://www.baidu.com",target:'_blank'},
					],
					west:[],
				}
			}
		},
		computed:{
			active(){
				const path = this.$route.path.split('/').filter(e=>e.trim());
				let index = this.menu.sider.findIndex(e=>(e.name.split('_').filter(s=>s.trim())[0]) == path[0]);
				return index >= 0 ? index : 0;
			}
		},
		mounted() {
			this.menu.west = this.menu.sider[this.active]['children'];
		},
		methods:{
			handleAvatar(){
				console.log("a")
			},
			handleClickGridItem(item,index){
				let child;
				if((child = item.children)){
					this.menu.west = child
				}
				const routes = this.$router.getRoutes();
				if(routes.findIndex(e=>e.name==item.name)>=0){
					this.$router.push({
						name: item.name
					});
				}
			}
		}
	}
</script>

<style>
	.slider{
		height: 100%;
	}
	.slider .logo{
		height: 64px;
	}
	.slider .text{
		height: 54px;
		line-height: 54px;
	}
	.slider .text.active{
		color: #0f8de9;
	}
</style>
