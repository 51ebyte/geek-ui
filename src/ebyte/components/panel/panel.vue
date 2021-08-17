<template>
	<div :class="['e-panel', type ? 'e-panel-' + type : '', type == 'code' && skin ? 'e-panel-code-' + skin : '']" :style="styles.default">
		<div class="e-panel-header e-flex e-row-between" :style="styles.header" v-if="header" @click="handleToggle">
			<div class="e-panel-header-left">
				<slot class="e-panel-header" name="header">
					<Icon :name="icon" :title="title" :size="size" v-if="icon"></Icon>
					<template v-else>
						{{ title }}
					</template>
				</slot>
			</div>
			<div class="e-panel-header-right">
				<slot name="extra">
					<Icon name="ios-arrow-down" v-if="hasCollapse=='open'"></Icon>
					<Icon name="ios-arrow-forward" v-if="hasCollapse=='close'"></Icon>
				</slot>
			</div>
		</div>
		
		<template v-if="hasCollapse">
			<e-transition-folded>
				<div :class="['e-panel-collapse']" v-if="hasCollapse=='open'">
					<div class="e-panel-body" :style="styles.body"><slot></slot></div>
					<div class="e-panel-footer" :style="styles.footer" v-if="hasFooter"><slot name="footer"></slot></div>
				</div>
			</e-transition-folded>
		</template>
		
		<template v-else>
			<div class="e-panel-body" :style="styles.body"><slot></slot></div>
			<div class="e-panel-footer" :style="styles.footer" v-if="hasFooter"><slot name="footer"></slot></div>
		</template>
	</div>
</template>

<script lang="ts">
import ETransitionFolded from './../base/transition/folded';
import { defineComponent, computed, toRef, ref } from 'vue';
export default defineComponent({
	name: 'Panel',
	components:{
		ETransitionFolded
	},
	props: {
		type: {
			type: String,
			default: ''
		},
		skin: {
			type: String
		},
		padding: {
			type: [String, Number],
			default: ''
		},
		margin: {
			type: [String, Number],
			default: ''
		},
		header: {
			type: Boolean,
			default: true
		},
		styles: {
			type: Object,
			default: {}
		},
		title: {
			type: String,
			default: ''
		},
		icon: {
			type: String,
			default: ''
		},
		size: {
			type: Number,
			default: 22
		},
		radius: {
			type: [Number, String, Boolean],
			default: 6
		},
		collapse: {
			type: [Boolean, String],
			default: false
		}
	},
	setup(props, ctx) {
		const type = toRef(props, 'type').value;
		const radius = toRef(props, 'radius').value;
		const margin = toRef(props, 'margin').value;
		const padding = toRef(props, 'padding').value;

		const styles = computed(() => {
			const style = toRef(props, 'styles').value;
			let styles = {
				default: {},
				header: style && style.header ? style.header : {},
				body: style && style.body ? style.body : {},
				footer: style && style.footer ? style.footer : {}
			};
			if (margin && typeof margin == 'number') {
				styles.default['margin'] = margin + 'px';
			}
			if (margin && typeof margin == 'string') {
				styles.default['margin'] = margin;
			}
			if (padding && typeof padding == 'number') {
				styles.header['padding'] = padding + 'px';
				styles.body['padding'] = padding + 'px';
				styles.footer['padding'] = padding + 'px';
			}
			if (padding && typeof padding == 'string') {
				styles.header['padding'] = padding;
				styles.body['padding'] = padding;
				styles.footer['padding'] = padding;
			}
			if (radius !== false && type != 'code') {
				styles.default['border-radius'] = radius + 'px';
				styles.header['border-top-left-radius'] = radius + 'px';
				styles.header['border-top-right-radius'] = radius + 'px';
				styles.footer['border-bottom-left-radius'] = radius + 'px';
				styles.footer['border-bottom-right-radius'] = radius + 'px';
			}
			return styles;
		});

		const collapse = ref<Boolean | String>(props.collapse);
		const hasCollapse = computed(() => {
			let hasCollapse = '';
			if ((collapse.value && collapse.value != 'close') || collapse.value == 'open') {
				hasCollapse = 'open';
			} else if ((collapse.value && collapse.value == 'close') || collapse.value == 'close') {
				hasCollapse = 'close';
			}
			return hasCollapse;
		});

		const handleToggle = (evt: MouseEvent) => {
			if(hasCollapse.value!=''){
				collapse.value = hasCollapse.value == 'open' ? 'close' : 'open';
			}
		};

		return {
			styles,
			hasCollapse,
			handleToggle,
			hasFooter: !!ctx.slots.footer
		};
	}
});
</script>

<style>
@import url('../../styles/panel.css');
</style>
