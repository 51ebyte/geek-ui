<template>
	<div class="e-flop">
		<template v-if="type=='clock'">
			<clock :modelValue="modelValue" :bgColor="bgColor" :separColor="separColor" :color="color" :duration="duration"></clock>
		</template>
		<template v-if="type=='countTo'">
			<count-to :endVal="modelValue"></count-to>
		</template>
		<template v-if="type=='step'">
			<step-to :modelValue="modelValue" :bgColor="bgColor" :color="color" :separColor="separColor" :duration="duration"></step-to>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, computed, PropType } from 'vue';
import clock from './clock/clock.vue'
import countTo from './countTo/countTo.vue'
import stepTo from './step.vue'
export default defineComponent({
	name: 'Flop',
	components:{
		clock,
		countTo,
		stepTo
	},
	props:{
		modelValue: {
			type: [Number, String]
		},
		type:{
			type:String as PropType<'clock' | 'countTo' | 'number'>
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
		}
	},
});
</script>

<style>
</style>
