<template>
	<div class="example">
		<Row :gutter="20">
			<Col :span="12">
				<Panel type='code' title="v-backTop / 回到顶部">
					<Panel :header="false">
						<Badge :offset='false' color="#000000"></Badge>
						<span style="margin-left: 10px;">预期：<code>Object</code></span>
					</Panel>
					<Panel>
						<template #header>
							<Badge :offset='false' color="#000000"></Badge>
							<span style="margin-left: 10px;">修饰符：</span>
						</template>
						<p><code>affix</code>&nbsp;&nbsp;拖动元素相对于父级元素进行定位，只能在父级元素内拖动</p>
						<p><code>fixed</code>&nbsp;&nbsp;拖动元素相对于浏览器窗口进行定位，可随意拖动，不随浏览器滚动</p>
					</Panel>
					<Panel>
						<template #header>
							<Badge :offset='false' color="#000000"></Badge>
							<span style="margin-left: 10px;">参数：</span>
						</template>
						<p><code>target</code>&nbsp;&nbsp;设置被拖动的元素，支持<code>#id</code><code>.class</code>选择器</p>
					</Panel>
				</Panel>
			</Col>
			<Col :span="12">
				<Panel>
					<template #header>
						<Badge :offset='false' color="#000000"></Badge>
						<span style="margin-left: 10px;">示例：</span>
					</template>
					<Row :gutter="10">
						<Col :span="8">
							<div v-backTop="{
								height:100,
								bottom:50,
								right:50,
								duration:1000,
							}">
								<!-- <div style="padding: 10px;background: rgba(0, 153, 229, .7);color: #fff;text-align: center;border-radius: 2px;">返回顶端</div> -->
							</div>
						</Col>
					</Row>
				</Panel>
			</Col>
			<Col :span="24">
				<Code skin='dark' :code="code1" copy></Code>
			</Col>
			<Col :span="24">
				<Code skin='dark' :code="code2" copy></Code>
			</Col>
			<Col :span="24">
				<Code skin='dark' :code="code3" copy></Code>
			</Col>
		</Row>
		
	</div>
</template>

<script>
	export default{
		layout:'develop',
		// backTop:true,
		data() {
			return{
				code1:`<div style="width: 100%;height: 150px;background-color: red;margin-bottom: 10px;" class="parent">
					  <div style="background-color: blue;color: white;padding: 10px;" v-drag="{
					    target: '.parent'
					  }">按住我</div>
					  <div style="color: white;padding: 5px;">是我在动，视图到哪里，我就到哪里</div>
					</div>`,
				code2:`<div style="width: 100%;height: 150px;background-color: red;">
							  <span style="background-color: blue;color: white;padding: 10px;display: inline-block;" v-drag.affix>我不能出界</span>
							</div>`,
				code3:`<div style="width: 100%;height: 150px;background-color: red;" class="parent">
							  <div style="background-color: blue;color: white;padding: 10px;" v-drag.fixed="{
							    target: '.parent'
							  }">按住我</div>
							  <div style="color: white;padding: 5px;">是我在动，不管视图在哪里，我始终在这里</div>
							</div>`,
			}
		},
		mounted() {
			// console.log(this)
		}
	}
</script>
