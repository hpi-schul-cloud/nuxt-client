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
	},
	render(create_element) {
		return create_element(
			this.tag,
			{
				class: "container",
			},
			[this.$slots.default]
		);
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.container {
	min-width: var(--size-content-width-min);
	max-width: var(--size-content-width-max);
	margin: 0 auto;
}
</style>
