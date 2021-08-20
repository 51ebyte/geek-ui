<template>
	<div ref="affixRef" :class="['e-affix',{
		'e-affix-fixed':affix
	}]" :style="styles.default">
		<slot></slot>{{styles.default}}
		<div class="aria" :style="styles.aria" v-if="affix"></div>
	</div>
</template>

<script>
import { defineComponent, ref, toRef, onMounted } from 'vue';
import util from '../../lib/util.js';
export default defineComponent({
	name: 'Affix',
	props: {
		top: {
			type: Number,
			default: 0
		},
		bottom: {
			type: Number,
			default: 0
		},
		right: {
			type: [Number, Boolean],
			default: 0
		}
	},
	emits: ['change'],
	setup(props, ctx) {
		const affix = ref(false);
		const showAria = ref(false);
		const affixRef = ref(null);
		const offsetTop = toRef(props, 'top').value;
		const offsetBottom = toRef(props, 'bottom').value;
		const offsetRight = toRef(props, 'right').value;

		const styles = ref({ default: {}, aria: {} });

		const offset = element => {
			const rect = element.getBoundingClientRect();

			const scrollTop = document.documentElement.scrollTop;
			const scrollLeft = document.documentElement.scrollLeft;

			const body = window.document.body;
			const clientTop = body.clientTop || 0;
			const clientLeft = body.clientLeft || 0;

			return {
				top: rect.top + scrollTop - clientTop,
				left: rect.left + scrollLeft - clientLeft
			};
		};

		const handleScrollTop = () => {
			const scrollTop = document.documentElement.scrollTop;
			const elOffset = offset(affixRef.value);

			if (offsetTop > 0 && elOffset.top - offsetTop < scrollTop && !affix.value) {
				affix.value = true;
				styles.value.default = {
					top: `${offsetTop}px`,
					width: `${affixRef.value.offsetWidth}px`
				};
				if (offsetRight > 0 || offsetRight === true) {
					let right = typeof offsetRight == 'boolean' ? 0 : offsetRight;
					styles.value.default['right'] = `${right || 0}px`;
				} else {
					styles.value.default['left'] = `${elOffset.left}px`;
				}
				styles.value.aria = {
					width: `${affixRef.value.offsetWidth}px`,
					height: `${affixRef.value.offsetHeight}px`
				};
			} else if (offsetTop > 0 && elOffset.top - offsetTop > scrollTop && affix.value) {
				affix.value = false;
				styles.value.default = {};
				styles.value.aria = {};
			}
			ctx.emit('change', affix.value);
		};

		const handleScrollBottom = () => {
			const scrollTop = document.documentElement.scrollTop;
			const elOffset = offset(affixRef.value);
			const windowHeight = window.innerHeight;
			if (offsetBottom > 0 && elOffset.top + offsetBottom + affixRef.value.offsetHeight > scrollTop + windowHeight && !affix.value) {
				affix.value = true;
				styles.value.default = {
					bottom: `${offsetBottom}px`,
					width: `${affixRef.value.offsetWidth}px`
				};
				if (offsetRight > 0 || offsetRight === true) {
					if(offsetRight == 'boolean'){
						styles.value.default['right'] = `${0}px`;
					}else{
						styles.value.default['right'] = `${offsetRight}px`;
					}
				} else {
					styles.value.default['left'] = `${elOffset.left}px`;
				}
				styles.value.aria = {
					width: `${affixRef.value.offsetWidth}px`,
					height: `${affixRef.value.offsetHeight}px`
				};
			} else if (offsetBottom > 0 && elOffset.top + offsetBottom + affixRef.value.offsetHeight < scrollTop + windowHeight && affix.value) {
				affix.value = false;
				styles.value.default = {};
				styles.value.aria = {};
			}
			ctx.emit('change', affix.value);
		};

		const handleScroll = () => {
			if (offsetBottom > 0) {
				handleScrollBottom();
			} else if (offsetTop > 0) {
				handleScrollTop();
			}
		};

		onMounted(() => {
			handleScroll();
		});

		util.addListener(window, 'scroll', handleScroll, false);
		util.addListener(window, 'resize', handleScroll, false);

		return {
			affix,
			affixRef,
			handleScroll,
			styles
		};
	}
});
</script>

<style>
@import url('../../styles/affix.css');
</style>
