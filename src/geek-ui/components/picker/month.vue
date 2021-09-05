<template>
	<div class="e-picker-month" v-if="!showYearPicker">
		<div class="e-picker-month-panel">
			<div class="e-picker-month-panel-header">
				<div class="prev"><i class="e-icon-font icon-ios-arrow-back month" @click="handlePrevYear"></i></div>
				<div class="text" @click="handleClickYear">{{ effectYear }}年</div>
				<div class="next"><i class="e-icon-font icon-ios-arrow-forward month" @click="handleNextYear"></i></div>
			</div>
			<div class="e-picker-month-panel-body">
				<template v-for="(month, index) in months">
					<span
						:class="[
							'e-picker-month-cell',
							{
								active: month.month == effectMonth,
								disabled: month.disabled
							}
						]"
						@click="handleClickMonth(month)"
					>
						{{ month.month }}月
					</span>
				</template>
			</div>
		</div>
	</div>
	<year-picker v-model="effectYear" @change="handleYearChange" v-if="showYearPicker"></year-picker>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue';
import yearPicker from './year.vue';
export default defineComponent({
	components: {
		yearPicker
	},
	props: {
		modelValue: {
			type: [Date, Number, String],
			default() {
				return new Date();
			}
		},
		disabled: {
			type: [Array, Function],
			default() {
				return [];
			}
		}
	},
	emits: ['change'],
	setup(props, ctx) {
		const showYearPicker = ref(false);
		let modelValue = props.modelValue === null || props.modelValue === undefined ? '' : props.modelValue;

		const effect = new Date(modelValue);

		const nowDate = new Date();
		const nowYear = ref(nowDate.getFullYear());

		const effectYear = ref(effect.getFullYear());
		const effectMonth = ref(effect.getMonth() + 1);

		const months = computed(() => {
			let months = [];
			for (let i = 1; i <= 12; i++) {
				let disabled = false;
				if (typeof props.disabled == 'object') {
					disabled = props.disabled.findIndex(e => e == i) >= 0;
				}
				if (typeof props.disabled == 'function') {
					disabled = props.disabled(i);
				}
				months.push({
					month: i,
					disabled: disabled
				});
			}
			return months;
		});

		const handleClickYear = () => {
			showYearPicker.value = true;
		};

		const handleYearChange = data => {
			effectYear.value = data;
			showYearPicker.value = false;
			let date = new Date();
			date.setMonth(effectMonth.value - 1);
			date.setFullYear(effectYear.value);
			ctx.emit('change', date);
		};

		const handlePrevYear = () => {
			effectYear.value -= 1;
			let date = new Date();
			date.setMonth(effectMonth.value - 1);
			date.setFullYear(effectYear.value);
			ctx.emit('change', date);
		};

		const handleNextYear = () => {
			effectYear.value += 1;
			let date = new Date();
			date.setMonth(effectMonth.value - 1);
			date.setFullYear(effectYear.value);
			ctx.emit('change', date);
		};

		const handleClickMonth = month => {
			if (month.disabled) return false;
			effectMonth.value = month.month;
			let date = new Date();
			date.setMonth(month.month - 1);
			date.setFullYear(effectYear.value);
			ctx.emit('change', date);
		};

		return {
			showYearPicker,
			effectYear,
			effectMonth,
			months,
			handleClickYear,
			handleYearChange,
			handlePrevYear,
			handleNextYear,
			handleClickMonth
		};
	}
});
</script>

<style></style>
