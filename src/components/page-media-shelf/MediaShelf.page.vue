<template>
	<DefaultWireframe ref="main" :full-width="true">
		<MediaBoard :board="mediaBoard" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import MediaBoard from "./MediaBoard.vue";
import { useSharedMediaBoardState } from "./sharedState";

useTitle(buildPageTitle("Mein Medienregal"));

const { mediaBoard } = useSharedMediaBoardState();
</script>
