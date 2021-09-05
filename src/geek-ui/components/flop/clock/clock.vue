<template>
	<div class="e-flop-clock">
		<template v-for="num in beforeNumArray">
			<template v-if="isNaN(num)">
				<em :style="{color:separColor || bgColor}" :ref="setFlipperRef">{{ num }}</em>
			</template>
			<template v-else>
				<flipper :bgColor="bgColor" :color='color' :duration='duration' :ref="setFlipperRef" />
			</template>
		</template>
	</div>
</template>

<script>
import { onBeforeUpdate, onUpdated, onMounted, computed, ref, watch } from 'vue';
import flipper from './flip.vue';
export default {
	name: 'Flop',
	components: {
		flipper
	},
	props: {
		modelValue: {
			type: [Number, String],
			default:''
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
		duration: {
			type: Number,
			default: 600
		},
	},
	setup(props, ctx) {
		let beforeNumber = ref(props.modelValue);
		const beforeNumArray = computed(() => {
			return String(beforeNumber.value).split('');
		});
		let flipperRefs = [];
		const setFlipperRef = el => {
			if (el) {
				flipperRefs.push(el);
			}
		};

		onBeforeUpdate(() => {
			flipperRefs = [];
		});

		onMounted(() => {
			for (let i in flipperRefs) {
				if (flipperRefs[i] instanceof Element) continue;
				flipperRefs[i].setBefore(beforeNumArray.value[i]);
			}
		});

		watch(
			() => props.modelValue,
			n => {
				running(n.split(''));
			}
		);

		const running = numberArray => {
			for (let i in flipperRefs) {
				if (flipperRefs[i] instanceof Element) continue;
				if (beforeNumArray.value[i] === numberArray[i]) {
					continue;
				}
				flipperRefs[i].running('up', beforeNumArray.value[i], numberArray[i]);
			}
			beforeNumber.value = numberArray.join('');
		};
		return {
			beforeNumArray,
			setFlipperRef
		};
	}
};
</script>

<style>
.e-flop-clock {
	text-align: center;
}
.e-flop-clock em {
	display: inline-block;
	line-height: 102px;
	font-size: 66px;
	font-style: normal;
	vertical-align: top;
}
.e-flop-clock .e-flop-flip {
	margin: 0 3px;
}
</style>
