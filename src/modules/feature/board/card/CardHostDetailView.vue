<template>
	<VDialog :model-value="isOpen" fullscreen scrollable z-index="2000" @keydown.escape="onDialogClose">
		<VToolbar class="toolbar border-b-thin">
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
			<VCardText class="pt-0 pb-0">
				<div
					class="detail-view-size pt-lg-8 pt-md-4 pt-1 mx-auto"
					:style="{
						backgroundColor: 'white',
						borderLeft: cardBorderColor ? `3px solid ${cardBorderColor}` : undefined,
					}"
				>
					<CardHost :height="100" :card-id="cardId" :row-index="1" :column-index="1" @click.stop />
				</div>
			</VCardText>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import CardHost from "./CardHost.vue";
import { colorToHexLighten3, colorToHexLighten5 } from "@/utils/color.utils";
import { Colors } from "@api-server";
import { useBoardAllowedOperations, useCardStore, useCourseBoardEditMode } from "@data-board";
import { mdiClose } from "@icons/material";
import { computed, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	cardId: string;
};

const props = defineProps<Props>();
const cardRef = toRef(props, "cardId");

const emit = defineEmits<{
	(e: "close:detail-view"): void;
}>();

const { isEditMode, startEditMode, stopEditMode } = useCourseBoardEditMode(cardRef.value);
const { allowedOperations } = useBoardAllowedOperations();
const { t } = useI18n();
const cardStore = useCardStore();

const isOpen = ref(true);
const card = computed(() => cardStore.getCard(cardRef.value));

const cardBackground = computed(() => colorToHexLighten5(card.value?.backgroundColor ?? Colors.TRANSPARENT));
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
@use "sass:map";
@use "@/styles/settings" as *;

.detail-view-size {
	max-width: 920px;
	padding: 0 4rem;

	@media #{map.get($display-breakpoints, 'sm-and-down')} {
		padding: 0 0.5rem;
	}
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
	--fullscreen-scale: 1.25;

	/* Override with scaled versions, referencing original root values */
	--heading-1: calc(2.0625rem * var(--fullscreen-scale));
	--heading-2: calc(1.75rem * var(--fullscreen-scale));
	--heading-3: calc(1.4375rem * var(--fullscreen-scale));
	--heading-4: calc(1.1875rem * var(--fullscreen-scale));
	--heading-5: calc(1.4375rem * var(--fullscreen-scale));
	--heading-6: calc(1.1875rem * var(--fullscreen-scale));

	/* text sizes */
	--text-xs: calc(0.694rem * var(--fullscreen-scale));
	--text-sm: calc(0.833rem * var(--fullscreen-scale));
	--text-md: calc(1rem * var(--fullscreen-scale));
	--text-lg: calc(1.2rem * var(--fullscreen-scale));
}
</style>
