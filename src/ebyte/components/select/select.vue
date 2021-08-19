<template>
	<div :class="classs.default">
		<div class="e-select-input" @click="handleClickInputbox" @keyup.delete="handleDeleteTag">
			<template v-if="multiple">
				<template v-for="(tag,index) in inputTag">
					<div class="tag" @click.stop="handleDeleteTag(tag,index)" :title="'点击删除/'+tag[labelKey]">
						<span class="text">{{ tag[labelKey] }}</span>
					</div>
				</template>
				<input ref="inputRef" :placeholder="inputTag.length<1?placeholder:''" :disabled="disabled" :value="inputLabel" @input="handleInput" @focus="handleFocus" @blur="handleBlur" />
			</template>
			<template v-else>
				<input class="input" type="text" ref="inputRef" :placeholder="placeholder" :disabled="disabled" :value="inputLabel" :readonly="!inputFilter" @input="handleInput" @focus="handleFocus" @blur="handleBlur" />
				<span class="icon"></span>
			</template>
		</div>
		<div class="e-select-dropdown" v-if="!disabled" @mouseenter.stop="onMouseOptionEnter" @mouseleave.stop="onMouseOptionLeave">
			<ul class="e-select-ul">
				<template v-for="(item, index) in list">
					<li :class="{
							disabled: item.disabled,
							selected: inputTag.findIndex(e => e.value == item[valueKey]) >= 0 || inputLabel && inputLabel == item[labelKey],
							group:!!item.group
						}"
						@click.stop="handleClickOption(item, index)"
					>
						<slot :item="item" :index="index">{{ item.group || item[labelKey] }}</slot>
					</li>
				</template>
				<template v-if="list.length < 1">
					<li class="empty">{{noText}}</li>
				</template>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRefs, toRef, onMounted } from 'vue';
import { UPDATE_MODEL_VALUE_EVENT } from './../../lib/constants.js';
import util from './../../lib/util.js';
export default defineComponent({
	name: 'Select',
	props: {
		modelValue: {
			type: [String, Number, Array],
			default: ''
		},
		placeholder:{
			type: String,
			default: '请选择'
		},
		noText:{
			type: String,
			default: '无匹配数据'
		},
		list: {
			type: Array,
			required: true
		},
		disabled:{
			type: Boolean,
			default: false
		},
		filter: {
			type: Boolean,
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		},
		labelKey:{
			type:String,
			default:'label'
		},
		valueKey:{
			type:String,
			default:'value'
		}
	},
	emits: [UPDATE_MODEL_VALUE_EVENT, 'change', 'update:list'],
	setup(props, ctx) {
		let classs = ref({ default: ['e-select'], input: [] });

		let list = ref(props.list);
		let deepList = JSON.parse(JSON.stringify(props.list));

		const isUnfold = ref(false);
		const hoverUnfold = ref(false);
		const inputRef = ref(null);
		const inputValue = computed(() => (props.modelValue === null || props.modelValue === undefined ? '' : props.modelValue));
		const inputLabel = ref('');
		const inputFilter = toRef(props, 'filter').value;
		const inputTag = ref([]);
		
		onMounted(()=>{
			if(props.disabled){
				classs.value.default.push('e-select-disabled')
			}
			if(inputValue.value){
				if(typeof inputValue.value =='number' || typeof inputValue.value =='string'){
					let index = deepList.findIndex(e=>e.value == inputValue.value);
					inputLabel.value = index>=0?deepList[index][props.labelKey]:'';
				}else if(typeof (inputValue.value) =='object' && multiple.value){
					inputValue.value.map(v=>{
						let item = deepList.filter(e=>e.value == v);
						if(!item[0]['disabled']){
							inputTag.value.push(item[0])
						}
					})
				}
			}
		})

		//是否多选
		const multiple = computed(() => {
			const multiple = toRef(props, 'multiple').value;
			if (multiple) {
				classs.value.default.push('e-select-multiple');
			}
			return multiple;
		});
		//输入框聚焦
		const handleFocus = (evt: MouseEvent) => {
			let defaultClass = classs.value.default;
			let key = defaultClass.findIndex(e => e == 'e-select-unfold');
			if (key < 0) {
				defaultClass.push('e-select-unfold');
			}
			isUnfold.value = true;
		};
		//输入框失去焦点
		const handleBlur = (evt: MouseEvent) => {
			if (!hoverUnfold.value) {
				let defaultClass = classs.value.default;
				let key = defaultClass.findIndex(e => e == 'e-select-unfold');
				if (key >= 0) {
					classs.value.default.splice(key, 1);
				}
				isUnfold.value = false;
			}
		};
		//鼠标移入下拉选择框
		const onMouseOptionEnter = (evt: MouseEvent) => {
			hoverUnfold.value = true;
			isUnfold.value = true;
		};
		//鼠标移出下拉选择框
		const onMouseOptionLeave = (evt: MouseEvent) => {
			hoverUnfold.value = false;
			isUnfold.value = false;
		};
		//监听输入框变化
		const handleInput = (evt: MouseEvent) => {
			const { value } = evt.target;
			inputLabel.value = value;
			if (isUnfold.value) {
				list.value = deepList.filter(function(item) {
					return item[props.labelKey]?(item[props.labelKey].toLowerCase().search(value.toLowerCase()) >= 0 ? item : ''):'';
				});
			}
		};
		//点击下拉选项
		const handleClickOption = (item, index) => {
			if (item.disabled || item.group) return;
			if (multiple.value) {
				let index = inputTag.value.findIndex(e => e.value == item[props.valueKey]);
				if (index >= 0) {
					inputTag.value.splice(index, 1);
				} else {
					inputTag.value.push(item);
				}
				inputRef.value.focus();
				ctx.emit(UPDATE_MODEL_VALUE_EVENT, inputTag.value);
				ctx.emit('change', inputTag.value);
			} else {
				if (item[props.valueKey] === inputValue.value) return;
				isUnfold.value = false;
				inputLabel.value = item[props.labelKey];
				ctx.emit(UPDATE_MODEL_VALUE_EVENT, item[props.valueKey]);
				ctx.emit('change', item, index);
				let defaultClass = classs.value.default;
				let key = defaultClass.findIndex(e => e == 'e-select-unfold');
				if (key >= 0) {
					classs.value.default.splice(key, 1);
				}
			}
		};
		//点击input区域box
		const handleClickInputbox = (item, index) => {
			if (multiple.value) {
				inputRef.value.focus();
			}
		};
		//删除tag
		const handleDeleteTag=(item,index)=>{
			if(inputLabel.value.length <= 0){
				inputTag.value.splice(index>=0?index:inputTag.value.length-1,1)
			}
		}
		return {
			classs,
			inputRef,
			list,
			multiple,
			inputTag,
			inputFilter,
			inputValue,
			inputLabel,
			isUnfold,
			handleInput,
			handleFocus,
			handleBlur,
			handleClickOption,
			onMouseOptionEnter,
			onMouseOptionLeave,
			handleClickInputbox,
			handleDeleteTag,
		};
	}
});
</script>

<style>
@import url('../../styles/select.css');
</style>
