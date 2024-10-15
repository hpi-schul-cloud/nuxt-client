<template>
	<DefaultWireframe
		max-width="nativ"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
		@fab:clicked="onFabClick"
	>
		<template #header>
			<h1 class="text-h3 py-2 mb-4 title-header">
				{{ t("pages.rooms.participants.manageParticipants") }}
			</h1>
		</template>
		<div class="mb-8">
			Hier könnte Text stehen oder ein wichtiger Hinweis, zum Beispiel: wo man
			den Hilfeartikel zur Anzeige des eigenen Namens im zentralen Verzeichnis
			findet.
		</div>
		<div>
			<ParticipantsTable :participants="participantsList" />
		</div>
		<div>
			<v-dialog v-model="participantsDialog" width="auto" persistent>
				<AddParticipants
					:userList="potentialUsers"
					@close="onDialogClose"
					@add:participants="onAddParticipants"
				/>
			</v-dialog>
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import { computed, ComputedRef, onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useRoomDetailsStore } from "@data-room";
import { storeToRefs } from "pinia";
import { mdiPlus } from "@icons/material";
import {
	participants,
	potentialUsers,
} from "../../data/room/roomParticipants/mockParticipantsList";
import { ParticipantsTable, AddParticipants } from "@feature-room";
import { Participants } from "@/modules/feature/room/RoomParticipants/types";

const { fetchRoom } = useRoomDetailsStore();
const { t } = useI18n();
const route = useRoute();
const { room } = storeToRefs(useRoomDetailsStore());
const participantsDialog = ref(false);

if (room.value === undefined) {
	// TODO: how to get room value from store?
	// The store is resetted onUnmounted lifecycle hook in RoomDetails.page.vue
	console.log("Room store not found");
}

const participantsList: Ref<Participants[]> = ref(participants);

const pageTitle = computed(() =>
	buildPageTitle(
		`${room.value?.name} - ${t("pages.rooms.participants.manageParticipants")}`
	)
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
			title: t("pages.rooms.participants.manageParticipants"),
			disabled: true,
		},
	];
});

const onFabClick = () => {
	participantsDialog.value = true;
};

const onDialogClose = () => {
	participantsDialog.value = false;
};

const onAddParticipants = (participantIds: string[]) => {
	const newParticipants = potentialUsers.filter((user) =>
		participantIds.includes(user.id)
	);

	participantsList.value = [...participantsList.value, ...newParticipants];
};

onMounted(async () => {
	// TODO: Is fetchRoom() necessary on every page load?
	// Not reseting the store onUnmounted lifecycle hook in RoomDetails.page.vue can be a solution
	await fetchRoom(route.params.id as string);
});

const fabAction = {
	icon: mdiPlus,
	title: t("pages.rooms.participants.addParticipants"),
	ariaLabel: t("pages.rooms.participants.addParticipants"),
	testId: "fab-add-participant",
};
</script>
