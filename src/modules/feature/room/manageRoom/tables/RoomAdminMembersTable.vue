<template>
	<DataTable
		:items="tableData"
		:table-headers="tableHeaders"
		:show-select="true"
		:external-selected-ids="selectedIds"
		:header-bottom="headerBottom"
		data-testid="room-admin-members-table"
		select-item-key="userId"
		aria-label-name-key="fullName"
		@update:selected-ids="onUpdateSelectedIds"
	>
		<template #[`action-menu-items`]>
			<KebabMenuActionChangePermission
				v-if="selectedIds.length === 1 && canChangeRole(selectedIds)"
				@click="onChangePermission(selectedIds)"
			/>
			<KebabMenuActionRemoveMember v-if="canRemoveMember(selectedIds)" @click="onRemoveMembers(selectedIds)" />
		</template>
		<template #[`item.displaySchoolRole`]="{ item }">
			<span class="text-no-wrap">
				<VIcon v-if="getSchoolRoleIcon(item.schoolRoleNames)" :icon="getSchoolRoleIcon(item.schoolRoleNames)" />
				{{ item.displaySchoolRole }}
			</span>
		</template>
		<template #[`item.actions`]="{ item }">
			<KebabMenu
				v-if="canChangeRole(item) || canRemoveMember(item)"
				:data-testid="`kebab-menu-${item.userId}`"
				:aria-label="getAriaLabel(item)"
			>
				<KebabMenuActionChangePermission
					v-if="canChangeRole(item)"
					:data-testid="`kebab-menu-${item.userId}-change-permission`"
					:aria-label="getAriaLabel(item, 'changeRole')"
					@click="onChangePermission([item.userId])"
				/>
				<KebabMenuActionRemoveMember
					v-if="canRemoveMember(item)"
					:data-testid="`kebab-menu-${item.userId}-remove-member`"
					:aria-label="getAriaLabel(item, 'remove')"
					@click="onRemoveMembers([item.userId])"
				/>
			</KebabMenu>
		</template>
	</DataTable>
	<ChangeRole
		v-model="isChangeRoleDialogOpen"
		:members="membersToChangeRole"
		:is-admin-mode="true"
		@close="onDialogClose"
	/>
	<ConfirmationDialog />
</template>

<script setup lang="ts">
import { RoleName } from "@/serverApi/v3";
import { schoolsModule } from "@/store/store-accessor";
import { RoomMember, useRoomDetailsStore, useRoomMembersStore } from "@data-room";
import { ChangeRole } from "@feature-room";
import { mdiAccountOutline, mdiAccountSchoolOutline } from "@icons/material";
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
const roomMembersStore = useRoomMembersStore();
const { currentUserId, roomMembersWithoutApplicants, roomMembersForAdmins, selectedIds, baseTableHeaders } =
	storeToRefs(roomMembersStore);
const { isRoomOwner, removeMembers, fetchMembers } = roomMembersStore;
const { askConfirmation } = useConfirmationDialog();

const isChangeRoleDialogOpen = ref(false);
const membersToChangeRole = ref<RoomMember[]>([]);

const tableData = computed(() => roomMembersForAdmins.value as unknown as Record<string, unknown>[]);

const checkIsStudent = (member?: RoomMember) =>
	member?.schoolRoleNames.some((role) =>
		[RoleName.Student, RoleName.CourseStudent, RoleName.GuestStudent].includes(role)
	);

const getAriaLabel = (member: RoomMember, actionFor: "remove" | "changeRole" | "" = "") => {
	const memberFullName = member.fullName;
	const mapActionToConst = {
		remove: "pages.rooms.members.remove.ariaLabel",
		changeRole: "pages.rooms.members.changePermission.ariaLabel",
		"": "pages.rooms.members.actionMenu.ariaLabel",
	};
	const languageKey = mapActionToConst[actionFor];
	return t(languageKey, { memberFullName });
};

const tableHeaders = computed(() => [
	...baseTableHeaders.value,
	{
		title: t("pages.rooms.members.tableHeader.actions"),
		key: "actions",
		sortable: false,
		width: 50,
	},
]);

const getSchoolRoleIcon = (schoolRoleNames: RoleName[]) => {
	if (schoolRoleNames.includes(RoleName.Teacher)) {
		return mdiAccountSchoolOutline;
	}
	if (schoolRoleNames.includes(RoleName.Student)) {
		return mdiAccountOutline;
	}
	return undefined;
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

const { room } = storeToRefs(useRoomDetailsStore());
const adminSchoolId = computed(() => schoolsModule.getSchool.id);
const isOwnSchool = computed(() => room.value?.schoolId === adminSchoolId.value);

const belongsToOwnSchool = (userId: string) => {
	const member = roomMembersWithoutApplicants.value.find((member) => member.userId === userId);

	return member?.schoolId === adminSchoolId.value;
};

const membersByIds = (ids: string[]) =>
	roomMembersWithoutApplicants.value.filter((member) => ids.includes(member.userId));

const canChangeRole = (item: RoomMember | string[]) => {
	if (Array.isArray(item)) {
		const members = membersByIds(item);
		return members.every(canChangeRole);
	}
	return isOwnSchool.value && !checkIsStudent(item) && !isRoomOwner(item.userId) && belongsToOwnSchool(item.userId);
};

// If the current user (as an admin) is the room owner, they can remove any member except themselves and other room owners
const canRoomOwnerAsAdminRemoveMember = (item: RoomMember) =>
	currentUserId.value && isRoomOwner(currentUserId.value) && !isRoomOwner(item.userId);

const canRemoveMember = (item: RoomMember | string[]) => {
	if (Array.isArray(item)) {
		const members = membersByIds(item);
		return members.every(canRemoveMember);
	}

	if (canRoomOwnerAsAdminRemoveMember(item)) {
		return true;
	}

	return !isRoomOwner(item.userId) && belongsToOwnSchool(item.userId);
};

const onRemoveMembers = async (ids: string[]) => {
	const shouldRemove = await confirmRemoval(ids);
	if (shouldRemove) await removeMembers(ids);
};

const onChangePermission = (ids: string[]) => {
	membersToChangeRole.value = roomMembersWithoutApplicants.value.filter((member) => ids.includes(member.userId));

	isChangeRoleDialogOpen.value = true;
};

const onUpdateSelectedIds = (ids: string[]) => {
	selectedIds.value = ids;
};

const onDialogClose = () => {
	fetchMembers();
	membersToChangeRole.value = [];
	selectedIds.value = [];
	isChangeRoleDialogOpen.value = false;
};
</script>
