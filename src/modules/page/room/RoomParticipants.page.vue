<template>
	<DefaultWireframe
		max-width="nativ"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
		@fab:clicked="onFabClick"
	>
		<template #header>
			<h1 class="text-h3 mb-4">
				{{ t("pages.rooms.participants.manageParticipants") }}
			</h1>
		</template>

		<div class="mb-8 mt-12">
			Füge Teilnehmende zum Raum hinzu. Lehrkräfte anderer Schulen können
			hinzugefügt werden, wenn sie die Sichtbarkeit im zentralen Verzeichnis im
			eigenen Profil aktiviert haben
			<a
				href="https://docs.dbildungscloud.de/display/SCDOK/Teameinladung+freigeben"
				>(weitere Informationen)</a
			>.
		</div>
		<div>
			<ParticipantsTable
				v-if="!isLoading"
				:participants="participantsList"
				@remove:participant="onRemoveParticipant"
			/>
		</div>
		<div>
			<v-dialog v-model="isParticipantsDialogOpen" width="auto" persistent>
				<AddParticipants
					:userList="potentialParticipants"
					:schools="schools"
					@close="onDialogClose"
					@add:participants="onAddParticipants"
					@update:role="onUpdateRole"
				/>
			</v-dialog>
		</div>
		<ConfirmationDialog />
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
import { useRoomDetailsStore, useParticipants } from "@data-room";
import { storeToRefs } from "pinia";
import { mdiPlus } from "@icons/material";
import { ParticipantsTable, AddParticipants } from "@feature-room";
import { RoleName, RoomParticipantResponse } from "@/serverApi/v3";
import { ParticipantType } from "@data-room";
import {
	ConfirmationDialog,
	useDeleteConfirmationDialog,
} from "@ui-confirmation-dialog";

const { fetchRoom } = useRoomDetailsStore();
const { t } = useI18n();
const route = useRoute();
const { room } = storeToRefs(useRoomDetailsStore());
const isParticipantsDialogOpen = ref(false);
const roomId = route.params.id.toString();
const {
	isLoading,
	potentialParticipants,
	participants,
	schools,
	addParticipants,
	fetchParticipants,
	getPotentialParticipants,
	getSchools,
	removeParticipants,
} = useParticipants(roomId);

const participantsList: Ref<RoomParticipantResponse[]> = ref(participants);
const { askDeleteConfirmation } = useDeleteConfirmationDialog();

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
	];
});

const onFabClick = async () => {
	await getSchools();
	await getPotentialParticipants(RoleName.RoomEditor);
	isParticipantsDialogOpen.value = true;
};

const onDialogClose = () => {
	isParticipantsDialogOpen.value = false;
};

const onAddParticipants = async (participantIds: string[]) => {
	await addParticipants(participantIds);
};

const onUpdateRole = async (role: RoleName) => {
	await getPotentialParticipants(role);
};

const onRemoveParticipant = async (participant: ParticipantType) => {
	const shouldDelete = await askDeleteConfirmation(
		`${participant.lastName}, ${participant.firstName}`,
		"pages.rooms.participant.label"
	);
	if (!shouldDelete) return;
	await removeParticipants([participant.userId]);
};

onMounted(async () => {
	// call fetchRoom() again because the store is reset on unmounted lifecycle hook in RoomDetails.page.vue
	if (room.value === undefined) {
		console.log("Room store not found");
		await fetchRoom(roomId);
	}
	await fetchParticipants();
});

const fabAction = {
	icon: mdiPlus,
	title: t("pages.rooms.participants.addParticipants"),
	ariaLabel: t("pages.rooms.participants.addParticipants"),
	testId: "fab-add-participant",
};
</script>
