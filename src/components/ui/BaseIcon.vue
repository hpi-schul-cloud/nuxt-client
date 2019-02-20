<template>
	<FontAwesomeIcon
		v-if="source === 'font-awesome'"
		v-bind="$attrs"
		:icon="icon"
	/>
	<span
		v-else-if="source === 'custom'"
		v-bind="$attrs"
		:class="customIconClass"
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
	computed: {
		// Gets a CSS module class, e.g. iconCustomLogo
		customIconClass() {
			// TODO
			return this.$style[camelCase("icon-custom-" + this.icon)];
		},
	},
};
</script>
