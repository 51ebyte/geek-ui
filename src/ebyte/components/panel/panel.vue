<template>
	<div class="e-panel" :style="styles.default">
		<div class="e-panel-header" :style="styles.header" v-if="!body || header">
			<slot class="e-panel-header" name="header">
				<Icon :name="icon" :title="title" :size="size" v-if="icon"></Icon>
				<template v-else>{{title}}</template>
			</slot>
		</div>
		<div class="e-panel-body" :style="styles.body">
			<slot></slot>
		</div>
		<div class="e-panel-footer" :style="styles.footer" v-if="footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script>
import { defineComponent, computed, toRef } from 'vue';
export default defineComponent({
	name: 'Panel',
	props: {
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
			default: false
		},
		body: {
			type: Boolean,
			default: false
		},
		footer: {
			type: Boolean,
			default: false
		},
		styles: {
			type: Object,
			default: {}
		},
		title:{
			type: String,
			default: ''
		},
		icon:{
			type: String,
			default: ''
		},
		size: {
			type: Number,
			default: 22
		},
		radius:{
			type: [Number,String,Boolean],
			default: 6
		}
	},
	setup(props, ctx) {
		const radius = toRef(props, 'radius').value;
		const margin = toRef(props, 'margin').value;
		const padding = toRef(props, 'padding').value;

		const styles = computed(() => {
			const style = toRef(props, 'styles').value;
			let styles = {
				default: style || {},
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
			if(radius!==false){
				styles.default['border-radius'] = radius+'px';
				styles.header['border-top-left-radius'] = radius+'px';
				styles.header['border-top-right-radius'] = radius+'px';
				styles.footer['border-bottom-left-radius'] = radius+'px';
				styles.footer['border-bottom-right-radius'] = radius+'px';
			}
			return styles;
		});
		return {
			styles
		};
	}
});
</script>

<style>
@import url('../../styles/panel.css');
</style>
