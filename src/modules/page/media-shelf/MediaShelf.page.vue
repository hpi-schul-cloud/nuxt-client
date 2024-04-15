<template>
	<DefaultWireframe ref="main" :full-width="true">
		<div class="ml-1">
			<h3 aria-level="1" class="mt-0">
				{{ $t("feature.media-shelf.title") }}
			</h3>
		</div>
		<MediaBoard v-if="mediaBoard" :board="mediaBoard" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { MediaBoard, useSharedMediaBoardState } from "@feature-media-shelf";
import { useTitle } from "@vueuse/core";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useTitle(buildPageTitle(t("feature.media-shelf.title")));

const { mediaBoard } = useSharedMediaBoardState();
</script>
