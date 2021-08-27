<template>
	<div :class="classs" :style="styles" v-if="show" @click.stop.parent="handleClick">
		<slot></slot>
		<span class="close" v-if="closable" @click.stop.parent="handleClose"></span>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, ref } from 'vue';

type ColorType = PropType<'primary' | 'success' | 'warning' | 'error' | 'info' | 'disabled'>;

export default defineComponent({
	name: 'Tag',
	props: {
		type: {
			type: String as ColorType,
			validator: (val: string) => {
				if (val != '') {
					return ['primary', 'success', 'warning', 'error', 'info', 'disabled'].includes(val);
				}
				return true;
			}
		},
		closable: {
			type: Boolean,
			default: false
		},
		plain: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		bgColor: {
			type: String
		},
		color: {
			type: String
		}
	},
	emits: ['click', 'close'],
	setup(props, ctx) {
		const show = ref(true);

		const type = toRef(props, 'type').value;
		const closable = toRef(props, 'closable').value;
		const plain = toRef(props, 'plain').value;
		const disabled = toRef(props, 'disabled').value;

		const classs = computed(() => {
			let classs = ['e-tag'];
			classs.push(type ? `e-tag-${type}` : 'e-tag-default');
			classs.push(closable ? `e-tag-closable` : '');
			classs.push(plain ? `e-tag-plain` : '');
			classs.push(disabled ? `e-tag-disabled` : '');
			return classs;
		});

		const styles = computed(() => {
			let styles = {};
			if (props.plain) {
				styles.color = props.bgColor || '';
			} else {
				styles.background = props.bgColor || '';
				styles.color = props.color || '';
			}
			styles.border = `1px solid ${props.bgColor}`;

			return styles;
		});

		const handleClick = evt => {
			if(disabled || type=='disabled') return false;
			ctx.emit('click', evt);
		};
		const handleClose = (evt) => {
			if(disabled || type=='disabled') return false;
			show.value = false;
			ctx.emit('close', evt);
		};

		return {
			show,
			classs,
			styles,
			handleClick,
			handleClose
		};
	}
});
</script>

<style>
@import url('../../styles/tag.css');
</style>
