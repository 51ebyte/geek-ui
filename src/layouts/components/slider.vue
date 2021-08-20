<template>
	<div class="slider e-flex-col e-col-center">
		<div class="logo e-flex e-col-center"><Avatar :src="logo" circle :size="48" @click="handleAvatar"></Avatar></div>
		<Grid :col="1" align="center" :list="menu" v-slot="{ item, index }" @click="handleClickGridItem">
			<div class="text" :class="{ active: active == index }">{{ item.name }}</div>
		</Grid>
	</div>
</template>
<script>
import { defineComponent, computed,getCurrentInstance } from 'vue';
import { useRoute,useRouter } from 'vue-router';
export default defineComponent({
	props: {
		menu: {
			type: Array
		},
		logo: {
			type: String
		}
	},
	emits: ['menu'],
	setup(props, ctx) {
		
		const {proxy} = getCurrentInstance();

		const active = computed(() => {
			const path = useRoute()
				.path.split('/')
				.filter(e => e.trim());
			let index = props.menu.findIndex(e => e.keys.split('_').filter(s => s.trim())[0] == path[0]);
			return index >= 0 ? index : 0;
		});

		const handleAvatar = () => {
			proxy.$router.push({
				path: "/"
			});
		};

		const handleClickGridItem = (item, index) => {
			ctx.emit('menu', item, index);
			const i = proxy.$router.getRoutes().findIndex(e => e.name.search(item.keys));
			if (i >= 0) {
				proxy.$router.push({
					name: item.to || item.children[0]['to']
				});
			}
		};

		return {
			active,
			handleAvatar,
			handleClickGridItem
		};
	}
});
</script>
