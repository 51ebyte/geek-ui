<template>
	<div :class="['e-calendar']">
		<div class="e-calendar-panel">
			<div class="e-calendar-panel-header">
				<div class="left">
					{{effectYear}}年{{effectMonth}}月
				</div>
				<div class="right">
					<div class="today" @click.stop.parent="handleToDay">今天</div>
					<div class="prev-year" @click.stop.parent="handlePrevYear">
						<i class="e-icon-font icon-ios-arrow-back"></i>
					</div>
					<div class="prev-month" @click.stop.parent="handlePrevMonth">
						<i class="e-icon-font icon-ios-arrow-back"></i>
					</div>
					<div class="next-month" @click.stop.parent="handleNextMonth">
						<i class="e-icon-font icon-ios-arrow-forward"></i>
					</div>
					<div class="next-year" @click.stop.parent="handleNextYear">
						<i class="e-icon-font icon-ios-arrow-forward"></i>
					</div>
				</div>
			</div>
			<div class="e-calendar-panel-body">
				<table class="e-calendar-table" ref="tableRef" cellspacing="0" cellpadding="0">
					<thead>
						<tr>
							<th v-for="(week, index) in weeks" :key="index">
								<span>{{ week }}</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr class="e-calendar-row" v-for="days in calendar" :key="days.week">
							<td class="e-calendar-col" v-for="(day, index) in days" :key="index">
								<div :class="['e-calendar-cell',{
										'prev-month': day.month < nowMonth,
										'next-month': day.month > nowMonth,
										'curr-month': day.isMonth,
										'curr-today': day.isToday,
										'disabled': day.disabled,
										'active':handleActive(day)
									}]" @click.stop.parent="handleDayClick(day)">
									<div class="e-calendar-cell-warp">
										<span class="e-calendar-cell-number">{{ day.day }}</span>
										<span class="e-calendar-cell-extra">
											<template v-if="typeof day.extra =='object'">
												{{day.extra.join('；')}}
											</template>
											<template v-if="typeof day.extra =='string'">
												{{ day.extra }}
											</template>
										</span>
									</div>
									<div class="e-calendar-cell-events">
										<slot name="event" :day="day">
											<template v-for="(event,index) in day.events">
												<event :type="event.type" :bgColor="event.bgColor" :color="event.color" @click.stop.parent="handleDayEvent(day,event)">
													{{event.text || event}}
												</event>
											</template>
										</slot>
									</div>
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
import { defineComponent,ref, toRef, computed } from 'vue';
import event from './event.vue'
import byte from '../../lib/geek.js'
export default defineComponent({
	name: 'Calendar',
	components:{
		event
	},
	props: {
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
		events:{
			type:Function
		},
	},
	emits:['dayClick','event'],
	setup(props, ctx) {
		const nowDate = new Date();
		const nowYear = ref(nowDate.getFullYear());
		const nowMonth = ref(nowDate.getMonth() + 1);
		const nowDay = ref(nowDate.getDate());
		
		const effectYear = ref(nowDate.getFullYear());
		const effectMonth = ref(nowDate.getMonth() + 1);
		const effectDay = ref(nowDate.getDate());
		
		const activeYear = ref(nowDate.getFullYear());
		const activeMonth = ref(nowDate.getMonth() + 1);
		const activeDay = ref(nowDate.getDate());
		
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
			if(typeof props.disabled == 'object'){
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
			if(typeof props.disabled == 'object'){
				return disabled.value[date.getTime()] || false;
			}
			if(typeof props.disabled == 'function'){
				return props.disabled(date)
			}
			return false;
		}
		
		const handleEvents = (date) => {
			if(typeof props.events == 'function'){
				return props.events(date)
			}
			return []
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
					extra: extra.value[date.getTime()] || '',
					events: handleEvents(date)
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
					extra: extra.value[date.getTime()] || '',
					events: handleEvents(date)
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
						extra: extra.value[date.getTime()] || '',
						events: handleEvents(date)
					});
				}
				calendar.push(days);
				days = [];
			}
			return calendar;
		});
		
		const handleActive = (day)=>{
			return activeYear.value == day.year && activeMonth.value == day.month && activeDay.value == day.day;
		}
		
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
		
		const handleDayClick = (day)=>{
			console.log(day)
			if(day.disabled) return false;
			activeYear.value = day.year
			activeMonth.value = day.month
			activeDay.value = day.day
			ctx.emit('dayClick',day)
			if(!day.isMonth && day.month<nowMonth.value && (effectYear.value!=day.year || effectMonth.value!=day.month)){
				handlePrevMonth();
			}else if(!day.isMonth && day.month>nowMonth.value && (effectYear.value!=day.year || effectMonth.value!=day.month)){
				handleNextMonth();
			}
		}
		
		const handleDayEvent = (day,event) => {
			ctx.emit('event',day,event)
		}
		
		return {
			weeks: ['一', '二', '三', '四', '五', '六', '日'],
			nowYear,
			nowMonth,
			nowDay,
			effectYear,
			effectMonth,
			effectDay,
			calendar,
			handleActive,
			handleDisabled,
			handlePrevYear,
			handlePrevMonth,
			handleNextMonth,
			handleNextYear,
			handleToDay,
			handleDayClick,
			handleDayEvent
		};
	}
});
</script>

<style>
@import url('../../styles/calendar.css');
</style>
