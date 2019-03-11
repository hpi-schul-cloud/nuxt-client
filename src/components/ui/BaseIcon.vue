<template>
	<FontAwesomeIcon
		v-if="source === 'font-awesome'"
		v-bind="$attrs"
		:icon="icon"
	/>
	<span
		v-else-if="source === 'custom'"
		v-bind="$attrs"
		class="custom-icon"
		:style="customIconStyle"
	/>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library as fontAwesomeIconLibrary } from "@fortawesome/fontawesome-svg-core";
import camelCase from "lodash/camelCase";

// https://fontawesome.com/icons
import { faTrash } from "@fortawesome/free-solid-svg-icons";
fontAwesomeIconLibrary.add(faTrash);

export default {
	name: "BaseIcon",
	components: {
		FontAwesomeIcon,
	},
	inheritAttrs: false,
	props: {
		source: {
			type: String,
			default: "font-awesome",
		},
		icon: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			svgPath: undefined,
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
		if (this.source === "custom") {
			this.loadIcon(this.icon);
		}
	},
	methods: {
		loadIcon(iconName) {
			import(`@assets/icons/${iconName}.svg`).then((iconPath) => {
				this.svgPath = iconPath.default;
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.custom-icon {
	display: inline-block;
	width: 1em;
	height: 1em;
	background-position: center;
	background-size: contain;
}
</style>
