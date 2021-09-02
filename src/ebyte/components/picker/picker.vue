<template>
	<div class="e-picker">
		<input class="e-input" ref="inputRef" :value="inputValue" :placeholder="placeholder" @focus="handleFocus" @blur="handleBlur" />
		<div class="e-picker-wrapper" @mouseenter.stop="onMouseWrapperEnter" @mouseleave.stop="onMouseWrapperLeave" v-show="showWrapper">
			<year-picker v-model="yearValue" ref="yearRef" :disabled="disabled" @change="handleYearChange" v-if="type=='year'"></year-picker>
			<month-picker v-model="monthValue" ref="monthRef" :disabled="disabled" @change="handleMonthChange" v-if="type=='month'"></month-picker>
			<date-picker v-model="dateValue" ref="dateRef" :extra="extra" :disabled="disabled" @change="handleDateClick" v-if="type == 'date'"></date-picker>
			<time-picker
				v-model="timeValue"
				ref="timeRef"
				:disabled="disabled"
				@change="handleTimeClick"
				@clear="handleTimeClear"
				@confrim="handleTimeConfrim"
				v-if="type == 'time'"
			></time-picker>
			<div class="e-picker-date-time" v-if="type == 'datetime'">
				<div class="e-flex">
					<date-picker v-model="dateValue" ref="dateRef" :extra="extra" :disabled="disabled" @change="handleDateClick"></date-picker>
					<time-picker v-model="timeValue" ref="timeRef" :disabled="disabled" :height="timeListItemHeight" @change="handleTimeClick" :foot="false"></time-picker>
				</div>
				<div class="e-picker-date-time-foot">
					<Button size="mini" style="margin-right: 8px;" @click="handleTimeClear">清空</Button>
					<Button size="mini" type="primary" @click="handleTimeConfrim">确认</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, onMounted } from 'vue';
import yearPicker from './year.vue';
import monthPicker from './month.vue';
import datePicker from './date.vue';
import timePicker from './time.vue';
import util from '../../lib/util.js';
import { UPDATE_MODEL_VALUE_EVENT } from '../../lib/constants.js';
export default defineComponent({
	name: 'Picker',
	components: {
		yearPicker,
		monthPicker,
		datePicker,
		timePicker
	},
	props: {
		modelValue: {
			type: [Date, Number,String],
			default() {
				return new Date();
			}
		},
		type: {
			type: String as PropType<'date' | 'time' | 'datetime' | 'year' | 'month'>,
			default: 'date',
			validator: (val: string) => {
				if (val != '') {
					return ['date', 'time', 'datetime', 'year', 'month'].includes(val);
				}
				return true;
			}
		},
		placeholder: {
			type: String,
			default: '请选择'
		},
		format: {
			type: String
		},
		range: {
			type: Boolean,
			default: false
		},
		extra: {
			type: Array
		},
		disabled: {
			type: [Array, Function]
		}
	},
	emits: [UPDATE_MODEL_VALUE_EVENT, 'focus', 'blur'],
	setup(props, ctx) {
		const inputRef = ref();
		const yearValue = ref();
		const monthValue = ref();
		const dateRef = ref();
		const dateValue = ref();
		const timeRef = ref();
		const timeValue = ref();
		const timeListItemHeight = ref(216);
		const showWrapper = ref(false);
		const hoverWrapper = ref(false);

		const inputValue = computed(() => {
			let modelValue = props.modelValue === null || props.modelValue === undefined ? '' : props.modelValue;
			let timestamp = typeof modelValue == 'number' ? modelValue : 0;
			if (modelValue instanceof Date) {
				timestamp = modelValue.getTime();
			}
			let value = '';
			if (props.type == 'year') {
				if(typeof modelValue=='string'){
					timestamp = new Date().setFullYear(modelValue);
				}
				let date = util.timeFormat(timestamp, 'yyyy', false);
				yearValue.value = date.year;
				value = date.format;
			}else if (props.type == 'month') {
				if(typeof modelValue=='string'){
					timestamp = new Date(modelValue).getTime();
				}
				let date = util.timeFormat(timestamp, 'yyyy-mm', false);
				monthValue.value = date.date;
				value = date.format;
			}else if (props.type == 'date') {
				let date = util.timeFormat(timestamp, 'yyyy-mm-dd', false);
				dateValue.value = date.date;
				value = date.format;
			} else if (props.type == 'time') {
				let date = util.timeFormat(timestamp, 'hh:MM:ss', false);
				timeValue.value = date.date;
				value = date.format;
			} else if (props.type == 'datetime') {
				let date = util.timeFormat(timestamp, 'yyyy-mm-dd hh:MM:ss', false);
				value = date.format;
				dateValue.value = date.date;
				timeValue.value = date.date;
			}
			return value;
		});

		const inputFormat = computed(() => {
			if (props.format) return props.format;
			let format = {
				date: 'yyyy-mm-dd',
				time: 'hh:MM:ss',
				datetime: 'yyyy-mm-dd hh:MM:ss',
				year: 'yyyy',
				month: 'mm'
			};
			return format[props.type];
		});

		onMounted(() => {
			if (showWrapper.value && props.type=="datetime") {
				timeListItemHeight.value = dateRef.value.tableRef.offsetHeight;
			}
		});

		//输入框聚焦
		const handleFocus = (evt: MouseEvent) => {
			showWrapper.value = true;
			if(props.type=='time' || props.type=='datetime'){
				timeRef.value.setIntoView()
			}
			ctx.emit('focus', evt);
		};

		//输入框失去焦点
		const handleBlur = (evt: MouseEvent) => {
			if (showWrapper.value) {
				if (!hoverWrapper.value) {
					showWrapper.value = false;
				}
			} else {
				showWrapper.value = false;
			}
			ctx.emit('blur', evt);
		};

		const onMouseWrapperEnter = (evt: MouseEvent) => {
			hoverWrapper.value = true;
		};
		const onMouseWrapperLeave = (evt: MouseEvent) => {
			hoverWrapper.value = false;
		};
		
		const handleYearChange = (data)=>{
			let date = new Date();
			date.setFullYear(data);
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, date);
			inputRef.value.focus();
		}
		
		const handleMonthChange =(data)=>{
			let date = new Date(data);
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, date);
			inputRef.value.focus();
		}

		const handleDateChange = (data) => {
			if(data instanceof PointerEvent) return false;
			let date = new Date();
			if (props.type == 'datetime') {
				date = new Date(timeValue.value);
			}
			date.setFullYear(data.year);
			date.setMonth(data.month - 1);
			date.setDate(data.day);
			dateValue.value = date;
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, date);
			inputRef.value.focus();
		};

		const handleTimeChange = (data:Date) => {
			let date = new Date();
			if (props.type == 'datetime') {
				date = new Date(dateValue.value);
			}
			date.setHours(data.hours);
			date.setMinutes(data.minutes);
			date.setSeconds(data.seconds);
			timeValue.value = date;
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, date);
			inputRef.value.focus();
		};

		const handleTimeClear = () => {
			dateRef.value.handleClear();
			timeRef.value.handleClear();
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, '');
		};

		const handleTimeConfrim = () => {
			showWrapper.value = false;
		};

		return {
			inputRef,
			yearValue,
			monthValue,
			dateRef,
			dateValue,
			timeRef,
			timeValue,
			timeListItemHeight,
			inputValue,
			showWrapper,
			handleFocus,
			handleBlur,
			onMouseWrapperEnter,
			onMouseWrapperLeave,
			handleYearChange,
			handleMonthChange,
			handleDateChange,
			handleTimeChange,
			handleTimeClear,
			handleTimeConfrim
		};
	}
});
</script>

<style>
@import url('../../styles/pricker.css');
</style>
