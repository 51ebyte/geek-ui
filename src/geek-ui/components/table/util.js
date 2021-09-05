export default {
	colspan: function(col) {
		let colspan = 0;
		const computed = (col) => {
			if (col) {
				colspan += col.length;
				col.forEach((c) => {
					computed(c.children);
				})
			}
		};
		if (col) {
			computed(col);
			if (colspan > col.length) {
				colspan -= col.length;
			}
		} else {
			colspan = 1;
		}
		return colspan;
	},
	rowspan: function(col) {
		let rowspan = 1;
		return rowspan;
	},
	makeColumnsId: function(columns) {
		if (columns) {
			return columns.map(item => {
				if ('children' in item) this.makeColumnsId(item.children);
				return item;
			});
		}
	},
}
