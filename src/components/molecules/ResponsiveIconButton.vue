<template>
	<base-button
		:design="buttonDesign"
		v-bind="{ ...$attrs, ...$props }"
		v-on="$listeners"
	>
		<base-icon :source="source" :icon="icon" :fill="fill" />
		<div :class="isMobile ? 'visually-hidden' : ''">
			<slot />
		</div>
	</base-button>
</template>
<script>
export default {
	props: {
		design: {
			type: String,
			default: "",
			validator: (design) => {
				const defined = [
					"",
					"none",
					"text",
					"outline",
					"primary",
					"primary text",
					"primary outline",
					"secondary",
					"secondary text",
					"secondary outline",
					"hero-cta",
					"success",
					"success text",
					"success outline",
					"danger",
					"danger text",
					"danger outline",
					"fancy",
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
		buttonDesign() {
			return this.isMobile ? `${this.design} icon` : this.design;
		},
		isMobile() {
			return this.$mq === "mobile";
		},
	},
};
</script>
