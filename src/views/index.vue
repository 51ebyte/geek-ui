<template>
	<div class="example e-flex e-col-center e-row-center">
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'doc' }">文档</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'layout' }">布局</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'components' }">组件</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'js' }">JS</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'template' }">模板</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'resource' }">资源</router-link></Panel>
	</div>
</template>

<script>
export default {
	data() {
		return {
			upload: {
				url: 'http://127.0.0.1:9002/file/upload/image',
				name: 'files',
				size: 100,
				headers: {},
				withCredentials: false,
				before: file => {
					return new Promise((resolve, reject) => {
						resolve();
					});
				},
				complete: (file, response) => {
					console.log(file, response);
				},
				error: (file, err, xhr) => {
					console.log(file, err, xhr);
				},
				progress: (file, progress) => {
					console.log(file, progress);
				}
			}
		};
	},
	mounted() {}
};
</script>

<style></style>
