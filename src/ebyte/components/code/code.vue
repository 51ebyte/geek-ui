<template>
	<div :class="['e-code', skin ? 'e-code-' + skin : '']">
		<h3 class="e-code-h3">
			<span>{{ title }}</span>
			<div class="extra">
				<slot name="extra">
					<a :class="{ link: copy }" href="javascript:;" @click="handleCopy">{{ copy ? '复制' : toggle ? '' : 'code' }}</a>
					<a href="javascript:;" class="link" v-if="toggle" @click="handleToggle">{{ unflod ? '收起' : '展开' }}</a>
				</slot>
			</div>
		</h3>
		<div class="e-code-scroll" :style="styles.scroll">
			<pre><ol class="e-code-ol" v-html="html" ref="olRef"></ol></pre>
		</div>
		<div class="e-code-more" @click="handleToggle" v-if="!unflod && toggle && height>62">展开代码</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRef, ref, computed, nextTick, onMounted, watch } from 'vue';
export default defineComponent({
	name: 'Code',
	data() {
		return {
			html: '',
			auto: ''
		};
	},
	props: {
		modelValue: {
			type: String
		},
		title: {
			type: String,
			default: '</>'
		},
		height: {
			type: Number,
			height: 300
		},
		skin: {
			type: String
		},
		code: {
			type: String,
			required: true
		},
		copy: {
			type: Boolean,
			default: false
		},
		toggle: {
			type: Boolean,
			default: false
		},
		br: {
			type: Boolean,
			default: true
		}
	},

	emits: ['update:height'],

	setup(props, ctx) {
		const height = ref<Number>(props.height);
		const br = ref<Boolean>(props.br);
		const unflod = ref<Boolean>(false);
		const code = toRef(props, 'code').value;
		const html = ref<String>('');

		const value = computed(() => (props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue)));

		const styles = computed(() => {
			var styles = { scroll: {} };
			if (typeof height.value == 'number') {
				styles.scroll['height'] = height.value + 'px';
			} else if (typeof height.value == 'string') {
				styles.scroll['height'] = height.value;
			}
			if (!br) {
				styles.scroll['overflow-x'] = 'auto';
				styles.scroll['white-space'] = 'inherit';
			}
			return styles;
		});

		const olRef = ref(null);
		const toggle = ref(false);
		onMounted(() => {
			handleHtml(code);
			nextTick(() => {
				let olHieght = olRef.value.offsetHeight;
				if (props.toggle) {
					toggle.value = olHieght > height.value;
				}
			});
		});

		watch(value, () => {
			handleHtml(value.value);
		});

		const handleHtml = (code: string) => {
			var ol = code.replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;');
			ol = ol.replace(/</g, '&lt;').replace(/>/g, '&gt;');
			ol = ol.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
			ol = ol.replace(/[\r\t\n]+/g, '</li><li>');
			ol = '<li>' + ol + '</li>';
			html.value = ol;
		};

		var copy = toRef(props, 'copy').value;
		const handleCopy = (evt: MouseEvent) => {
			if (copy) {
				const textarea = document.createElement('textarea');
				textarea.readOnly = 'readonly';
				textarea.style.position = 'absolute';
				textarea.style.left = '-9999px';
				textarea.value = olRef.value.innerText;
				document.body.appendChild(textarea);
				textarea.select();
				const result = document.execCommand('Copy');
				if (result) {
					alert('复制成功');
				}
				document.body.removeChild(textarea);
			}
		};

		const handleToggle = (evt: MouseEvent) => {
			height.value = unflod.value ? props.height : 'auto';
			unflod.value = !unflod.value;
			ctx.emit('update:height', height.value);
		};

		return {
			value,
			olRef,
			toggle,
			styles,
			unflod,
			html,
			handleCopy,
			handleToggle
		};
	}
});
</script>

<style>
@import url('../../styles/code.css');
</style>
