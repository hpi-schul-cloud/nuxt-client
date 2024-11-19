<template>
	<DefaultWireframe
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
		@fab:clicked="onFabClick"
	>
		<template #header>
			<h1 class="text-h3 mb-4" data-testid="room-title">
				{{ t("pages.rooms.members.manage") }}
			</h1>
		</template>

		<div class="mb-8 mt-12">
			<RenderHTML :html="t('pages.rooms.members.infoText')" />
		</div>
		<div class="mb-12">
			<MembersTable
				v-if="!isLoading"
				:members="memberList"
				@remove:member="onRemoveMember"
			/>
		</div>

		<v-dialog
			v-model="isMembersDialogOpen"
			:width="xs ? 'auto' : 480"
			persistent
			max-width="480"
			data-testid="dialog-add-participants"
		>
			<AddMembers
				:memberList="potentialRoomMembers"
				:schools="schools"
				@close="onDialogClose"
				@add:members="onAddMembers"
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
import { useRoomDetailsStore, useRoomMembers, RoomMember } from "@data-room";
import { storeToRefs } from "pinia";
import { mdiPlus } from "@icons/material";
import { MembersTable, AddMembers } from "@feature-room";
import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
import {
	ConfirmationDialog,
	useConfirmationDialog,
} from "@ui-confirmation-dialog";
import { RenderHTML } from "@feature-render-html";
import { useDisplay } from "vuetify";

const { fetchRoom } = useRoomDetailsStore();
const { t } = useI18n();
const route = useRoute();
const { xs } = useDisplay();
const { room } = storeToRefs(useRoomDetailsStore());
const isMembersDialogOpen = ref(false);
const roomId = route.params.id.toString();
const {
	isLoading,
	potentialRoomMembers,
	roomMembers,
	schools,
	addMembers,
	fetchMembers,
	getPotentialMembers,
	getSchools,
	removeMembers,
} = useRoomMembers(roomId);
const memberList: Ref<RoomMemberResponse[]> = ref(roomMembers);
const pageTitle = computed(() =>
	buildPageTitle(`${room.value?.name} - ${t("pages.rooms.members.manage")}`)
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
	await getPotentialMembers({ role: RoleName.RoomEditor });
	isMembersDialogOpen.value = true;
};

const onDialogClose = () => {
	isMembersDialogOpen.value = false;
};

const onAddMembers = async (memberIds: string[]) => {
	await addMembers(memberIds);
};

const onUpdateRoleOrSchool = async (payload: {
	role: RoleName;
	schoolId: string;
}) => {
	await getPotentialMembers(payload);
};

const onRemoveMember = async (member: RoomMember) => {
	const { askConfirmation } = useConfirmationDialog();
	const message = t("pages.rooms.members.remove.confirmation", {
		memberName: `${member.firstName} ${member.lastName}`,
	});

	const shouldDelete = await askConfirmation({
		message,
		confirmActionLangKey: "common.actions.remove",
	});

	if (!shouldDelete) return;
	await removeMembers([member.userId]);
};

onMounted(async () => {
	// call fetchRoom() again because the store is reset on unmounted lifecycle hook in RoomDetails.page.vue
	if (room.value === undefined) {
		await fetchRoom(roomId);
	}
	await fetchMembers();
});

const fabAction = {
	icon: mdiPlus,
	title: t("pages.rooms.members.add"),
	ariaLabel: t("pages.rooms.members.add"),
	dataTestId: "fab-add-members",
};
</script>
