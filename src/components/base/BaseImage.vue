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
				(this.imgSrc.startsWith("@assets/img/") ||
					this.imgSrc.startsWith("/_nuxt/src/assets/img/")) &&
				this.imgSrc.endsWith(".svg")
			);
		},
		svgComponent() {
			let img;
			const sanitizedImgSrc = this.imgSrc
				.replace("@assets/img/", "")
				.replace("/_nuxt/src/assets/img/", "");
			// the loader config can not be stored in a variable. Webpack seems to need to precompile the loader config.
			try {
				img = require(`!!vue-svg-loader?{"svgo":{"plugins":[{"removeDimensions": true }, {"removeViewBox":false}]}}!@assets/img/${sanitizedImgSrc}`);
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
