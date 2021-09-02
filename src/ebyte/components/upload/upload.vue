<template>
	<div :class="['e-upload',{
		'e-upload-card':option.list=='card',
		'e-upload-disabled':option.disabled
	}]">
		<input ref="inputRef" type="file" :accept="accept || options.accept" :multiple="multiple || options.multiple" @change="handleFileChange" />
		<div class="e-upload-action" @click="handleFileSelect">
			<slot>
				<div class="card" v-if="option.list=='card'"></div>
				<Button type='primary' v-else>上传文件</Button>
			</slot>
		</div>
		
		<ul :class="['e-upload-file-list',{
			'e-upload-file-list-card':option.list=='card'
		}]" v-if="option.list">
			<li v-for="(file,index) in files" v-bind:key="index" class="e-upload-file-item">
				<slot name="list" :file="file">
					<template v-if="option.list=='card'">
						<div class="loading" v-if="fileState[index]=='todo'">
							<Icon name="ios-information-circle-outline" class="icon-info" />
						</div>
						<div class="loading" v-if="fileState[index]=='loading'">
							<Icon name="md-refresh" class="icon-loading" />
						</div>
						<div class="error" v-if="fileState[index]=='error'">
							<Icon name="ios-information-circle" color="#ff0000" />
						</div>
						<div class="success" v-if="fileState[index]=='success'">
							<Icon name="md-checkmark-circle-outline" class='icon-success' />
						</div>
						<render-v-node :file="file"></render-v-node>
						<div class="hover" v-if="fileState[index]=='success'">
							<Icon name='ios-trash-outline' :size="24" color="white" @click="handleDelete(file,index)"></Icon>
						</div>
					</template>
					<template v-else>
						<span class="name">{{file.name}}</span>
						<div :class="['e-flex','e-col-center',{
							'hover':fileState[index]=='success'
						}]">
							<Icon name="ios-information-circle-outline" class="icon-info" v-if='fileState[index]=="todo"' />
							<Icon name="md-refresh" class="icon-loading" v-if='fileState[index]=="loading"' />
							<Icon name="md-checkmark-circle-outline" class='icon-success' v-if='fileState[index]=="success"' />
							<Icon name="ios-information-circle" color="#ff0000" class="icon-info" v-if='fileState[index]=="error"' />
							<Icon name="md-close" class='icon-close' v-if='fileState[index]=="success"' @click="handleDelete(item,index)"/>
						</div>
					</template>
				</slot>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, computed, reactive,h } from 'vue';
import RenderVNode from './render'
import util from '../../lib/util.js'
export default defineComponent({
	name: 'Upload',
	components:{
		RenderVNode
	},
	props: {
		url: {
			type: String,
			required: true
		},
		type: {
			type: String
		},
		name: {
			type: String
		},
		size: {
			type: Number
		},
		headers: {
			type: Object
		},
		multiple: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		data: {
			type: Object
		},
		withCredentials: {
			type: Boolean
		},
		files: {
			type: Array,
			default(){
				return [];
			}
		},
		list: {
			type: [Boolean, String]
		},
		accept: {
			type: String
		},
		autoUpload: {
			type: Boolean,
			default: true
		},
		format: {
			type: Array
		},
		before: {
			type: Function
		},
		error: {
			type: Function
		},
		progress: {
			type: Function
		},
		complete: {
			type: Function
		},
		remove: {
			type: Function
		},
		options: {
			type: Object,
			default(){
				return {}
			}
		}
	},
	setup(props, ctx) {
		const inputRef = ref();
		const url = toRef(props, 'url').value;
		const options = reactive(props.options);
		const files = ref(props.files);
		const fileState = ref([])
		
		const option = computed(() => {
			return {
				url: url,
				type: options.type || props.type || 'select',
				name: options.name || props.name || 'file',
				size: options.size || props.size || 0,
				data: options.data || props.data || {},
				accept: options.accept || props.accept || '',
				format: options.format || props.format || [],
				headers: options.headers || props.headers || {},
				list: options.list != undefined ? options.list : props.list,
				multiple: options.multiple != undefined ? options.multiple : props.multiple,
				autoUpload: options.autoUpload != undefined ? options.autoUpload : props.autoUpload,
				withCredentials: options.withCredentials != undefined ? options.withCredentials : props.withCredentials
			};
		});
		
		const handleState = ()=>{
			files.value.forEach((file,index)=>{
				fileState.value[index] = file.state
			})
		}
		
		const handleFileSelect = () => {
			if(option.disabled) return false;
			inputRef.value.value = null;
			inputRef.value.click();
		};

		const handleFileChange = e => {
			const fileList = Array.prototype.slice.call(e.target.files);
			if (!fileList) return;
			const maxSize = option.value.size * 1024;
			let fileSizeError = [];
			let fileFormatError = [];
			fileList.forEach((file)=>{
				let fileExt = file.name.substr(file.name.lastIndexOf('.') + 1);
				if (option.value.format.length>0 && !option.value.format.includes(fileExt)) {
					fileFormatError.push(file);
				}else if (file.size > maxSize && maxSize>0) {
					fileSizeError.push(file);
				} else {
					file.state = 'todo'
					files.value.push(file)
				}
			})
			if (fileSizeError.length > 0) {
				if(typeof props.error=='function'){
					props.error(fileSizeError, 'size', `文件大小不能超过${maxSize / 1024}kb`);
				}
				return;
			}
			if (fileFormatError.length > 0) {
				if(typeof props.error=='function'){
					props.error(fileFormatError, 'format', `文件格式不正确`);
				}
				return;
			}
			handleState();

			if (option.value.autoUpload) {
				if (typeof props.before == 'function') {
					props.before(files).then(() => {
						fileList.forEach(file => {
							handleUpload(file, option.value, {
								error(file, err, xhr) {
									if(typeof props.error=='function'){
										props.error(file, err, xhr)
									}
								},
								progress(file,e) {
									if(typeof props.progress=='function'){
										props.progress(file, e)
									}
								},
								complete(file, response) {
									if(typeof props.complete=='function'){
										props.complete(file, response)
									}
								}
							});
						});
					});
				} else {
					fileList.forEach((file,index) => {
						file.state = 'loading'
						handleState();
						
						handleUpload(file, option.value, {
							error(file, err, xhr) {
								file.state = 'error'
								handleState();
								if(typeof props.error=='function'){
									props.error(file, err, xhr)
								}
							},
							progress(file,e) {
								file.state = 'loading'
								handleState();
								if(typeof props.progress=='function'){
									props.progress(file, e)
								}
							},
							complete(file, response) {
								file.state = 'success'
								handleState();
								if(typeof props.complete=='function'){
									props.complete(file, response)
								}
							}
						});
					});
				}
			}
		};

		const handleUpload = (file, option, callback) => {
			if (typeof XMLHttpRequest === 'undefined') {
				return;
			}
			const xhr = new XMLHttpRequest();
			const action = option.url;

			if (xhr.upload) {
				xhr.upload.onprogress = function progress(e) {
					if (e.total > 0) {
						e.percent = (e.loaded / e.total) * 100;
					}
					callback.progress(file, e);
				};
			}
			const formData = new FormData();

			if (option.data) {
				Object.keys(option.data).map(key => {
					formData.append(key, option.data[key]);
				});
			}

			formData.append(option.name, file);

			xhr.onerror = function error(err) {
				callback.error(file, err, xhr);
			};

			xhr.onload = function onload() {
				let response = xhr.responseText || xhr.response;
				if (!response) {
					return response;
				}
				response = response ? JSON.parse(response) : {};
				if (xhr.status < 200 || xhr.status >= 300) {
					file.state='error'
					const msg = `Fail to post ${action} ${xhr.status}'`;
					const err = new Error(msg);
					err.status = xhr.status;
					err.method = 'POST';
					err.url = action;
					err.response = response;
					callback.error(file, err, xhr);
					return;
				}
				callback.complete(file, response);
			};

			xhr.open('post', action, true);

			if (option.withCredentials && 'withCredentials' in xhr) {
				xhr.withCredentials = true;
			}
			const headers = option.headers || {};
			for (let item in headers) {
				if (headers.hasOwnProperty(item) && headers[item] !== null) {
					xhr.setRequestHeader(item, headers[item]);
				}
			}
			xhr.send(formData);
		};
		
		const handleDelete =(file,index)=>{
			if (typeof props.remove == 'function') {
				props.remove(file).then(() => {
					files.value.splice(index,1)
				})
			}else{
				files.value.splice(index,1)
			}
		}

		return {
			inputRef,
			files,
			fileState,
			option,
			handleState,
			handleFileSelect,
			handleFileChange,
			handleUpload,
			handleDelete
		};
	},
	methods: {
		upload(callback) {
			if (this.files.length <= 0) {
				if (typeof callback.error == 'function') {
					callback.error('没有待上传的文件');
					return false;
				}
				if (typeof this.error == 'function') {
					this.error(null, 'empty', '没有待上传的文件');
					return false;
				}
			}
			if (typeof callback.before == 'function') {
				callback.before(this.files).then(() => {});
				return false;
			}
			if (typeof this.before == 'function') {
				this.before(this.files).then(() => {});
				return false;
			}
			let that = this;
			this.files.forEach((file,index)=>{
				that.handleUpload(file, that.option, {
					error(file, err, xhr) {
						file.state = 'error'
						that.handleState();
						if(typeof callback.error == 'function'){
							callback.error(file, err, xhr)
						}
						if (typeof that.error == 'function') {
							that.error(file, err, xhr);
							return false;
						}
					},
					progress(file, e) {
						file.state = 'loading'
						that.handleState();
						if(typeof callback.progress == 'function'){
							callback.progress(file, e);
							return false;
						}
						if (typeof that.progress == 'function') {
							that.progress(file, e);
							return false;
						}
					},
					complete(file, response) {
						file.state = 'success'
						that.handleState();
						if(typeof callback.complete == 'function'){
							callback.complete(file, response);
							return false;
						}
						if (typeof that.complete == 'function') {
							that.complete(file, response);
							return false;
						}
					}
				});
			})
		}
	}
});
</script>

<style>
@import url('../../styles/upload.css');
</style>
