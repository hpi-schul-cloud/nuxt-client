<template>
	<div>
		<mq-layout mq="tablet+">
			<base-button :design="design" v-on="$listeners">
				<base-icon :source="source" :icon="icon" />
				<slot />
			</base-button>
		</mq-layout>
		<mq-layout mq="mobile">
			<base-button :class="icondesign" v-on="$listeners">
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
					"primary icon text",
					"primary outline",
					"secondary",
					"secondary text",
					"secondary icon",
					"secondary icon text",
					"secondary outline",
					"hero-cta",
					"hero-cta icon",
					"success",
					"success text",
					"success icon",
					"success icon text",
					"success outline",
					"danger",
					"danger text",
					"danger icon",
					"danger icon text",
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

		responsivedesign: {
			type: String,
			default: "",
			validator: (responsivedesign) => {
				const defined = [
					"",
					"none",
					"icon",
					"icon text",
					"primary icon",
					"primary icon text",
					"secondary icon",
					"secondary icon text",
					"hero-cta icon",
					"success icon",
					"success icon text",
					"danger icon",
					"danger icon text",
					"fancy icon",
				].includes(responsivedesign);
				if (!defined) {
					throw new Error(`the design "${responsivedesign}" is not available`);
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
			return [...this.responsivedesign.split(" ").map((a) => `is-${a}`)];
		},
	},
};
</script>
