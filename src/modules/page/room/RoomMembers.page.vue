<template>
	<DefaultWireframe
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
		:fixed-header="fixedHeaderOnMobile.enabled"
		@fab:clicked="onFabClick"
		ref="wireframe"
	>
		<template #header>
			<div class="d-flex align-items-center">
				<h1 class="text-h3 mb-4" data-testid="room-title">
					{{ t("pages.rooms.members.manage") }}
				</h1>
				<KebabMenu
					v-if="isVisibleLeaveRoomButton"
					class="mx-2"
					data-testid="room-member-menu"
				>
					<KebabMenuActionLeaveRoom @click="onLeaveRoom" />
				</KebabMenu>
			</div>
		</template>

		<div class="mb-8 mt-12" data-testid="info-text">
			<i18n-t keypath="pages.rooms.members.infoText" scope="global">
				<a
					href="https://docs.dbildungscloud.de/display/SCDOK/Teameinladung+freigeben"
					target="_blank"
					rel="noopener"
					:ariaLabel="linkAriaLabel"
				>
					{{ t("pages.rooms.members.infoText.moreInformation") }}
				</a>
			</i18n-t>
		</div>

		<div class="mb-12">
			<MembersTable
				v-if="!isLoading"
				:members="memberList"
				:currentUser="currentUser"
				:fixed-position="fixedHeaderOnMobile"
				@remove:members="onRemoveMembers"
				@change:permission="onOpenRoleDialog"
			/>
		</div>

		<v-dialog
			v-model="isMembersDialogOpen"
			:width="xs ? 'auto' : 480"
			data-testid="dialog-add-participants"
			max-width="480"
			persistent
			@keydown.esc="onDialogClose"
		>
			<AddMembers
				:memberList="potentialRoomMembers"
				:schools="schools"
				@close="onDialogClose"
				@add:members="onAddMembers"
				@update:role="onUpdateRoleOrSchool"
			/>
		</v-dialog>

		<v-dialog
			v-model="isChangeRoleDialogOpen"
			:width="xs ? 'auto' : 480"
			data-testid="dialog-add-participants"
			max-width="480"
			@keydown.esc="onDialogClose"
		>
			<ChangeRole
				:members="membersToChangeRole"
				:room-name="room?.name || ''"
				@cancel="onDialogClose"
				@confirm="onChangeRole"
			/>
		</v-dialog>
	</DefaultWireframe>
	<ConfirmationDialog />
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle, useElementBounding } from "@vueuse/core";
import { computed, ComputedRef, onMounted, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import {
	useRoomDetailsStore,
	useRoomMembers,
	useRoomMemberVisibilityOptions,
} from "@data-room";
import { storeToRefs } from "pinia";
import { mdiPlus } from "@icons/material";
import { MembersTable, AddMembers, ChangeRole } from "@feature-room";
import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
import { useDisplay } from "vuetify";
import { KebabMenu, KebabMenuActionLeaveRoom } from "@ui-kebab-menu";
import {
	ConfirmationDialog,
	useConfirmationDialog,
} from "@ui-confirmation-dialog";

const { fetchRoom } = useRoomDetailsStore();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { xs, mdAndDown } = useDisplay();
const { room } = storeToRefs(useRoomDetailsStore());
const isMembersDialogOpen = ref(false);
const isChangeRoleDialogOpen = ref(false);
const roomId = route.params.id.toString();
const {
	isLoading,
	potentialRoomMembers,
	roomMembers,
	schools,
	currentUser,
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
const wireframe = ref<HTMLElement | null>(null);
const fixedHeaderOnMobile = ref({
	enabled: false,
	positionTop: 0,
});
const { y } = useElementBounding(wireframe);
const { askConfirmation } = useConfirmationDialog();

const { isVisibleAddMemberButton, isVisibleLeaveRoomButton } =
	useRoomMemberVisibilityOptions(currentUser);

useTitle(pageTitle);

const onFabClick = async () => {
	await getSchools();
	isMembersDialogOpen.value = true;
};

const onDialogClose = () => {
	isMembersDialogOpen.value = false;
	isChangeRoleDialogOpen.value = false;
};

const onAddMembers = async (memberIds: string[]) => {
	await addMembers(memberIds);
};

const onUpdateRoleOrSchool = async (payload: {
	schoolRole: RoleName;
	schoolId: string;
}) => {
	await getPotentialMembers(payload.schoolRole, payload.schoolId);
};

const onRemoveMembers = async (memberIds: string[]) => {
	await removeMembers(memberIds);
};

const onLeaveRoom = async () => {
	const shouldLeave = await askConfirmation({
		message: t("pages.rooms.leaveRoom.confirmation", {
			roomName: room.value?.name,
		}),
		confirmActionLangKey: "common.actions.leave",
	});

	if (!shouldLeave) return;
	await removeMembers([currentUser.value.userId]);
	router.push("/rooms");
};

const membersToChangeRole = ref<RoomMemberResponse[]>([]);

const onOpenRoleDialog = (userIds: string[]) => {
	membersToChangeRole.value = memberList.value.filter((member) =>
		userIds.includes(member.userId)
	);
	isChangeRoleDialogOpen.value = true;
};

const onChangeRole = async (role: string) => {
	if (membersToChangeRole.value === null) return;
	console.log("Change role to", role);
	console.log("Member to change role", membersToChangeRole.value);
	console.log("Room id", roomId);
};

onMounted(async () => {
	if (room.value === undefined) {
		await fetchRoom(roomId);
	}

	await fetchMembers();
	const header = document.querySelector(".wireframe-header") as HTMLElement;
	fixedHeaderOnMobile.value.positionTop = header.offsetHeight + y.value;
});

watch(y, () => {
	fixedHeaderOnMobile.value.enabled = y.value <= 0 && mdAndDown.value;
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
		{
			title: t("pages.rooms.members.manage"),
			disabled: true,
		},
	];
});

const fabAction = computed(() => {
	if (!isVisibleAddMemberButton.value) return;
	return {
		icon: mdiPlus,
		title: t("pages.rooms.members.add"),
		ariaLabel: t("pages.rooms.members.add"),
		dataTestId: "fab-add-members",
	};
});

const linkAriaLabel = computed(
	() =>
		`${t("pages.rooms.members.infoText.moreInformation")}, ${t("common.ariaLabel.newTab")}`
);
</script>
