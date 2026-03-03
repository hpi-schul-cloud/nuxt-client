<template>
	<div class="members-table">
		<DataTable
			:items="tableData"
			:table-headers="tableHeader"
			:show-select="allowedOperations.addMembers"
			:external-selected-ids="selectedIds"
			:header-bottom="headerBottom"
			data-testid="participants-table"
			select-item-key="userId"
			aria-label-name-key="fullName"
			@update:selected-ids="onUpdateSelectedIds"
		>
			<template #[`action-menu-items`]>
				<KebabMenuActionChangePermission v-if="allowedOperations.addMembers" @click="onChangePermission(selectedIds)" />
				<KebabMenuActionRemoveMember @click="onRemoveMembers(selectedIds)" />
			</template>
			<template #[`item.displaySchoolRole`]="{ item }">
				<span class="text-no-wrap">
					<VIcon v-if="getSchoolRoleIcon(item.schoolRoleNames)" :icon="getSchoolRoleIcon(item.schoolRoleNames)" />
					{{ item.displaySchoolRole }}
				</span>
			</template>
			<template v-if="allowedOperations.addMembers" #[`item.actions`]="{ item: member, index }">
				<KebabMenu
					v-if="
						member.allowedOperations?.changeRole ||
						member.allowedOperations?.passOwnershipTo ||
						member.allowedOperations?.removeMember
					"
					:data-testid="`kebab-menu-${index}`"
					:aria-label="getAriaLabel(member)"
				>
					<KebabMenuActionChangePermission
						v-if="member.allowedOperations?.changeRole || member.allowedOperations?.passOwnershipTo"
						:aria-label="getAriaLabel(member, 'changeRole')"
						@click="onChangePermission([member.userId])"
					/>
					<KebabMenuActionRemoveMember
						v-if="member.allowedOperations?.removeMember"
						:aria-label="getAriaLabel(member, 'remove')"
						@click="onRemoveMembers([member.userId])"
					/>
				</KebabMenu>
			</template>
		</DataTable>
	</div>
	<ChangeRole v-model="isChangeRoleDialogOpen" :members="membersToChangeRole" @close="onDialogClose" />
	<ConfirmationDialog />
</template>

<script setup lang="ts">
import ChangeRole from "../dialogs/ChangeRole.vue";
import { RoleName } from "@/serverApi/v3";
import { RoomMember, useRoomAllowedOperations, useRoomDetailsStore, useRoomMembersStore } from "@data-room";
import { mdiAccountClockOutline, mdiAccountOutline, mdiAccountSchoolOutline } from "@icons/material";
import { ConfirmationDialog, useConfirmationDialog } from "@ui-confirmation-dialog";
import { DataTable } from "@ui-data-table";
import { KebabMenu, KebabMenuActionChangePermission, KebabMenuActionRemoveMember } from "@ui-kebab-menu";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	headerBottom?: number;
	showSelect?: boolean;
};

withDefaults(defineProps<Props>(), {
	headerBottom: 0,
	showSelect: false,
});

const { t } = useI18n();
const { allowedOperations } = useRoomAllowedOperations();
const { room, fetchRoom } = useRoomDetailsStore();

const roomMembersStore = useRoomMembersStore();
const { roomMembersWithoutApplicants, selectedIds, baseTableHeaders } = storeToRefs(roomMembersStore);

const { fetchMembers, removeMembers } = roomMembersStore;
const { askConfirmation } = useConfirmationDialog();

const tableData = computed(() => roomMembersWithoutApplicants.value as unknown as Record<string, unknown>[]);
const isChangeRoleDialogOpen = ref(false);
const membersToChangeRole = ref<RoomMember[]>([]);

const onDialogClose = () => {
	fetchMembers();
	isChangeRoleDialogOpen.value = false;

	setTimeout(() => {
		membersToChangeRole.value = [];
	}, 200);
	if (room?.id) {
		fetchRoom(room?.id);
	}
};

const onRemoveMembers = async (userIds: string[]) => {
	const shouldRemove = await confirmRemoval(userIds);
	if (shouldRemove) await removeMembers(userIds);
};

const confirmRemoval = async (userIds: string[]) => {
	let message = t("pages.rooms.members.multipleRemove.confirmation");
	if (userIds.length === 1) {
		const memberFullName = roomMembersStore.getMemberFullName(userIds[0]);
		message = t("pages.rooms.members.remove.confirmation", { memberFullName });
	}
	const shouldRemove = await askConfirmation({
		message,
		confirmActionLangKey: "common.actions.remove",
	});
	return shouldRemove;
};

const onChangePermission = (userIds: string[]) => {
	membersToChangeRole.value = roomMembersWithoutApplicants.value.filter((member) => userIds.includes(member.userId));

	isChangeRoleDialogOpen.value = true;
};

const onUpdateSelectedIds = (ids: string[]) => {
	selectedIds.value = ids;
};

const getAriaLabel = (member: RoomMember, actionFor: "remove" | "changeRole" | "" = "") => {
	const memberFullName = member.fullName;
	const mapActionToLanguageKey = {
		remove: "pages.rooms.members.remove.ariaLabel",
		changeRole: "pages.rooms.members.changePermission.ariaLabel",
		"": "pages.rooms.members.actionMenu.ariaLabel",
	};
	const languageKey = mapActionToLanguageKey[actionFor];
	return t(languageKey, { memberFullName });
};

const tableHeader = computed(() => [
	...baseTableHeaders.value,
	{
		title: allowedOperations.value.addMembers ? t("pages.rooms.members.tableHeader.actions") : "",
		key: "actions",
		sortable: false,
		width: 50,
		align: "center",
	},
]);

const getSchoolRoleIcon = (schoolRoleNames: RoleName[]) => {
	if (schoolRoleNames.includes(RoleName.Teacher)) {
		return mdiAccountSchoolOutline;
	}
	if (schoolRoleNames.includes(RoleName.Student)) {
		return mdiAccountOutline;
	}
	if (schoolRoleNames.includes(RoleName.ExternalPerson)) {
		return mdiAccountClockOutline;
	}
	return undefined;
};
</script>

<style lang="scss" scoped>
.members-table :deep(.table-title-header.pt-7) {
	padding-top: 8px !important;
}
</style>
