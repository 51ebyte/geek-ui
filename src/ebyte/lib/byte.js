import * as vue from 'vue'
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

export default {
	isColor,
	random,
	isPercentage
}
