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
				v-if="
					isOwnSchool &&
					selectedIdsBelongToOwnSchool &&
					(selectedIds.length === 1 || !selectedIdsIncludeStudents)
				"
				@click="onChangePermission(selectedIds)"
			/>
			<KebabMenuActionRemoveMember
				v-if="selectedIdsBelongToOwnSchool"
				@click="onRemoveMembers(selectedIds)"
			/>
		</template>
		<template #[`item.displaySchoolRole`]="{ item }">
			<span class="text-no-wrap">
				<VIcon
					v-if="getSchoolRoleIcon(item.schoolRoleNames)"
					:icon="getSchoolRoleIcon(item.schoolRoleNames)"
				/>
				{{ item.displaySchoolRole }}
			</span>
		</template>
		<template #[`item.actions`]="{ item }">
			<KebabMenu
				v-if="item.isSelectable"
				:data-testid="`kebab-menu-${item.userId}`"
				:aria-label="getAriaLabel(item)"
			>
				<KebabMenuActionChangePermission
					v-if="!checkIsStudent(item) && belongsToOwnSchool(item.schoolId)"
					:aria-label="getAriaLabel(item, 'changeRole')"
					@click="onChangePermission([item.userId])"
				/>
				<KebabMenuActionRemoveMember
					v-if="!isRoomOwner(item.userId) && belongsToOwnSchool(item.schoolId)"
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
import {
	KebabMenu,
	KebabMenuActionChangePermission,
	KebabMenuActionRemoveMember,
} from "@ui-kebab-menu";
import {
	RoomMember,
	useAdministrationRoomStore,
	useRoomMembersStore,
} from "@data-room";
import { mdiAccountSchoolOutline, mdiAccountOutline } from "@icons/material";
import { DataTable } from "@ui-data-table";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
	useConfirmationDialog,
	ConfirmationDialog,
} from "@ui-confirmation-dialog";
import { ChangeRole } from "@feature-room";
import { schoolsModule } from "@/store/store-accessor";

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
const {
	roomMembersWithoutApplicants,
	roomMembersForAdmins,
	selectedIds,
	baseTableHeaders,
} = storeToRefs(roomMembersStore);
const { isRoomOwner, removeMembers, fetchMembers } = roomMembersStore;
const { askConfirmation } = useConfirmationDialog();

const isChangeRoleDialogOpen = ref(false);
const membersToChangeRole = ref<RoomMember[]>([]);

const tableData = computed(
	() => roomMembersForAdmins.value as unknown as Record<string, unknown>[]
);

const checkIsStudent = (member?: RoomMember) => {
	return member?.schoolRoleNames.some((role) =>
		[RoleName.Student, RoleName.CourseStudent, RoleName.GuestStudent].includes(
			role
		)
	);
};

const selectedIdsIncludeStudents = computed(() =>
	selectedIds.value.some((id) =>
		checkIsStudent(
			roomMembersWithoutApplicants.value.find((member) => member.userId === id)
		)
	)
);

const getAriaLabel = (
	member: RoomMember,
	actionFor: "remove" | "changeRole" | "" = ""
) => {
	const memberFullName = member.fullName;
	const mapActionToConst = {
		remove: "pages.rooms.members.remove.ariaLabel",
		changeRole: "pages.rooms.members.changePermission.ariaLabel",
		"": "pages.rooms.members.actionMenu.ariaLabel",
	};
	const languageKey = mapActionToConst[actionFor];
	return t(languageKey, { memberFullName });
};

const tableHeaders = computed(() => {
	return [
		...baseTableHeaders.value,
		{
			title: t("pages.rooms.members.tableHeader.actions"),
			key: "actions",
			sortable: false,
			width: 50,
		},
	];
});

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

const { userSchoolId } = useAdministrationRoomStore();
const adminSchoolId = computed(() => schoolsModule.getSchool.id);
const isOwnSchool = computed(() => userSchoolId === adminSchoolId.value);

const belongsToOwnSchool = (schoolId: string) =>
	schoolId === adminSchoolId.value;

const selectedIdsBelongToOwnSchool = computed(() =>
	selectedIds.value.every(belongsToOwnSchool)
);

const onRemoveMembers = async (ids: string[]) => {
	const shouldRemove = await confirmRemoval(ids);
	if (shouldRemove) await removeMembers(ids);
};

const onChangePermission = (ids: string[]) => {
	membersToChangeRole.value = roomMembersWithoutApplicants.value.filter(
		(member) => ids.includes(member.userId)
	);

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
