<template>
	<div class="example e-flex e-col-center e-row-center">
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'doc_guide' }">文档</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'layout_color' }">布局</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'components_intro' }">组件</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'js_debounce' }">JS</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'template_login' }">模板</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'resource_axure' }">资源</router-link></Panel>
		<div>
			<IconFont name="icon-loading"></IconFont>
			<iconpark-icon name="camera-2h9f861k" size="24" fill='#ff0000'></iconpark-icon>
			<IconPark name='camera-2h9f861k' fill='#ff0000'></IconPark>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
		};
	},
	mounted() {}
};
</script>

<style></style>
