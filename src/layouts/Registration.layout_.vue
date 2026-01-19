<template>
	<div class="page">
		<header class="topbar" data-testid="registration-layout-top-bar">
			<!-- Copied from NavigationBar.vue -->
			<div class="navigation-bar" :data-hide-buttons="true">
				<img :src="Logo" alt="Logo" />
				<!-- ...navigation bar content... -->
			</div>
		</header>
		<!-- Removed Vuetify VMain, using div instead -->
		<VMain :class="isExtraSmallDevice ? 'small-wrapper' : 'centered-main'" class="">
			<ApplicationError>
				<AlertContainer />
			</ApplicationError>
			<slot />
		</VMain>
		<TheFooter />
	</div>
</template>

<script setup lang="ts">
import Logo from "@/assets/img/logo/logo-image-mono.svg";
import TheFooter from "@/components/legacy/TheFooter.vue";
import { AlertContainer, ApplicationError } from "@ui-layout";
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

.centered-main {
	grid-area: content;
	min-height: calc(80vh - var(--legacy-topbar-height));
	width: 70%;
	margin-left: 15%;
	margin-right: 15%;
	// width: 80ch;
}

/* --- Copied from NavigationBar.vue --- */
// .navigation-bar {
// 	display: flex;
// 	align-items: center;
// 	justify-content: space-between;
// 	height: var(--legacy-topbar-height, 64px);
// 	padding: 0 24px;
// 	background: #fff;
// 	border-bottom: 1px solid #e0e0e0;
// 	z-index: 10;
// }

.navigation-bar img {
	height: 32px;
}
/* --- End copied CSS --- */

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
