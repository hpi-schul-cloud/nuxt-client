<template>
	<div class="wireframe-container" :class="{ 'wireframe-container-flex': isFlexContainer }">
		<div id="notify-screen-reader-polite" aria-live="polite" class="d-sr-only" />
		<div id="notify-screen-reader-assertive" aria-live="assertive" class="d-sr-only" />
		<div class="wireframe-header">
			<Breadcrumbs v-if="breadcrumbs.length" :breadcrumbs="breadcrumbs" />
			<div v-else :class="{ 'breadcrumbs-placeholder': smAndUp }" />
			<slot name="header">
				<h1 v-if="headline" :data-testid="dataTestid">
					{{ headline }}
				</h1>
			</slot>
		</div>

		<VDivider v-if="showDivider" class="wireframe-divider" role="presentation" />

		<div
			v-if="fabItems"
			class="wireframe-menu-container d-flex align-center"
			:class="{
				'positioning-sm-to-md': mdAndDown,
			}"
		>
			<div class="ml-auto mr-6">
				<SpeedDialMenu :actions="fabItems" />
			</div>
		</div>

		<VContainer
			:fluid="maxWidth !== 'native'"
			class="main-content"
			:class="{
				'main-pb-96': mainWithBottomPadding,
				'pa-0': mainWithoutPadding,
				'container-short-width': maxWidth === 'short',
				'container-full-width': maxWidth === 'full',
				'main-content-flex': isFlexContainer,
			}"
		>
			<slot />
		</VContainer>
	</div>
</template>

<script setup lang="ts">
import { Breadcrumb } from "./default-wireframe.types";
import { Breadcrumbs } from "@ui-breadcrumbs";
import { type FabAction, SpeedDialMenu } from "@ui-speed-dial-menu";
import { computed, PropType, useSlots } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
	breadcrumbs: {
		type: Array as PropType<Breadcrumb[]>,
		required: false,
		default: () => [],
	},
	headline: {
		type: String,
		required: false,
		default: null,
	},
	maxWidth: {
		type: String as PropType<"full" | "short" | "native">,
		required: true,
	},
	fabItems: {
		type: Array as PropType<FabAction[]>,
		required: false,
		default: undefined,
	},
	hideBorder: {
		type: Boolean,
	},
	dataTestid: {
		type: String as PropType<string | null>,
		default: null,
	},
	mainWithoutPadding: {
		type: Boolean,
	},
	mainWithBottomPadding: {
		type: Boolean,
		default: false,
	},
	// needed if we don't want to have full page scrolling, so it's restricted to browsers viewport height
	isFlexContainer: {
		type: Boolean,
		default: false,
	},
});

defineOptions({
	inheritAttrs: false,
});
const slots = useSlots();

const { smAndUp, mdAndDown } = useDisplay();

const showDivider = computed(() => !props.hideBorder && !!(props.headline || slots.header));
</script>

<style lang="scss" scoped>
@use "@/styles/settings.scss" as *;

.wireframe-container-flex {
	height: calc(100svh - var(--topbar-height));
	display: flex;
	flex-direction: column;
}

.main-content-flex {
	flex: 1;
	overflow-y: auto;
}

.main-pb-96 {
	padding-bottom: 96px !important;
}

.wireframe-container h1:first-of-type {
	margin-bottom: 16px;
}

.wireframe-header {
	position: relative;
	padding: 0 24px;
	display: flex;
	flex-direction: column;
	background-color: rgb(var(--v-theme-white));
	z-index: 20;
}

:deep(.v-application__wrap) {
	min-height: unset;
}

.main-content {
	padding: 0 24px 24px 24px;
	margin-top: 32px;
}

.container-short-width {
	max-width: var(--content-max-width);
}

.container-full-width {
	max-width: none;
	margin: 0;
}

.breadcrumbs-placeholder {
	height: 22px;
}

.wireframe-divider {
	position: sticky;
	top: var(--topbar-height);
}

.wireframe-menu-container {
	position: sticky;
	min-height: 56px;
	margin-top: -30px;
	z-index: 2000;
	top: calc(var(--topbar-height) + 16px);

	&.positioning-sm-to-md {
		position: fixed;
		top: unset;
		right: 0;
		bottom: 24px;
	}
}
</style>
