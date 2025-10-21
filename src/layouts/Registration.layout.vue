<template>
	<div class="page">
		<header class="topbar" data-testid="registration-layout-top-bar">
			<NavigationBar :img="Logo" :hide-buttons="true" />
		</header>
		<main :class="isExtraSmallDevice ? 'small-wrapper' : 'wrapper'">
			<slot />
		</main>
		<TheFooter />
	</div>
</template>

<script setup lang="ts">
import Logo from "@/assets/img/logo/logo-image-mono.svg";
import NavigationBar from "@/components/legacy/NavigationBar.vue";
import TheFooter from "@/components/legacy/TheFooter.vue";
import { computed } from "vue";
import { useDisplay } from "vuetify";

const { xs } = useDisplay();
const isExtraSmallDevice = computed(() => xs.value);
</script>

<style lang="scss" scoped>
.page {
	display: grid;
	grid-template-areas:
		"side top"
		"side content"
		"side footer";
	grid-template-rows: auto 1fr auto;
	grid-template-columns: 0 1fr;
	max-width: 100%;
	min-height: 100vh;
}

.topbar {
	grid-area: top;
}

.footer {
	grid-area: footer;
}

.small-wrapper {
	grid-area: content;
	min-height: 100vh;
	padding: 16px;
}

.wrapper {
	grid-area: content;
	min-height: calc(80vh - var(--legacy-topbar-height));
	padding-right: 15px;
	padding-left: 15px;
	margin: 24px auto;
}

@media (min-width: 576px) {
	.wrapper {
		width: 540px;
		max-width: 100%;
	}
}

@media (min-width: 768px) {
	.wrapper {
		width: 720px;
		max-width: 100%;
	}
}

@media (min-width: 992px) {
	.wrapper {
		width: 960px;
		max-width: 100%;
	}
}

@media (min-width: 1200px) {
	.wrapper {
		align-items: center;
		justify-content: space-between;
		width: 1140px;
		max-width: 100%;
	}
}
</style>
