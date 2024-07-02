<template>
	<DefaultWireframe ref="main" max-width="full">
		<div class="ml-1 d-flex">
			<h3 aria-level="1" class="mt-0 me-auto" data-testid="page-title">
				{{ $t("feature.media-shelf.title") }}
			</h3>
			<VBtnToggle
				v-if="mediaBoard"
				variant="outlined"
				divided
				rounded="xl"
				density="compact"
				mandatory
				:model-value="mediaBoard.layout"
				@update:model-value="updateMediaBoardLayout"
			>
				<VBtn
					:icon="mdiCustomGridOutline"
					size="x-small"
					width="48px"
					:value="MediaBoardLayoutType.List"
					:aria-label="$t('feature.media-shelf.layout.list')"
					data-testid="media-board-layout-list"
				/>
				<VBtn
					:icon="mdiViewGridOutline"
					size="x-small"
					width="48px"
					:value="MediaBoardLayoutType.Grid"
					:aria-label="$t('feature.media-shelf.layout.grid')"
					data-testid="media-board-layout-grid"
				/>
			</VBtnToggle>
		</div>
		<MediaBoard
			v-if="mediaBoard && availableMediaLine"
			:board="mediaBoard"
			:available-media-line="availableMediaLine"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import mdiCustomGridOutline from "@/components/icons/custom/mdi_custom_grid_outline.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { MediaBoardLayoutType } from "@/serverApi/v3";
import { buildPageTitle } from "@/utils/pageTitle";
import { MediaBoard, useSharedMediaBoardState } from "@feature-media-shelf";
import { mdiViewGridOutline } from "@mdi/js";
import { useTitle } from "@vueuse/core";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useTitle(buildPageTitle(t("feature.media-shelf.title")));

const {
	mediaBoard,
	availableMediaLine,
	fetchMediaBoardForUser,
	fetchAvailableMedia,
	updateMediaBoardLayout,
} = useSharedMediaBoardState();

onMounted(async () => {
	await fetchMediaBoardForUser();
	await fetchAvailableMedia();
});
</script>
