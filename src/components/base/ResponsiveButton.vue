<template>
	<div>
		<mq-layout mq="tablet+">
			<base-button :design="design" v-on="$listeners">
				<base-icon :source="source" :icon="icon" />
				<slot />
			</base-button>
		</mq-layout>
		<mq-layout mq="mobile">
			<base-button :design="icondesign" v-on="$listeners">
				<base-icon :source="source" :icon="icon" />
			</base-button>
		</mq-layout>
	</div>
</template>
<script>
export default {
	props: {
		size: {
			type: String,
			default: "medium",
			validator: (size) => ["small", "medium", "large"].includes(size),
		},

		design: {
			type: String,
			default: "",
			validator: (design) => {
				const defined = [
					"",
					"none",
					"text",
					"icon",
					"icon text",
					"outline",
					"primary",
					"primary text",
					"primary icon",
					"primary text icon",
					"primary outline",
					"secondary",
					"secondary text",
					"secondary icon",
					"secondary text icon",
					"secondary outline",
					"hero-cta",
					"hero-cta icon",
					"success",
					"success text",
					"success icon",
					"success text icon",
					"success outline",
					"danger",
					"danger text",
					"danger icon",
					"danger text icon",
					"danger outline",
					"fancy",
					"fancy icon",
				].includes(design);
				if (!defined) {
					throw new Error(`the design "${design}" is not available`);
				}
				return defined;
			},
		},
		source: {
			type: String,
			required: true,
			validator: function(to) {
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

	computed: {
		icondesign() {
			return this.design + " icon";
		},
	},
};
</script>
<style lang="scss" scoped></style>
