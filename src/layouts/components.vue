<template>
	<Layout>
		<template #aside>
			<div class="slider e-flex-col e-col-center">
				<div class="logo e-flex e-col-center">
					<Avatar :src="src" circle :size="48" @click="handleAvatar"></Avatar>
				</div>
				<Grid :col="1" align="center" :list="menu.sider" v-slot="{item,index}" @click="handleClickGridItem">
					<div class="text" :class="{active:active==index}">
						{{item.name}}
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
						{name:'文档',key:'doc_guide',children:[
								{name:'指南',to:'doc_guide'},
								{name:'安装',to:'doc_install'},
								{name:'快速上手',to:'doc_quick'},
								{name:'全局配置',to:'doc_config'},
								{name:'国际化',to:'doc_i18n'},
								{name:'更新日志',to:'doc_update'},
							],
						},
						{name:'布局',key:'layout',children:[
								{name:'颜色',to:'layout_color'},
								{name:'样式',to:'layout_styles'},
							],
						},
						{name:'组件',key:'components',
							children:[
							
								{name:'组件总览',to:'components'},
							
								{group:'基本'},
								{name:'按钮 Button',to:'components_button'},
								{name:'图标 Icon',to:'components_icon'},
								
								{group:'布局'},
								{name:'布局 Layout',to:'components_layout'},
								{name:'栅格 Row/Col',to:'components_grid_row_col'},
								{name:'宫格 Grid',to:'components_grid'},
								
								{group:'导航'},
								{name:'固钉 Affix',to:'components_affix'},
								{name:'面包屑 Breadcrumb',to:'components_breadcrumb'},
								{name:'菜单 Menu',to:'components_menu'},
								{name:'下拉菜单 Dropdown',to:'components_dropdown'},
								
								{group:'表单'},
								{name:'输入框 Input',to:'components_input'},
								{name:'数字输入框 InputNumber',to:'components_input_number'},
								{name:'单选框 Radio',to:'components_radio'},
								{name:'多选框 Check',to:'components_check'},
								{name:'选择框 Select',to:'components_select'},
								{name:'开关 Switch',to:'components_switch'},
								{name:'滑块 Slider',to:'components_slider'},
								{name:'上传 Upload',to:'components_table'},
								{name:'时间选择 Date',to:'components_date'},
								{name:'评分 Rate',to:'components_rate'},
								{name:'颜色选择 Color',to:'components_color'},
								{name:'穿梭框 Transfer',to:'components_transfer'},
								{name:'表单 Form',to:'components_form'},
								
								{group:'视图'},
								{name:'头像 Avatar',to:'components_avatar'},
								{name:'徽标数 Badge',to:'components_badge'},
								{name:'进度条 Progress',to:'components_progress'},
								{name:'日历 Calendar',to:'components_calendar'},
								{name:'卡片 Card',to:'components_card'},
								{name:'面板/折叠面板 Panel',to:'components_panel'},
								{name:'分割线 Divider',to:'components_divider'},
								{name:'翻牌器 Flop',to:'components_flop'},
								{name:'标签页面 Tabs',to:'components_tabs'},
								{name:'标签 Tag',to:'components_tag'},
								{name:'时间线 Timeline',to:'components_timeline'},
								{name:'骨架屏 Skeleton',to:'components_skeleton'},
								{name:'图标选择 IconSelect',to:'components_icon_select'},
								
								{group:'数据'},
								{name:'表格 Table',to:'components_table'},
								{name:'分页 Paging',to:'components_paging'},
								
								{group:'弹出层'},
								{name:'模态框 Modal/Dialog',to:'components_modal'},
								{name:'抽屉 Drawer',to:'components_drawer'},
								
								{group:'提示反馈'},
								{name:'页面提示 Alert',to:'components_alert'},
								{name:'全局提示 Message',to:'components_message'},
								{name:'通知提醒 Notice',to:'components_notice'},
								{name:'文字提示 Tooltip',to:'components_tooltip'},
								{name:'气泡提示 Popover',to:'components_popover'},
								{name:'气泡确认 Popconfirm',to:'components_popconfirm'},
								{name:'加载提示 Spin',to:'components_spin'},
								
								{group:'其他'},
								{name:'回到顶部 BackTop',to:'components_backtop'},
								{name:'流加载 Flow',to:'components_flow'},
								{name:'倒计时 countdown',to:'components_countdown'},
								{name:'行政区划选择 Region',to:'components_region'},
								{name:'城市选择 City',to:'components_city'},
							],
						},
						{name:'JS',key:'js',children:[
								{name:'节流防抖',to:'js_debounce'},
								{name:'深拷贝',to:'js_deepClone'},
								{name:'深合并',to:'js_deepMerge'},
								{name:'时间处理',to:'js_time'},
								{name:'随机处理',to:'js_random'},
								{name:'规则校验',to:'js_verify'},
								{name:'复制到剪切板',to:'js_copy'},
								{name:'局部打印',to:'js_print'},
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
				let index = this.menu.sider.findIndex(e=>(e.key.split('_').filter(s=>s.trim())[0]) == path[0]);
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
				if(routes.findIndex(e=>e.name==item.key)>=0){
					this.$router.push({
						name: item.key
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
