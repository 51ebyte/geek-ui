<template>
	<div class="e-menu-item" @click="handleClickItem(item, index)">
		<div class="e-menu-item-box e-flex e-col-center"
			:class="{
				'e-menu-item-prefix': item.icon,
				'e-menu-item-suffix': item.children,
				'e-menu-item-active': current == item || index == current 
				|| (item.to && current==-1 && $route.name == item.to.name) 
				|| (item.to && current==-1 && $route.path == item.to.path)
				|| (item.to && current==-1 && $route.name == item.to)
			}"
		>
			<template v-if="item.icon">
				<Icon class="prefix-icon" name="md-add"></Icon>
			</template>
			<span class="text">{{ item.name }}</span>
			<template v-if="item.children">
				<Icon class="suffix-icon" name="ios-arrow-down"></Icon>
			</template>
		</div>
		<div class="e-menu-item-children" v-if="item.children">
			<template v-for="(children, j) in item.children">
				<menu-item :item="children"></menu-item>
			</template>
		</div>
	</div>
</template>

<script>
import { defineComponent, computed, toRef, ref, getCurrentInstance } from 'vue';
export default defineComponent({
	name: 'MenuItem',
	props: {
		item: {
			type: Object
		},
		index: {
			type: Number
		},
		current: {
			type: [Object, Number],
			default:-1
		}
	},
	emits: ['click'],
	setup: (props, ctx) => {
		const { proxy } = getCurrentInstance();

		const handleClickItem = (item, index) => {
			ctx.emit('click', item, index);
			let routes = proxy.$router.getRoutes();
			if (typeof item.to == 'object') {
				let _target = item.to.target || '';
				if (routes.findIndex(e => e.name == item.to.name || e.path == item.to.path) >= 0) {
					if (_target == '_blank') {
						const { href } = proxy.$router.resolve(item.to);
						window.open(href, '_blank');
					} else {
						proxy.$router.push(item.to);
					}
				} else {
					console.error('路由地址不存在');
				}
			} else if (typeof item.to == 'string') {
				let _target = item.target || '';
				if (_target == '_blank') {
					const { href } = proxy.$router.resolve({
						name: item.to
					});
					window.open(href, '_blank');
				} else {
					proxy.$router.push({
						name: item.to
					});
				}
			} else if (typeof item.href == 'string') {
				let _target = item.target || '';
				if (_target == '_blank') {
					window.open(item.href, '_blank');
				} else {
					window.open(item.href, '_self');
				}
			}
		};

		return {
			route: proxy.$route.name,
			handleClickItem
		};
	}
});
</script>

<style>
@import url('../../styles/menu.css');
</style>
