<template>
	<div class="example">
		<Blockquote title="Picker 选择器">
			火锅、烧烤、海鲜和干锅我都要！🤭
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="基础用法-选择日期、时间">
					<Row :gutter="20">
						<Col :span="8">
							<Picker v-model="date"></Picker>
						</Col>
						<Col :span="8">
							<Picker v-model="time" type='time'></Picker>
						</Col>
						<Col :span="8">
							<Picker v-model="datetime" type="datetime"></Picker>
						</Col>
					</Row>
				</Panel>
			</Col>
			<Col :span="12">
			</Col>
			<Col :span="12">
				<Panel type="code" title="年、月">
					<Row :gutter="20">
						<Col :span="12">
							<Picker v-model="year" type="year" :disabled="['2023']"></Picker>
						</Col>
						<Col :span="12">
							<Picker v-model="month" type="month" :disabled="['10']"></Picker>
						</Col>
					</Row>
				</Panel>
			</Col>
			<Col :span="12">
			</Col>
			<Col :span="12">
				<Panel type="code" title="禁用日期、时间">
					<Panel :header="false">
						<Row :gutter="20">
							<Col :span="12">
								<Picker v-model="date" :disabled="['2021-08-29','2021-08-26']"></Picker>
							</Col>
							<Col :span="12">
								<Picker v-model="date" :disabled="disabledDate"></Picker>
							</Col>
						</Row>
					</Panel>
					<Panel :header="false">
						<Row :gutter="20">
							<Col :span="12">
								<Picker v-model="time" type='time' :disabled="['02','09']"></Picker>
							</Col>
							<Col :span="12">
								<Picker v-model="time" type='time' :disabled="disabledTime"></Picker>
							</Col>
						</Row>
					</Panel>
					<Panel :header="false">
						<Row :gutter="20">
							<Col :span="12">
								<Picker v-model="datetime" type='datetime' :disabled="['2021-08-29','2021-08-26']"></Picker>
							</Col>
							<Col :span="12">
								<Picker v-model="datetime" type='datetime' :disabled="disabledDateTime"></Picker>
							</Col>
						</Row>
					</Panel>
				</Panel>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default{
		layout:'develop',
		data(){
			return{
				date:0,
				time:0,
				datetime:0,
				year:'2022',
				month:'2022-10'
			}
		},
		created() {
			let date = new Date();
			date.setDate('12')
			this.date = date;
			
			let time = new Date();
			time.setHours('12')
			time.setMinutes('10')
			time.setSeconds('04')
			this.time = time;
			
			let datetime = new Date();
			datetime.setDate(datetime.getDate()-1)
			datetime.setMinutes('30')
			datetime.setSeconds('00')
			this.datetime = datetime;
			
		},
		methods:{
			disabledDate(date){
				return date && date.valueOf() < Date.now() - 86400000;
			},
			disabledTime(time){
				return time && time.valueOf() < 9;
			},
			disabledDateTime(date){
				if(date && date instanceof Date){
					return date.valueOf() < Date.now() - 86400000;
				}
				if(date && typeof date=='string'){
					return date.valueOf() < 9;
				}
			}
		}
	}
</script>

<style>
</style>
