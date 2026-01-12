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
			<SpeedDialMenu v-if="fabItems" :actions="fabItems" />
		</div>
		<VDivider v-if="showDivider" role="presentation" />
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
import Breadcrumbs from "./Breadcrumbs.vue";
import { Breadcrumb } from "./types";
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
	// neded if we don't want to have full page scrolling, so it's restricted to browsers viewport height
	isFlexContainer: {
		type: Boolean,
		default: false,
	},
});

defineOptions({
	inheritAttrs: false,
});
const slots = useSlots();

const { smAndUp } = useDisplay();

const showDivider = computed(() => !props.hideBorder && !!(props.headline || slots.header));
</script>

<style lang="scss" scoped>
@use "@/styles/settings" as *;

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
</style>
