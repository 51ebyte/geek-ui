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
	let iconFill = opts.fill || '';
	let iconStroke = opts.stroke || '';
	app.component("IconPark", {
		render() {

			let props = {
				size: `${this.size}px`,
				name: this.name,
				width: this.width,
				height: this.height,
				stroke: this.stroke,
				fill: this.fill,
				style: this.style,
				class: this.class
			}

			if (this.spin) {
				props.spin = true;
			}

			if (this.rtl) {
				props.rtl = true;
			}

			return h('iconpark-icon', props)
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
			width: String,
			height: String,
			stroke: {
				type: String,
				default: iconStroke
			},
			fill: {
				type: String,
				default: iconFill
			},
			rtl: Boolean,
			spin: Boolean,
			style: Object,
			class: {
				type: [Object, String]
			},
		}
	})
}

const createFromIconPark = (app, opts) => {
	let scriptUrl = opts.scriptUrl
	if (Array.isArray(scriptUrl)) {
		createScriptUrlElements(scriptUrl.reverse());
	} else {
		createScriptUrlElements([scriptUrl]);
	}
	template(app, opts)
}

export {
	createFromIconPark
}
export default {}
