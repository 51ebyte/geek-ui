<template>
	<div :class="classs" v-if="show">
    <slot></slot>
    <span class="close" v-if="closable" @click="handleClose"></span>
  </div>
</template>

<script lang="ts">
	import { defineComponent,computed,toRef,ref } from 'vue'
  
  type ColorType = PropType<'primary' | 'success' | 'warning' | 'error' | 'info'>;
  
	export default defineComponent({
		name:'Tag',
    props:{
      type:{
        type: String as ColorType,
        validator: (val: string) => {
        	if (val != '') {
        		return ['primary', 'success', 'warning', 'error', 'info'].includes(val);
        	}
        	return true;
        }
      },
      closable:{
        type: Boolean,
        default: false
      },
      plain: {
      	type: Boolean,
      	default: false
      },
      
    },
    setup(props,ctx){
      
      const show = ref(true)
      
      const type = toRef(props,'type').value;
      const closable = toRef(props,'closable').value;
      
      const classs=computed(()=>{
        let classs = ['e-tag']
        classs.push(type?`e-tag-${type}`:'e-tag-default')
        
        classs.push(closable?`e-tag-closable`:'')
        return classs;
      })
      
      const handleClose=()=>{
        show.value = false;
      }
      
      return{
        show,
        classs,
        handleClose
      }
    }
	})
</script>

<style>
</style>
