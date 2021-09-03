<template>
	<div :class="classs">
		<template v-for="(item, index) in list">
			<div class="e-radio-item e-flex e-col-center" :class="{ 'e-radio-disabled': item.disabled, 'e-radio-checked': item.value == inputValue }" @click="handleClickItem(item)">
				<template v-if="item.disabled">
					<input class="e-radio-input" :name="inputName" type="radio" :disabled="item.disabled" />
				</template>
				<template v-else>
					<input class="e-radio-input" :name="inputName" type="radio" :value="item.value" :checked="item.value == inputValue" />
				</template>
				<div class="e-radio-label">
					<slot :item="item" :index="index">{{ item.label }}</slot>
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { UPDATE_MODEL_VALUE_EVENT } from './../../lib/constants.js';
export default defineComponent({
	name: 'Radio',
	props: {
		modelValue: {
			type: [String, Number],
			default: ''
		},
		list: {
			type: Array,
			required: true
		},
		vertical: {
			type: Boolean,
			default: false
		}
	},
	emits: [UPDATE_MODEL_VALUE_EVENT, 'change'],
	setup(props, ctx) {
		const inputValue = computed(() => (props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue)));

		const handleClickItem = item => {
			if (item.value === inputValue.value || item.disabled) return;
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, item.value);
			ctx.emit('change', item);
		};

		const classs = computed(() => {
			let classs = ['e-radio'];
			if (!props.vertical) {
				classs.push('e-flex');
			}
			return classs;
		});

		return {
			classs,
			inputValue,
			inputName: byte.random(10, 'radio_'),
			handleClickItem
		};
	}
});
</script>

<style>
@import url('../../styles/radio.css');
</style>
