<template>
	<div :class="classs.default" :style="styles.default"
      @mouseenter.native="handleMouseEnter" 
      @mouseleave.native="handleMouseLeave">
		<template v-if="src">
			<img :src="src" :style="styles.image" @load="imgLoading" @error="imgLoadErr" />
			<template v-if="hasLoadError">
				<slot name="error"><span class="error"></span></slot>
			</template>
			<template v-if="hasLoading">
				<slot name="loading"><span class="loading"></span></slot>
			</template>
			<template v-if="updateValue">
				<div class="update" v-show="updateShow" :style="styles.update" @click="handleClickUpdate">
					<input type="file" accept="image/*" ref="inputFileRef" @change="handleFileChange" />
					<slot name="update">
            <span class="text" :style="styles.text">{{ updateValue }}</span>
          </slot>
				</div>
			</template>
		</template>
		<template v-else>
			<slot><Icon :name="iconOption.name" :size="iconOption.size" :color="iconOption.color"></Icon></slot>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, ref, watch } from 'vue';

export default defineComponent({
	name: 'Avatar',
	props: {
		circle: {
			type: [Boolean, String, Number],
			default: 5
		},
		src: {
			type: String
		},
		size: {
			type: [Number, String],
			validator: val => {
				if (val != '' && typeof val == 'string') {
					return ['xl', 'lg', 'md', 'sm'].includes(val);
				}
				return true;
			}
		},
		width: {
			type: Number
		},
		height: {
			type: Number
		},
		icon: {
			type: [String, Object]
		},
		background: {
			type: String
		},
		fit: {
			type: String,
			validator: val => {
				if (val != '' && typeof val == 'string') {
					return ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(val);
				}
				return true;
			}
		},
		update: {
			type: [Boolean, String,Object],
			default: false
		},
		upload: {
			type: [Object, String],
			default: () => {
				return {};
			}
		}
	},
	emits: ['error'],
	setup(props, ctx) {
		const imgSrc = toRef(props, 'src');

		const hasLoading = ref(true);
		const hasLoadError = ref(false);
		const update = toRef(props, 'update').value;
    const updateShow = ref(true);
		const iconOption = ref({ name: 'md-person', size: 16, color: 'white' });
		const inputFileRef = ref(null);

		const upload = computed(() => {
			const upload = {
				url: '',
				name: 'avatar',
				size: 200,
				headers: {},
				withCredentials: false,
				complete: () => {},
				error: () => {},
				progress: () => {}
			};
			if (typeof props.upload == 'string') {
				upload.url = props.upload;
				return upload;
			} else if (typeof props.upload == 'object') {
				return Object.assign(upload, props.upload);
			}
		});

		watch(imgSrc, () => {
			hasLoadError.value = false;
		});

		const classs = computed(() => {
			let classs = { default: ['e-avatar'], image: {} };
			if (props.src) {
				classs.default.push('e-avatar-image');
			}
      if (props.circle==true || props.circle>50) {
        classs.default.push('e-avatar-circle');
      }
			if (props.src && hasLoading.value) {
				classs.default.push('e-avatar-image-loading');
			}

			if (props.src && hasLoadError.value) {
				classs.default.push('e-avatar-image-loading-error');
			}
			if (typeof props.size == 'string') {
				classs.default.push('e-avatar-' + props.size);
			}
			if (!!ctx.slots.default) {
				classs.default.push('e-avatar-text');
			}
			return classs;
		});

		const styles = computed(() => {
			let styles = { default: {}, image: {},update:{},text:{} };
			if (typeof props.circle == 'boolean') {
        styles.default['border-radius'] = (props.circle?'50%':0);
			} else if (typeof props.circle == 'number') {
				styles.default['border-radius'] = props.circle + 'px';
			} else if (typeof props.circle == 'string') {
				styles.default['border-radius'] = props.circle;
			}

			if (['xl', 'lg', 'md', 'sm'].includes(props.size)) {
				let size = { xl: 64, lg: 48, md: 24, sm: 16 };
				styles.default['width'] = size[props.size] + 'px';
				styles.default['height'] = size[props.size] + 'px';
				if (!props.src) {
					styles.default['line-height'] = size[props.size] - 4 + 'px';
				}
				if (!!ctx.slots.default) {
					styles.default['line-height'] = size[props.size] + 'px';
					styles.default['font-size'] = size[props.size] / 4 + 'px';
				}
				iconOption.value.size = size[props.size] / 2;
			} else if (typeof props.size == 'number') {
				styles.default['width'] = props.size + 'px';
				styles.default['height'] = props.size + 'px';
				if (!props.src) {
					styles.default['line-height'] = props.size - 4 + 'px';
				}
				if (!!ctx.slots.default) {
					if (!props.src) {
						styles.default['line-height'] = props.size + 'px';
					}
					styles.default['font-size'] = props.size / 4 + 'px';
				}
				iconOption.value.size = props.size / 2;
			}

			if (props.width) {
				styles.default['width'] = props.width + 'px';
			}

			if (props.height) {
				styles.default['height'] = props.height + 'px';
				styles.default['line-height'] = props.size - 4 + 'px';
				if (!!ctx.slots.default) {
					styles.default['line-height'] = props.height + 'px';
					styles.default['font-size'] = props.height / 4 + 'px';
				}
			}

			if (props.background) {
				styles.default['background'] = props.background;
			}

			if (props.fit) {
				styles.image['object-fit'] = props.fit;
			}
      
      if(typeof update == 'object'){
        styles.update = update.style || {}
        if(update.style && update.style.height){
          styles.text = {
            position: 'absolute',
            transform: 'translateY(-50%)'
          }
          if (props.circle==true || props.circle>50) {
            styles.text['top']='calc(50% - 14px)'
          }else{
            styles.text['top']='calc(50% - 5px)'
          }
        }
      }

			return styles;
		});

		if (props.icon && typeof props.icon == 'string') {
			iconOption.value.name = props.icon;
		}
		if (props.icon && typeof props.icon == 'object') {
			if (props.icon.name) {
				iconOption.value.name = props.icon.name;
			}
			if (props.icon.size) {
				iconOption.value.size = props.icon.size;
			}
			if (props.icon.color) {
				iconOption.value.color = props.icon.color;
			}
		}

		const updateValue = computed(() => {
			if (typeof update == 'boolean') {
				return update ? '修改' : false;
			}
      if (typeof update == 'object'){
        if(update.trigger && update.trigger == 'hover'){
          updateShow.value = false;
        }
        return update.text || '修改'
      }
			return update;
		});

		const imgLoading = evt => {
			hasLoading.value = false;
		};

		const imgLoadErr = evt => {
			hasLoading.value = false;
			hasLoadError.value = true;
			ctx.emit('error', evt);
		};

		const handleClickUpdate = () => {
			inputFileRef.value.click();
		};

		const handleFileChange = e => {
			const files = Array.prototype.slice.call(e.target.files);
			const file = files[0];
			const maxSize = upload.value.size * 1024;
			if (file.size > maxSize) {
				upload.value.error('上传头像不能大于' + upload.value.size + 'kb');
				return;
			}
			if (!/\.(jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
				upload.value.error('上传文件不是有效图片文件');
				return;
			}

			if (typeof upload.value.before == 'function') {
				upload.value.before(file).then(() => {
					handleUpload(file);
				});
			} else {
				handleUpload(file);
			}
		};
    
    const handleMouseEnter = ()=>{
      if(update.trigger && update.trigger == 'hover' && !updateShow.value){
        updateShow.value = true;
      }
    }
    
    const handleMouseLeave = ()=>{
      if(update.trigger && update.trigger == 'hover' && updateShow.value){
        updateShow.value = false;
      }
    }

		const handleUpload = (file: File) => {
			if (typeof XMLHttpRequest === 'undefined') {
				return;
			}
			const xhr = new XMLHttpRequest();
			const action = upload.value.url;

			if (xhr.upload) {
				xhr.upload.onprogress = function progress(e) {
					if (e.total > 0) {
						e.percent = (e.loaded / e.total) * 100;
					}
					upload.value.progress(file, e);
				};
			}
			const formData = new FormData();

			if (upload.value.data) {
				Object.keys(upload.value.data).map(key => {
					formData.append(key, upload.value.data[key]);
				});
			}

			formData.append(upload.value.name, file);

			xhr.onerror = function error(err) {
				upload.value.error(file, err, xhr);
			};

			xhr.onload = function onload() {
				console.log(xhr);
				let response = xhr.responseText || xhr.response;
				if (!response) {
					return response;
				}
				response = response ? JSON.parse(response) : {};
				if (xhr.status < 200 || xhr.status >= 300) {
					const msg = `Fail to post ${action} ${xhr.status}'`;
					const err = new Error(msg);
					err.status = xhr.status;
					err.method = 'POST';
					err.url = action;
					err.response = response;
					upload.value.error(file, err, xhr);
					return;
				}
				upload.value.complete(file, response);
			};

			xhr.open('post', action, true);

			if (upload.value.withCredentials && 'withCredentials' in xhr) {
				xhr.withCredentials = true;
			}
			const headers = upload.value.headers || {};
			for (let item in headers) {
				if (headers.hasOwnProperty(item) && headers[item] !== null) {
					xhr.setRequestHeader(item, headers[item]);
				}
			}
			xhr.send(formData);
		};

		return {
			styles,
			classs,
			hasLoading,
			hasLoadError,
			iconOption,
			imgLoading,
			imgLoadErr,
			updateValue,
      updateShow,
			inputFileRef,
			handleClickUpdate,
			handleFileChange,
      handleMouseEnter,
      handleMouseLeave
		};
	}
});
</script>

<style>
@import url('../../styles/avatar.css');
</style>
