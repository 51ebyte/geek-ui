<template>
	<div class="e-icon">
		<span class="e-flex e-col-center" style="cursor: pointer;" @click="handleClick">
			<i :class="['e-icon-font', 'icon-' + name,{
				'e-icon-font-loading':loading
			}]" :style="styles"></i>
			<template v-if="title">
				<label :style="{ lineHeight: size + 'px', height: size + 'px', marginLeft: '4px' }">{{ title }}</label>
			</template>
		</span>
	</div>
</template>

<script lang="ts">
import { toRef, defineComponent, computed } from 'vue';
export default defineComponent({
	name: 'Icon',
	props: {
		option: {
			type: Object
		},
		title: {
			type: String
		},
		name: {
			type: String
		},
		size: {
			type: [Number, String],
			default: 18
		},
		color: {
			type: String,
			default:''
		},
		loading:{
			type: Boolean,
			default: false
		},
	},

	emits: ['click', 'update'],

	setup(props, ctx) {
		const option = toRef(props, 'option').value;
		const size = toRef(props, 'size').value;
		const color = toRef(props, 'color').value;

		var styles = computed(() => {
			if (typeof option == 'object') {
				return {
					color: option.color || color,
					fontSize: (option.size || size) + 'px'
				};
			}
			return {
				color: color,
				fontSize: size + 'px'
			};
		});

		const name = computed(() => {
			const name = toRef(props, 'name').value;
			if (typeof option == 'object') {
				return option.name;
			}
			return name;
		});

		const handleClick = (evt: MouseEvent) => {
			ctx.emit('click', evt);
		};

		return {
			name,
			styles,
			handleClick
		};
	}
});
</script>

<style>
.e-icon {
	transition: all 0.5s;
	display: inline-block;
}
.e-icon-font-loading{
	 animation: ani-icon-loading 1s linear infinite;
}
@keyframes ani-icon-loading {
	from { transform: rotate(0deg);}
	50%  { transform: rotate(180deg);}
	to   { transform: rotate(360deg);}
}
</style>
