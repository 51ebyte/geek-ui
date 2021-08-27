<template>
	<div class="e-picker">
		<input class="e-input" placeholder="请选择" />
		<div class="e-picker-wrapper">
			<!-- <date-picker></date-picker> -->
			<time-picker></time-picker>
		</div>
	</div>
</template>

<script lang="ts">
	import {defineComponent,PropType} from 'vue'
	import datePicker from './date.vue'
	import timePicker from './time.vue'
	export default defineComponent({
		name:'Picker',
		components:{
			datePicker,
			timePicker
		},
		props: {
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
			range: {}
		},
	})
</script>

<style>
</style>
