<template>
	<a
		id="skip-link"
		tabindex="0"
		class="skip-link d-sr-only-focusable"
		href="#main-content"
		@keydown.enter.prevent="skipToMainContent"
		@keydown.space.prevent="skipToMainContent"
	>
		{{ $t("global.skipLink.mainContent") }}
	</a>
</template>

<script setup lang="ts">
const skipToMainContent = () => {
	const mainContent = window.document.querySelector(
		"#main-content"
	) as HTMLElement;

	if (mainContent) {
		mainContent.setAttribute("tabindex", "-1");
		mainContent.focus();
		setTimeout(() => mainContent.removeAttribute("tabindex"), 1000);
	}
};
</script>

<style lang="scss" scoped>
.skip-link {
	position: absolute;
	top: 0px;
	left: 50%;
	padding: 0.5rem;
	color: rgba(var(--v-theme-primary));
	background-color: white;
	border: 1px solid #555;
	border-radius: var(--radius-xs);
	transform: translate(-50%, 0);
	z-index: 1005;
}
</style>
