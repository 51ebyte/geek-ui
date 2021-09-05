<template>
	<div class="example">
		<Panel type="code" title="当前时间">
			<div style="padding-left: 2em;">
				<p style="margin-top: 18px;margin-bottom: 24px;">函数第一个参数是时间的格式，可选的参数，函数第二个参数是回调参数，返回结果。</p>
			</div>
			<Blockquote>
				<template #title>
					<h3 style="margin-bottom: 10px;">nowTime(format = String | Function,callback = Function)</h3>
				</template>
				<p><code>format&lt;String | Function&gt;</code> 时间格式，默认为<code>yyyy-mm-dd hh:MM:ss</code></p>
				<p><code>callback&lt;Function&gt;</code> 回调函数，第一个参数是时间结果，第二个参数是定时器<code>setInterval</code>ID值（ID值务必在<code>unmounted</code>方法中清除），仅JS用法支持</p>
			</Blockquote>
			<Row :gutter="10">
				<Col :span="8">
					<Code title="<组件用法 />" skin="dark" :code="nowTimeCom" copy></Code>
				</Col>
				<Col :span="8">
					<Code title="<指令用法 />" skin="dark" :code="nowTimeDir" copy></Code>
				</Col>
				<Col :span="8">
					<Code title="<JS用法 />" skin="dark" :code="nowTimeJs" copy></Code>
				</Col>
			</Row>
		</Panel>
		<Panel type="code" title="格式化时间">
			<!-- <div v-timeFormat="1630158804"></div> -->
			<div style="padding-left: 2em;">
				<p style="margin-top: 18px;">函数必须传入第一个参数，格式为任何合法的时间格式、秒或毫秒的时间戳，第二个参数是时间的格式，可选的的参数。</p>
				<p style="margin-bottom: 24px;">参数<code>week&lt;false | String&gt;</code>表示是否显示星期，<code>false</code>表示不显示，JS用法不支持此参数</p>
			</div>
			<Blockquote>
				<template #title>
					<h3 style="margin-bottom: 10px;">timeFormat(timestamp=String | Number, format = String)</h3>
				</template>
				<p><code>timestamp&lt;String | Number&gt;</code>  时间戳</p>
				<p><code>format&lt;String&gt;</code> 时间格式，默认为<code>yyyy-mm-dd hh:MM:ss</code>，如果时间戳距离此时的时间，大于一个月，则返回一个格式化好的时间，如果此参数为false，返回均为"多久之前"的结果。</p>
				<p><code>week&lt;String | String&gt;</code>  显示星期，JS用法不支持此参数</p>
			</Blockquote>
			<Row :gutter="10">
				<Col :span="8">
					<Code title="<组件用法 />" skin="dark" :code="timeFormatCom" copy></Code>
				</Col>
				<Col :span="8">
					<Code title="<指令用法 />" skin="dark" :code="timeFormatDir" copy></Code>
				</Col>
				<Col :span="8">
					<Code title="<JS用法 />" skin="dark" :code="timeFormatJs" copy></Code>
				</Col>
			</Row>
		</Panel>
		<Panel type="code" title="多久以前">
			<p style="text-indent: 2em;margin-bottom: 24px;margin-top: 18px;">函数必须传入第一个参数，格式为任何合法的时间格式、秒或毫秒的时间戳，
				第二个参数是可选的，返回的值类似刚刚，25分钟前，3小时前，7天前的结果。 
				如果第二个参数是时间的格式，当前和传入时间戳相差大于一个月时，返回格式化好的时间；
				如果第二个参数为false，则不会返回格式化好的时间，而是诸如"xxx年前"的结果。
			</p>
			<Blockquote>	
				<template #title>
					<h3 style="margin-bottom: 10px;">timeFrom(timestamp=String | Number, format = String | false)</h3>
				</template>
				<p><code>timestamp&lt;String | Number&gt;</code>  时间戳</p>
				<p><code>format&lt;String&gt;</code> 时间格式，默认为<code>yyyy-mm-dd hh:MM:ss</code>，如果时间戳距离此时的时间，大于一个月，则返回一个格式化好的时间，如果此参数为false，返回均为"多久之前"的结果。</p>
			</Blockquote>
			<Row :gutter="10">
				<Col :span="8">
					<Code title="<组件用法 />" skin="dark" :code="timeFromCom" copy></Code>
				</Col>
				<Col :span="8">
					<Code title="<指令用法 />" skin="dark" :code="timeFromDir" copy></Code>
				</Col>
				<Col :span="8">
					<Code title="<JS用法 />" skin="dark" :code="timeFromJs" copy></Code>
				</Col>
			</Row>
		</Panel>
	</div>
</template>

<script>
	export default{
		layout:'develop',
		data(){
			return{
				nowTimeCom:`<NowTime></NowTime>
					<NowTime dynamic format="yyyy-mm-dd hh:MM:ss"></NowTime>
					<NowTime dynamic :week="false" format="yyyy-mm-dd hh:MM:ss"></NowTime>`,
				nowTimeDir:`<div v-nowTime></div>
					<div v-nowTime="{
					  week:false,
					  dynamic:true,
					  format:'yyyy-mm-dd hh:MM:ss'
					}"></div>`,
				nowTimeJs:`this.$geek.nowTime((dynamic,timer)=>{})
					this.$geek.nowTime('yyyy-mm-dd hh:MM:ss',(dynamic,timer)=>{
					  this.timer = timer;
					  console.log(dynamic)
					}).then((res)=>{
					  console.log(res)
					})`,
				timeFormatCom:`<TimeFormat v-model="timestamp"></TimeFormat>
					<TimeFormat v-model="timestamp" format="yyyy-mm-dd hh:MM:ss" :week="false"></TimeFormat>
					<TimeFormat v-model="timestamp" format="yyyy-mm-dd hh:MM:ss" week="周"></TimeFormat>`,
				timeFormatDir:`<div v-timeFormat="{
					  timestamp:1630158804,
					  format:'yyyy-mm-dd hh:MM:ss',
					  week:false || '周'
					}"></div>
					<div v-timeFormat="1630158804"></div>`,
				timeFormatJs:`let timestamp = 1630158804;
					let format = 'yyyy-mm-dd hh:MM:ss';
					this.$geek.timeFormat(timestamp,format).then((res)=>{
					  console.log(res)
					})`,
				timeFromCom:`<TimeFrom v-model="timestamp"></TimeFrom>
					<TimeFrom v-model="timestamp" format="yyyy-mm-dd hh:MM:ss"></TimeFrom>`,
				timeFromDir:`<div v-timeFrom="{
					  timestamp:1630158804,
					  format:'yyyy-mm-dd hh:MM:ss'
					}"></div>
					<div v-timeFrom="1630158804"></div>`,
				timeFromJs:`let timestamp = 1630158804;
					let format = 'yyyy-mm-dd hh:MM:ss';
					this.$geek.timeFrom(timestamp,format).then((res)=>{
					  console.log(res)
					})`,
			}
		},
		mounted() {
			// this.$geek.timeFrom(1630158804,'yyyy-mm-dd hh:MM:ss').then((res)=>{
			// 	console.log(res)
			// })
			// this.$geek.timeFormat(1630158804,'yyyy-mm-dd hh:MM:ss').then((res)=>{
			// 	console.log(res)
			// })
			this.$geek.nowTime('yyyy-mm-dd hh:MM:ss',(dynamic,timer)=>{
				this.timer = timer;
				console.log(dynamic)
			}).then((res)=>{
				console.log(res)
			})
		},
		unmounted() {
			window.clearInterval(this.timer)
		}
	}
</script>

<style>
</style>
