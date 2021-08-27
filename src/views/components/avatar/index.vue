<template>
	<div class="example">
		<Blockquote title="Avatar 头像">
			你是最可爱的人吗？😯
		</Blockquote>
		<Row :gutter="20">
			<Col :span="12">
				<Panel type="code" title="基础用法">
					<div class="e-flex e-col-center">
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="xl"></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="lg"></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="md"></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="sm"></Avatar>
						</Panel>
          </div>
          <div class="e-flex e-col-center">
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="sm" circle></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="md" circle></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar circle></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="lg" circle></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="xl" circle></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="xl" :circle="18"></Avatar>
						</Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0 ">
						<p>通过 <code>circle&lt;Boolean|Number&gt;</code> 设置圆形头像和圆形弧度</p>
						<p>通过 <code>size&lt;String|Number&gt;</code> 设置头像的大小，
            支持<code>size&lt;Number&gt;</code>和
            <code>size&lt;String&gt;(xl=64|lg=48|xs=32|md=24|sm=16)</code>，
            默认大小<code>32px</code>
            </p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code1" copy toggle :height="336"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="头像类型">
					<div class="e-flex e-row-between">
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar :size="48" icon="ios-person" background="red"></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar :size="48" icon="ios-person">USER</Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar :size="48" :src="avatar"></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar :size="48" icon="ios-person" background="#19be6b" circle></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar :size="48" icon="ios-person" circle>USER</Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar :size="48" circle :src="avatar"></Avatar>
						</Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0 ">
						<p>支持三种类型：图标、图片和字符，其中 <code>Icon</code> 和字符型可以自定义图标颜色及背景色</p>
						<p>通过 <code>background&lt;String&gt;</code> 属性设置头像背景颜色</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code2" copy toggle :height="200"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="头像加载失败">
					<div class="e-flex e-row-between">
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar :size="48" :src="empty"></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar :size="48" circle :src="empty"></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar :size="48" :src="empty">
								<template #error>error</template>
							</Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar :size="48" circle :src="empty">
								<template #error>error</template>
							</Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar :size="48" :src="empty" background="#ff0000">
								<template #error>error</template>
							</Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar :size="48" circle :src="empty" background="#ff0000">
								<template #error>error</template>
							</Avatar>
						</Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0 ">
						<p>头像类型是图片时</p>
						<p>通过插槽 <code>loading&lt;slot&gt;</code> 自定义加载时显示的内容</p>
						<p>通过插槽 <code>error&lt;slot&gt;</code> 自定义加载失败时显示的内容</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code3" copy toggle :height="226"></Code>
			</Col>
			<Col :span="12">
				<Panel type="code" title="图片填充方式">
					<div class="e-flex e-row-between">
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="xl" :src="avatar" fit="fill"></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="xl" :src="avatar" fit="contain"></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="xl"  :src="avatar" fit="cover"></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="xl" :src="avatar" fit="none"></Avatar>
						</Panel>
						<Panel :header="false" margin="0 5px 0 0">
							<Avatar size="xl"  :src="avatar" fit="scale-down"></Avatar>
						</Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0 ">
						<p>当展示类型为图片的时候，使用 <code>fit&lt;String&gt;</code> 属性定义图片如何适应容器框，同原生 <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit"><code>object-fit&lt;String&gt;</code></a></p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code4" copy toggle :height="178"></Code>
			</Col>
			
			<Col :span="12">
				<Panel type="code" title="修改头像(当展示类型为图片的时有效)">
					<div class="e-flex">
						<Panel :header='false' margin="0 5px 0 0">
							<Avatar :size="96" update upload="//jsonplaceholder.typicode.com/posts/" :src="avatar"></Avatar>
						</Panel>
						<Panel :header='false' margin="0 5px 0 0">
							<Avatar :size="96" circle update="修改头像" upload="//jsonplaceholder.typicode.com/posts/" :src="avatar"></Avatar>
						</Panel>
						<Panel :header='false' margin="0 5px 0 0">
							<Avatar :size="96" :update="{
                style:{height:'100%'},
                text:'修改头像',
                trigger:'hover'
              }" upload="//jsonplaceholder.typicode.com/posts/" :src="avatar"></Avatar>
						</Panel>
            <Panel :header='false' margin="0 5px 0 0">
            	<Avatar :size="96" circle :update="{
                style:{
                  height:'80%'
                },
                text:'修改头像',
                trigger:'hover'
              }" upload="//jsonplaceholder.typicode.com/posts/" :src="avatar"></Avatar>
            </Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0 ">
						<p>通过 <code>update&lt;Boolean&gt;</code> 属性设置为可上传模式</p>
						<p>通过 <code>update&lt;String&gt;</code> 属性设置为可上传提示文字</p>
						<p>通过 <code>update&lt;Object&gt;</code>{
              <code>style&lt;Object&gt;</code>,
              <code>text&lt;String&gt;</code>,
              <code>trigger&lt;String&gt;</code>
            } 属性设置为可自定义上传样式、文字、触发模式等</p>
						<p>通过 <code>upload&lt;String&gt;</code> 属性设置为上传路径</p>
						<p>通过 <code>upload&lt;Object&gt;</code> 属性设置为上传参数与配置</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code5" copy toggle :height="356"></Code>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Avatar Props"></Blockquote>
				<table-props :data="table.props.data" :example="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title='Avatar Upload Props'>仅展示类型为图片时有效</Blockquote>
				<table-props :cols="table.props.upload.cols" :data="table.props.upload.data"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Avatar Slots"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
			<Col :span="24">
				<Blockquote title="Avatar Event"></Blockquote>
				<table-event :data="table.event.data"></table-event>
			</Col>
		</Row>
	</div>
</template>

<script>
import {TableProps,TableSlot,TableEvent} from '../bootstrap/table.js'
export default {
	layout:'develop',
	components: {
		TableProps,
		TableSlot,
		TableEvent
	},
	data() {
		return {
			empty:'https://empty',
			avatar:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
			code1:`<Avatar size="xl"></Avatar>
				<Avatar size="lg"></Avatar>
				<Avatar></Avatar>
				<Avatar size="md"></Avatar>
				<Avatar size="sm"></Avatar>
        
				<Avatar size="sm" circle></Avatar>
				<Avatar size="md" circle></Avatar>
				<Avatar circle></Avatar>
				<Avatar size="lg" circle></Avatar>
				<Avatar size="xl" circle></Avatar>
				<Avatar size="xl" :circle="18"></Avatar>`,
			code2:`<Avatar :size="48" icon="ios-person" background="red"></Avatar>
				<Avatar :size="48" icon="ios-person">USER</Avatar>
				<Avatar :size="48" :src="avatar"></Avatar>
				<Avatar :size="48" icon="ios-person" background="#19be6b" circle></Avatar>
				<Avatar :size="48" icon="ios-person" circle>USER</Avatar>
				<Avatar :size="48" circle :src="avatar"></Avatar>`,
			code3:`<Avatar :size="48" src="https://empty"></Avatar>
				<Avatar :size="48" circle src="https://empty"></Avatar>
				<Avatar :size="48" src="https://empty">
				  <template #error>error</template>
				</Avatar>
				<Avatar :size="48" circle src="https://empty">
				  <template #error>error</template>
				</Avatar>
				<Avatar :size="48" src="https://empty" background="#ff0000">
				  <template #error>error</template>
				</Avatar>
				<Avatar :size="48" circle src="https://empty" background="#ff0000">
				  <template #error>error</template>
				</Avatar>`,
			code4:`<Avatar size="xl" :src="avatar" fit="fill"></Avatar>
				<Avatar size="xl" :src="avatar" fit="contain"></Avatar>
				<Avatar size="xl"  :src="avatar" fit="cover"></Avatar>
				<Avatar size="xl" :src="avatar" fit="none"></Avatar>
				<Avatar size="xl"  :src="avatar" fit="scale-down"></Avatar>`,
			code5:`<template>
			  <Avatar :size="96" update :upload="url" :src="avatar"></Avatar>
			  <Avatar :size="96" update :upload="upload" :src="avatar"></Avatar>
			  <Avatar :size="96" :update="{
			    style:{height:'100%'},
			    text:'修改头像',
			    trigger:'hover'
			  }" upload="url" circle :src="avatar"></Avatar>
			  <Avatar :size="96" :update="{
			    style:{height:'80%'},
			    text:'修改头像',
			    trigger:'hover'
			  }" upload="upload" circle :src="avatar"></Avatar>
			<template>
			&lt;script&gt;
			  export default{
			    data(){
			      return{
			        avatar:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
			        url:'//jsonplaceholder.typicode.com/posts/',
			        upload: {
			          //上传地址,
			          url: '//jsonplaceholder.typicode.com/posts/',
			          //上传的文件字段名
			          name: 'avatar',
			          //文件大小限制，单位 kb
			          size: 100,
			          //设置上传的请求头部
			          headers: {},
			          //设置上传的额外参数
			          data: {},
			          //支持发送 cookie 凭证信息
			          withCredentials: false,
			          //上传文件之前的钩子，参数为上传的文件，若返回 Promise.reject 则停止上传
			          before: (file) => {
			            return new Promise((resolve, reject) => {
			              resolve();
			            });
			          },
			          //文件上传成功时的钩子，返回字段为 file, response
			          complete: (file, response) => {
			            console.log(file, response);
			          },
			          //文件上传失败时的钩子，返回字段为 file, err, xhr
			          error: (file, err, xhr) => {
			            console.log(file, err, xhr);
			          },
			          //文件上传时的钩子，返回字段为 file, progress
			          progress: (file, progress) => {
			            console.log(file, progress);
			          }
			        }
			      }
			    }
			  }
			&lt;/script&gt;`,
			table:{
				props:{
					data:[
						{params:'icon',version:'0.0.1',desc:'设置头像的图标类型，参考 Icon 组件',type:'<code>String</code>',required:'否'},
						{params:'size',version:'0.0.1',desc:'设置头像的大小',type:'<code>String</code> | <code>Number</code>',required:'否',default:'<code>xs</code>',select:'<code>size&lt;String&gt;(xl|lg|xs|md|sm)'},
						{params:'width',version:'0.0.1',desc:'设置头像的宽度',type:'<code>Number</code>',required:'否',default:'<code>32</code>'},
						{params:'height',version:'0.0.1',desc:'设置头像的高度',type:'<code>Number</code>',required:'否',default:'<code>32</code>'},
						{params:'circle',version:'0.0.1',desc:'是否圆形头像',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
						{params:'background',version:'0.0.1',desc:'头像背景颜色',type:'<code>String</code>',required:'否'},
						{params:'src',version:'0.0.1',desc:'图片头像的资源地址',type:'<code>String</code>',required:'否'},
						{params:'fit',version:'0.0.1',desc:'设置图片填充模式，仅展示类型为图片时有效',type:'<code>String</code>',required:'否'},
						{params:'update',version:'0.0.1',desc:'是否可以修改头像及配置，仅展示类型为图片时有效',type:'<code>Boolean</code> | <code>String</code> | <code>Object</code>',required:'否',default:'<code>修改</code>'},
						{params:'upload',version:'0.0.1',desc:'头像上传参数及配置，仅展示类型为图片时有效',type:'<code>Object</code> | <code>String</code>',required:'否'},
					],
					upload:{
						cols:[
							{title:'参数',width:160,key:'params',align:'center'},
							{title:'版本',width:80,align:'center',key:'version'},
							{title:'说明',align:'center',key:'desc',render:'html'},
							{title:'类型',width:100,align:'center',key:'type',render:'html'},
							{title:'是否必需',width:78,key:'required',align:'center'},
							{title:'默认值',width:120,default:'-',key:'default',render:'html',align:'center'},
						],
						data:[
							{params:'url',version:'0.0.1',desc:'头像上传地址',type:'<code>String</code>',required:'是'},
							{params:'name',version:'0.0.1',desc:'头像上传的文件字段名',type:'<code>String</code>',required:'否',default:'avatar'},
							{params:'headers',version:'0.0.1',desc:'头像上传的请求头部',type:'<code>Object</code>',required:'否'},
							{params:'size',version:'0.0.1',desc:'头像上传限制大小 <code>kb</code>',type:'<code>Number</code>',required:'否',default:'200'},
							{params:'withCredentials',version:'0.0.1',desc:'头像上传支持发送 <code>cookie</code> 凭证信息',type:'<code>String</code>',required:'否'},
							{params:'before',version:'0.0.1',desc:'上传文件之前的钩子，参数为上传的文件，若返回 <code>Promise.reject</code> 则停止上传',type:'<code>Function</code>',required:'否'},
							{params:'complete',version:'0.0.1',desc:'文件上传成功时的钩子，返回字段为 <code>file&lt;File&gt;</code>, <code>response&lt;Object&gt;</code>',type:'<code>Function</code>',required:'否'},
							{params:'progress',version:'0.0.1',desc:'文件上传时的钩子，返回字段为 <code>file&lt;File&gt;</code>, <code>progress&lt;ProgressEvent &gt;</code>',type:'<code>Function</code>',required:'否'},
							{params:'error',version:'0.0.1',desc:'文件上传失败时的钩子，返回字段为 <code>file&lt;File&gt;</code>, <code>err&lt;Error&gt;</code>, <code>xhr&lt;XMLHttpRequest&gt;</code>',type:'<code>Function</code>',required:'否'},
						],
					}
				},
				slot:{
					data:[
						{title:'error',desc:'自定义错误内容，仅展示类型为图片时有效'},
						{title:'loading',desc:'自定义加载中内容，仅展示类型为图片时有效'},
						{title:'update',desc:'自定义更新文字提示内容，仅展示类型为图片时有效'},
					]
				},
				event:{
					data:[
						{name:'@error',desc:'加载错误时触发，仅展示类型为图片时有效',return:''},
					]
				}
			}
		};
	}
};
</script>

<style></style>
