<template>
	<DefaultWireframe max-width="short" :fab-items="fabAction">
		<template #header>
			<h1 class="text-h3 mb-4">{{ t("pages.rooms.title") }}</h1>
		</template>
		<RoomGrid />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { RoomGrid } from "@feature-room";
import { mdiPlus } from "@icons/material";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const pageTitle = computed(() => buildPageTitle(`${t("pages.rooms.title")}`));
useTitle(pageTitle);

const fabAction = {
	icon: mdiPlus,
	title: t("common.actions.create"),
	to: "/rooms/new",
	ariaLabel: t("pages.rooms.fab.title"),
	dataTestId: "fab-add-room",
};
</script>
