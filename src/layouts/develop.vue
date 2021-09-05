<template>
	<Layout ref="layout" :southHeight="38" collapse>
		<template #aside>
			<slider :logo="avatar" :menu="menu.sider" @menu="handleClickmenu"></slider>
		</template>
		<template #north>
			<div class="e-flex-1 e-flex e-col-center e-row-between">
				<div class="e-flex e-col-center" style="width: 260px;padding: 0 15px;">
					<Select :list="menu.sider[2]['children']" filter label-key="name" @change="handleSelectChange"></Select>
				</div>
				<div class="navlist" style="height: 100%;">
					<Menu :list="menu.north" horizontal></Menu>
				</div>
			</div>
		</template>
		<template #west>
			<Menu :list="menu.west"></Menu>
		</template>
		<template #default>
			<div style="margin: 20px 20px 0px 20px;">
				<Breadcrumb :list="breadcrumb"></Breadcrumb>
			</div>
			<router-view></router-view>
		</template>
		<template #south>
			<div style="height: 100%;width: 100%;line-height: 38px;text-align: center;">
				<p class="copyright">Copyright © 2020-{{new Date().getFullYear()}} 字节极客 | bytegeek.cn | 版权所有</p>
			</div>
		</template>
	</Layout>
</template>

<script>
	import slider from './components/slider.vue'
	import avatar from './../assets/avatar.png'
	export default{
		components:{
			slider
		},
		data(){
			return{
				avatar:avatar,
				menu:{
					sider:[
						{name:'文档',keys:'doc',children:[
								{name:'指南',keys:'doc_guide',to:'doc_guide'},
								{name:'安装',to:'doc_install'},
								{name:'快速上手',to:'doc_quick'},
								{name:'全局配置',to:'doc_config'},
								{name:'国际化',to:'doc_i18n'},
								{name:'更新日志',to:'doc_update'},
							],
						},
						{name:'布局',keys:'layout',children:[
								{name:'颜色',keys:'layout_color',to:'layout_color'},
								{name:'样式',keys:'layout_styles',to:'layout_styles'},
							],
						},
						{name:'组件',keys:'components',
							children:[
							
								{name:'组件总览',keys:'components_intro',to:'components_intro'},
							
								{group:'基本'},
								{name:'按钮 Button',keys:'components_button',to:'components_button'},
								{name:'图标 Icon',keys:'components_icon',to:'components_icon'},
								
								{group:'布局'},
								{name:'布局 Layout',keys:'components_layout',to:'components_layout'},
								{name:'栅格 Row/Col',keys:'components_grid_row_col',to:'components_grid_row_col'},
								{name:'宫格 Grid',keys:'components_grid',to:'components_grid'},
								
								{group:'导航'},
								{name:'固钉 Affix',keys:'components_affix',to:'components_affix'},
								{name:'面包屑 Breadcrumb',keys:'components_breadcrumb',to:'components_breadcrumb'},
								{name:'〒菜单 Menu',keys:'components_menu',to:'components_menu'},
								{name:'下拉菜单 Dropdown',keys:'components_dropdown',to:'components_dropdown'},
								
								{group:'表单'},
								{name:'输入框 Input',keys:'components_input',to:'components_input'},
								{name:'数字输入框 InputNumber',keys:'components_input_number',to:'components_input_number'},
								{name:'单选框 Radio',keys:'components_radio',to:'components_radio'},
								{name:'多选框 Check',keys:'components_check',to:'components_check'},
								{name:'选择框 Select',keys:'components_select',to:'components_select'},
								{name:'〒时间选择 Date',keys:'components_date',to:'components_date'},
								{name:'开关 Switch',keys:'components_switch',to:'components_switch'},
								{name:'滑块 Slider',keys:'components_slider',to:'components_slider'},
								{name:'上传 Upload',keys:'components_upload',to:'components_upload'},
								{name:'评分 Rate',keys:'components_rate',to:'components_rate'},
								{name:'〓颜色选择 Color',keys:'components_color',to:'components_color'},
								{name:'〓穿梭框 Transfer',keys:'components_transfer',to:'components_transfer'},
								{name:'〓表单 Form',keys:'components_form',to:'components_form'},
								
								{group:'视图'},
								{name:'头像 Avatar',keys:'components_avatar',to:'components_avatar'},
								{name:'徽标数 Badge',keys:'components_badge',to:'components_badge'},
								{name:'〓进度条 Progress',keys:'components_progress',to:'components_progress'},
								{name:'日历 Calendar',keys:'components_calendar',to:'components_calendar'},
								{name:'卡片 Card',keys:'components_card',to:'components_card'},
								{name:'面板/折叠面板 Panel',keys:'components_panel',to:'components_panel'},
								{name:'分割线 Divider',keys:'components_divider',to:'components_divider'},
								{name:'翻牌器 Flop',keys:'components_flop',to:'components_flop'},
								{name:'标签页面 Tabs',keys:'components_tabs',to:'components_tabs'},
								{name:'标签 Tag',keys:'components_tag',to:'components_tag'},
								{name:'〓时间线 Timeline',keys:'components_timeline',to:'components_timeline'},
								{name:'〓骨架屏 Skeleton',keys:'components_skeleton',to:'components_skeleton'},
								{name:'〓图标选择 IconSelect',keys:'components_icon_select',to:'components_icon_select'},
								
								{group:'数据'},
								{name:'〓表格 Table',keys:'components_table',to:'components_table'},
								{name:'〓分页 Paging',keys:'components_paging',to:'components_paging'},
								
								{group:'弹出层'},
								{name:'模态/对话框 Modal/Dialog',keys:'components_modal',to:'components_modal'},
								{name:'弹出层 Layer',keys:'components_layer',to:'components_layer'},
								{name:'抽屉 Drawer',keys:'components_drawer',to:'components_drawer'},
								
								{group:'提示反馈'},
								{name:'页面提示 Prompt',keys:'components_prompt',to:'components_prompt'},
								{name:'全局提示 Message',keys:'components_message',to:'components_message'},
								{name:'通知提醒 Notice',keys:'components_notice',to:'components_notice'},
								{name:'文字提示 Tooltip',keys:'components_tooltip',to:'components_tooltip'},
								{name:'〓气泡提示 Popover',keys:'components_popover',to:'components_popover'},
								{name:'〓气泡确认 Popconfirm',keys:'components_popconfirm',to:'components_popconfirm'},
								{name:'〓加载提示 Spin',keys:'components_spin',to:'components_spin'},
								
								{group:'其他'},
								{name:'〓回到顶部 BackTop',keys:'components_backtop',to:'components_backtop'},
								{name:'〓流加载 Flow',keys:'components_flow',to:'components_flow'},
								{name:'〓倒计时 countdown',keys:'components_countdown',to:'components_countdown'},
								{name:'〓行政区划选择 Region',keys:'components_region',to:'components_region'},
								{name:'〓城市选择 City',keys:'components_city',to:'components_city'},
							],
						},
						{name:'指令',keys:'directive',children:[
								{name:'拖动元素',keys:'directive_darg',to:'directive_darg'},
								{name:'时间处理',keys:'directive_time',to:'directive_time'},
								{name:'回到顶部',keys:'directive_back-top',to:'directive_back-top'},
							],
						},
						{name:'JS',keys:'js',children:[
								{name:'节流防抖',keys:'js_debounce',to:'js_debounce'},
								{name:'深拷贝',keys:'js_deepClone',to:'js_deepClone'},
								{name:'深合并',keys:'js_deepMerge',to:'js_deepMerge'},
								{name:'时间处理',keys:'js_time',to:'js_time'},
								{name:'随机处理',keys:'js_random',to:'js_random'},
								{name:'规则校验',keys:'js_verify',to:'js_verify'},
								{name:'复制到剪切板',keys:'js_copy',to:'js_copy'},
								{name:'局部打印',keys:'js_print',to:'js_print'},
							],
						},
						{name:'模板',keys:'template',children:[
								{name:'登录',keys:'template_login',to:'template_login'},
								{name:'滑动验证',keys:'template_drag',to:'template_drag'},
							],
						},
						{name:'资源',keys:'resource_axure',to:'resource_axure'},
					],
					north:[
						{keys:"API",name:'API',href:"http://www.baidu.com",target:'_blank'},
						{keys:"SHEQU",name:'社区',href:"http://www.baidu.com",target:'_blank'},
						{keys:"ZHICHI",name:'支持',href:"http://www.baidu.com",target:'_blank'},
						{keys:"SHENGTAI",name:'生态',
							children:[
								{keys:"YANSE",name:'颜色',to:'SHENGTAI'},
							]
						},
						{keys:'Gitee',name:'Gitee',href:"http://www.baidu.com",target:'_blank'},
						{keys:'Github',name:'Github',href:"http://www.baidu.com",target:'_blank'},
					],
					west:[],
				},
				breadcrumb:[]
			}
		},
		computed:{
			active(){
				const path = this.$route.path.split('/').filter(e => e.trim());
				let index = this.menu.sider.findIndex(e => e.keys.split('_').filter(s => s.trim())[0] == path[0]);
				return index >= 0 ? index : 0;
			},
		},
		watch:{
			'$route'(n){
				this.breadcrumb = this.handleBreadcrumb(n.name);
			}
		},
		mounted() {
			this.menu.west = this.menu.sider[this.active]['children'] || [];
			let routeName = this.$route.name;
			this.breadcrumb = this.handleBreadcrumb(routeName);
		},
		methods:{
			handleBreadcrumb(routeName){
				let breadcrumb =[
					{name:'首页',to:{path:'/'}},
				]
				this.menu.west = this.menu.sider[this.active]['children'] || [];
				let one = this.menu.sider.filter(e=>e.keys==routeName.split('_')[0])
				let two = this.menu.west.filter(e=>e.keys==routeName);
				if(one[0]){
					breadcrumb.push({name:one[0]['name'] || ''})
				}
				if(two[0]){
					let name = two[0]['name'];
					breadcrumb.push({name:name.replace(name.match(/[a-zA-Z]+/),'').trim()})
				}
				return breadcrumb
			},
			handleClickmenu(item,index){
				this.menu.west = item.children || [];
			},
			handleSelectChange(item,index){
				this.$router.push({
					name:item.to
				});
			},
			handleToggleWest(){
				this.$refs.layout.toggleCollapseWest();
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
