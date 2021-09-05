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
					util.addClass(el, 'transition-drop');
					if (!el.dataset) el.dataset = {};
					el.style.height = '0';
				},

				enter(el) {
					el.dataset.oldOverflow = el.style.overflow;
					if (el.scrollHeight !== 0) {
						el.style.height = el.scrollHeight + 'px';
					} else {
						el.style.height = '';
					}

					el.style.overflow = 'hidden';
				},
				//进入之后
				afterEnter(el) {
					util.removeClass(el, 'transition-drop');
					el.style.height = '';
					el.style.overflow = el.dataset.oldOverflow;
				},

				//离开之前
				beforeLeave(el) {
					if (!el.dataset) el.dataset = {};
					el.dataset.oldOverflow = el.style.overflow;

					el.style.height = el.scrollHeight + 'px';
					el.style.overflow = 'hidden';
				},

				leave(el) {
					if (el.scrollHeight !== 0) {
						util.addClass(el, 'transition-drop');
						el.style.transitionProperty = 'height';
						el.style.height = 0;
						el.style.marginTop = 0;
						el.style.marginBottom = 0;
					}
				},
				//离开之后
				afterLeave(el) {
					util.removeClass(el, 'transition-drop');
					el.style.height = '';
					el.style.overflow = el.dataset.oldOverflow;
				}
			}
		};
	}
});
</script>
<style>
	.transition-drop {
		-webkit-transition: .3s height ease-in-out, .3s;
		transition: .3s height ease-in-out, .3s
	}
	
</style>
