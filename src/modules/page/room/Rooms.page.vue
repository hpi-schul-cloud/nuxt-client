<template>
	<DefaultWireframe max-width="short">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">{{ t("pages.rooms.active.title") }}</h1>
		</template>
		<RoomGrid />
	</DefaultWireframe>
</template>
<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomGrid } from "@feature-room";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
