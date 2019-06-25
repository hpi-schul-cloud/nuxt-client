<template>
	<component
		:is="svgComponent"
		ref="icon"
		:class="['icon', source]"
		v-bind="$attrs"
		:fill="fill"
		v-on="$listeners"
	/>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		source: {
			type: String,
			required: true,
			validator: function(to) {
				return ["material", "custom", "fa"].includes(to);
			},
		},
		icon: {
			type: String,
			required: true,
		},
		fill: {
			type: String,
			default: "currentColor",
		},
	},
	computed: {
		svgComponent() {
			let icon;
			// the loader config can not be stored in a variable. Webpack seems to need to precompile the loader config.
			try {
				if (this.source === "custom") {
					// src: @assets/icons
					icon = require(`!!vue-svg-loader?{"svgo":{"plugins":[{"removeDimensions": true }, {"removeViewBox":false}]}}!@assets/icons/${
						this.icon
					}.svg`);
				}
				if (this.source === "material") {
					// src: https://material.io/tools/icons/?style=baseline
					icon = require(`!!vue-svg-loader?{"svgo":{"plugins":[{"removeDimensions": true }, {"removeViewBox":false}]}}!material-icons-svg/icons/baseline-${
						this.icon
					}-24px.svg`);
				}
				if (this.source === "fa") {
					// src: https://fontawesome.com/icons?d=gallery
					icon = require(`!!vue-svg-loader?{"svgo":{"plugins":[{"removeDimensions": true }, {"removeViewBox":false}]}}!@fortawesome/fontawesome-free/svgs/${
						this.icon
					}.svg`);
				}
				return icon.default;
			} catch (error) {
				console.error(
					`error loading icon "${this.icon}" from "${
						this.source
					}". It might be not available.`,
					error
				);
				return undefined;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.icon {
	display: inline-block;
	width: 1em;
	height: 1em;
	vertical-align: baseline;
}

.material {
	// remove material icon margin
	width: calc(1em + 4px);
	height: calc(1em + 4px);
	/* stylelint-disable */
	margin: -4px 0;
	/* stylelint-enable */
}
</style>
