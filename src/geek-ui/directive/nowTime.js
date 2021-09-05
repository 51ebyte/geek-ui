const nowTime = (format, callback) => {
	const handle = (format = 'yyyy-mm-dd hh:MM:ss') => {
		let week = ['日', '一', '二', '三', '四', '五', '六'];
		let nowDate = new Date();
		let ret;
		let opt = {
			"y+": nowDate.getFullYear().toString(), // 年
			"m+": (nowDate.getMonth() + 1).toString(), // 月
			"d+": nowDate.getDate().toString(), // 日
			"h+": nowDate.getHours().toString(), // 时
			"M+": nowDate.getMinutes().toString(), // 分
			"s+": nowDate.getSeconds().toString() // 秒
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(format);
			if (ret) {
				format = format.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1]
					.length, "0")))
			};
		};
		return new Promise(resolve => {
			resolve({
				date: nowDate,
				format: format,
				year: nowDate.getFullYear(),
				month: nowDate.getMonth() + 1,
				day: nowDate.getDate(),
				hours: nowDate.getHours(),
				minutes: nowDate.getMinutes(),
				seconds: nowDate.getSeconds(),
				week: week[nowDate.getDay()],
				timestamp: nowDate.getTime()
			})
		});
	}
	return handle(format);
}


const render = (el, value = {}, week) => {
	nowTime(value.format).then(res => {
		let html = `<div style="display:flex;align-items:center;">`;
		html += `<span>${value.prefix || ''}</span>`;
		html += `<span>${res.format}</span>`;
		html += week ? `<span style="margin-left:6px;">星期${res.week}</span>` : '';
		html += `</div>`;
		el.innerHTML = html;
	})
}
export default {
	name: 'nowTime',
	beforeMount(el, {
		modifiers,
		value
	}, vnode) {
		render(el, value, modifiers.week)
		if (modifiers.dynamic) {
			setInterval(() => {
				render(el, value, modifiers.week)
			}, 1000)
		}
	}
}
