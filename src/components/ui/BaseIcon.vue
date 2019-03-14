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
	watch: {
		icon: function(to, from) {
			if (to !== from) {
				this.getIconPath();
			}
		},
	},
	created() {
		this.getIconPath();
	},
	methods: {
		getIconPath() {
			let importPromise;
			if (this.source === "custom") {
				// src: @assets/icons
				importPromise = import(`@assets/icons/${this.icon}.svg`);
			}
			if (this.source === "material") {
				// src: https://material.io/tools/icons/?style=baseline
				importPromise = import(`material-icons-svg/icons/baseline-${
					this.icon
				}-24px.svg`);
			}
			if (importPromise) {
				return importPromise.then((iconPath) => {
					this.svgPath = iconPath.default;
					return iconPath.default;
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
