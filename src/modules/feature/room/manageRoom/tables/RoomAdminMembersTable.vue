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
			<KebabMenuActionChangePermission />
			<KebabMenuActionRemoveMember />
		</template>
		<template #[`item.displaySchoolRole`]="{ item }">
			<span class="text-no-wrap">
				<VIcon v-if="getSchoolRoleIcon(item.schoolRoleNames)" :icon="getSchoolRoleIcon(item.schoolRoleNames)" />
				{{ item.displaySchoolRole }}
			</span>
		</template>
		<template #[`item.actions`]="{ item }">
			<KebabMenu v-if="item.isSelectable" :data-testid="`kebab-menu-${item.userId}`" :aria-label="getAriaLabel(item)">
				<KebabMenuActionChangePermission :aria-label="getAriaLabel(item, 'changeRole')" />
				<KebabMenuActionRemoveMember v-if="!isRoomOwner(item.userId)" :aria-label="getAriaLabel(item, 'remove')" />
			</KebabMenu>
		</template>
	</DataTable>
</template>

<script setup lang="ts">
import { RoleName } from "@/serverApi/v3";
import { RoomMember, useRoomMembersStore } from "@data-room";
import { mdiAccountOutline, mdiAccountSchoolOutline } from "@icons/material";
import { DataTable } from "@ui-data-table";
import { KebabMenu, KebabMenuActionChangePermission, KebabMenuActionRemoveMember } from "@ui-kebab-menu";
import { storeToRefs } from "pinia";
import { computed } from "vue";
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
const { roomMembersForAdmins, selectedIds, baseTableHeaders } = storeToRefs(roomMembersStore);
const { isRoomOwner } = roomMembersStore;

const tableData = computed(() => roomMembersForAdmins.value as unknown as Record<string, unknown>[]);

const onUpdateSelectedIds = (ids: string[]) => {
	selectedIds.value = ids;
};

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
</script>
