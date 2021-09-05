import {
	h,
	watch,
	defineComponent,
	computed,
	ref
} from 'vue';

import util from '../../lib/util.js'
import Icon from '../icon/icon.vue'
export default defineComponent({
	name: 'TableRender',
	props: {
		file: [File,Object]
	},
	setup(props) {
		const file = ref(props.file)

		watch(() => props.file, (n) => {
			file.value = n;
			console.log(n.state)
		})

		const fileType = computed(() => {
			let isImage = /\.(jpg|jpeg|png|bmp|gif)$/.test(file.value.name.toLowerCase()) ? 'image' : false;
			let isExcel = /\.(xls|xlsx|csv)$/.test(file.value.name.toLowerCase()) ? 'excel' : false;
			let isWord = /\.(doc|docx)$/.test(file.value.name.toLowerCase()) ? 'word' : false;
			let isPPT = /\.(ppt|pptx)$/.test(file.value.name.toLowerCase()) ? 'ppt' : false;
			let isTxt = /\.(txt)$/.test(file.value.name.toLowerCase()) ? 'txt' : false;
			return isImage || isWord || isExcel || isPPT || isTxt;
		})

		return () => {
			if (util.isImage(file.value)) {
				let src = '';
				if(file.value instanceof File){
					try {
						src = URL.createObjectURL(file.value);
					} catch (err) {
						console.error('[Element Error][Upload]', err)
					}
				}else{
					src = file.value.url || file.value.src;
				}
				return h('div', {
					class: 'info'
				},[
					h('img', {
						src: src
					})
				])
			} else {
				return h('div', {
					class: 'info'
				}, [
					h('span', {
						class: 'icon'
					}, fileType.value),
					h('span', {
						class: 'text'
					}, file.value.name),
				])
			}
		};
	},
});
