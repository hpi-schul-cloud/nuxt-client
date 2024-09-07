<template>
	<DefaultWireframe max-width="short" :fab-items="fabAction">
		<template #header>
			<h1 class="text-h3 py-2 mb-4">{{ t("pages.rooms.title") }}</h1>
		</template>
		<RoomGrid />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomGrid } from "@feature-room";
import { mdiPlus } from "@icons/material";

const { t } = useI18n();

const fabAction = {
	icon: mdiPlus,
	title: t("common.actions.create"),
	href: "/rooms/new",
	ariaLabel: t("pages.rooms.fab.title"),
	testId: "fab-add-room",
};
</script>
