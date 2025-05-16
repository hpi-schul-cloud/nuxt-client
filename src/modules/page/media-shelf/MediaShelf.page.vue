<template>
	<DefaultWireframe ref="main" max-width="full">
		<div class="ml-1 d-flex">
			<h1 aria-level="1" class="text-h3 mt-0 me-auto" data-testid="page-title">
				{{ $t("feature.media-shelf.title") }}
			</h1>
			<VBtnToggle
				v-if="mediaBoard && !isEmptyState"
				variant="outlined"
				divided
				rounded="xl"
				density="compact"
				mandatory
				:model-value="mediaBoard.layout"
				@update:model-value="updateMediaBoardLayout"
			>
				<VBtn
					icon="$shelfOutline"
					size="x-small"
					width="48px"
					:value="BoardLayout.List"
					:aria-label="$t('feature.media-shelf.layout.list')"
					data-testid="media-board-layout-list"
				/>
				<VBtn
					:icon="mdiViewGridOutline"
					size="x-small"
					width="48px"
					:value="BoardLayout.Grid"
					:aria-label="$t('feature.media-shelf.layout.grid')"
					data-testid="media-board-layout-grid"
				/>
			</VBtnToggle>
		</div>
		<template v-if="isLoading && (!mediaBoard || !availableMediaLine)">
			<VContainer class="loader" data-testid="skeleton-loader">
				<v-skeleton-loader type="list-item" width="100%" height="50px" />
				<div class="d-flex py-4 ga-6">
					<v-skeleton-loader type="image, article" width="20%" height="5%" />
					<v-skeleton-loader type="image, article" width="20%" height="5%" />
				</div>
				<v-skeleton-loader type="list-item" width="100%" height="50px" />
				<v-skeleton-loader type="image, article" width="20%" height="5%" />
			</VContainer>
		</template>
		<template v-else-if="isEmptyState">
			<EmptyState
				:title="t('feature.media-shelf.emptyState')"
				data-testid="empty-state"
			>
				<template #media>
					<MediaShelfEmptyStateSvg />
				</template>
			</EmptyState>
		</template>
		<template v-else>
			<MediaBoard
				v-if="mediaBoard && availableMediaLine"
				:board="mediaBoard"
				:available-media-line="availableMediaLine"
			/>
		</template>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { EmptyState, MediaShelfEmptyStateSvg } from "@ui-empty-state";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { BoardLayout } from "@/serverApi/v3";
import { buildPageTitle } from "@/utils/pageTitle";
import { MediaBoard, useSharedMediaBoardState } from "@feature-media-shelf";
import { mdiViewGridOutline } from "@icons/material";
import { useTitle } from "@vueuse/core";
import { computed, ComputedRef, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useTitle(buildPageTitle(t("feature.media-shelf.title")));

const {
	mediaBoard,
	availableMediaLine,
	fetchMediaBoardForUser,
	fetchAvailableMedia,
	updateMediaBoardLayout,
	isLoading,
	isBoardOperationLoading,
} = useSharedMediaBoardState();

const isEmptyState: ComputedRef<boolean> = computed(() => {
	const isMediaBoardEmpty =
		!mediaBoard.value ||
		mediaBoard.value.lines.every((line) => line.elements.length === 0);

	const isAvailableMediaLineEmpty = !availableMediaLine.value?.elements.length;

	return (
		isMediaBoardEmpty &&
		isAvailableMediaLineEmpty &&
		!isLoading.value &&
		!isBoardOperationLoading.value
	);
});

onMounted(async () => {
	await fetchMediaBoardForUser();
	await fetchAvailableMedia();
});
</script>
