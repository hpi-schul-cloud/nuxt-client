<script>
export default {
	props: {
		/**
		 * Defines the wrapping html element
		 */
		tag: {
			type: [Object, String],
			default: "main",
		},
		size: {
			type: String,
			default: "medium",
			validator: (size) => ["small", "medium", "large"].includes(size),
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	render(create_element) {
		return create_element(
			this.tag,
			{
				class: `wrapper ${this.size}`,
			},
			[this.$slots.default]
		);
	},
};
</script>

<style lang="scss" scoped>
.wrapper {
	min-width: var(--size-content-width-min);
	margin: 0 auto;

	&.small {
		max-width: calc(0.5 * var(--size-content-width-max));
	}

	&.medium {
		max-width: var(--size-content-width-max);
	}

	&.large {
		max-width: calc(1.5 * var(--size-content-width-max));
	}
}
</style>
