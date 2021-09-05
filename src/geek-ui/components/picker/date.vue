<template>
	<div class="e-picker-date">
		<div class="e-picker-date-aside" v-if="effectYear!=nowYear || effectMonth!=nowMonth">
			<div class="e-picker-date-shortcut" @click.stop.parent="handleToDay">回到今天</div>
		</div>
		<div class="e-picker-date-panel">
			<div class="e-picker-date-panel-header">
				<div class="prev">
					<i class="e-icon-font icon-ios-arrow-back year" @click.stop.parent="handlePrevYear"></i>
					<i class="e-icon-font icon-ios-arrow-back" @click.stop.parent="handlePrevMonth"></i>
				</div>
				<div class="text">{{ effectYear }}年{{ effectMonth }}月</div>
				<div class="next">
					<i class="e-icon-font icon-ios-arrow-forward" @click.stop.parent="handleNextMonth"></i>
					<i class="e-icon-font icon-ios-arrow-forward year" @click.stop.parent="handleNextYear"></i>
				</div>
			</div>
			<div class="e-picker-date-panel-body">
				<span class="now-month">{{ effectMonth }}</span>
				<table class="e-picker-date-table" ref="tableRef">
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
								<div :class="['e-picker-date-cell',{
										'prev-month': day.month < nowMonth,
										'next-month': day.month > nowMonth,
										'curr-month': day.isMonth,
										'curr-today': day.isToday,
										'disabled':day.disabled,
										'active':handleActive(day)
									}]" @click.stop.parent="handleClick(day)"
								>
									<span class="e-picker-date-cell-number">{{ day.day }}</span>
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
import { defineComponent, computed, ref,onMounted } from 'vue';
import byte from '../../lib/geek.js';
export default defineComponent({
	name: 'Date',
	props:{
		modelValue: {
			type: [Date,Number],
			default(){
				return new Date()
			}
		},
		extra:{
			type:Array,
			default(){
				return [];
			}
		},
		disabled:{
			type:[Array,Function],
			default(){
				return [];
			}
		},
		range: {
			type:Boolean,
			default:true
		},
	},
	emits:['change'],
	setup(props, ctx) {
		
		const tableRef = ref()
		
		const nowDate = new Date();
		const nowYear = ref(nowDate.getFullYear());
		const nowMonth = ref(nowDate.getMonth() + 1);
		const nowDay = ref(nowDate.getDate());

		const effectYear = ref(nowDate.getFullYear());
		const effectMonth = ref(nowDate.getMonth() + 1);
		const effectDay = ref(nowDate.getDate());
		
		let activeDate = 0;
		if(props.modelValue instanceof Date){
			activeDate = props.modelValue;
		}else if (typeof props.modelValue=='number'){
			activeDate = new Date(props.modelValue);
		}else{
			activeDate = nowDate;
		}
		const activeYear = ref(activeDate.getFullYear());
		const activeMonth = ref(activeDate.getMonth() + 1);
		const activeDay = ref(activeDate.getDate());
		
		const extra = computed(()=>{
			let extra = {};
			props.extra.forEach((item)=>{
				let date = new Date(item.date);
				date = [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
				let time =['00','00','00'].join(':')
				let key = new Date(date+' '+time).getTime()
				extra[key] = item.extra;
			})
			return extra;
		})
		
		const disabled = computed(()=>{
			let disabled = {};
			if(typeof props.disabled=='object'){
				props.disabled.forEach((item)=>{
					let date = new Date(item);
					date = [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
					let time =['00','00','00'].join(':')
					let key = new Date(date+' '+time).getTime()
					disabled[key] = true
				})
			}
			return disabled;
		})
		
		const handleDisabled = (date) => {
			if(typeof props.disabled=='object'){
				return disabled.value[date.getTime()];
			}
			if(typeof props.disabled=='function'){
				return props.disabled(date)
			}
		}
		
		//月初
		const MonthFirstDay = computed(() => {
			return new Date(`${effectYear.value}` + '-' + `${effectMonth.value}` + '-1');
		});
		//月天数
		const MonthDaysTotal = computed(() => {
			var date = new Date();
			date.setMonth(effectMonth.value);
			date.setDate(0);
			return date.getDate();
		});

		const calendar = computed(() => {
			let calendar = [];
			let days = [];
			for (let j = 0; j < 6 - MonthFirstDay.value.getDay(); j++) {
				var date = new Date(`${effectYear.value}` + '-' + `${effectMonth.value}` + '-' + `${effectDay.value}`);
				date.setDate(0);
				date.setTime(date.getTime() - 86400000 * (5 - j));
				days.push({
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					day: date.getDate(),
					week: date.getDay(),
					isYear: false,
					isMonth: false,
					isToday: false,
					format: byte.timeFormat(date.getTime(),'yyyy-mm-dd',false).format,
					disabled: handleDisabled(date),
					extra: extra.value[date.getTime()] || ''
				});
				if (days.length == 7) {
					calendar.push(days);
					days = [];
				}
			}
			for (let i = 1; i <= MonthDaysTotal.value; i++) {
				let format = `${effectYear.value}` + '-' + `${effectMonth.value}` + '-' + `${i}`
				let date = new Date(format);
				let isYear = date.getFullYear() == nowDate.getFullYear();
				let isMonth = date.getMonth() == nowDate.getMonth();
				let isToday = date.getDate() == nowDate.getDate();
				days.push({
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					day: date.getDate(),
					week: date.getDay(),
					isYear: isYear,
					isMonth: isYear && isMonth,
					isToday: isYear && isMonth && isToday,
					format:format,
					disabled: handleDisabled(date),
					extra: extra.value[date.getTime()] || ''
				});
				if (days.length == 7) {
					calendar.push(days);
					days = [];
				}
			}
			if (days.length > 0) {
				let lenth = 8 - days.length;
				for (let k = 1; k < lenth; k++) {
					let month = effectMonth.value + 1;
					let year = effectYear.value;
					if (month > 12) {
						month = 1;
						year += 1;
					}
					let format = `${year}` + '-' + `${month}` + '-' + `${k}`
					let date = new Date(format);
					days.push({
						year: date.getFullYear(),
						month: date.getMonth() + 1,
						day: date.getDate(),
						week: date.getDay(),
						isYear: false,
						isMonth: false,
						isToday: false,
						format: format,
						disabled: handleDisabled(date),
						extra: extra.value[date.getTime()] || ''
					});
				}
				calendar.push(days);
				days = [];
			}
			return calendar;
		});

		//上一年
		const handlePrevYear = () => {
			effectYear.value -= 1;
		};
		//上月
		const handlePrevMonth = () => {
			effectMonth.value -= 1;
			if (effectMonth.value < 1) {
				effectYear.value -= 1;
				effectMonth.value = 12;
			} else if (effectMonth.value > 12) {
				effectYear.value += 1;
				effectMonth.value = 1;
			}
		};
		//下月
		const handleNextMonth = () => {
			effectMonth.value += 1;
			if (effectMonth.value < 1) {
				effectYear.value -= 1;
				effectMonth.value = 12;
			} else if (effectMonth.value > 12) {
				effectYear.value += 1;
				effectMonth.value = 1;
			}
		};
		//下一年
		const handleNextYear = () => {
			effectYear.value += 1;
		};
		//回到今天
		const handleToDay = () => {
			effectYear.value = nowYear.value;
			effectMonth.value = nowMonth.value;
			effectDay.value = nowDay.value;
		};
		
		const handleActive = (day)=>{
			return activeYear.value == day.year && activeMonth.value == day.month && activeDay.value == day.day;
		}
		
		const handleClick = (day)=>{
			if(day.disabled) return false;
			activeYear.value = day.year
			activeMonth.value = day.month
			activeDay.value = day.day
			ctx.emit('change',day)
		}
		
		const handleClear = ()=>{
			activeYear.value = nowYear.value
			activeMonth.value = nowMonth.value
			activeDay.value = nowDay.value
		}

		return {
			tableRef,
			weeks: ['一', '二', '三', '四', '五', '六', '日'],
			nowYear,
			nowMonth,
			nowDay,
			effectYear,
			effectMonth,
			effectDay,
			calendar,
			handlePrevYear,
			handlePrevMonth,
			handleNextMonth,
			handleNextYear,
			handleToDay,
			handleClick,
			handleActive,
			handleClear
		};
	}
});
</script>

<style>
</style>
