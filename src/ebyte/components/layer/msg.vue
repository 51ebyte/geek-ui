<template>
	<div class="e-layer">
		<div class="e-layer-container e-layer-msg" ref="layerRef">
			<div class="e-layer-body">
				<Render :render="content"></Render>
			</div>
			<div class="e-layer-footer" :style="{
				padding: btnArr.length > 0 ? '' : 'unset'
			}">
				<template v-for="(btn, index) in btnArr">
					<a :class="['btn',btn.type?`btn-type-${btn.type}`:'']" @click="handleBtnClick($event,btn, index)">{{ btn.text }}</a>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import Icon from '../icon/font.vue';
import Render from '../base/render.js';
import { defineComponent, h, ref, computed, nextTick, onMounted } from 'vue';
export default defineComponent({
	name: 'LayerConfirm',
	components: {
		Icon,
		Render
	},
	props: {
		btn: {
			type: Array,
			default () {
				return [];
			}
		},
		duration: {
			type: Number,
			default: 3000
		},
		content: {
			type: String,
			default: 'text'
		},
		offset: {
			type: Array,
			default: ['center', 'center']
		},
		btnClick: {
			type: Function,
			default () {
				return () => {};
			}
		},
		onDestroy: {
			type: Function,
			default () {
				return () => {};
			}
		},
	},
	setup(props, ctx) {
		const layerRef = ref();

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
		
		if (props.duration > 0) {
			setTimeout(() => {
				ctx.emit('destory')
			}, props.duration)
		}

		onMounted(() => {
			nextTick(() => {
				handlePosition();
			});
			window.onresize = () => {
				handlePosition();
			};
		});

		const handleBtnClick = (index,btn,evt) => {
			props.btnClick(index, evt, btn);
			props.onDestroy();
		};

		return {
			btnArr,
			layerRef,
			handleBtnClick
		};
	}
});
</script>

<style>
@import url('../../styles/layer.css');
</style>
