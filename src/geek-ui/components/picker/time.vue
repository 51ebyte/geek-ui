<template>
	<div class="e-picker-time">
		<div class="e-picker-time-panel">
			<div class="e-picker-time-panel-header">
				<div
					v-nowTime="{
						prefix: '当前时间：',
						dynamic: true,
						format: 'hh:MM:ss'
					}"
				></div>
			</div>
			<div class="e-picker-time-panel-body">
				<div class="e-picker-time-list" :style="{ height: `${height}px` }">
					<ul class="e-picker-time-hours">
						<li
							v-for="(hours, index) in render.hours"
							:key="index"
							:class="{
								'e-picker-time-hours-active': activeHours == index,
								'e-picker-time-hours-disabled': hours.disabled
							}"
							@click="handleHours(hours, index, $event)"
						>
							<span>{{ hours.value }}</span>
						</li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
				<div class="e-picker-time-list" :style="{ height: `${height}px` }">
					<ul class="e-picker-time-minutes">
						<li
							v-for="(minutes, index) in render.minutes"
							:key="index"
							:class="{
								'e-picker-time-minutes-active': activeMinutes == index
							}"
							@click="handleMinutes(minutes, index, $event)"
						>
							<span>{{ minutes.value }}</span>
						</li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
				<div class="e-picker-time-list" :style="{ height: `${height}px` }">
					<ul class="e-picker-time-seconds">
						<li
							v-for="(seconds, index) in render.seconds"
							:key="index"
							:class="{
								'e-picker-time-seconds-active': activeSeconds == index
							}"
							@click="handleSeconds(seconds, index, $event)"
						>
							<span>{{ seconds.value }}</span>
						</li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</div>
			<div class="e-picker-time-panel-foot" v-if="foot">
				<Button size="mini" @click="handleClear" style="margin-right: 8px;">清空</Button>
				<Button size="mini" type="primary" @click="handleConfirm">确认</Button>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, nextTick } from 'vue';
export default defineComponent({
	name: 'Time',
	props: {
		modelValue: {
			type: [Date, Number],
			default() {
				return new Date();
			}
		},
		disabled: {
			type: [Array, Function],
			default() {
				return [];
			}
		},
		foot: {
			type: Boolean,
			default: true
		},
		height: {
			type: Number
		}
	},
	emits: ['change', 'confrim', 'clear'],
	setup(props, ctx) {
		let activeTime = new Date();
		if (props.modelValue instanceof Date) {
			activeTime = props.modelValue;
		} else if (typeof props.modelValue == 'number') {
			activeTime = new Date(props.modelValue);
		}
		const activeHours = ref(activeTime.getHours());
		const activeMinutes = ref(activeTime.getMinutes());
		const activeSeconds = ref(activeTime.getSeconds());

		onMounted(() => {
			setIntoView();
		});

		const setIntoView = () => {
			nextTick(()=>{
				intoView('.e-picker-time-hours-active');
				intoView('.e-picker-time-minutes-active');
				intoView('.e-picker-time-seconds-active');
			})
			function intoView(classs){
				let el = document.querySelectorAll(classs);
				for (let i = 0; i < el.length; i++) {
					let parentNode = el[i].parentNode;
					parentNode.scrollTop = el[i].offsetTop - parentNode.offsetHeight / 2;
				}
			}
		};

		const render = computed(() => {
			let hours = [],
				minutes = [],
				seconds = [];
			for (let i = 0; i < 24; i++) {
				let disabled = false;
				let hour = (Array(2).join(0) + i).slice(-2);
				if (typeof props.disabled == 'function') {
					disabled = props.disabled(hour);
				} else if (typeof props.disabled == 'object') {
					disabled = props.disabled.findIndex(e => e == hour) >= 0;
				}
				hours.push({
					value: hour,
					disabled: disabled
				});
			}
			for (let i = 0; i < 60; i++) {
				minutes.push({
					value: (Array(2).join(0) + i).slice(-2)
				});
			}
			for (let i = 0; i < 60; i++) {
				seconds.push({
					value: (Array(2).join(0) + i).slice(-2)
				});
			}
			return {
				hours,
				minutes,
				seconds
			};
		});

		const handleHours = (h, index) => {
			if (h.disabled) return false;
			activeHours.value = index;
			activeMinutes.value = 0;
			activeSeconds.value = 0;
			handleChange();
		};

		const handleMinutes = (m, index) => {
			if (!activeHours.value) {
				activeHours.value = 0;
			}
			activeMinutes.value = index;
			activeSeconds.value = 0;
			handleChange();
		};

		const handleSeconds = (s, index) => {
			if (!activeHours.value) {
				activeHours.value = 0;
			}
			if (!activeMinutes.value) {
				activeMinutes.value = 0;
			}
			activeSeconds.value = index;
			handleChange();
		};

		const handleChange = () => {
			let hours = (Array(2).join(0) + activeHours.value).slice(-2);
			let minutes = (Array(2).join(0) + activeMinutes.value).slice(-2);
			let seconds = (Array(2).join(0) + activeSeconds.value).slice(-2);
			let format = `${hours}:${minutes}:${seconds}`;
			ctx.emit('change', { hours, minutes, seconds, format });
		};

		const handleClear = () => {
			activeHours.value = null;
			activeMinutes.value = null;
			activeSeconds.value = null;
			ctx.emit('clear');
		};

		const handleConfirm = () => {
			ctx.emit('confrim');
		};

		return {
			render,
			activeHours,
			activeMinutes,
			activeSeconds,
			setIntoView,
			handleHours,
			handleMinutes,
			handleSeconds,
			handleClear,
			handleConfirm
		};
	}
});
</script>

<style></style>
