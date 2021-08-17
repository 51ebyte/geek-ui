<template>
	<div class="example">
		<Code :code="code"></Code>
	</div>
</template>

<script>
	import {ref} from 'vue'
	export default{
		data(){
			return{
				code:`
					//路由2331212
					LAY.fn.router = function(hash){
					  var hashs = (hash || location.hash).replace(/^#/, '').split('/') || [];
					  var item, param = {
					    dir: []
					  };
					  for(var i = 0; i < hashs.length; i++){
					    item = hashs[i].split('=');
					    /^\w+=/.test(hashs[i]) ? function(){
					      if(item[0] !== 'dir'){
					        param[item[0]] = item[1];
					      }
					    }() : param.dir.push(hashs[i]);
					    item = null;
					  }
					  return param;
					};
				`
			}
		}
	}
</script>

<style>
</style>
