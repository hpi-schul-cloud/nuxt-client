<template>
	<VDialog :model-value="isOpen" fullscreen scrim="transparent" :transition="false" @keydown.escape="onDialogClose">
		<div class="detail-view" :style="{ backgroundColor: cardBackground }">
			<VToolbar id="card-detail-view-toolbar" class="border-b-thin">
				<VBtn
					:icon="mdiClose"
					data-testid="close-detail-view-button"
					:aria-label="t('common.labels.close')"
					@click="onDialogClose"
				/>
				<VBtn
					:icon="mdiFormatListBulleted"
					data-testid="toggle-table-of-contents-button"
					:aria-label="t('components.board.dialog.detail-view.tableOfContents.title')"
					:aria-expanded="isTableOfContentsOpen"
					:aria-controls="isTableOfContentsOpen ? 'card-detail-view-toc' : undefined"
					:variant="isTableOfContentsOpen ? 'tonal' : 'text'"
					@click="isTableOfContentsOpen = !isTableOfContentsOpen"
				/>
				<VToolbarTitle>{{ $t("components.board.dialog.detail-view.title") }}</VToolbarTitle>
				<VBtn
					:icon="mdiChevronLeft"
					data-testid="prev-detail-view-button"
					:aria-label="t('components.board.action.prev-detail-view')"
					:to="previousCardRoute"
					:disabled="!previousCardRoute"
				/>
				<VBtn
					:icon="mdiChevronRight"
					data-testid="next-detail-view-button"
					:aria-label="t('components.board.action.next-detail-view')"
					:to="nextCardRoute"
					:disabled="!nextCardRoute"
				/>
				<VSpacer />
				<VBtn
					v-if="allowedOperations?.deleteCard && !isEditMode"
					class="mr-4 keep-inline-edit-mode"
					data-testid="toolbar-edit-button"
					variant="flat"
					color="primary"
					@click="startEditMode"
				>
					{{ $t("common.actions.edit") }}
				</VBtn>
				<VBtn
					v-if="allowedOperations?.deleteCard && isEditMode"
					class="mr-4 keep-inline-edit-mode"
					data-testid="toolbar-view-button"
					variant="flat"
					color="primary"
					@click="stopEditMode"
				>
					{{ $t("common.actions.view") }}
				</VBtn>
			</VToolbar>
			<div class="detail-view__body">
				<Transition name="toc-slide">
					<div v-if="isTableOfContentsOpen" id="card-detail-view-toc" class="toc-panel">
						<CardTableOfContents
							:sections="sections"
							:elements="currentElements"
							:active-element-id="activeElementId"
							:focus-current-card="wasTableOfContentsOpenOnMount"
							@select:element="onSelectElement"
							@select:card="onSelectCard"
						/>
					</div>
				</Transition>
				<div ref="scroller" class="detail-view__scroller">
					<div
						class="detail-view-size w-100 mx-auto elevation-3 rounded-lg mt-4"
						:style="{
							backgroundColor: 'white',
							borderLeft: cardBorderColor ? `3px solid ${cardBorderColor}` : undefined,
						}"
					>
						<CardHost
							:height="100"
							:card-id="cardId"
							:row-index="-1"
							:column-index="-1"
							:focus-title-on-edit-start="true"
							@click.stop
						/>
					</div>
				</div>
			</div>
		</div>
	</VDialog>
</template>

<script setup lang="ts">
import { useActiveCardElement } from "./activeCardElement.composable";
import CardHost from "./CardHost.vue";
import { useCardTableOfContents } from "./cardTableOfContents.composable";
import CardTableOfContents from "./CardTableOfContents.vue";
import { scrollToCardElement } from "./scrollToCardElement";
import { colorToHexLighten3, colorToHexLighten5 } from "@/utils/color.utils";
import { Colors } from "@api-server";
import { useBoardAllowedOperations, useBoardFocusHandler, useCardStore, useCourseBoardEditMode } from "@data-board";
import { mdiChevronLeft, mdiChevronRight, mdiClose, mdiFormatListBulleted } from "@icons/material";
import { computed, ref, toRef, useTemplateRef, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import type { RouteLocationRaw } from "vue-router";
import { useDisplay } from "vuetify";

const props = defineProps<{
	cardId: string;
	previousCardRoute?: RouteLocationRaw;
	nextCardRoute?: RouteLocationRaw;
}>();
const cardRef = toRef(props, "cardId");

const emit = defineEmits<{
	(e: "close:detail-view"): void;
}>();

const isTableOfContentsOpen = defineModel<boolean>("tableOfContentsOpen", { default: false });
// The view remounts per card, so an already open panel means the user just switched cards.
const wasTableOfContentsOpenOnMount = isTableOfContentsOpen.value;

const { t } = useI18n();
const { smAndDown: isSmallScreen } = useDisplay();
const { sections, currentElements } = useCardTableOfContents(cardRef, isTableOfContentsOpen);
const scroller = useTemplateRef<HTMLElement>("scroller");
const {
	activeElementId,
	refresh: refreshActiveElement,
	select: selectActiveElement,
} = useActiveCardElement(
	scroller,
	isTableOfContentsOpen,
	computed(() => currentElements.value.map(({ id }) => id))
);
watch(currentElements, refreshActiveElement, { flush: "post" });

const { isEditMode, startEditMode, stopEditMode } = useCourseBoardEditMode(cardRef.value);
const { allowedOperations } = useBoardAllowedOperations();
const cardStore = useCardStore();
const { setFocus, focusedId } = useBoardFocusHandler("card-detail-view-toolbar");
setFocus("card-detail-view-toolbar");

// 'focusedId' is shared global state. Any click inside the card sets it to
// 'cardId' via a 'focusin' listener on the VCard. If that happens while the
// detail view is NOT in edit mode, the main-board's card title would also see
// 'isFocusedById = true' and call '.focus()' on itself when edit mode starts
// (because 'isEditMode' is also shared). This would cause the keyboard focus to
// jump outside the VDialog. Reset 'focusedId' to the toolbar sentinel whenever
// the card grabs focus in view mode to prevent that cross-dialog focus conflict.
watchEffect(() => {
	if (focusedId?.value === props.cardId && !isEditMode.value) {
		setFocus("card-detail-view-toolbar");
	}
});

const isOpen = ref(true);
const card = computed(() => cardStore.getCard(cardRef.value));

const cardBackground = computed(() => {
	const color = card.value?.backgroundColor;
	if (!color || color === Colors.TRANSPARENT) return colorToHexLighten5(Colors.GREY);

	return colorToHexLighten5(color);
});
const cardBorderColor = computed(() => {
	const color = card.value?.backgroundColor;
	if (!color || color === Colors.TRANSPARENT) return undefined;

	return colorToHexLighten3(color);
});

const onSelectElement = (elementId: string) => {
	if (!scroller.value) return;

	const isFirstElement = currentElements.value[0]?.id === elementId;
	const wasFound = scrollToCardElement(scroller.value, elementId, isFirstElement);
	if (!wasFound) return;

	selectActiveElement(elementId);
	if (isSmallScreen.value) isTableOfContentsOpen.value = false;
};

const onSelectCard = () => {
	if (isSmallScreen.value) isTableOfContentsOpen.value = false;
};

const onDialogClose = () => {
	isOpen.value = false;
	emit("close:detail-view");
};
</script>

<style lang="scss" scoped>
@use "@/styles/settings" as *;
@use "sass:map";

.detail-view-size {
	max-width: 860px;
	min-width: 17rem;
}

.detail-view {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.detail-view__body {
	display: flex;
	flex: 1;
	min-height: 0;
}

.detail-view__scroller {
	flex: 1;
	min-width: 0;
	padding: 1rem;
	overflow-y: auto;
}

.toc-panel {
	display: flex;
	flex: none;
	flex-direction: column;
	width: 20rem;
	overflow: hidden;
	border-inline-end: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.toc-slide-enter-active {
	--toc-duration: 0.32s;
}

.toc-slide-leave-active {
	--toc-duration: 0.2s;
}

.toc-slide-enter-active,
.toc-slide-leave-active {
	transition:
		width var(--toc-duration) cubic-bezier(0.16, 1, 0.3, 1),
		opacity var(--toc-duration) cubic-bezier(0.16, 1, 0.3, 1);

	:deep(.card-toc) {
		transition: transform var(--toc-duration) cubic-bezier(0.16, 1, 0.3, 1);
	}
}

.toc-slide-enter-from,
.toc-slide-leave-to {
	width: 0;
	opacity: 0;

	:deep(.card-toc) {
		transform: translateX(-2rem);
	}
}

@media (max-width: 959.98px) and (min-height: 30rem) {
	.detail-view__body {
		flex-direction: column;
	}

	.toc-panel {
		width: 100%;
		max-height: 40vh;
		border-inline-end: 0;
		border-block-end: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
	}

	.toc-slide-enter-active,
	.toc-slide-leave-active {
		transition-property: max-height, opacity;
	}

	.toc-slide-enter-from,
	.toc-slide-leave-to {
		width: 100%;
		max-height: 0;
	}
}

@media (prefers-reduced-motion: reduce) {
	.toc-slide-enter-active,
	.toc-slide-leave-active {
		--toc-duration: 0.15s;

		transition-property: opacity;

		:deep(.card-toc) {
			transition: none;
		}
	}

	.toc-slide-enter-from,
	.toc-slide-leave-to :deep(.card-toc) {
		transform: none;
	}
}

.v-dialog {
	--fullscreen-scale-heading: 1.33;
	--fullscreen-scale-text: 1.25;

	/* Override with scaled versions, referencing original root values */
	--heading-3: calc(1.375rem * 1.5); // to get also 33px like h1
	--heading-4: calc(1.25rem * var(--fullscreen-scale-heading));
	--heading-5: calc(1.125rem * var(--fullscreen-scale-heading));
	--heading-6: calc(1rem * var(--fullscreen-scale-heading));

	/* text sizes */
	--text-xs: calc(0.694rem * var(--fullscreen-scale-text));
	--text-sm: calc(0.833rem * var(--fullscreen-scale-text));
	--text-md: calc(1rem * var(--fullscreen-scale-text));
	--text-lg: calc(1.2rem * var(--fullscreen-scale-text));
}

:deep(.v-card-title) {
	padding: 3rem 4rem 0 4rem !important;
}

:deep() {
	@media #{map.get($display-breakpoints, "sm")} {
		.v-card-title {
			padding: 1.5rem 2rem 0 2rem !important;
		}
	}

	@media #{map.get($display-breakpoints, "xs")} {
		.v-card-title {
			padding: 1rem 1.5rem 0 1.5rem !important;
		}
	}
}

:deep(.card-host > div > .v-card-text) {
	padding: 2rem 4rem 2rem 4rem;
}

:deep(.card-host > div > .v-card-text:last-child) {
	padding: 2rem 4rem 5rem 4rem;
}

@media #{map.get($display-breakpoints, 'sm')} {
	:deep(.card-host > div > .v-card-text) {
		padding: 2rem 2rem 1rem 2rem;
	}

	:deep(.card-host > div > .v-card-text:last-child) {
		padding: 2rem 2rem 4rem 2rem;
	}
}

@media #{map.get($display-breakpoints, 'xs')} {
	:deep(.card-host > div > .v-card-text) {
		padding: 2rem 1.5rem 1rem 1.5rem;
	}

	:deep(.card-host > div > .v-card-text:last-child) {
		padding: 2rem 1.5rem 3rem 1.5rem;
	}
}
</style>
