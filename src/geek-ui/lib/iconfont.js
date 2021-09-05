import {
	h
} from 'vue'

var customCache = new Set();

const isValidCustomScriptUrl = (scriptUrl) => {
	return Boolean(typeof scriptUrl === 'string' && scriptUrl.length && !customCache.has(scriptUrl));
}

const createScriptUrlElements = (scriptUrls) => {

	for (let index = 0; index < scriptUrls.length; index++) {
		var currentScriptUrl = scriptUrls[index];

		if (isValidCustomScriptUrl(currentScriptUrl)) {
			var script = document.createElement('script');
			script.setAttribute('src', currentScriptUrl);
			script.setAttribute('data-namespace', currentScriptUrl);

			if (scriptUrls.length > index + 1) {
				script.onload = function() {
					createScriptUrlElements(scriptUrls, index + 1);
				};

				script.onerror = function() {
					createScriptUrlElements(scriptUrls, index + 1);
				};
			}

			customCache.add(currentScriptUrl);
			document.body.appendChild(script);
		}
	}
}

const template = (app, opts) => {
	let iconSize = opts.size || 24;
	let iconColor = opts.color || 'currentColor';
	app.component("IconFont", {
		render() {
			return h('svg', {
				width: `${this.size}px`,
				height: `${this.size}px`,
				fill: `${this.color}`,
				'aria-hidden': true,
				focusable: false,
				class: ''
			}, [
				h('use', {
					'xlink:href': `#${this.name}`
				})
			])
		},
		props: {
			name: {
				type: String,
				required: true
			},
			size: {
				type: Number,
				default: iconSize
			},
			color: {
				type: String,
				default: iconColor
			}
		}
	})
}

const createFromIconfontCN = (app, opts) => {
	let scriptUrl = opts.scriptUrl
	if (Array.isArray(scriptUrl)) {
		// 因为iconfont资源会把svg插入before，所以前加载相同type会覆盖后加载，为了数组覆盖顺序，倒叙插入
		createScriptUrlElements(scriptUrl.reverse());
	} else {
		createScriptUrlElements([scriptUrl]);
	}
	template(app, opts)
}

export {
	createFromIconfontCN
}
export default {}
