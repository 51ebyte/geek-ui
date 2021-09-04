<template>
	<div class="example">
		<Affix :top="200" :right="27">
			<Panel type='code' collapse title="目录" style='width: 168px;'>
				<ul class="directory">
					<li><a href="javascript;;">v-nowTime</a></li>
					<li><a href="javascript;;">v-timeFormat</a></li>
					<li><a href="javascript;;">v-timeFrom</a></li>
				</ul>
			</Panel>
		</Affix>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type='code' title="v-nowTime / 当前时间">
					<Panel :header="false">
						<Badge :offset='false' color="#000000"></Badge>
						<span style="margin-left: 10px;">预期：<code>Object</code></span>
					</Panel>
					<Panel>
						<template #header>
							<Badge :offset='false' color="#000000"></Badge>
							<span style="margin-left: 10px;">修饰符：</span>
						</template>
						<p><code>dynamic</code>&nbsp;&nbsp;动态时间，每秒渲染一次，对展示时间特别好用</p>
						<p><code>week</code>&nbsp;&nbsp;渲染时间时是否显示星期</p>
					</Panel>
					<Panel>
						<template #header>
							<Badge :offset='false' color="#000000"></Badge>
							<span style="margin-left: 10px;">参数：</span>
						</template>
						<p><code>format</code>&nbsp;&nbsp;时间格式，默认<code>yyyy-mm-dd hh:MM:ss</code>，可自由组合</p>
					</Panel>
				</Panel>
			</Col>
			<Col :span="12">
				<Panel type='code' margin="0 0 10px 0">
					<template #header>
						<Badge :offset='false' color="#000000"></Badge>
						<span style="margin-left: 10px;">示例：</span>
					</template>
					<div class="e-flex e-flex-wrap">
						<Panel :header='false' margin="5px">
							<div v-nowTime></div>
						</Panel>
						<Panel :header='false' margin="5px">
							<div v-nowTime.week></div>
						</Panel>
						<Panel :header='false' margin="5px">
							<div v-nowTime.dynamic></div>
						</Panel>
						<Panel :header='false' margin="5px">
							<div v-nowTime.dynamic.week></div>
						</Panel>
						<Panel :header='false' margin="5px">
							<div v-nowTime="{
								format:'yyyy-mm-dd'
							}"></div>
						</Panel>
						<Panel :header='false' margin="5px">
							<div v-nowTime.dynamic.week="{
								format:'hh:MM:ss'
							}"></div>
						</Panel>
					</div>
				</Panel>
			</Col>
			<Col :span="24">
				<Code skin='dark' :code="code.nowTime"></Code>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default{
		layout:'develop',
		data() {
			return{
				code:{
					nowTime:`<div v-nowTime></div>
						<div v-nowTime.week></div>
						<div v-nowTime.dynamic></div>
						<div v-nowTime.dynamic.week></div>
						<div v-nowTime="{format:'yyyy-mm-dd'}"></div>
						<div v-nowTime.dynamic.week="{format:'hh:MM:ss'}"></div>`
				}
			}
		}
	}
</script>
<style>
	.directory{
		padding-left: 12px;
	}
	.directory,.directory li{
		list-style: circle;
	}
	.directory li{
		line-height: 24px;
	}
	.directory li a{
		color: #333333;
		font-size: 16px;
	}
	.directory li a:hover{
		text-decoration: underline;
	}
</style>
