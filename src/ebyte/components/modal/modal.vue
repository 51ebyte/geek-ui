<template>
	<teleport to="body">
		<div class="e-modal" v-show="show">
			<div class="e-modal-mask" v-if="mask" @click="handleClickMask"></div>
			<div :class="['e-modal-container',{
				'e-modal-container-maximize':isMaximize,
				'e-modal-container-minimize':isMinimize,
			}]" :style="{
				width:`${width}px`,
				maxHeight:`${maxHeight}px`,
				minHeight:`${minHeight}px`
			}">
				<div :class="['e-modal-header',{
					'e-modal-header-custom':hasHeader
				}]" v-if="hasHeader || title">
					<div class="e-modal-header-title">
						<slot name="header">{{ title }}</slot>
					</div>
					<div class="e-modal-header-extra" v-if="closable">
						<Icon name="ios-remove" :size="32" @click.stop.parent="handleMinimize"></Icon>
						<Icon name="ios-crop" :size="24" @click.stop.parent="handleMaximize"></Icon>
						<Icon name="ios-close" :size="32" @click.stop.parent="handleClose"></Icon>
					</div>
				</div>
				<template v-else>
					<div class="e-modal-close" v-if="closable">
						<Icon name="md-close" :size="20" color="#ffffff" @click.stop.parent="handleClose"></Icon>
					</div>
				</template>
				<div class="e-modal-body">
					<slot></slot>
				</div>
				<div :class="['e-modal-footer',{
					'e-modal-footer-custom':hasFooter
				}]" v-if="!footerHide">
					<slot name="footer">
						<div class="e-flex e-col-center e-row-right">
							<Button style="margin-right: 10px;" @click="handleCancel">{{ cancelText }}</Button>
							<Button :type="confirmType" @click="handleConfirm">
								<template v-if="!confirmLoading || !confirmLoadingIcon">{{confirmText}}</template>
								<template v-else>
									<Icon name="ios-loading" loading :size="16" :title="confirmText"></Icon>
								</template>
							</Button>
						</div>
					</slot>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script>
import { defineComponent, watch, ref } from 'vue';
import { UPDATE_MODEL_VALUE_EVENT } from '../../lib/constants.js';
export default defineComponent({
	name: 'Modal',
	props: {
		modelValue: {
			type: Boolean,
			default: false
		},
		title: {
			type: String
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
			type: Number,
			default: 680
		},
		maxHeight: {
			type: Number		,
		},
		minHeight: {
			type: Number,
			default: 480
		},
		zIndex: {
			type: Number
		},
		confirmText: {
			type: String,
			default: '确 认'
		},
		confirmType: {
			type: String,
			default: 'primary'
		},
		confirmLoading:{
			type: Boolean,
			default: true
		},
		cancelText: {
			type: String,
			default: '取 消'
		},
		footerHide: {
			type: Boolean,
			default: false
		},
		maxmin:{
			type: Boolean,
			default: true
		}
	},
	emits: [UPDATE_MODEL_VALUE_EVENT, 'onConfirm', 'onCancal','onClose'],
	setup(props, ctx) {
		const show = ref(props.modelValue);
		const isMaximize = ref(false)
		const isMinimize = ref(false)
		const confirmLoadingIcon = ref(false)

		watch(() => props.modelValue,
			n => {
				show.value = n;
				if(!n){
					confirmLoadingIcon.value = false;
				}
			}
		);
		
		const handleMinimize = () =>{
			isMinimize.value = true;
			isMaximize.value = false;
		}
		
		const handleMaximize = () =>{
			isMaximize.value = isMinimize.value?false:!isMaximize.value;
			isMinimize.value = false;
		}

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

		const handleConfirm = () => {
			confirmLoadingIcon.value = true;
			ctx.emit('onConfirm');
		};

		const handleCancel = () => {
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, false);
			ctx.emit('onCancal');
		};

		return {
			show,
			hasHeader: !!ctx.slots.header,
			hasFooter: !!ctx.slots.footer,
			isMinimize,
			isMaximize,
			confirmLoadingIcon,
			handleMinimize,
			handleMaximize,
			handleClose,
			handleClickMask,
			handleConfirm,
			handleCancel
		};
	}
});
</script>

<style>
@import url('../../styles/modal.css');
</style>
