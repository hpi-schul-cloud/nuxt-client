<template>
	<DefaultWireframe
		max-width="full"
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
			<RenderHTML :html="t('pages.rooms.participant.infoText')" />
		</div>
		<div class="mb-12">
			<ParticipantsTable
				v-if="!isLoading"
				:participants="participantsList"
				@remove:participant="onRemoveParticipant"
			/>
		</div>

		<v-dialog
			v-model="isParticipantsDialogOpen"
			:width="xs ? 'auto' : 480"
			persistent
			max-width="480"
		>
			<AddParticipants
				:userList="potentialParticipants"
				:schools="schools"
				@close="onDialogClose"
				@add:participants="onAddParticipants"
				@update:role="onUpdateRoleOrSchool"
			/>
		</v-dialog>
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
import {
	useRoomDetailsStore,
	useParticipants,
	ParticipantType,
} from "@data-room";
import { storeToRefs } from "pinia";
import { mdiPlus } from "@icons/material";
import { ParticipantsTable, AddParticipants } from "@feature-room";
import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
import {
	ConfirmationDialog,
	useConfirmationDialog,
	useDeleteConfirmationDialog,
} from "@ui-confirmation-dialog";
import { RenderHTML } from "@feature-render-html";
import { useDisplay } from "vuetify";

const { fetchRoom } = useRoomDetailsStore();
const { t } = useI18n();
const route = useRoute();
const { xs } = useDisplay();
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

const participantsList: Ref<RoomMemberResponse[]> = ref(participants);
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
	await getPotentialParticipants({ role: RoleName.RoomEditor });
	isParticipantsDialogOpen.value = true;
};

const onDialogClose = () => {
	isParticipantsDialogOpen.value = false;
};

const onAddParticipants = async (participantIds: string[]) => {
	await addParticipants(participantIds);
};

const onUpdateRoleOrSchool = async (payload: {
	role: RoleName;
	schoolId: string;
}) => {
	await getPotentialParticipants(payload);
};

const onRemoveParticipant = async (participant: ParticipantType) => {
	const { askConfirmation } = useConfirmationDialog();
	const message = t("pages.rooms.participant.delete.confirmation", {
		memberName: `${participant.firstName} ${participant.lastName}`,
	});
	const shouldDelete = await askConfirmation({ message });

	if (!shouldDelete) return;
	onRemoveParticipants([participant.userId]);
};

const onRemoveParticipants = async (participantIds: string[]) => {
	await removeParticipants(participantIds);
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
