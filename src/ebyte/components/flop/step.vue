<template>
	<div class="e-flop-number">
		<div class="box-container">
			<template v-for="(item, index) in numberArray">
				<li class="number-item" v-if="!isNaN(item)" :style="{
					backgroundColor:bgColor
				}">
					<span><i class="numberItem" :style="{color:color}">0123456789</i></span>
				</li>
				<li class="mark-item" v-else>
					<span :style="{color:separColor || color}">{{ item }}</span>
				</li>
			</template>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, toRef, computed, watch, onMounted } from 'vue';
export default defineComponent({
	props: {
		modelValue: {
			type: [Number, String],
			default: '000000'
		},
		color: {
			type: String
		},
		bgColor: {
			type: String
		},
		separColor:{
			type: String,
		},
		duration:{
			type: Number,
			default:500
		},
	},
	setup(props, ctx) {
		const modelValue = computed(() => (props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue)));
		const number = ref(props.modelValue);
		let numberArray = computed(() => {
			return String(number.value).split('');
		});

		onMounted(() => {
			handleTransform();
		});
		watch(
			() => props.modelValue,
			n => {
				number.value = n;
				setTimeout(() => {
					handleTransform();
				}, props.duration);
			}
		);

		const handleTransform = () => {
			setTimeout(() => {
				const items = document.querySelectorAll('.numberItem');
				const numberArr = numberArray.value.filter(item => !isNaN(item));
				for (let index = 0; index < items.length; index++) {
					items[index].style.transform = `translate(-50%, -${numberArr[index] * 10}%)`;
				}
			}, props.duration);
		};

		return {
			numberArray,
			handleTransform
		};
	}
});
</script>

<style>
.e-flop-number{
	text-align: center;
}
.box-container {
	margin: 0 auto;
	position: relative;
	font-size: 66px;
	line-height: 42px;
	text-align: center;
	list-style: none;
	color: var(--color-primary);
	writing-mode: vertical-lr;
	text-orientation: upright;
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	-khtml-user-select: none;
	user-select: none;
}
/* 默认逗号设置 */
.mark-item {
	width: 16px;
	height:100px;
	font-size: 48px;
	position: relative;
}
.mark-item > span {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
}
/*滚动数字设置*/
.number-item {
	width: 60px;
	height: 100px;
	margin: 0 3px;
	border-radius: 10px;
	box-shadow: 0 0 6px rgb(0 0 0 / 50%);
}
.number-item > span {
	position: relative;
	display: inline-block;
	width: 100%;
	height: 100%;
	writing-mode: vertical-rl;
	text-orientation: upright;
	overflow: hidden;
}
.number-item > span > i {
	font-style: normal;
	position: absolute;
	top: 16px;
	left: 50%;
	transform: translate(-50%, 0);
	transition: transform 1s ease-in-out;
	letter-spacing: 10px;
}
</style>
