<template>
	<table :class="classs" :style="styles">
		<thead>
			<template v-for="row in columns">
				<tr>
					<template v-for="col in row">
						<th :colspan="col.colspan" :rowspan="col.rowspan" :width="col.width" :style="col.style">
							<div class="e-table-cell">{{ col.title }}</div>
						</th>
					</template>
				</tr>
			</template>
		</thead>
		<tbody>
			<template v-for="(row, i) in data">
				<tr @click="handleRowClick(row,i,$event)">
					<template v-for="(col, j) in row">
						<td :colspan="col.colspan" :rowspan="col.rowspan" :style="col.style">
							<div class="e-table-cell">
								<template v-if="col.type=='render'">
									<table-render :render="col.vnode"></table-render>
								</template>
								<template v-if="col.type=='html'">
									<span v-html="col.text"></span>
								</template>
								<template v-if="col.type=='text'">
									{{ col.text }}
								</template>
							</div>
						</td>
					</template>
				</tr>
			</template>
		</tbody>
		<tfoot></tfoot>
	</table>
</template>

<script lang="ts">
import util from './util.js';
import TableRender from './render'
import { toRef, defineComponent,h } from 'vue';
export default defineComponent({
	name: 'Table',
	components:{
		TableRender
	},
	props: {
		cols: {
			type: Array,
			required: true,
			default: []
		},
		data: {
			type: Array,
			default: []
		},
		border: {
			type: Boolean,
			default: false
		},
		paging: {
			type: [Boolean, String],
			default: false
		}
	},
	emits:['on-row-click'],
	setup(props, ctx) {
		const columns = toRef(props, 'cols').value;
		const data = toRef(props, 'data').value;
		const border = toRef(props, 'border').value;
		const theadTr = [];

		const theadTh = columns.map((col, index) => {
			col.colspan = util.colspan(col.children);
			col.rowspan = util.rowspan(col.children);
			col.style = [
				border ? 'border-width:1px' : '',
				`text-align:${col.align || 'left'}`, 
				`width:${col.width+'px' || 'auto'}`, 
        `min-width:${col.minWidth}px`
				];
			return col;
		});
		theadTr.push(theadTh);

		var tbody = [];

		if (data.length < 1) {
			tbody = [
				[{
					type:'text',
					colspan: theadTr[theadTr.length - 1].length,
					text: '暂无数据',
					style: [`text-align:center`, `height:36px`, border ? 'border-width:1px' : '']
				}]
			];
		} else {
			tbody = data.map((row, i) => {
				let tr = [];
				columns.forEach((col, j) => {
					var td = {}
					if(typeof col.render =='function'){
						td = {
							type:'render',
							vnode:col.render(h,{
								index:i,
								rows:row
							}),
						}
					}else if(typeof col.render == 'string'){
						td = {
							type:'html',
							text: (typeof row[col.key] == 'boolean'?row[col.key]+'':row[col.key]) || col.default || '',
						}
					}else{
						td = {
							type:'text',
							text: (typeof row[col.key] == 'boolean'?row[col.key]+'':row[col.key]) || col.default || '',
						};
					}
					td['style'] = [`text-align:${col.align || 'left'}`, border ? 'border-width:1px' : ''];
					tr.push(td);
				});
				return tr;
			});
		}
		
		const handleRowClick = (row:Object,index:Number,evt:MouseEvent,)=>{
			ctx.emit('on-row-click',row,index,evt)
		}

		const classs = ['e-table'];
		const styles = {};
		return {
			classs: classs,
			styles: styles,
			columns: theadTr,
			data: tbody,
			handleRowClick
		};
	}
});
</script>

<style>
@import url('../../styles/table.css');
</style>
