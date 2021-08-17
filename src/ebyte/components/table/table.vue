<template>
	<table :class="classs" :style="styles" border="1">
		<thead>
			<!-- <tr>
				<th colspan="1" rowspan="3">id</th>
				<th colspan="2" rowspan="1">姓名</th>
				<th colspan="1" rowspan="3">年龄</th>
				<th colspan="7" rowspan="1">地址</th>
			</tr>
			<tr>
				<th colspan="1" rowspan="2">张</th>
				<th colspan="1" rowspan="2">三</th>
				<th colspan="2" rowspan="1">省</th>
				<th colspan="1" rowspan="1">市</th>
				<th colspan="4" rowspan="1">区</th>
			</tr>
			<tr>
				<th colspan="1" rowspan="1">省</th>
				<th colspan="1" rowspan="1">直辖市</th>
				<th colspan="1" rowspan="1">地级市</th>
				<th colspan="1" rowspan="1">区</th>
				<th colspan="1" rowspan="1">县</th>
				<th colspan="1" rowspan="1">县级市</th>
			</tr> -->

			<template v-for="col in columns">
				<tr>
					<template v-for="th in col">
						<th :colspan="th.colspan" :rowspan="th.rowspan">{{ th.title }}</th>
					</template>
				</tr>
			</template>
		</thead>
		<tbody></tbody>
		<tfoot></tfoot>
	</table>
</template>

<script lang="ts">
	import util from './util.js'
export default {
	name: 'Table',
	props: {
		cols: {
			type: Array,
			required: true
		},
		data: {
			type: Array
		}
	},
	setup(props, context) {
		const cols = [
			[
				{ width: 80, title: 'id', colspan: '1', rowspan: '3' },
				{ width: 80, title: '姓名', colspan: '2', rowspan: '1' },
				{ width: 80, title: '年龄', colspan: '1', rowspan: '3' },
				{ width: 80, title: '地址', colspan: '6', rowspan: '1' }
			],
			[
				{ width: 80, title: '张', colspan: '1', rowspan: '2' }, 
				{ width: 80, title: '三', colspan: '1', rowspan: '2' }, 
				{ width: 80, title: '省', colspan: '2', rowspan: '1' }, 
				{ width: 80, title: '市', colspan: '1', rowspan: '1' }, 
				{ width: 80, title: '区', colspan: '4', rowspan: '1' },
			],
			[
				{ width: 80, title: '省', colspan: '1', rowspan: '1' },
				{ width: 80, title: '直辖市', colspan: '1', rowspan: '1' },
				{ width: 80, title: '地级市', colspan: '1', rowspan: '1' },
				{ width: 80, title: '区', colspan: '1', rowspan: '1' },
				{ width: 80, title: '县', colspan: '1', rowspan: '1' },
				{ width: 80, title: '县级市', colspan: '1', rowspan: '1' }
			]
		];

		const columns = props.cols;
		var thead = [];
		var tr = [];
		
		util.rowspan(columns)

		// columns.forEach(col => {
		// 	let colspan = util.colspan(col.children);
		// 	let rowspan = util.rowspan(col.children);
		// 	tr.push({ title: col.title, colspan: colspan,rowspan:rowspan });
		// });

		console.log(tr);

		const classs = ['e-table'];
		const styles = {};
		return {
			classs: classs,
			styles: styles,
			columns: cols
		};
	}
};
</script>

<style>
@import url('../../styles/table.css');
</style>
