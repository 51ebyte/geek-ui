<template>
	<div class="e-layer" v-show="visible">
		<div class="e-layer-mask"></div>
		<div class="e-layer-container" ref="layerRef">
			<div class="e-layer-header">
				<div
					class="e-layer-header-title"
					v-darg="{
						target: '.e-layer-container'
					}"
				>
					<Render :render="title"></Render>
				</div>
				<div class="e-layer-header-extra">
					<Icon class="icon close" name="md-close" :size="24" @click="handleClose"></Icon>
				</div>
			</div>
			<div class="e-layer-body">
				<Render :render="content"></Render>
			</div>
			<div class="e-layer-footer">
				<template v-for="(btn, index) in btnArr">
					<a :class="['btn',btn.type?`btn-type-${btn.type}`:'']" @click="handleBtnClick($event,btn, index)">{{ btn.text }}</a>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import Icon from '../icon/icon.vue';
import Render from '../base/render.js';
import { defineComponent, h, ref, computed, nextTick, onMounted } from 'vue';
import darg from './../../directive/darg.js';
export default defineComponent({
	name: 'LayerBase',
	components: {
		Icon,
		Render
	},
	props: {
		title: {
			type: [String, Function],
			default: '信息'
		},
		content: {
			type: [String, Function, Object],
			default: ''
		},
		btn: {
			type: [String, Array],
			default:['确认','取消']
		},
		offset: {
			type: Array,
			default: ['center', 'center']
		},
		onBtnClick: {
			type: Function,
			default: () => {
				return () => {};
			}
		},
		onDestroy: {
			type: Function,
			default: () => {
				return () => {};
			}
		}
	},
	directives: {
		darg
	},
	emits:['destroy'],
	setup(props, ctx) {
		const layerRef = ref();
		const visible = ref(true)

		const btnArr = computed(() => {
			if (typeof props.btn == 'string') {
				return {
					text: props.btn,
					type: 'primary'
				};
			} else {
				let btns = [];
				for (let i in props.btn) {
					if (i == 0) {
						btns.push({
							text: typeof props.btn[i] == 'string' ? props.btn[i] : props.btn[i]['text'],
							type: typeof props.btn[i] == 'string' ? 'primary' : props.btn[i]['type']
						});
					} else {
						btns.push({
							text: typeof props.btn[i] == 'string' ? props.btn[i] : props.btn[i]['text'],
							type: typeof props.btn[i] == 'string' ? '' : props.btn[i]['type']
						});
					}
				}
				return btns;
			}
		});

		const handlePosition = () => {
			if(!layerRef.value) return false;
			if (typeof props.offset == 'object') {
				let top = props.offset[0] || 'center';
				let left = props.offset[1] || 'center';
				if (top == 'center') {
					let offsetTop = (document.body.clientHeight - layerRef.value.offsetHeight) / 2;
					layerRef.value.style.top = `${offsetTop}px`;
				} else {
					layerRef.value.style.top = typeof top == 'number' ? `${top}px` : top;
				}
				if (left == 'center') {
					let offsetLeft = (document.body.clientWidth - layerRef.value.offsetWidth) / 2;
					layerRef.value.style.left = `${offsetLeft}px`;
				} else {
					layerRef.value.style.top = typeof left == 'number' ? `${left}px` : left;
				}
			}else{
				let offsetTop = (document.body.clientHeight - layerRef.value.offsetHeight) / 2;
				layerRef.value.style.top = `${offsetTop}px`;
				let offsetLeft = (document.body.clientWidth - layerRef.value.offsetWidth) / 2;
				layerRef.value.style.left = `${offsetLeft}px`;
			}
		};

		onMounted(() => {
			visible.value = true;
			nextTick(() => {
				handlePosition();
			});
			window.onresize = () => {
				handlePosition();
			};
		});

		const handleBtnClick = (evt,btn, index) => {
			props.onBtnClick(index,evt,btn);
			ctx.emit('destroy')
		};
		
		const handleClose = () => {
			visible.value = false;
			ctx.emit('destroy')
		}

		return {
			visible,
			btnArr,
			layerRef,
			handleBtnClick,
			handleClose
		};
	}
});
</script>

<style>
@import url('../../styles/layer.css');
</style>
