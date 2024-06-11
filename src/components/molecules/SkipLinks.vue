<template>
	<a
		id="skip-link"
		tabindex="0"
		class="skip-link d-sr-only-focusable"
		href="#main-content"
	>
		{{ $t("global.skipLink.mainContent") }}
	</a>
</template>

<script>
export default {
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
	top: 10px;
	left: 50%;
	padding: var(--space-xs);
	color: rgba(var(--v-theme-primary));
	background-color: rgba(var(--v-theme-white));
	border: 1px solid #555;
	border-radius: var(--radius-xs);
	transform: translate(-50%, 0);
	z-index: 10000;
}
</style>
