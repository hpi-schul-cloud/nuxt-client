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
			:fixed-position="fixedHeaderOnMobile"
			@change:permission="onOpenRoleDialog"
		/>
	</div>

	<VDialog
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
	</VDialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import {
	useRoomDetailsStore,
	useRoomMemberVisibilityOptions,
	RoomMember,
	useRoomMembersStore,
} from "@data-room";
import { storeToRefs } from "pinia";
import { MembersTable, ChangeRole } from "@feature-room";
import { ChangeRoomRoleBodyParamsRoleNameEnum } from "@/serverApi/v3";
import { useDisplay } from "vuetify";
import { useElementBounding } from "@vueuse/core";

const { t } = useI18n();

const { xs, mdAndDown } = useDisplay();
const { room } = storeToRefs(useRoomDetailsStore());
const isChangeRoleDialogOpen = ref(false);

const roomMembersStore = useRoomMembersStore();
const { isLoading, selectedIds, roomMembers, currentUser } =
	storeToRefs(roomMembersStore);
const { updateMembersRole, changeRoomOwner } = roomMembersStore;

const wireframe = ref<HTMLElement | null>(null);
const fixedHeaderOnMobile = ref({
	enabled: false,
	positionTop: 0,
});
const { y } = useElementBounding(wireframe);
const { isVisiblePageInfoText } = useRoomMemberVisibilityOptions(currentUser);

const onDialogClose = () => {
	isChangeRoleDialogOpen.value = false;
};

const membersToChangeRole = ref<RoomMember[]>([]);

const onOpenRoleDialog = (ids: string[]) => {
	membersToChangeRole.value =
		ids.length === 1
			? roomMembers.value.filter((member) => member.userId === ids[0])
			: roomMembers.value.filter((member) =>
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

onMounted(async () => {
	const header = document.querySelector(".wireframe-header") as HTMLElement;
	fixedHeaderOnMobile.value.positionTop = header.offsetHeight + y.value;
});

watch(y, () => {
	fixedHeaderOnMobile.value.enabled = y.value <= 0 && mdAndDown.value;
});

const linkAriaLabel = computed(
	() =>
		`${t("pages.rooms.members.infoText.moreInformation")}, ${t("common.ariaLabel.newTab")}`
);
</script>
