<template>
	<div>
		<component
			:is="svgComponent"
			v-if="showAsSvg"
			v-bind="$attrs"
			:fill="fill"
			:style="{ maxHeight: imgHeight }"
			v-on="$listeners"
		/>
		<img
			v-else
			:src="imgSrc"
			role="presentation"
			:alt="imgAlt"
			:style="{ maxHeight: imgHeight }"
		/>
	</div>
</template>

<script>
const SVG_PREFIXES = ["@assets/img/", "/_nuxt/src/assets/img/", "/_nuxt/img/"];
const SVG_SUFFIX = ".svg";
export default {
	inheritAttrs: false,
	props: {
		imgSrc: {
			type: String,
			default: "",
		},
		imgAlt: {
			type: String,
			default: "",
		},
		imgHeight: {
			type: String,
			default: "200px",
		},
		fill: {
			type: String,
			default: "currentColor",
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		showAsSvg() {
			return (
				SVG_PREFIXES.filter((prefix) => {
					return (
						this.imgSrc.startsWith(prefix) && this.imgSrc.endsWith(SVG_SUFFIX)
					);
				}).length > 0
			);
		},
		svgComponent() {
			let img;
			let sanitizedImgSrc = this.imgSrc.replace(SVG_SUFFIX, "");
			SVG_PREFIXES.forEach((prefix) => {
				sanitizedImgSrc = sanitizedImgSrc.replace(prefix, "");
			});

			// the loader config can not be stored in a variable. Webpack seems to need to precompile the loader config.
			try {
				img = require(`!!vue-svg-loader?{"svgo":{"plugins":[{"removeDimensions": true }, {"removeViewBox":false}, {"inlineStyles": true}]}}!@assets/img/${sanitizedImgSrc}.svg`);
				return img ? img.default : "";
			} catch (error) {
				console.error(
					`error loading img "${this.imgSrc}" . It might be not available.`,
					error
				);
				return undefined;
			}
		},
	},
};
</script>
