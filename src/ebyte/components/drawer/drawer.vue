<template>
	<teleport to="body">
		<div class="e-drawer">
			<transition name="fade">
				<div class="e-drawer-mask" v-show="show" v-if="mask" @click="handleClickMask"></div>
			</transition>
			<transition :name="transitionName">
				<div  v-show="show"
					:class="['e-drawer-container', `e-drawer-${placement}`]"
					:style="{
						width: typeof width=='number'?`${width}px`:width,
						height: typeof height=='number'?`${height}px`:height
					}"
				>
					<div class="e-drawer-header">
						<slot name="header">
							<div class="e-modal-header-title">
								<slot name="title">{{ title }}</slot>
							</div>
							<div class="e-modal-header-extra">
								<Icon class="icon close" v-if="closable" name="md-close" :size="24" @click.stop.parent="handleClose"></Icon>
							</div>
						</slot>
					</div>
					<div class="e-drawer-body"><slot></slot></div>
				</div>
			</transition>
		</div>
	</teleport>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import { UPDATE_MODEL_VALUE_EVENT } from '../../lib/constants.js';
export default defineComponent({
	name: 'Drawer',
	props: {
		modelValue: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		placement: {
			type: String,
			default: 'right'
		},
		closable: {
			type: Boolean,
			default: true
		},
		mask: {
			type: Boolean,
			default: true
		},
		maskClosable: {
			type: Boolean,
			default: true
		},
		width: {
			type: [Number, String]
		},
		height: {
			type: [Number, String]
		}
	},
	emits: [UPDATE_MODEL_VALUE_EVENT, 'onConfirm', 'onCancal', 'onClose'],
	setup(props, ctx) {
		const show = ref(props.modelValue);

		watch(
			() => props.modelValue,
			n => {
				show.value = n;
			}
		);

		const transitionName = computed(() => {
			if (props.placement === 'left' || props.placement === 'right') {
				return `move-${props.placement}`;
			} else if (props.placement === 'top') {
				return 'move-up';
			} else {
				return 'move-down';
			}
		});

		const handleClose = () => {
			show.value = false;
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, false);
			ctx.emit('onClose');
		};

		const handleClickMask = () => {
			if (!props.maskClosable) return;
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, false);
			ctx.emit('onClose');
		};

		return {
			show,
			transitionName,
			handleClose,
			handleClickMask
		};
	}
});
</script>

<style>
@import url('../../styles/drawer.css');
</style>
