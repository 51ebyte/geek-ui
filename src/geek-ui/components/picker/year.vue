<template>
	<div class="e-picker-year">
		<div class="e-picker-year-panel">
			<div class="e-picker-year-panel-header">
				<div class="prev"><i class="e-icon-font icon-ios-arrow-back year" @click="handlePrevYear"></i></div>
				<div class="text">{{ effectYear }}年</div>
				<div class="next"><i class="e-icon-font icon-ios-arrow-forward year" @click="handleNextYear"></i></div>
			</div>
			<div class="e-picker-year-panel-body">
				<template v-for="(year, index) in years">
					<span
						:class="[
							'e-picker-year-cell',
							{
								active: year.year == effectYear,
								disabled: year.disabled
							}
						]"
						@click="handleClickYear(year)"
					>
						{{ year.year }}
					</span>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue';
export default defineComponent({
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
		let modelValue = props.modelValue === null || props.modelValue === undefined ? '' : props.modelValue;

		const nowDate = new Date();
		const nowYear = ref(nowDate.getFullYear());

		const effectYear = ref(modelValue || nowDate.getFullYear());
		const years = computed(() => {
			let years = [];
			for (let i = effectYear.value - 1; i < effectYear.value + 11; i++) {
				let disabled = false;
				if (typeof props.disabled == 'object') {
					disabled = props.disabled.findIndex(e => e == i) >= 0;
				}
				if (typeof props.disabled == 'function') {
					disabled = props.disabled(i);
				}
				years.push({
					year: i,
					disabled: disabled
				});
			}
			return years;
		});

		const handlePrevYear = () => {
			effectYear.value -= 11;
			ctx.emit('change', effectYear.value);
		};

		const handleNextYear = () => {
			effectYear.value += 11;
			ctx.emit('change', effectYear.value);
		};

		const handleClickYear = year => {
			if (year.disabled) return false;
			effectYear.value = year.year;
			ctx.emit('change', year.year);
		};

		return {
			effectYear,
			years,
			handleClickYear,
			handlePrevYear,
			handleNextYear
		};
	}
});
</script>

<style></style>
