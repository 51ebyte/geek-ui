<template>
	<div :class="classs">
		<template v-for="(item, index) in list">
			<div
				class="e-check-item e-flex e-col-center"
				:class="{
					'e-check-disabled': item.disabled,
					'e-check-checked': inputValue.findIndex(e => e == item.value) >= 0 && !item.disabled
				}"
				@click="handleClickItem(item)"
			>
				<input class="e-check-input" :name="inputName" type="checkbox" :value="item.value" :label="item.label" :checked="item.value == inputValue" :disabled="item.disabled" />
				<span class="e-check-input-span"></span>
				<div class="e-check-label">
					<div class="e-flex e-col-center">
						<slot :item="item" :index="index">
							<Icon :name="item.icon" v-if="item.icon"></Icon>
							<span>{{ item.label }}</span>
						</slot>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { UPDATE_MODEL_VALUE_EVENT } from './../../lib/constants.js';
import byte from './../../lib/geek.js';
export default defineComponent({
	name: 'Check',
	props: {
		modelValue: {
			type: Array,
			default: [],
			required: true
		},
		list: {
			type: Array,
			required: true
		},
		vertical: {
			type: Boolean,
			default: false
		},
		select: {
			type: Boolean,
			default: false
		},
		button: {
			type: Boolean,
			default: false
		}
	},
	emits: [UPDATE_MODEL_VALUE_EVENT, 'change'],
	setup(props, ctx) {
		const inputValue = ref(props.modelValue);

		const handleClickItem = item => {
			if (item.disabled) return;
			let index = inputValue.value.findIndex(e => e == item.value);
			if (index >= 0) {
				inputValue.value.splice(index, 1);
			} else {
				inputValue.value.push(item.value);
			}
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, inputValue.value);
			ctx.emit('change', item);
		};

		const classs = computed(() => {
			let classs = ['e-check'];
			if (!props.vertical) {
				classs.push('e-flex');
			}
			if (props.select) {
				classs.push('e-check-style-select');
			}
			if (props.button) {
				classs.push('e-check-style-button');
			}
			return classs;
		});

		return {
			classs,
			inputValue,
			inputName: byte.random(10, 'check_'),
			handleClickItem
		};
	}
});
</script>

<style>
@import url('../../styles/check.css');
</style>
