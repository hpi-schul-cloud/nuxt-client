<template>
	<!-- Since there is a bug in firefox that causes the tabindex in links 
		not to be taken into account at all, the cumbersome way via the 
		further span element was chosen. -->
	<a
		id="skip-link"
		class="skip-link d-sr-only-focusable"
		:class="{ 'is-visible': isVisible }"
		href="#main-content"
	>
		<span
			id="span-skip-link"
			tabindex="0"
			@focus="showSkiplink(true)"
			@blur="showSkiplink(false)"
			>{{ $t("global.skipLink.mainContent") }}</span
		>
	</a>
</template>

<script>
export default {
	data() {
		return {
			isVisible: false,
		};
	},
	methods: {
		showSkiplink(value = true) {
			this.isVisible = value;
		},
	},
	mounted() {
		const section = this.$route.hash.replace("#", "");
		if (section)
			this.$nextTick(() =>
				window.document.getElementById(section).scrollIntoView()
			);
	},
};
</script>

<style lang="scss" scoped>
.skip-link {
	position: absolute;
	left: 50%;
	padding: var(--space-xs);
	color: rgba(var(--v-theme-primary));
	background-color: rgba(var(--v-theme-white));
	border: 1px solid #555;
	border-radius: var(--radius-xs);
	transform: translate(-50%, 0);
	opacity: 0;
	transition: opacity 0.2s ease-in-out;
	&.is-visible {
		opacity: 1;
	}
}
</style>
