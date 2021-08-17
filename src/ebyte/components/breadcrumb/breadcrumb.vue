<template>
	<div :class="['e-breadcrumb']">
		<template v-for="(item, index) in list">
			<div class="e-breadcrumb-item">
				<slot :item="item" :index="index">
					<span class="text" @click="handleClick(item, index)">{{ item.name || item }}</span>
				</slot>
				<span class="separator" v-html="separator"></span>
			</div>
		</template>
	</div>
</template>

<script>
import { defineComponent, onMounted, getCurrentInstance } from 'vue';
import { config } from './../../lib/index.js';
export default defineComponent({
	name: 'Breadcrumb',
	props: {
		list: {
			type: [Array],
			required: true
		},
		separator: {
			type: String,
			default() {
				return config.getter('breadcrumb.separator', '/');
			}
		},
		home: {
			type: String,
			default() {
				return config.getter('breadcrumb.home');
			}
		}
	},
	emits: ['click'],
	setup(props, ctx) {
		const { proxy } = getCurrentInstance();

		const handleClick = (item, index) => {
			if (item.to) {
				if ((item.to.target || '') == '_blank') {
					const { href } = proxy.$router.resolve(item.to);
					window.open(href, '_blank');
				} else {
					proxy.$router.push(item.to);
				}
			}
			ctx.emit('click');
		};

		return {
			handleClick
		};
	}
});
</script>

<style>
@import url('../../styles/breadcrumb.css');
</style>
