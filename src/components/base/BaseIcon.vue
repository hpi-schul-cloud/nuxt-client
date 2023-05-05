<template>
	<span>
		<v-icon
			v-if="source === 'material'"
			:color="fillColor"
			class="material-icon"
			v-bind="$attrs"
			>{{ mdiSvgPath }}</v-icon
		>
		<v-icon v-else :color="fillColor" class="custom-icon" v-bind="$attrs">{{
			`$${icon}`
		}}</v-icon>
	</span>
</template>

<script>
import materialIcons from "@/components/icons/material";
export default {
	inheritAttrs: false,
	props: {
		source: {
			type: String,
			required: true,
			validator: function (to) {
				return ["material", "custom"].includes(to);
			},
		},
		icon: {
			type: String,
		},
		fill: {
			type: String,
			default: "currentColor",
		},
		color: {
			type: String,
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		mdiSvgPath() {
			return materialIcons[`mdi-${this.icon}`];
		},
		fillColor() {
			return this.color ? this.color : this.fill;
		},
	},
};
</script>
