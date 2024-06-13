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

<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";

onMounted(() => {
	const route = useRoute();
	const section = route.hash ? route.hash.replace("#", "") : "";
	if (section)
		nextTick(() => window.document.getElementById(section)?.scrollIntoView());
});
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
