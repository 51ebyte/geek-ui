import * as vue from 'vue'
import $Layer from './layer.js'
import $Message from './message.js'
import $Notice from './notice.js'
/**
 * 判断是否是16进制颜色
 */
const isColor = (val) => {
	return /^#[0-9A-F]{6}$/i.test(val);
}
/**
 * 判断是否百分比
 */
const isPercentage = (val) => {
	return new RegExp(/^\d+%$/).test(val);
}
/**
 * 生产随机数
 */
const random = (length = 2, prefix = '', suffix = '') => {
	let min = parseInt(1 + Array(length).join(0));
	let max = parseInt(1 + Array(length + 1).join(0) - 1);
	let number = Math.ceil(Math.random() * (max - min + 1) + min);
	return prefix + number + suffix;
}
/**
 * 多有以前
 */
const timeFrom = (dateTime = null, format = 'yyyy-mm-dd hh:MM:ss') => {
	return new Promise(resolve => {
		// 如果为null,则格式化当前时间
		if (!dateTime) dateTime = Number(new Date());
		// 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
		if (dateTime.toString().length == 10) dateTime *= 1000;
		let timestamp = +new Date(Number(dateTime));

		let timer = (Number(new Date()) - timestamp) / 1000;
		// 如果小于5分钟,则返回"刚刚",其他以此类推
		let tips = '';
		switch (true) {
			case timer < 300:
				tips = '刚刚';
				break;
			case timer >= 300 && timer < 3600:
				tips = parseInt(timer / 60) + '分钟前';
				break;
			case timer >= 3600 && timer < 86400:
				tips = parseInt(timer / 3600) + '小时前';
				break;
			case timer >= 86400 && timer < 2592000:
				tips = parseInt(timer / 86400) + '天前';
				break;
			default:
				// 如果format为false，则无论什么时间戳，都显示xx之前
				if (format === false) {
					if (timer >= 2592000 && timer < 365 * 86400) {
						tips = parseInt(timer / (86400 * 30)) + '个月前';
					} else {
						tips = parseInt(timer / (86400 * 365)) + '年前';
					}
				} else {
					tips = timeFormat(timestamp, format);
				}
		}
		resolve(tips)
	});
}
/**
 * 格式化时间
 */
const timeFormat = (dateTime = null, format = 'yyyy-mm-dd hh:MM:ss', promise = true) => {

	let week = ['日', '一', '二', '三', '四', '五', '六'];
	if (!dateTime) dateTime = Number(new Date());
	if (dateTime.toString().length == 10) dateTime *= 1000;
	let date = new Date(dateTime);
	let ret;
	let opt = {
		"y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"h+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"s+": date.getSeconds().toString() // 秒
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(format);
		if (ret) {
			format = format.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};

	const result = {
		date: date,
		format: format,
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
		week: week[date.getDay()],
		timestamp: date.getTime()
	}
	return promise ? Promise.resolve(result) : result;
}
/**
 * 当前时间
 */
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
	if (typeof format == 'function') {
		callback = format;
		format = 'yyyy-mm-dd hh:MM:ss'
	}
	if (typeof callback == 'function') {
		let timer = window.setInterval(() => {
			handle(format).then((res) => {
				callback(res, timer)
			})
		}, 1000)
	}
	return handle(format);
}
/**
 * 深克隆
 */
const deepClone = (obj) => {
	// 对常见的“非”值，直接返回原来值
	if ([null, undefined, NaN, false].includes(obj)) return obj;
	if (typeof obj !== "object" && typeof obj !== 'function') {
		//原始类型直接返回
		return obj;
	}
	var o = isArray(obj) ? [] : {};
	for (let i in obj) {
		if (obj.hasOwnProperty(i)) {
			o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
		}
	}
	return o;
}
/**
 * 深合并
 */
const deepMerge = (obj1, obj2) => {
	let key;
	for (key in obj2) {
		if(vue.isVNode(obj2[key])){
			(obj1[key] = obj2[key])
		}else if(obj1[key] && obj1[key].toString() === "[object Object]"){
			deepMerge(obj1[key], obj2[key])
		}else{
			(obj1[key] = obj2[key])
		}
	}
	return obj1;
}

const deepCopy = deepClone;

export {
	isColor,
	random,
	isPercentage,
	nowTime,
	timeFrom,
	timeFormat,
	deepClone,
	deepCopy,
	deepMerge
}

export default {
	isColor,
	random,
	isPercentage,
	nowTime,
	timeFrom,
	timeFormat,
	deepClone,
	deepCopy,
	deepMerge,
	$Layer,
	$Message,
	$Notice
}
