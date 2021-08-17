<template>
	<div :class="['e-card']" :style="styles.default">
		<div class="e-card-header e-flex e-row-between" :style="styles.header" v-if="header">
			<div class="e-card-header-left">
				<slot class="e-card-header" name="header">
					<Icon :name="icon" :title="title" :size="size" v-if="icon"></Icon>
					<template v-else>
						{{ title }}
					</template>
				</slot>
			</div>
			<div class="e-card-header-right" v-if="hasExtra">
				<slot name="extra"></slot>
			</div>
		</div>
		<div class="e-card-body" :style="styles.body"><slot></slot></div>
		<div class="e-card-footer" :style="styles.footer" v-if="hasFooter">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, ref } from 'vue';
export default defineComponent({
	name: 'Card',
	props: {
		width:{
			type: [String, Number],
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
			default: 4
		}
	},
	setup(props, ctx) {
		const width = toRef(props, 'width').value;
		const margin = toRef(props, 'margin').value;
		const padding = toRef(props, 'padding').value;
		const radius = toRef(props, 'radius').value;

		const styles = computed(() => {
			const style = toRef(props, 'styles').value;
			let styles = {
				default: {},
				header: style && style.header ? style.header : {},
				body: style && style.body ? style.body : {},
				footer: style && style.footer ? style.footer : {}
			};
			if (width && typeof width == 'number') {
				styles.default['width'] = width + 'px';
			}
			if (width && typeof width == 'string') {
				styles.default['width'] = width;
			}
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
			if (radius !== false) {
				styles.default['border-radius'] = radius + 'px';
				styles.header['border-top-left-radius'] = radius + 'px';
				styles.header['border-top-right-radius'] = radius + 'px';
				styles.footer['border-bottom-left-radius'] = radius + 'px';
				styles.footer['border-bottom-right-radius'] = radius + 'px';
			}
			return styles;
		});

		return {
			styles,
			hasExtra: !!ctx.slots.extra,
			hasFooter: !!ctx.slots.footer
		};
	}
});
</script>

<style>
@import url('../../styles/card.css');
</style>
