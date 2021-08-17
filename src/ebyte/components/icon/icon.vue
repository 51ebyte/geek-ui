<template>
	<icon-svg :title="title" :name="name" :size="size" :fill="fill" v-if="svg"></icon-svg>
	<icon-font :title="title" :option="option" :name="name" :size="size" :color="color" v-else></icon-font>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconFont from './font.vue';
import IconSvg from './svg.vue';
export default defineComponent({
	name: 'Icon',
	components: {
		IconFont,
		IconSvg
	},
	props: {
		option: {
			type: Object
		},
		name: {
			type: String
		},
		title: {
			type: String
		},
		size: {
			type: [Number, String],
			default: 18
		},
		color: {
			type: String,
			default: '#808695'
		},
		svg: {
			type: Boolean,
			default: false
		},
		fill: {
			type: String,
			default: '#17bd08'
		}
	}
});
</script>
