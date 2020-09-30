<template>
	<component
		:is="svgComponent"
		v-if="source !== 'fa' && svgComponent"
		ref="icon"
		:class="['icon', source]"
		v-bind="$attrs"
		:fill="fill"
		v-on="$listeners"
	/>
	<i
		v-else-if="source === 'fa'"
		:class="['icon', 'fa', `fa-${icon}`]"
		:style="{ color: fillColor }"
	></i>
	<!-- eslint-disable -->
	<span
		v-else
		class="icon"
		v-html="require(`!!svg-inline-loader!@assets/icons/${icon}.svg`)"
	></span>
</template>

<script>
import "font-awesome/css/font-awesome.css";

export default {
	inheritAttrs: false,
	props: {
		source: {
			type: String,
			required: true,
			validator: function (to) {
				return ["material", "custom", "fa"].includes(to);
			},
		},
		icon: {
			type: String,
			default: "solid/icons",
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
		fillColor() {
			switch (this.source) {
				case "fa":
					return "inherit";
				default:
					return "currentColor";
			}
		},
		svgComponent() {
			let icon;
			// the loader config can not be stored in a variable. Webpack seems to need to precompile the loader config.
			try {
				if (this.source === "custom") {
					// src: @assets/icons
					icon = require(`!!vue-svg-loader?{"svgo":{"plugins":[{"removeDimensions": true }, {"removeViewBox":false}]}}!@assets/icons/${this.icon}.svg`);
				}
				if (this.source === "material") {
					// src: https://material.io/tools/icons/?style=baseline
					icon = require(`!!vue-svg-loader?{"svgo":{"plugins":[{"removeDimensions": true }, {"removeViewBox":false}]}}!material-icons-svg/icons/round-${this.icon}-24px.svg`);
				}
				return icon.default;
			} catch (error) {
				console.error(this.$t("components.base.BaseIcon.error"), error);
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
.fa {
	width: 1em;
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	font-size: calc(1em + 4px);
	line-height: 100%;
	vertical-align: middle; // should this be default?
}

.custom {
	width: 1em;
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	font-size: calc(1em + 4px);
	line-height: 100%;
	vertical-align: middle; // should this be default?
}

.material {
	// remove material icon margin
	width: calc(1em + 4px);
	height: calc(1em + 4px);
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	margin: -4px 0;
}
</style>
