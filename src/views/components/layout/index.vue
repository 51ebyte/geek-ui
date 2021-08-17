<template>
	<div class="example">
		<Blockquote title="Layout 容器">
			你是最可爱的人吗？😯
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="使用插槽构造">
					<Layout style="height: 460px;">
						<template #sider>
							<div style="width: 64px;height: 100%;background: #7cbce9;color: white;display: flex;justify-content: space-around;align-items: center;">
								侧边栏
							</div>
						</template>
						<template #north>
							<div style="height: 100px;width: 100%;background: #7cbce9;color: white;display: flex;justify-content: space-around;align-items: center;">
								北
							</div>
						</template>
						<template #west>
							<div style="height: 100%;width: 200px;background: #0f8de9;color: white;display: flex;justify-content: space-around;align-items: center;">
								西
							</div>
						</template>
						<div style="display: flex;height: 100%;justify-content: space-around;align-items: center;">
							中
						</div>
						<template #east>
							<div style="height: 100%;width: 200px;background: #0f8de9;color: white;display: flex;justify-content: space-around;align-items: center;">
								东
							</div>
						</template>
						<template #south>
							<div style="height: 100px;width: 100%;background: #7cbce9;color: white;display: flex;justify-content: space-around;align-items: center;">
								南
							</div>
						</template>
					</Layout>
					<Divider text="用法说明" left margin="36px 0 6px">
						<p>不废话，看示例吧。不过注意，<code>插槽</code>布局是不可以嵌套使用的哦</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :height="584" :code="code2" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="使用组件构造">
					<Layout style="height: 460px;">
						<LayoutAside style="background-color: #FFB800;">侧边栏1</LayoutAside>
						<Layout>
							<LayoutNorth style="background-color: #0f8de9;">北1</LayoutNorth>
							<LayoutCenter>
								<LayoutEast :width="64" style="background-color: #FF4D51;">西1</LayoutEast>
								<LayoutCenter>
									
									<Layout style="padding: 10px;">
										<LayoutAside style="background-color: #0000FF;color: white;">侧边栏2</LayoutAside>
										<Layout>
											<LayoutNorth style="background-color: #ffaa00;color: white;">北2</LayoutNorth>
											<LayoutCenter>
												<LayoutEast :width="64" style="background-color: #55aa7f;color: white;">西2</LayoutEast>
												<LayoutCenter style="background-color: #787765;color: white;">中2</LayoutCenter>
												<LayoutWest style="background-color: #aa557f;color: white;">东2</LayoutWest>
											</LayoutCenter>
											<LayoutSouth style="background-color: #5500ff;color: white;">南2</LayoutSouth>
										</Layout>
									</Layout>
									
								</LayoutCenter>
								<LayoutWest style="background-color: #FF5722;">东</LayoutWest>
							</LayoutCenter>
							<LayoutSouth style="background-color: #0f8de9;">南1</LayoutSouth>
						</Layout>
					</Layout>
					<Divider text="用法说明" left margin="36px 0 6px">
						<p>不多说，看示例吧。不过注意，<code>layout</code>布局是可以无限级嵌套使用的哦</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :height="584" :code="code1" copy toggle></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Layout Slots"></Blockquote>
				<table-slot :data="table.slot.layout"></table-slot>
			</Col>
			<Col :span="24">
				<Blockquote title="LayoutAside Props"></Blockquote>
				<table-props :data="table.props.aside"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="LayoutNorth Props"></Blockquote>
				<table-props :data="table.props.north"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="LayoutWest Props"></Blockquote>
				<table-props :data="table.props.west"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="LayoutEast Props"></Blockquote>
				<table-props :data="table.props.east"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="LayoutSouth Props"></Blockquote>
				<table-props :data="table.props.south"></table-props>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps,TableSlot,TableEvent} from '../bootstrap/table.js'
	export default{
		layout:'components',
		components: {
			TableProps,
			TableSlot,
			TableEvent
		},
		data(){
			return{
				list:[
					{name:'a',path:'aa'}
				],
				code1:`<Layout style="height: 420px;">
						  <LayoutAside style="background-color: #FFB800;">侧边栏1</LayoutAside>
						  <Layout>
							    <LayoutNorth style="background-color: #0f8de9;">北1</LayoutNorth>
							    <LayoutCenter>
								      <LayoutEast style="background-color: #FF4D51;">西1</LayoutEast>
								      <LayoutCenter>
							        <Layout style="padding: 10px;">
							          <LayoutAside style="background-color: #0000FF;color: white;">侧边栏2</LayoutAside>
								          <Layout>
							            <LayoutNorth style="background-color: #ffaa00;color: white;">北2</LayoutNorth>
							            <LayoutCenter>
										              <LayoutEast style="background-color: #55aa7f;color: white;">西2</LayoutEast>
										              <LayoutCenter style="background-color: #787765;color: white;">中2</LayoutCenter>
										              <LayoutWeat style="background-color: #aa557f;color: white;">东2</LayoutWeat>
							            </LayoutCenter>
							            <LayoutSouth style="background-color: #5500ff;color: white;">南2</LayoutSouth>
							          </Layout>
							        </Layout>
									
								      </LayoutCenter>
					      <LayoutWeat style="background-color: #FF5722;">东1</LayoutWeat>
				    </LayoutCenter>
					    <LayoutSouth style="background-color: #0f8de9;">南1</LayoutSouth>
					  </Layout>
					</Layout>`,
				code2:`<Layout style="height: 460px;">
						  <template #sider>
							    <div style="width: 64px;height: 100%;background: #7cbce9;color: white;display: flex;justify-content: space-around;align-items: center;">
								      侧边栏
							    </div>
						  </template>
						  <template #north>
							    <div style="height: 100px;width: 100%;background: #7cbce9;color: white;display: flex;justify-content: space-around;align-items: center;">
								      北
							    </div>
						  </template>
						  <template #west>
							    <div style="height: 100%;width: 200px;background: #0f8de9;color: white;display: flex;justify-content: space-around;align-items: center;">
								      西
							    </div>
						  </template>
							    <div style="display: flex;height: 100%;justify-content: space-around;align-items: center;">
									      中
							    </div>
						  <template #east>
							    <div style="height: 100%;width: 200px;background: #0f8de9;color: white;display: flex;justify-content: space-around;align-items: center;">
								      东
							    </div>
						  </template>
							  <template #south>
							    <div style="height: 100px;width: 100%;background: #7cbce9;color: white;display: flex;justify-content: space-around;align-items: center;">
								      南
							    </div>
							  </template>
					</Layout>`,
				table:{
					slot:{
						layout:[
							{title:'sider',desc:'侧边栏'},
							{title:'north',desc:'北部'},
							{title:'west',desc:'西部'},
							{title:'default',desc:'中部'},
							{title:'east',desc:'东部'},
							{title:'south',desc:'南部'},
						]
					},
					props:{
						aside:[
							{params:'width',version:'0.0.1',desc:'侧边栏宽度，单位<code>px</code>',type:'<code>Number</code>',required:'否',default:'<code>64</code>'},
						],
						north:[
							{params:'height',version:'0.0.1',desc:'北部高度，单位<code>px</code>',type:'<code>Number</code>',required:'否',default:'<code>60</code>'},
						],
						west:[
							{params:'width',version:'0.0.1',desc:'西部宽度，单位<code>px</code>',type:'<code>Number</code>',required:'否',default:'<code>220</code>'},
						],
						east:[
							{params:'width',version:'0.0.1',desc:'东部宽度，单位<code>px</code>',type:'<code>Number</code>',required:'否',default:'<code>0</code>'},
						],
						south:[
							{params:'height',version:'0.0.1',desc:'南部高度，单位<code>px</code>',type:'<code>Number</code>',required:'否',default:'<code>40</code>'},
						],
					}
				}
			}
		}
	}
</script>

<style>
	.example>.e-layout{
		width: 100% !important;
		height: 420px !important;
	}
	.example .e-layout-container{
		height: 100% !important;
	}
</style>
