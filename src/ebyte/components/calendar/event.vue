<template>
	<div
		:class="['e-calendar-cell-events-item', type ? `e-calendar-cell-events-item-${type}` : '']"
		:style="{ backgroundColor: bgColor, color: color }"
		@click.stop.parent="handleEvent"
	>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
	name: 'CalendarEvent',
	props: {
		color: {
			type: String
		},
		bgColor: {
			type: String
		},
		type: {
			type: String as PropType<'primary' | 'success' | 'warning' | 'error' | 'info'>,
			validator: (val: string) => {
				if (val != '') {
					return ['primary', 'success', 'warning', 'error', 'info'].includes(val);
				}
				return true;
			}
		}
	},
	emits: ['click'],
	setup(props, ctx) {
		const handleEvent = evt => {
			ctx.emit('click', evt);
		};
		return {
			handleEvent
		};
	}
});
</script>
