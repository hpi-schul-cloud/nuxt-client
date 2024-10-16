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
					:userList="potentialParticipants"
					@close="onDialogClose"
					@add:participants="onAddParticipants"
					@update:role="onUpdateRole"
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
import { ParticipantsTable, AddParticipants } from "@feature-room";
import { Participants } from "@/modules/data/room/roomParticipants/types";
import { RoleName } from "@/serverApi/v3";
import { useParticipants } from "@/modules/data/room/roomParticipants/participants.composable";

const { fetchRoom } = useRoomDetailsStore();
const { t } = useI18n();
const route = useRoute();
const { room } = storeToRefs(useRoomDetailsStore());
const participantsDialog = ref(false);
const {
	potentialParticipants,
	participants,
	addParticipants,
	fetch,
	fetchPotential,
} = useParticipants();

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

const onFabClick = async () => {
	await fetchPotential(RoleName.Teacher);
	participantsDialog.value = true;
};

const onDialogClose = () => {
	participantsDialog.value = false;
};

const onAddParticipants = async (participantIds: string[]) => {
	await addParticipants(participantIds);
};

const onUpdateRole = async (role: RoleName) => {
	await fetchPotential(role);
};

onMounted(async () => {
	// TODO: Is fetchRoom() necessary on every page load?
	// Not reseting the store onUnmounted lifecycle hook in RoomDetails.page.vue can be a solution
	if (room.value === undefined) {
		console.log("Room store not found");
		await fetchRoom(route.params.id as string);
	}
	await fetch();
});

const fabAction = {
	icon: mdiPlus,
	title: t("pages.rooms.participants.addParticipants"),
	ariaLabel: t("pages.rooms.participants.addParticipants"),
	testId: "fab-add-participant",
};
</script>
