<template>
	<transition name="move-up">
		<div v-if="visible"
			:class="[
				'e-prompt',
				`e-prompt-${type}`,
				{
					'e-prompt-with-desc': hasDesc
				}
			]"
		>
			<div class="e-prompt-icon" v-if="icon != false || hasIcon">
				<slot name="icon">
					<Icon :name="icon.name" :color="icon.color" :size="icon.size"></Icon>
				</slot>
			</div>
			<div class="e-prompt-container">
				<div class="e-prompt-message"><slot></slot></div>
				<div class="e-prompt-desc" v-if="hasDesc"><slot name="desc"></slot></div>
			</div>
			<div class="e-prompt-close" v-if="closable || hasClode" @click="handleClose">
				<slot name="close">
					<Icon name="ios-close" color="#999" :size="22"></Icon>
				</slot>
			</div>
		</div>
	</transition>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
	name: 'Prompt',
	props: {
		type: {
			type: String,
			default: 'info'
		},
		icon: {
			type: Boolean,
			default: false
		},
		closable: {
			type: Boolean,
			default: false
		}
	},
	emits:['close'],
	setup(props, ctx) {
		const visible = ref(true)
		const icon = computed(() => {
			let hasDesc = !!ctx.slots.desc;
			let color = {
				info: '#2d8cf0',
				success: '#19be6b',
				error: '#ed4014',
				warning: '#f90'
			};
			let name = {
				info: hasDesc ? 'ios-information-circle-outline' : 'ios-information-circle',
				success: hasDesc ? 'ios-checkmark-circle-outline' : 'ios-checkmark-circle',
				error: hasDesc ? 'ios-close-circle-outline' : 'ios-close-circle',
				warning: hasDesc ? 'ios-alert-outline' : 'ios-alert'
			};
			let size = hasDesc ? 28 : 16;
			if (props.icon != false) {
				return {
					name: name[props.type],
					color: color[props.type],
					size: size
				};
			}
			return false;
		});
		
		const handleClose = ()=>{
			visible.value = false;
			ctx.emit('close')
		}

		return {
			visible,
			icon,
			hasDesc: !!ctx.slots.desc,
			hasIcon: !!ctx.slots.icon,
			hasClode: !!ctx.slots.close,
			handleClose
		};
	}
});
</script>

<style>
@import url('../../styles/prompt.css');
</style>
