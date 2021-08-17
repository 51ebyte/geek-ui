<template>
	<transition v-on="on"><slot></slot></transition>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import {util} from '../../../lib/index.js';

export default defineComponent({
	name: 'ETransition',
	setup() {
		return {
			on: {
				//进入之前
				beforeEnter(el) {
					util.addClass(el, 'collapse');
					if (!el.dataset) el.dataset = {};

					el.dataset.oldPaddingTop = el.style.paddingTop;
					el.dataset.oldPaddingBottom = el.style.paddingBottom;

					el.style.height = '0';
					el.style.paddingTop = 0;
					el.style.paddingBottom = 0;
				},

				enter(el) {
					el.dataset.oldOverflow = el.style.overflow;
					if (el.scrollHeight !== 0) {
						el.style.height = el.scrollHeight + 'px';
						el.style.paddingTop = el.dataset.oldPaddingTop;
						el.style.paddingBottom = el.dataset.oldPaddingBottom;
					} else {
						el.style.height = '';
						el.style.paddingTop = el.dataset.oldPaddingTop;
						el.style.paddingBottom = el.dataset.oldPaddingBottom;
					}

					el.style.overflow = 'hidden';
				},
				//进入之后
				afterEnter(el) {
					util.removeClass(el, 'collapse');
					el.style.height = '';
					el.style.overflow = el.dataset.oldOverflow;
				},

				//离开之前
				beforeLeave(el) {
					if (!el.dataset) el.dataset = {};
					el.dataset.oldPaddingTop = el.style.paddingTop;
					el.dataset.oldPaddingBottom = el.style.paddingBottom;
					el.dataset.oldOverflow = el.style.overflow;

					el.style.height = el.scrollHeight + 'px';
					el.style.overflow = 'hidden';
				},

				leave(el) {
					if (el.scrollHeight !== 0) {
						util.addClass(el, 'collapse');
						el.style.transitionProperty = 'height';
						el.style.height = 0;
						el.style.paddingTop = 0;
						el.style.paddingBottom = 0;
					}
				},
				//离开之后
				afterLeave(el) {
					util.removeClass(el, 'collapse');
					el.style.height = '';
					el.style.overflow = el.dataset.oldOverflow;
					el.style.paddingTop = el.dataset.oldPaddingTop;
					el.style.paddingBottom = el.dataset.oldPaddingBottom;
				}
			}
		};
	}
});
</script>
<style>
	.collapse {
		-webkit-transition: .3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out;
		transition: .3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out
	}
	
	.collapse-horizontal {
		-webkit-transition: .3s width ease-in-out, .3s padding-left ease-in-out, .3s padding-right ease-in-out;
		transition: .3s width ease-in-out, .3s padding-left ease-in-out, .3s padding-right ease-in-out
	}
	
</style>
