<template>
	<div
		:class="['e-notice',`e-notice-${placement}`]"
		:style="{
			top: `${top}px`
		}"
		:id="id"
	>
		<transition :name="placement=='topLeft'?'move-left':'move-right'">
			<div class="e-notice-container" v-show="visible">
				<div class="e-notice-icon" v-if="icon">
					<Icon
						:class="{
							'e-loading-loop': type == 'loading'
						}"
						:name="icon.name"
						:color="icon.color"
						:size="desc ? 32 : 18"
					></Icon>
				</div>
				<div class="e-notice-conetent">
					<div class="e-notice-conetent-title"><Render :render="title"></Render></div>
					<div
						class="e-notice-conetent-desc"
						:style="{
							marginTop: `${desc ? 8 : 0}px`
						}"
					>
						<Render :render="desc"></Render>
					</div>
				</div>
				<div class="e-notice-close" v-if="closable"><Icon class="close" name="md-close" color="#999" :size="20" @click="handleClose"></Icon></div>
			</div>
		</transition>
	</div>
</template>

<script>
import Icon from '../icon/icon.vue';
import Render from '../base/render.js';
import { defineComponent, onMounted, ref, computed } from 'vue';
export default defineComponent({
	name: 'Notice',
	components: {
		Icon,
		Render
	},
	props: {
		id: {
			type: String
		},
		type: {
			type: String,
			default: ''
		},
		title: {
			type: [String, Object]
		},
		desc: {
			type: [String, Object]
		},
		closable: {
			type: Boolean,
			default: false
		},
		duration: {
			type: Number,
			default: 4500
		},
		top: {
			type: Number,
			default: 0
		},
		placement: {
			type: String,
			default: 'topRight'
		}
	},
	emits: ['close', 'destroy'],
	setup(props, ctx) {
		const visible = ref(false);

		onMounted(() => {
			if (props.duration > 0) {
				setTimeout(() => {
					handleClose();
				}, props.duration);
			}
			visible.value = true;
		});

		const icon = computed(() => {
			let icon = {
				info: { name: 'ios-information-circle', color: '#2d8cf0' },
				success: { name: 'ios-checkmark-circle', color: '#19be6b' },
				error: { name: 'ios-close-circle', color: '#ed4014' },
				warning: { name: 'ios-alert', color: '#f90' }
			};
			return icon[props.type];
		});

		const handleClose = () => {
			visible.value = false;
			ctx.emit('close');
			setTimeout(() => {
				ctx.emit('destroy');
			}, 3000);
		};

		return {
			visible,
			icon,
			handleClose
		};
	}
});
</script>

<style>
@import url('../../styles/notice.css');
</style>
