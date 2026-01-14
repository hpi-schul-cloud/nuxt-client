<template>
	<DefaultWireframe ref="main" max-width="full">
		<template #header>
			<h1 aria-level="1" class="mt-0 me-auto" data-testid="page-title">
				{{ t("fwu-media.title") }}
			</h1>
		</template>

		<template #default> AAA </template>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { buildPageTitle } from "@/utils/pageTitle";
import { useSharedMediaBoardState } from "@feature-media-shelf";
import { DefaultWireframe } from "@ui-layout";
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
	const isMediaBoardEmpty = !mediaBoard.value || mediaBoard.value.lines.every((line) => line.elements.length === 0);

	const isAvailableMediaLineEmpty = !availableMediaLine.value?.elements.length;

	return isMediaBoardEmpty && isAvailableMediaLineEmpty && !isLoading.value && !isBoardOperationLoading.value;
});

onMounted(async () => {
	await fetchMediaBoardForUser();
	await fetchAvailableMedia();
});
</script>
