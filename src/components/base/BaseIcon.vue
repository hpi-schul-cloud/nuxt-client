<template>
	<span>
		<v-icon v-if="source === 'fa'" :color="fill" v-bind="$attrs">{{
			`fa-${icon}`
		}}</v-icon>
		<v-icon
			v-else-if="source === 'material'"
			:color="fill"
			class="material-icon"
			v-bind="$attrs"
			>{{ mdiSvgPath }}</v-icon
		>
		<v-icon v-else :color="fill" class="custom-icon" v-bind="$attrs">{{
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
				return ["material", "custom", "fa"].includes(to);
			},
		},
		icon: {
			type: String,
		},
		fill: {
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
	},
};
</script>
