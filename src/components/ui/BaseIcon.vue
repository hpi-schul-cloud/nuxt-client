<template>
	<span
		v-bind="$attrs"
		class="icon"
		aria-hidden="true"
		:style="customIconStyle"
	/>
</template>

<script>
export default {
	name: "BaseIcon",
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
	},
	data() {
		return {
			svgPath: "",
		};
	},
	computed: {
		// Gets a CSS module class, e.g. iconCustomLogo
		customIconStyle() {
			return {
				"background-image": `url(${this.svgPath})`,
			};
		},
	},
	created() {
		this.loadIcon();
	},
	methods: {
		loadIcon() {
			if (this.source === "custom") {
				// @assets/icons
				return import(`@assets/icons/${this.icon}.svg`).then((iconPath) => {
					this.svgPath = iconPath.default;
				});
			}
			if (this.source === "material") {
				// https://material.io/tools/icons/?style=baseline
				return import(`material-icons-svg/icons/baseline-${
					this.icon
				}-24px.svg`).then((iconPath) => {
					this.svgPath = iconPath.default;
				});
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
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
}
</style>
