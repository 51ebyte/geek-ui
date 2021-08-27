<template>
  <div class="example">
		<Blockquote title="Upload 文件上传">
			喜欢吃什么随便写😊
		</Blockquote>
		
		<Row :gutter="20">
			<Col :span="12">
				<Panel type='code' title="基本用法">
					<div class="e-flex e-col-center">
						<Panel :header="false" margin="5px">
							<Upload :url="url"></Upload>
						</Panel>
						<Panel :header="false" margin="5px">
							<Upload :url="url">
								<a href="javascript:;">上传文件</a>
							</Upload>
						</Panel>
					</div>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>最基本用法，点击上传，一次选择一个文件</p>
						<p>可通过默认插槽设置触发上传组件的控件</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code1" :height="194" copy></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="上传列表">
					<Panel :header="false" margin="5px">
						<Upload :url="url" list></Upload>
					</Panel>
					<Panel :header="false" margin="5px">
						<Upload :url="url" list="card"></Upload>
					</Panel>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>可通过<code>list&lt;String&gt;</code>属性设置是否显示文件列表及样式，支持<code>list</code> | <code>card</code>两种样式</p>
						<p>可通过作用域插槽<code>list</code>自定义文件列表样式及事件</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code2" :height="337" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="上传配置项">
					<Row :gutter="10">
						<Col :span="12">
							<Panel :header='false'>
								<Upload :url="url" :options="options"></Upload>
							</Panel>
						</Col>
						<Col :span="12">
							<Panel :header='false'>
								<Upload :url="url" name="file" :size="200" :headers="{}" multiple :disabled="false"></Upload>
							</Panel>
						</Col>
					</Row>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>组件接收 <code>url&lt;String&gt;</code> 和 <code>options&lt;Object&gt;</code>两个参数，
							<code>options&lt;Object&gt;</code>参数也可通过<code>props&lt;Object&gt;</code>方式传输，
							但优先使用<code>options&lt;Object&gt;</code>参数配置项</p>
						<p><code><pre style="white-space: pre-wrap;">options:{
    name:'file', //上传的文件字段名
    size:20000,//上传的文件最大限制，单位kb
    headers:{},//设置上传的请求头部
    multiple:true,//是否支持多选文件
    disabled:false, //是否禁用
    data:{},//上传时附带的额外参数
    withCredentials:false,//支持发送 cookie 凭证信息
    list:false,//是否显示已上传文件列表
    autoUpload:false,//是否在选取文件后立即进行上传
    accept:'image/*',//接受上传的文件类型
    format:['jpg','png']//支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用
}</pre></code></p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code3" :height="466" copy toggle></Code>
			</Col>
			<Col :span="12">
				<Panel type='code' title="手动上传">
					<div class="e-flex">
						<Button type="primary" @click="handleUpload">上传文件</Button>
						<div class="e-flex-1">
							<Upload :url="url" list :autoUpload='false' ref="upload">
								<Button>选择文件</Button>
							</Upload>
						</div>
					</div>
					<Divider left text="用法说明" margin="26px 0 0">
						<p>通过 <code>autoUpload&lt;Boolean&gt;</code> 参数设置默认选择文件不立即上传，通过组件方法<code>upload</code>手动上传</p>
					</Divider>
				</Panel>
			</Col>
			<Col :span="12">
				<Code skin="dark" :code="code4" :height="146" copy toggle></Code>
			</Col>
			<Col :span="24">
				<Panel type='code' title="上传事件">
					<Upload :url="url" :before="handleBefore" :error="handleError" :progress="handleProgress" :complete="handleComplete"></Upload>
					<Divider left text="用法说明" margin="26px 0 0">
						<p><code>before&lt;Function&gt;</code> 上传文件之前的钩子，参数为上传的文件列表<code>files&lt;File&gt;</code>，若返回 <code>Promise</code> 且被 <code>reject</code>，则停止上传</p>
						<p><code>progress&lt;Function&gt;</code> 上传文件时的钩子，参数为上传的文件<code>file&lt;File&gt;</code>和<code>event&lt;ProgressEvent&gt;</code></p>
						<p><code>error&lt;Function&gt;</code> 上传文件失败的钩子，参数为上传的文件<code>file&lt;File&gt;</code>、错误类型<code>type&lt;String&gt;</code>和错误信息<code>msg&lt;String&gt;</code></p>
						<p><code>complete&lt;Function&gt;</code> 上传文件成功的钩子，参数为上传的文件<code>file&lt;File&gt;</code>和<code>response&lt;Object&gt;</code></p>
						<p>手动上传和自动上传均支持以上回调方法</p>
					</Divider>
				</Panel>
			</Col>
			<Divider margin="20px 0"></Divider>
			<Col :span="24">
				<Blockquote title="Upload Props"></Blockquote>
				<table-props :data="table.props.data" :example="false"></table-props>
			</Col>
			<Col :span="24">
				<Blockquote title="Upload Slots"></Blockquote>
				<table-slot :data="table.slot.data"></table-slot>
			</Col>
			<Col :span="24">
				<Blockquote title="Upload Methods"></Blockquote>
				<table-methods :data="table.methods.data"></table-methods>
			</Col>
		</Row>
		
  </div>
</template>

<script>
	import {TableProps,TableSlot,TableMethods} from '../bootstrap/table.js'
  export default {
    layout:'develop',
		components:{
			TableProps,
			TableSlot,
			TableMethods
		},
		data(){
			return{
				url:'//127.0.0.1:9002/file/upload/file',
				options:{
					type:'',
					name:'files',
					size:20000,
					headers:{},
					multiple:true,
					disabled:false,
					data:{},
					withCredentials:false,
					list:false,
					autoUpload:false,
					accept:'image/*',
					format:['jpg','png']
				},
				code1:`<Upload url="//jsonplaceholder.typicode.com/posts/"></Upload>`,
				code2:`<Panel :header="false" margin="5px">
					  <Upload url="//jsonplaceholder.typicode.com/posts/" list></Upload>
					</Panel>
					<Panel :header="false" margin="5px">
					  <Upload url="//jsonplaceholder.typicode.com/posts/" list="card"></Upload>
					</Panel>
					<Panel :header="false" margin="5px">
					  <Upload url="//jsonplaceholder.typicode.com/posts/" list="card">
					    <template v-slot:list="{file}">{{file.name}}</template>
					  </Upload>
					</Panel>
					<Panel :header="false" margin="5px">
					  <Upload url="//jsonplaceholder.typicode.com/posts/" list>
					    <template v-slot:list="{file}">{{file.name}}</template>
					  </Upload>
					</Panel>`,
				code3:`<template>
					  <Upload :url="url" :options="options"></Upload>
					  <Upload :url="url" name="file" :size="200" :headers="{}" multiple :disabled="false"></Upload>
					</template>
					&lt;script&gt;
				  export default(){
				    data(){
				      return{
				        //必选参数，上传的地址
				        url:'//jsonplaceholder.typicode.com/posts/',
				        options:{
				          //上传的文件字段名
				          name:'file',
				          //上传的文件最大限制，单位kb
				          size:20000,
				          //设置上传的请求头部
				          headers:{},
				          //是否支持多选文件
				          multiple:true,
				          //是否禁用
				          disabled:false,
				          //上传时附带的额外参数
				          data:{},
				          //支持发送 cookie 凭证信息
				          withCredentials:false,
				          //是否显示已上传文件列表
				          list:false,
				          //是否在选取文件后立即进行上传
				          autoUpload:false,
				          //接受上传的文件类型
				          accept:'image/*',
				          //支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用
				          format:['jpg','png']
				        }
				      }
				    }
				  }
					&lt;/script&gt;`,
				code4:`<template>
					<Button type="primary" @click="handleUpload">上传文件</Button>
					<Upload url="//jsonplaceholder.typicode.com/posts/" list :autoUpload='false' ref="upload">
					  <Button>选择文件</Button>
					</Upload>
					</template>
					&lt;script&gt;
					export default(){
					  methods:{
					    handleUpload(){
					      this.$refs.upload.upload({
					        before:(files)=>{},
					        progress:(file,e)=>{},
					        error:(files,type,msg)=>{},
					        complete:(file,response)=>{},
					      })
					    }	
					  }	
					}
					&lt;/script&gt;`,
				table:{
					props:{
						data:[
							{params:'url',version:'0.0.1',desc:'上传的地址，必填',type:'<code>String</code>',required:'是'},
							{params:'name',version:'0.0.1',desc:'上传的文件字段名',type:'<code>String</code>',required:'否',default:'<code>file</code>'},
							{params:'size',version:'0.0.1',desc:'上传的文件最大限制，单位kb',type:'<code>Number</code>',required:'否',default:'<code>200</code>'},
							{params:'headers',version:'0.0.1',desc:'设置上传的请求头部',type:'<code>Object</code>',required:'否'},
							{params:'multiple',version:'0.0.1',desc:'是否支持多选文件',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'disabled',version:'0.0.1',desc:'是否禁用',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'data',version:'0.0.1',desc:'上传时附带的额外参数',type:'<code>Object</code>',required:'否'},
							{params:'withCredentials',version:'0.0.1',desc:'支持发送 cookie 凭证信息',type:'<code>Boolean</code>',required:'否',default:'<code>false</code>'},
							{params:'list',version:'0.0.1',desc:'是否显示已上传文件列表',type:'<code>Boolean</code> | <code>String</code>',required:'否',default:'<code>false</code>',select:'<code>list</code> | <code>card</code>'},
							{params:'autoUpload',version:'0.0.1',desc:'是否在选取文件后立即进行上传',type:'<code>Boolean</code>',required:'否',default:'<code>true</code>'},
							{params:'accept',version:'0.0.1',desc:'接受上传的文件类型',type:'<code>String</code>',required:'否'},
							{params:'format',version:'0.0.1',desc:'支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用',type:'<code>Array</code>',required:'否'},
							{params:'files',version:'0.0.1',desc:'上传的文件列表, 例如: [{name: \'food.jpg\', url: \'https://xxx.cdn.com/xxx.jpg\'}]',type:'<code>Array</code>',required:'否'},
							{params:'options',version:'0.0.1',desc:'配置项，各配置项的集合',type:'<code>Object</code>',required:'否'},
							{params:'before',version:'0.0.1',desc:'上传文件之前的钩子，参数为上传的文件列表<code>files&lt;File&gt;</code>，若返回 <code>Promise</code> 且被 <code>reject</code>，则停止上传',type:'<code>Function(files&lt;File&gt;)</code>',required:'否'},
							{params:'error',version:'0.0.1',desc:'上传文件失败的钩子，参数为上传的文件<code>file&lt;File&gt;</code>、错误类型<code>type&lt;String&gt;</code>和错误信息<code>msg&lt;String&gt;</code>',type:'<code>Function(file&lt;File&gt;,type&lt;String&gt;,msg&lt;String&gt;)</code>',required:'否'},
							{params:'progress',version:'0.0.1',desc:'上传文件时的钩子，参数为上传的文件<code>file&lt;File&gt;</code>和<code>event&lt;ProgressEvent&gt;</code>',type:'<code>Function(file&lt;File&gt;,event&lt;ProgressEvent&gt;)</code>',required:'否'},
							{params:'complete',version:'0.0.1',desc:'上传文件成功的钩子，参数为上传的文件<code>file&lt;File&gt;</code>和<code>response&lt;Object&gt;</code>',type:'<code>Function(file&lt;File&gt;,response&lt;Object&gt;)</code>',required:'否'},
							{params:'remove',version:'0.0.1',desc:'删除文件之前的钩子，参数为删除的文件<code>file&lt;File&gt;</code>，若返回 <code>Promise</code> 且被 <code>reject</code>，则取消删除',type:'<code>Function(file&lt;File&gt;)</code>',required:'否'},
						]
					},
					slot:{
						data:[
							{title:'default',desc:'触发文件选择框的控件'},
							{title:'list',desc:'自定义文件列表'},
						]
					},
					methods:{
						data:[
							{name:'upload',desc:'手动上传文件列表',params:''},
						]
					}
				}
			}
		},
		methods:{
			handleUpload(){
				this.$refs.upload.upload()
			},
			handleError(files,type,msg){
			},
			handleBefore(files){
				return new Promise((resolve, reject) => {
				  resolve();
				});
			},
			handleProgress(file,e){
			},
			handleComplete(file,response){
			},
		}
  }
</script>

<style>
</style>
