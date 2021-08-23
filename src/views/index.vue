<template>
	<!-- <div class="example e-flex e-col-center e-row-center">
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'doc_guide' }">文档</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'layout_color' }">布局</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'components_intro' }">组件</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'js_debounce' }">JS</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'template_login' }">模板</router-link></Panel>
		<Panel :header="false" margin="0 5px 0"><router-link :to="{ name: 'resource_axure' }">资源</router-link></Panel>
	</div> -->
  <Layout>
  	<template #aside>
  		<div style="height: 100%;background: #7cbce9;color: white;display: flex;justify-content: space-around;align-items: center;">
  			侧边栏
  		</div>
  	</template>
  	<template #north>
  		<div style="height: 100%;width: 100%;background: #7cbce9;color: white;display: flex;justify-content: space-around;align-items: center;">
  			北
  		</div>
  	</template>
  	<template #west>
  		<div style="height: 100%;width: 100%;background: #0f8de9;color: white;display: flex;justify-content: space-around;align-items: center;">
  			西
  		</div>
  	</template>
  	<div style="display: flex;height: 100%;justify-content: space-around;align-items: center;">
  		中
  	</div>
  	<template #east>
  		<div style="height: 100%;width: 100%;background: #0f8de9;color: white;display: flex;justify-content: space-around;align-items: center;">
  			东
  		</div>
  	</template>
  	<template #south>
  		<div style="height: 100%;width: 100%;background: #7cbce9;color: white;display: flex;justify-content: space-around;align-items: center;">
  			南
  		</div>
  	</template>
  </Layout>
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
