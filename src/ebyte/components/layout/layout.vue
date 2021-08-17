<template>
	<div class="e-layout"
		:class="{
			'e-layout-hasAside': has.aside
		}"
	>
	<div class="e-layout-aside" v-if="showAside"><slot name="aside"></slot></div>
	<div class="e-layout-container">
		<div class="e-layout-north" v-if="showNorth"><slot name="north"></slot></div>
		<div class="e-layout-center">
			<div class="e-layout-west" v-if="showWest"><slot name="west"></slot></div>
			<div class="e-layout-center-container"
				:class="{
					'e-layout-hasAside': has.aside,
					'e-layout-hasWest': has.west,
					'e-layout-hasEast': has.east
				}"
			>
				<slot></slot>
			</div>
			<div class="e-layout-east" v-if="showEast"><slot name="east"></slot></div>
		</div>
		<div class="e-layout-south" v-if="showSouth"><slot name="south"></slot></div>
	</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
export default defineComponent({
	name: 'Layout',
	setup(props, ctx) {
		const has = computed(() => {
			let has = { aside: false, west: false, east: false };
			ctx.slots.default().forEach(c => {
				if (c.type.name == 'LayoutAside') {
					has.aside = true;
				}
				if (c.type.name == 'LayoutWest') {
					has.west = true;
				}
				if (c.type.name == 'LayoutEast') {
					has.east = true;
				}
			});
			return has;
		});

		return {
			has,
			showAside: !!ctx.slots.aside,
			showNorth: !!ctx.slots.north,
			showSouth: !!ctx.slots.south,
			showEast: !!ctx.slots.east,
			showWest: !!ctx.slots.west
		};
	}
});
</script>

<style scoped="scoped">
@import url('../../styles/layout.css');
</style>
