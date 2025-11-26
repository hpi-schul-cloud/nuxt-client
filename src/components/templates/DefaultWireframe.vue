<template>
	<div class="wireframe-container" :class="{ 'wireframe-container-flex': isFlexContainer }">
		<div id="notify-screen-reader-polite" aria-live="polite" class="d-sr-only" />
		<div id="notify-screen-reader-assertive" aria-live="assertive" class="d-sr-only" />
		<div ref="wireframeHeader" class="wireframe-header sticky">
			<Breadcrumbs v-if="breadcrumbs.length" :breadcrumbs="breadcrumbs" />
			<div v-else :class="{ 'breadcrumbs-placeholder': smAndUp }" />
			<slot name="header">
				<h1 v-if="headline" :data-testid="dataTestid">
					{{ headline }}
				</h1>
			</slot>
			<SpeedDialMenu
				v-if="fabItems"
				:actions="fabItems"
				:fab-offset="fabOffset"
				@fab:clicked="onFabClicked"
				@on-fab-item-click="$emit('onFabItemClick', $event)"
			/>
			<VDivider v-if="showDivider" class="mx-n6" role="presentation" />
		</div>
		<VContainer
			:fluid="maxWidth !== 'nativ'"
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
import { useCssVar, useElementSize } from "@vueuse/core";
import { computed, PropType, useSlots, useTemplateRef } from "vue";
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
		type: String as PropType<"full" | "short" | "nativ">,
		required: true,
	},
	fabItems: {
		type: Array as PropType<FabAction[]>,
		required: false,
		default: () => [],
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

const emit = defineEmits({
	onFabItemClick: (event: string | undefined) => !!event,
	"fab:clicked": () => true,
});

const wireframeHeader = useTemplateRef("wireframeHeader");
const { height } = useElementSize(wireframeHeader);
const topbarHeightValue = useCssVar("--topbar-height");

const fabOffset = computed(() => {
	const topbarHeight = topbarHeightValue.value ? parseInt(topbarHeightValue.value) : 64;
	return height.value + topbarHeight / 2;
});

const onFabClicked = () => {
	emit("fab:clicked");
};

defineOptions({
	inheritAttrs: false,
});
const slots = useSlots();

const { smAndUp } = useDisplay();

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
	padding: 0 24px;
	display: flex;
	flex-direction: column;
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

.v-divider {
	z-index: -1;
	margin-right: -1.5rem;
	margin-left: -1.5rem;
}

.breadcrumbs-placeholder {
	height: 22px;
}

.sticky {
	position: sticky;
	top: var(--topbar-height);
	z-index: 20;
	background-color: rgb(var(--v-theme-white));
}
</style>
