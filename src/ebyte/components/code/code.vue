<template>
	<pre :class="classs" v-html="html"></pre>
</template>

<script lang="ts">
import { toRef } from 'vue';
export default {
	name: 'Code',
	data() {
		return {
			html: ''
		};
	},
	props: {
		title: {
			type: String,
			default: '&lt;/&gt;'
		},
		height: {
			type: Number,
			height: 300
		},
		skin: {
			type: String
		},
		code: {
			type: String,
			required: true
		}
	},
	setup(props, context) {
		
		var code = toRef(props, 'code').value;
		var title = toRef(props, 'title').value;
		var skin = toRef(props, 'skin').value;
		var height = toRef(props, 'height').value;
		code = code.replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;');
		code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		code = code.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
		code = code.replace(/[\r\t\n]+/g, '</li><li>');
		code = '<h3 class="e-code-h3">' + title + '<a href="javascript:;">code</a></h3><ol class="e-code-ol" style="max-height:' + height + 'px;"><li>' + code + '</li></ol>';
		
		let classs = ['e-code'];
		if (skin) {
			classs.push('e-code-' + skin);
		}
		return {
			html: code,
			classs
		};
	},
	watch:{
		modelValue(o,n){
			console.log(n)
		}
	}
};
</script>

<style>
@import url("../../styles/code.css");
</style>
