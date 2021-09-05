<template>
	<div :class="classs.default" :style="styles.default" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
		
		<Icon class="icon-clear" :size="16" name="ios-close-circle" v-if="showClear" @mousedown.prevent @click="handleClear"></Icon>

		<template v-if="type == 'number'">
			<InputNumber v-model="inputNumberValue"
			 :max="max" :min="min" :setp="setp" :controls="controls" 
			 :strictly="strictly" :precision="precision" :align="align"
			 :disabled="disabled" :width='width'
			 @input="handleInput"></InputNumber>
		</template>

		<template v-else-if="type == 'textarea'">
			<textarea class="e-input e-input-textarea" wrap="soft" rows="2" spellcheck="false"></textarea>
		</template>

		<template v-else>
			<div class="e-icon-prefix" v-if="showPrefix">
				<slot name="prefix">
					<Icon :option="icon.prefix"></Icon>
				</slot>
			</div>
			<div class="e-icon-prepend" v-if="showPrepend"><slot name="prepend"></slot></div>
			<input
				:value="modelValue"
				:class="classs.input"
				:style="styles.input"
				autocomplete="off"
				:type="inputType"
				:readonly="readonly"
				:disabled="disabled"
				:placeholder="placeholder"
				@input="handleInput"
				@focus="handleFocus"
				@blur="handleBlur"
				@change="handleChange"
				@keydown="handleKeydown"
				@keypress="handleKeypress"
			/>
			<div class="e-icon-password-uppercase" v-if="type == 'password' && hasUppercase">
				<span class="lock">已开启大写锁定</span>
				<Icon name="md-lock" />
			</div>
			<div class="e-icon-password" v-if="type == 'password'" @click="handlePassword">
				<Icon :name="inputType == 'text' ? 'ios-eye-outline' : 'ios-eye-off-outline'"></Icon>
			</div>

			<div class="e-icon-suffix" v-if="showSuffix">
				<slot name="suffix"><Icon :option="icon.suffix"></Icon></slot>
			</div>
			<div class="e-icon-append" v-if="showAppend"><slot name="append"></slot></div>

			<div class="e-input-prompt" v-if="showPrompt" @mouseenter.stop="onMousePromptEnter" @mouseleave.stop="onMousePromptLeave">
				<ul class="e-input-prompt-list">
					<template v-for="(item, index) in prompt.list">
						<li class="e-input-prompt-item" @click="handlePrompt(item, index, $event)">
							<slot name="prompt" :item="item">{{ item[prompt.key] }}</slot>
						</li>
					</template>
					<template v-if="prompt.list.length < 1">
						<li class="e-input-prompt-empty">暂无匹配项</li>
					</template>
				</ul>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent,PropType, toRef, ref, computed, watch, nextTick, onMounted, onUpdated } from 'vue';
import { UPDATE_MODEL_VALUE_EVENT } from './../../lib/constants.js';
import config from './../../lib/config.js';

import InputNumber from './input-number.vue'
export default defineComponent({
	name: 'Input',
	components:{
		InputNumber
	},
	props: {
		modelValue: {
			type: [String, Number],
			default: ''
		},
		//输入框类型
		type: {
			type: String as PropType<'text' | 'password' | 'textarea' | 'number'>,
			default: 'text',
			validator: (val: string) => {
				if (val != '') {
					return ['text', 'password', 'textarea', 'number'].includes(val);
				}
				return true;
			}
		},
		//显示清空图标
		clearable: {
			type: Boolean,
			default: false
		},
		//占位符
		placeholder: {
			type: String,
			default: '请输入内容'
		},
		//只读
		readonly: {
			type: Boolean,
			default: false
		},
		//禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//必填项
		required: {
			type: Boolean,
			default: false
		},
		//行内
		inline: {
			type: Boolean,
			default: false
		},
		//宽度
		width:{
			type: [String,Number]
		},
		//前置
		prefix: {
			type: [String, Object]
		},
		//后置
		suffix: {
			type: [String, Object]
		},
		//输入建议
		prompt:{
			type: [Object,Array]
		},
		//边框
		upperCase:{
			type: [Boolean,Number,String]
		},
		//type=number有效
		max:{
			type:Number
		},
		min:{
			type:Number
		},
		setp:{
			type:Number,
			default: 1
		},
		controls:{
			type: String,
			default: 'outside'
		},
		strictly:{
			type:Number
		},
		precision:{
			type:Number
		},
		align:{
			type:String,
		}
	},
	emits: [UPDATE_MODEL_VALUE_EVENT, 'input', 'change', 'focus', 'blur', 'clear', 'mouseleave', 'mouseenter', 'keydown','update:prompt'],
	setup(props, ctx) {
		const theme = config.opts('theme');
		
		let classs = ref({ default: ['e-input-wrapper'], input: ['e-input',theme ? 'e-theme-' + theme : ''] });
		let styles = ref({ default: {}, input: {} });
		
		const focused = ref(false);
		const hovering = ref(false);
		
		const inputValue = computed(() => (props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue)));
		const inputNumberValue = ref<Number>(Number(props.modelValue) || 1)
		const inputType = ref(props.type);
		
		const disabled = toRef(props, 'disabled').value;
		const inline = toRef(props, 'inline').value;
		const width = toRef(props, 'width').value;
		const border = toRef(props, 'border').value;
		
		if(disabled){
			classs.value.input.push('e-input-disabled');
		}
		
		//行内元素
		if(inline){
			classs.value.default.push('e-input-inline');
			if(props.width){
				styles.value.input['width']=typeof width=='number'?width+'px':width
			}
		}

		//密码框设置
		if(props.type=='password'){
			classs.value.default.push('e-input-password');
		}
		const handlePassword = (evt:MouseEvent)=>{
			inputType.value = inputType.value=='text'?'password':'text'
		}
		//设置前后图标
		const showPrefix  = computed(()=>{
			const showPrefix = !!props.prefix || !!ctx.slots.prefix;
			showPrefix?styles.value.input['padding-left'] = '38px':'';
			return showPrefix;
		})
		const showSuffix = computed(()=>{
			const showSuffix = !!props.suffix || !!ctx.slots.suffix;
			showSuffix?styles.value.input['padding-right'] = '38px':'';
			return showSuffix;
		})
		//设置图标
		const icon = computed(() => {
			var icon = { prefix: {},suffix:{} };
			if (typeof props.prefix == 'object') {
				icon.prefix = props.prefix;
			} else if (typeof props.prefix == 'string') {
				icon.prefix = { name: props.prefix };
			}

			if (typeof props.suffix == 'object') {
				icon.suffix = props.suffix;
			} else if (typeof props.suffix == 'string') {
				icon.suffix = { name: props.suffix };
			}
			return icon;
		});
		//设置前后插槽
		if(!!ctx.slots.append || ctx.slots.prepend){
			classs.value.default.push('e-flex')
			classs.value.default.push('e-col-center')
		}
		const showPrepend = computed(()=>{
			if(!!ctx.slots.prepend){
				classs.value.default.push('e-icon-prepend');
			}
			return !!ctx.slots.prepend;
		})
		const showAppend = computed(()=>{
			if(!!ctx.slots.append){
				classs.value.default.push('e-icon-append');
			}
			return !!ctx.slots.append;
		})
		//start输入建议
		const hoverPrompt = ref(false);
		const showPrompt = computed(()=>{
			let showPrompt = (props.prompt && focused.value);
			if(showPrompt){
				classs.value.default.push('e-input-prompt');
			}else{
				let index = classs.value.default.findIndex(e => e == 'e-input-prompt');
				if(index>=0){
					classs.value.default.splice(index, 1);
				}
			}
			return showPrompt;
		})
		let promptList = {};
		const prompt = computed(()=>{
			let prompt = {
				list:[],
				key:'value'
			}
			const promptObj = toRef(props, 'prompt').value;
			if(promptObj instanceof Array){
				prompt.list = promptObj;
			}else if(promptObj instanceof Object){
				prompt.list = promptObj.list || {};
				prompt.key = promptObj.key || {};
			}
			promptList = JSON.parse(JSON.stringify(prompt.list))
			return prompt;
		})
		const handlePrompt = (item,index,evt:MouseEvent)=>{
			const value = item[prompt.value.key];
			if (value === inputValue.value) return;
			focused.value = false;
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, value);
			ctx.emit('input', value);
		}
		const onMousePromptEnter = (evt: MouseEvent) => {
			hoverPrompt.value = true;
		};
		const onMousePromptLeave = (evt: MouseEvent) => {
			hoverPrompt.value = false;
		};
		//end输入建议

		//监听value值变化
		const handleInput = (evt: MouseEvent) => {
			const { value } = evt.target;
			if (value === inputValue.value) return;
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, value);
			ctx.emit('input', value);
			if(inputType.value == 'number'){
				inputNumberValue.value = (parseInt(value*Math.pow(10,props.precision))/Math.pow(10,props.precision)).toFixed(props.precision);
			}
			if(showPrompt.value){
				var list = promptList.filter(function(item){
					return item[prompt.value.key].search(value) >= 0 ? item : ''
				})
				prompt.value.list = list;
				ctx.emit('update:prompt',list);
			}
		};

		//value 改变
		const handleChange = (evt: MouseEvent) => {
			ctx.emit('change', evt.target.value);
		};

		//聚焦按下键
		const handleKeydown = (evt: MouseEvent) => {
			ctx.emit('keydown', evt);
		};

		//聚焦按下键，用来接收字母、数字等ANSI字符
		const hasUppercase = ref<Boolean>(false)
		const handleKeypress =  (evt: MouseEvent) => {
			if(props.upperCase){
				let index = classs.value.default.findIndex(e => e == 'e-input-password-uppercase');
				var e =  evt || window.event;
				var keyCode = e.keyCode || e.which; 
				var isShift = e.shiftKey || (keyCode == 16 ) || false ; 
				if (((keyCode >= 65 && keyCode <= 90 ) && !isShift) || ((keyCode >= 97 && keyCode <= 122 ) &&  isShift)){
					hasUppercase.value = true;
					if(index<0){
						classs.value.default.push('e-input-password-uppercase');
					}
				}else{
					if(index >= 0){
						classs.value.default.splice(index, 1);
					}
					hasUppercase.value = false;
				}
			}
		};
		//输入框聚焦
		const handleFocus = (evt: MouseEvent) => {
			classs.value.input.push('e-input-focus');
			focused.value = true;
			ctx.emit('focus', evt);
		};

		//输入框失去焦点
		const handleBlur = (evt: MouseEvent) => {
			let index = classs.value.input.findIndex(e => e == 'e-input-focus');
			if(index>=0){
				classs.value.input.splice(index, 1);
			}
			if(showPrompt.value){
				if(props.prompt.length<1 || !hoverPrompt.value){
					focused.value = false;
				}
			}else{
				focused.value = false;
			}
			ctx.emit('blur', evt);
		};

		//清除 value
		const showClear = computed(() => {
			return props.clearable && !props.readonly && !disabled && (focused.value || hovering.value);
		});
		const handleClear = (evt: MouseEvent) => {
			ctx.emit(UPDATE_MODEL_VALUE_EVENT, '');
			ctx.emit('change', '');
			ctx.emit('clear');
		};

		//鼠标移入
		const onMouseEnter = (evt: MouseEvent) => {
			hovering.value = true;
			ctx.emit('mouseenter', evt);
		};
		//鼠标移出
		const onMouseLeave = (evt: MouseEvent) => {
			hovering.value = false;
			ctx.emit('mouseleave', evt);
		};

		return {
			classs,
			styles,
			inputType,
			inputNumberValue,
			showClear,
			handleClear,
			showPrefix,
			showSuffix,
			icon,
			showPrepend,
			showAppend,
			showPrompt,
			prompt,
			handlePrompt,
			onMousePromptEnter,
			onMousePromptLeave,
			handlePassword,
			handleInput,
			handleFocus,
			handleBlur,
			handleChange,
			handleKeydown,
			hasUppercase,
			handleKeypress,
			onMouseEnter,
			onMouseLeave
		};
	}
});
</script>

<style>
@import url('../../styles/input.css');
</style>
