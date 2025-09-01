<template>
	<a
		id="skip-link"
		class="skip-link d-sr-only-focusable"
		href="#main-content"
		data-testid="skip-link"
		@keydown.enter.prevent="skipToMainContent"
		@keydown.space.prevent="skipToMainContent"
	>
		{{ $t("global.skipLink.mainContent") }}
	</a>
</template>

<script setup lang="ts">
const programmaticFocus = (element: HTMLElement) => {
	element.setAttribute("tabindex", "-1");
	element.focus();
	setTimeout(() => element.removeAttribute("tabindex"), 1000);
};

const skipToMainContent = () => {
	const mainContentElement = window.document.querySelector(
		"#main-content"
	) as HTMLElement;

	if (mainContentElement) {
		programmaticFocus(mainContentElement);
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
	border-radius: 2px;
	transform: translate(-50%, 0);
	z-index: 1005;
}
</style>
