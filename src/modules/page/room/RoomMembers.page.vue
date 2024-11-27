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
			<i18n-t keypath="pages.rooms.members.infoText">
				<a
					href="https://docs.dbildungscloud.de/display/SCDOK/Teameinladung+freigeben"
					target="_blank"
					rel="noopener"
					:ariaLabel="linkAriaLabel"
					>{{ t("pages.rooms.members.infoText.moreInformation") }}</a
				>
			</i18n-t>
		</div>
		<div class="mb-12">
			<MembersTable
				v-if="!isLoading"
				:members="memberList"
				@remove:members="onRemoveMembers"
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
import { useRoomDetailsStore, useRoomMembers } from "@data-room";
import { storeToRefs } from "pinia";
import { mdiPlus } from "@icons/material";
import { MembersTable, AddMembers } from "@feature-room";
import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
import {
	ConfirmationDialog,
	useConfirmationDialog,
} from "@ui-confirmation-dialog";
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
const { askConfirmation } = useConfirmationDialog();
useTitle(pageTitle);

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

const onRemoveMembers = async (memberIds: string[]) => {
	let message = t("pages.rooms.members.multipleRemove.confirmation", {
		count: memberIds.length,
	});
	if (memberIds.length === 1) {
		const member = memberList.value.find(
			(member) => member.userId === memberIds[0]
		);
		message = t("pages.rooms.members.remove.confirmation", {
			memberName: `${member?.firstName} ${member?.lastName}`,
		});
	}

	const shouldDelete = await askConfirmation({
		message,
		confirmActionLangKey: "common.actions.remove",
	});

	if (!shouldDelete) return;
	await removeMembers(memberIds);
};

onMounted(async () => {
	if (room.value === undefined) {
		await fetchRoom(roomId);
	}
	await fetchMembers();
});

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

const fabAction = {
	icon: mdiPlus,
	title: t("pages.rooms.members.add"),
	ariaLabel: t("pages.rooms.members.add"),
	dataTestId: "fab-add-members",
};

const linkAriaLabel = computed(
	() =>
		`${t("pages.rooms.members.infoText.moreInformation")}, ${t("common.ariaLabel.newTab")}`
);
</script>
