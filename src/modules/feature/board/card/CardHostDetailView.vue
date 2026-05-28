<template>
	<VDialog :model-value="isOpen" fullscreen scrollable @keydown.escape="onDialogClose">
		<VToolbar id="card-detail-view-toolbar" class="toolbar border-b-thin">
			<VBtn
				:icon="mdiClose"
				data-testid="close-detail-view-button"
				:aria-label="t('common.labels.close')"
				@click="onDialogClose"
			/>
			<VToolbarTitle>{{ $t("components.board.dialog.detail-view.title") }}</VToolbarTitle>
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
		<VCard :style="{ backgroundColor: cardBackground }">
			<VCardText>
				<div
					class="detail-view-size w-100 mx-auto elevation-3 rounded-lg mt-4"
					:style="{
						backgroundColor: 'white',
						borderLeft: cardBorderColor ? `3px solid ${cardBorderColor}` : undefined,
					}"
				>
					<CardHost :height="100" :card-id="cardId" :row-index="-1" :column-index="-1" @click.stop />
				</div>
			</VCardText>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import CardHost from "./CardHost.vue";
import { colorToHexLighten3, colorToHexLighten5 } from "@/utils/color.utils";
import { Colors } from "@api-server";
import { useBoardAllowedOperations, useBoardFocusHandler, useCardStore, useCourseBoardEditMode } from "@data-board";
import { mdiClose } from "@icons/material";
import { computed, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
	cardId: string;
}>();
const cardRef = toRef(props, "cardId");

const emit = defineEmits<{
	(e: "close:detail-view"): void;
}>();

const { t } = useI18n();

const { isEditMode, startEditMode, stopEditMode } = useCourseBoardEditMode(cardRef.value);
const { allowedOperations } = useBoardAllowedOperations();
const cardStore = useCardStore();
const { setFocus } = useBoardFocusHandler();
setFocus("card-detail-view-toolbar");

const isOpen = ref(true);
const card = computed(() => cardStore.getCard(cardRef.value));

const cardBackground = computed(() => {
	const color = card.value?.backgroundColor;
	if (!color || color === Colors.TRANSPARENT) return "grey-lighten-5";

	return colorToHexLighten5(color);
});
const cardBorderColor = computed(() => {
	const color = card.value?.backgroundColor;
	if (!color || color === Colors.TRANSPARENT) return undefined;

	return colorToHexLighten3(color);
});

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

.toolbar {
	position: absolute;
	width: 100%;
	z-index: 2001;
}

.v-card {
	padding-top: 64px;
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
