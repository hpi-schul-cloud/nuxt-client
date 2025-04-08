<template>
	<div class="mb-8" data-testid="info-text">
		<i18n-t
			v-if="isVisiblePageInfoText"
			keypath="pages.rooms.members.infoText"
			scope="global"
		>
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
			v-if="!isLoading && currentUser"
			v-model:selected-user-ids="selectedIds"
			:members="memberList"
			:currentUser="currentUser"
			:fixed-position="fixedHeaderOnMobile"
			@remove:members="onRemoveMembers"
			@change:permission="onOpenRoleDialog"
		/>
	</div>

	<v-dialog
		v-model="isChangeRoleDialogOpen"
		:width="xs ? 'auto' : 480"
		data-testid="dialog-change-role-participants"
		max-width="480"
		@keydown.esc="onDialogClose"
	>
		<ChangeRole
			:members="membersToChangeRole"
			:room-name="room?.name || ''"
			:current-user="currentUser"
			@cancel="onDialogClose"
			@confirm="onChangeRole"
			@change-room-owner="onChangeOwner"
		/>
	</v-dialog>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import {
	useRoomDetailsStore,
	useRoomMembers,
	useRoomMemberVisibilityOptions,
	RoomMember,
} from "@data-room";
import { MembersTable, ChangeRole } from "@feature-room";
import { computed, onMounted, ref, Ref, watch } from "vue";
import { useElementBounding } from "@vueuse/core";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { storeToRefs } from "pinia";
import { ChangeRoomRoleBodyParamsRoleNameEnum } from "@/serverApi/v3";

const { t } = useI18n();
const route = useRoute();
const roomId = route.params.id.toString();
const { xs, mdAndDown } = useDisplay();

const { room } = storeToRefs(useRoomDetailsStore());

const {
	isLoading,
	roomMembers,
	currentUser,
	selectedIds,
	changeRoomOwner,
	fetchMembers,
	removeMembers,
	updateMembersRole,
} = useRoomMembers(roomId);

const memberList: Ref<RoomMember[]> = ref(roomMembers);
const fixedHeaderOnMobile = ref({
	enabled: false,
	positionTop: 0,
});
const membersToChangeRole = ref<RoomMember[]>([]);
const isChangeRoleDialogOpen = ref(false);

const wireframe = ref<HTMLElement | null>(null);
const { y } = useElementBounding(wireframe);

const { isVisiblePageInfoText } = useRoomMemberVisibilityOptions(currentUser);

watch(y, () => {
	fixedHeaderOnMobile.value.enabled = y.value <= 0 && mdAndDown.value;
});

const onRemoveMembers = async (userIds: string[]) => {
	await removeMembers(userIds);
};

const onOpenRoleDialog = (ids: string[]) => {
	membersToChangeRole.value =
		ids.length === 1
			? memberList.value.filter((member) => member.userId === ids[0])
			: memberList.value.filter((member) =>
					selectedIds.value.includes(member.userId)
				);
	isChangeRoleDialogOpen.value = true;
};

const onChangeRole = async (
	role: ChangeRoomRoleBodyParamsRoleNameEnum,
	id?: string
) => {
	await updateMembersRole(role, id);
	isChangeRoleDialogOpen.value = false;
	selectedIds.value = [];
};

const onChangeOwner = async (id: string) => {
	await changeRoomOwner(id);
	isChangeRoleDialogOpen.value = false;
	selectedIds.value = [];
};

const onDialogClose = () => {
	isChangeRoleDialogOpen.value = false;
};

onMounted(async () => {
	await fetchMembers();
	const header = document.querySelector(".wireframe-header") as HTMLElement;
	fixedHeaderOnMobile.value.positionTop = header.offsetHeight + y.value;
});

const linkAriaLabel = computed(
	() =>
		`${t("pages.rooms.members.infoText.moreInformation")}, ${t("common.ariaLabel.newTab")}`
);
</script>
