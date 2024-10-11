<template>
	<DefaultWireframe
		max-width="nativ"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
		@fab:clicked="onFabClicked"
	>
		<template #header>
			<h1 class="text-h3 py-2 mb-4">Manage Participants</h1>
		</template>
		<div class="mb-8">
			Hier könnte Text stehen oder ein wichtiger Hinweis, zum Beispiel: wo man
			den Hilfeartikel zur Anzeige des eigenen Namens im zentralen Verzeichnis
			findet.
		</div>
		<div>
			<ParticipantsTable :participants="participants" />
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import { computed, ComputedRef, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useRoomDetailsStore } from "@data-room";
import { storeToRefs } from "pinia";
import { mdiPlus } from "@icons/material";
import { participants } from "../../data/room/mockParticipantsList";
import { ParticipantsTable } from "@feature-room";

const { fetchRoom } = useRoomDetailsStore();
const { t } = useI18n();
const route = useRoute();
const { room } = storeToRefs(useRoomDetailsStore());

if (room.value === undefined) {
	// TODO: how to get room value from store?
	// The store is resetted onUnmounted lifecycle hook in RoomDetails.page.vue
	console.log("Room store not found");
}

const pageTitle = computed(() =>
	buildPageTitle(`${room.value?.name} - Manage Participants`)
);
useTitle(pageTitle);

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	if (room === undefined) return [];

	return [
		{
			title: t("pages.rooms.title"),
			to: "/rooms",
		},
		{
			title: room.value?.name || "",
			to: `/rooms/${route.params.id}`,
		},
		{
			title: "manage participants",
			disabled: true,
		},
	];
});

const onFabClicked = () => {
	console.log("FAB clicked");
};

onMounted(async () => {
	// TODO: Is fetchRoom() necessary on every page load?
	// Not reseting the store onUnmounted lifecycle hook in RoomDetails.page.vue can be a solution
	await fetchRoom(route.params.id as string);
});

const fabAction = {
	icon: mdiPlus,
	title: "Add User",
	ariaLabel: "Add User",
	testId: "fab-add-participant",
};
</script>
