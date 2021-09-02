<template>
	<div class="example">
		<Blockquote title='Calendar 日历'>
			按照日历形式展示数据的容器。
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel :header='false'>
					<div style="width: 100%;height: 480px;">
						<Calendar :disabled="disabled" :events="events" :extra="extra" @dayClick='dayClick' @event="event"></Calendar>
					</div>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code1" copy toggle :height="462"></Code>
			</Col>
			<Col :span="12">
				<Panel :header='false'>
					<div style="width: 100%;height: 480px;">
						<Calendar :disabled="disabled" @dayClick='dayClick' @event="event" :extra="extra">
							<template v-slot:event="{day}">
								<CalendarEvent type="primary" v-if="day.isToday">今天</CalendarEvent>
								<CalendarEvent v-if="day.day==1">默认</CalendarEvent>
								<CalendarEvent type="primary" v-if="day.day==2">主要{{day.date}}</CalendarEvent>
								<CalendarEvent type="success" v-if="day.day==3">成功</CalendarEvent>
								<CalendarEvent type="error" v-if="day.day==4">错误</CalendarEvent>
								<CalendarEvent type="warning" v-if="day.day==5">警告</CalendarEvent>
								<CalendarEvent type="info" v-if="day.day==6">信息</CalendarEvent>
								<CalendarEvent bgColor="#FF0000" color="white" v-if="day.day==7">自定义</CalendarEvent>
								<CalendarEvent v-if="day.day==8">
									<Badge :offset="false" status="success"></Badge>
									<span style="margin-left: 4px;">自定义带徽标自定义带徽标</span>
								</CalendarEvent>
							</template>
						</Calendar>
					</div>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code2" copy toggle :height="462"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Calendar props"></Blockquote>
				<table-props :data="table.props.calendar" :select='false' :example="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="CalendarEvent props"></Blockquote>
				<table-props :data="table.props.calendarEvent" :select='false' :example="false"></table-props>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Calendar slot"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
		</Row>
	</div>
</template>

<script>
	import {TableProps,TableSlot,TableEvent} from '../bootstrap/table.js'
	export default{
		layout:'develop',
		components: {
			TableProps,
			TableSlot,
			TableEvent
		},
		data() {
			return{
				extra:[
					{date:'2021-01-01',extra:['元旦']},
					{date:'2021-09-01',extra:['开学季','报名']},
					{date:'2021-09-10',extra:['教师节']},
					{date:'2021-10-01',extra:"国庆节"},
					{date:'2021-12-24',extra:"平安夜"},
					{date:'2021-12-25',extra:"圣诞节"},
					{date:'2021-12-31',extra:"跨年夜"}
				],
				code1:`<template>
					  <Calendar :disabled="disabled" :events="events" :extra="extra" @dayClick="dayClick" @event="event"></Calendar>
					</template>
					&lt;script&gt;
					  export default{
					    data(){
					      return{
					        extra:[
					          {date:'2021-01-01',extra:['元旦']},
					          {date:'2021-09-01',extra:['开学季','报名']},
					          {date:'2021-09-10',extra:['教师节']},
					          {date:'2021-10-01',extra:"国庆节"},
					          {date:'2021-12-24',extra:"平安夜"},
					          {date:'2021-12-25',extra:"圣诞节"},
					          {date:'2021-12-31',extra:"跨年夜"}
					        ],
					      }
					    },
					    methods:{
					      disabled(date){
					        return date && date.valueOf() &lt; Date.now() - 86400000;
					      },
					      events(date){
					        let event = [];
					        switch(date.getDate()){
					          case 1:
					            event = ['默认']
					          break;
					          case 2:
					            event = [{text:'主要',type:'primary'}]
					          break;
					          case 3:
					            event = [{text:'成功',type:'success'}]
					          break;
					          case 4:
					            event = [{text:'错误',type:'error'}]
					          break;
					          case 5:
					            event = [{text:'警告',type:'warning'}]
					          break;
					          case 6:
					            event = [{text:'信息',type:'info'}]
					          break;
					          case 7:
					            event = [{text:'自定义',bgColor:'#ff0000',color:'white'}]
					          break;
					        }
					        return event;
					      },
					      dayClick(date){
					        alert(JSON.stringify(date))
					      },
					      event(date,event){
					        console.log(date,event)
					      }
					    }
					  }
					&lt;/script&gt;`,
				code2:`<template>
					  <Calendar :disabled="disabled" :extra="extra" @dayClick="dayClick" @event="event">
					    <template v-slot:event="{day}">
					      <CalendarEvent type="primary" v-if="day.isToday">今天</CalendarEvent>
					      <CalendarEvent v-if="day.day==1">默认</CalendarEvent>
					      <CalendarEvent type="primary" v-if="day.day==2">主要{{day.date}}</CalendarEvent>
					      <CalendarEvent type="success" v-if="day.day==3">成功</CalendarEvent>
					      <CalendarEvent type="error" v-if="day.day==4">错误</CalendarEvent>
					      <CalendarEvent type="warning" v-if="day.day==5">警告</CalendarEvent>
					      <CalendarEvent type="info" v-if="day.day==6">信息</CalendarEvent>
					      <CalendarEvent bgColor="#FF0000" color="white" v-if="day.day==7">自定义</CalendarEvent>
					      <CalendarEvent v-if="day.day==8">
					        <Badge :offset="false" status="success"></Badge>
					        <span style="margin-left: 4px;">自定义带徽标自定义带徽标</span>
					      </CalendarEvent>
					    </template>
					  </Calendar>
					</template>
					&lt;script&gt;
					  export default{
					    data(){
					      return{
					        extra:[
					          {date:'2021-01-01',extra:['元旦']},
					          {date:'2021-09-01',extra:['开学季','报名']},
					          {date:'2021-09-10',extra:['教师节']},
					          {date:'2021-10-01',extra:"国庆节"},
					          {date:'2021-12-24',extra:"平安夜"},
					          {date:'2021-12-25',extra:"圣诞节"},
					          {date:'2021-12-31',extra:"跨年夜"}
					        ],
					      }
					    },
					    methods:{
					      disabled(date){
					        return date && date.valueOf() &lt; Date.now() - 86400000;
					      },
					      dayClick(date){
					        alert(JSON.stringify(date))
					      },
					      event(date,event){
					        console.log(date,event)
					      }
					    }
					  }
					&lt;/script&gt;`,
				table:{
					props:{
						calendar:[
							{params:'disabled',version:'0.0.1',desc:'禁用的日期',type:'<code>Array</code> | <code>Function</code>',required:'否'},
							{params:'extra',version:'0.0.1',desc:'额外的字符，表示节日或信息有用',type:'<code>String</code>',required:'否'},
							{params:'events',version:'0.0.1',desc:'日期事件',type:'<code>Array</code> | <code>Function</code>',required:'否'},
						],
						calendarEvent:[
							{params:'color',version:'0.0.1',desc:'事件组件文字颜色色',type:'<code>String</code>',required:'否'},
							{params:'bgColor',version:'0.0.1',desc:'事件组件背景色',type:'<code>String</code>',required:'否'},
							{params:'type',version:'0.0.1',desc:'使用预设的类型，可选值为 <code>primary</code>、<code>success</code>、<code>error</code>、<code>warning</code>、<code>info</code>',type:'<code>String</code>',required:'否'},
						]
					},
					slot:{
						data:[
							{title:'event',desc:'自定义日期事件，见上方示例'},
						]
					}
				}
			}
		},
		methods:{
			disabled(date){
				return date && date.valueOf() <	 Date.now() - 86400000;
			},
			events(date){
				let event = [];
				switch(date.getDate()){
					case 1:
						event = ['默认']
					break;
					case 2:
						event = [{text:'主要',type:'primary'}]
					break;
					case 3:
						event = [{text:'成功',type:'success'}]
					break;
					case 4:
						event = [{text:'错误',type:'error'}]
					break;
					case 5:
						event = [{text:'警告',type:'warning'}]
					break;
					case 6:
						event = [{text:'信息',type:'info'}]
					break;
					case 7:
						event = [{text:'自定义',bgColor:'#ff0000',color:'white'}]
					break;
				}
				return event;
			},
			dayClick(date){
				alert(JSON.stringify(date))
			},
			event(date,event){
				alert(JSON.stringify(event))
			}
		}
	}
</script>

<style>
</style>
