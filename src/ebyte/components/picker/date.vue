<template>
	<div class="e-picker-date">
		<div class="e-picker-date-aside" v-if="hanleYear!=nowYear || hanleMonth!=nowMonth">
			<div class="e-picker-date-shortcut" @click="handleToDay">回到今天</div>
		</div>
		<div class="e-picker-date-panel">
			<div class="e-picker-date-panel-header">
				<div class="prev">
					<i class="e-icon-font icon-ios-arrow-back year" @click="handlePrevYear"></i>
					<i class="e-icon-font icon-ios-arrow-back" @click="handlePrevMonth"></i>
				</div>
				<div class="text">{{ hanleYear }}年{{ hanleMonth }}月</div>
				<div class="next">
					<i class="e-icon-font icon-ios-arrow-forward" @click="handleNextMonth"></i>
					<i class="e-icon-font icon-ios-arrow-forward year" @click="handleNextYear"></i>
				</div>
			</div>
			<div class="e-picker-date-panel-body">
				<span class="now-month">{{ hanleMonth }}</span>
				<table class="e-picker-date-table">
					<thead>
						<tr class="e-picker-date-row">
							<td class="e-picker-date-col" v-for="(week, index) in weeks" :key="index">
								<span class="e-picker-date-cell">{{ week }}</span>
							</td>
						</tr>
					</thead>
					<tbody>
						<tr class="e-picker-date-row" v-for="days in calendar" :key="days.week">
							<td class="e-picker-date-col" v-for="(day, index) in days" :key="index">
								<div
									class="e-picker-date-cell"
									:class="{
										'prev-month': day.month < nowMonth,
										'next-month': day.month > nowMonth,
										'curr-month': day.isMonth,
										'curr-today': day.isToday
									}"
								>
									<span class="e-picker-date-cell-number">{{ day.date }}</span>
									<span class="e-picker-date-cell-extra">{{ day.extra }}</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue';
export default defineComponent({
	name: 'Date',
	setup(props, ctx) {
		const nowDate = new Date();
		const nowYear = ref(nowDate.getFullYear());
		const nowMonth = ref(nowDate.getMonth() + 1);
		const nowDay = ref(nowDate.getDate());

		const hanleYear = ref(nowDate.getFullYear());
		const hanleMonth = ref(nowDate.getMonth() + 1);
		const hanleDay = ref(nowDate.getDate());
		//月初
		const MonthFirstDay = computed(() => {
			return new Date(`${hanleYear.value}` + '-' + `${hanleMonth.value}` + '-1');
		});
		//月天数
		const MonthDaysTotal = computed(() => {
			var date = new Date();
			date.setMonth(hanleMonth.value);
			date.setDate(0);
			return date.getDate();
		});

		const calendar = computed(() => {
			let calendar = [];
			let days = [];
			for (let j = 0; j < 6 - MonthFirstDay.value.getDay(); j++) {
				var day = new Date(`${hanleYear.value}` + '-' + `${hanleMonth.value}` + '-' + `${hanleDay.value}`);
				day.setDate(0);
				day.setTime(day.getTime() - 24 * 60 * 60 * 1000 * (5 - j));
				days.push({
					year: day.getFullYear(),
					month: day.getMonth() + 1,
					date: day.getDate(),
					week: day.getDay(),
					isYear: false,
					isMonth: false,
					isToday: false,
					extra: ''
				});
				if (days.length == 7) {
					calendar.push(days);
					days = [];
				}
			}
			for (let i = 1; i <= MonthDaysTotal.value; i++) {
				let date = new Date(`${hanleYear.value}` + '-' + `${hanleMonth.value}` + '-' + `${i}`);
				days.push({
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					date: date.getDate(),
					week: date.getDay(),
					isYear: date.getFullYear() == nowDate.getFullYear(),
					isMonth: date.getFullYear() == nowDate.getFullYear() && date.getMonth() == nowDate.getMonth(),
					isToday: date.getFullYear() == nowDate.getFullYear() && date.getMonth() == nowDate.getMonth() && date.getDate() == nowDate.getDate(),
					extra: ''
				});
				if (days.length == 7) {
					calendar.push(days);
					days = [];
				}
			}
			if (days.length > 0) {
				let lenth = 8 - days.length;
				for (let k = 1; k < lenth; k++) {
					let month = hanleMonth.value + 1;
					let year = hanleYear.value;
					if (month > 12) {
						month = 1;
						year += 1;
					}
					let date = new Date(`${year}` + '-' + `${month}` + '-' + `${k}`);
					days.push({
						year: date.getFullYear(),
						month: date.getMonth() + 1,
						date: date.getDate(),
						week: date.getDay(),
						isYear: false,
						isMonth: false,
						isToday: false,
						extra: ''
					});
				}
				calendar.push(days);
				days = [];
			}
			return calendar;
		});

		//上一年
		const handlePrevYear = () => {
			hanleYear.value -= 1;
		};
		//上月
		const handlePrevMonth = () => {
			hanleMonth.value -= 1;
			if (hanleMonth.value < 1) {
				hanleYear.value -= 1;
				hanleMonth.value = 12;
			} else if (hanleMonth.value > 12) {
				hanleYear.value += 1;
				hanleMonth.value = 1;
			}
		};
		//下月
		const handleNextMonth = () => {
			hanleMonth.value += 1;
			if (hanleMonth.value < 1) {
				hanleYear.value -= 1;
				hanleMonth.value = 12;
			} else if (hanleMonth.value > 12) {
				hanleYear.value += 1;
				hanleMonth.value = 1;
			}
		};
		//下一年
		const handleNextYear = () => {
			hanleYear.value += 1;
		};
		//回到今天
		const handleToDay = () => {
			hanleYear.value = nowYear.value;
			hanleMonth.value = nowMonth.value;
			hanleDay.value = nowDay.value;
		};

		return {
			weeks: ['一', '二', '三', '四', '五', '六', '日'],
			nowYear,
			nowMonth,
			nowDay,
			hanleYear,
			hanleMonth,
			hanleDay,
			calendar,
			handlePrevYear,
			handlePrevMonth,
			handleNextMonth,
			handleNextYear,
			handleToDay
		};
	}
});
</script>

<style>
@import url('../../styles/pricker.css');
</style>
