<template>
	<!-- eslint-disable-next-line -->
	<div class="icon" v-html="svgFile" />
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		source: {
			type: String,
			default: "material",
		},
		icon: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			default: "",
		},
	},
	computed: {
		svgFile() {
			let icon;
			if (this.source === "custom") {
				// src: @assets/icons
				icon = require(`!!html-loader!@assets/icons/${this.icon}.svg`);
			}
			if (this.source === "material") {
				// src: https://material.io/tools/icons/?style=baseline
				icon = require(`!!html-loader!material-icons-svg/icons/baseline-${
					this.icon
				}-24px.svg`);
			}
			return icon;
		},
	},
};
</script>

<style lang="scss">
.icon {
	display: inline-block;
	width: 1em;
	height: 1em;
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	svg {
		max-width: 100%;
		max-height: 100%;
	}
}
</style>
