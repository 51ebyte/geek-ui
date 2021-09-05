<template>
	<div class="e-flop-flip" :class="[runDirection, { running: isRun }]">
		<div :class="['digital', 'front']">
			<span class="before" :style="{background:bgColor,color:color}">{{ beforeNumber }}</span>
			<span class="after" :style="{background:bgColor,color:color}">{{ beforeNumber }}</span>
		</div>
		<div :class="['digital', 'back']">
			<span class="before" :style="{background:bgColor,color:color}">{{ afterNumber }}</span>
			<span class="after" :style="{background:bgColor,color:color}">{{ afterNumber }}</span>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default {
	name: 'Flip',
	props: {
		before: {
			type: [Number, String],
			default: 0
		},
		after: {
			type: [Number, String],
			default: 1
		},
		duration: {
			type: Number,
			default: 600
		},
		color: {
			type: String,
			default: '#ffffff'
		},
		bgColor: {
			type: String,
			default: '#333333'
		}
	},
	setup(props, ctx) {
		const isRun = ref(false);
		const runDirection = ref('up');
		const beforeNumber = ref(props.before);
		const afterNumber = ref(props.after);
		console.log(props.duration)

		const running = (type, before, after) => {
			// 如果处于翻转中，则不执行
			if (isRun.value) {
				return false;
			}
			beforeNumber.value = before;
			afterNumber.value = after;
			// 根据传递过来的type设置翻转方向
			runDirection.value = type;
			// 设置翻转状态为true
			isRun.value = true;
			setTimeout(() => {
				// 设置翻转状态为false
				isRun.value = false;
				beforeNumber.value = after;
			}, props.duration);
		};

		const setBefore = number => {
			beforeNumber.value = number;
		};
		const setAfter = number => {
			afterNumber.value = number;
		};

		return {
			isRun,
			runDirection,
			beforeNumber,
			afterNumber,
			running,
			setBefore,
			setAfter
		};
	}
};
</script>

<style>
.e-flop-flip {
	display: inline-block;
	position: relative;
	width: 60px;
	height: 100px;
	line-height: 100px;
	border-radius: 10px;
	font-size: 66px;
	box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
	text-align: center;
}

.e-flop-flip .digital .before,
.e-flop-flip .digital .after {
	position: absolute;
	background: #000;
	color: white;
	overflow: hidden;
	box-sizing: border-box;
	height: 50%;
	width: 100%;
}
.e-flop-flip .digital .before {
	left: 0;
	top: 0;
	border-radius: 10px 10px 0 0;
	border-bottom: solid 1px #666;
}
.e-flop-flip .digital .after {
	left: 0;
	bottom: 0;
	border-radius: 0 0 10px 10px;
	line-height: 0;
}

/*向下翻*/
.e-flop-flip.down .front .before {
	z-index: 3;
}
.e-flop-flip.down .back .after {
	z-index: 2;
	transform-origin: 50% 0%;
	transform: perspective(160px) rotateX(180deg);
}

.e-flop-flip.down .front .after,
.e-flop-flip.down .back .before {
	z-index: 1;
}

.e-flop-flip.down.running .front.before {
	transform-origin: 50% 100%;
	animation: beforeDown 0.6s ease-in-out both;
	box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
	backface-visibility: hidden;
}
.e-flop-flip.down.running .back .after {
	animation: afterDown 0.6s ease-in-out both;
}

/*向上翻*/
.e-flop-flip.up .front .after {
	z-index: 3;
}

.e-flop-flip.up .back .before {
	z-index: 2;
	transform-origin: 50% 100%;
	transform: perspective(160px) rotateX(-180deg);
}

.e-flop-flip.up .front .before,
.e-flop-flip.up .back .after {
	z-index: 1;
}

.e-flop-flip.up.running .front .after {
	transform-origin: 50% 0;
	animation: beforeUp 0.6s ease-in-out both;
	box-shadow: 0 2px 6px rgba(255, 255, 255, 0.3);
	backface-visibility: hidden;
}

.e-flop-flip.up.running .back .before {
	animation: afterUp 0.6s ease-in-out both;
}

@keyframes beforeDown {
	0% {
		transform: perspective(160px) rotateX(0deg);
	}
	100% {
		transform: perspective(160px) rotateX(-180deg);
	}
}
@keyframes afterDown {
	0% {
		transform: perspective(160px) rotateX(180deg);
	}
	100% {
		transform: perspective(160px) rotateX(0deg);
	}
}
@keyframes beforeUp {
	0% {
		transform: perspective(160px) rotateX(0deg);
	}
	100% {
		transform: perspective(160px) rotateX(180deg);
	}
}
@keyframes afterUp {
	0% {
		transform: perspective(160px) rotateX(-180deg);
	}
	100% {
		transform: perspective(160px) rotateX(0deg);
	}
}
</style>
