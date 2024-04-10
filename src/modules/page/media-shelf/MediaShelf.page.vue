<template>
	<DefaultWireframe ref="main" :full-width="true">
		<MediaBoard :board="mediaBoard" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { MediaBoard, useSharedMediaBoardState } from "@feature-media-shelf";
import { useTitle } from "@vueuse/core";

useTitle(buildPageTitle("Mein Medienregal"));

const { mediaBoard } = useSharedMediaBoardState();
</script>
