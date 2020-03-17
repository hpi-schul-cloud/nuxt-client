<template>
	<button
		v-if="!isLink"
		:class="classes"
		:type="type"
		:aria-label="ariaLabel"
		v-on="$listeners"
	>
		<slot />
		<!--
			TODO: discuss if this button shoud render a BaseLink,
			styled as a Button if you give him a href/to property
		--></button>
	<base-link
		v-else
		:class="classes"
		v-bind="{ ...$props, ...$attrs }"
		:no-styles="true"
		:aria-label="ariaLabel"
		v-on="$listeners"
	>
		<slot />
	</base-link>
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
					"icon outline",
					"text icon",
					"outline",
					"primary",
					"primary text",
					"primary icon",
					"primary icon outline",
					"primary text icon",
					"primary outline",
					"secondary",
					"secondary text",
					"secondary icon",
					"secondary icon outline",
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

		type: {
			type: String,
			default: "button",
		},
		to: {
			type: [String, Object],
			default: "",
		},
		href: {
			type: String,
			default: "",
		},
		ariaLabel: {
			type: String,
			default: "",
		},
	},
	computed: {
		isLink() {
			return Boolean(this.to || this.href);
		},
		classes() {
			return [
				"button",
				`is-${this.size}`,
				...this.design.split(" ").map((a) => `is-${a}`),
			];
		},
	},
};
</script>

<style lang="scss" scoped>
@import "./BaseButton.scss";
</style>
