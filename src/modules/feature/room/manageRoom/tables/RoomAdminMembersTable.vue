<template>
	<DataTable
		aria-label-name-key="fullName"
		:items="
			roomMembersForAdmins as unknown as unknown as Record<string, unknown>[]
		"
		:header-bottom="headerBottom"
		:table-headers="tableHeader"
		:show-select="true"
		:external-selected-ids="selectedIds"
		select-item-key="userId"
		@update:selected-ids="onUpdateSelectedIds"
	>
		<template #[`action-menu-items`]>
			<KebabMenuActionChangePermission v-if="canAddRoomMembers" />
			<KebabMenuActionRemoveMember />
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
		<template #[`item.actions`]="{ item, index }">
			<KebabMenu
				v-if="item.isSelectable"
				:data-testid="`kebab-menu-${index}`"
				:aria-label="getAriaLabel(item)"
			>
				<KebabMenuActionChangePermission
					:aria-label="getAriaLabel(item, 'changeRole')"
				/>
				<KebabMenuActionRemoveMember
					v-if="!isRoomOwner(item.userId)"
					:aria-label="getAriaLabel(item, 'remove')"
				/>
			</KebabMenu>
		</template>
	</DataTable>
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
	useRoomAuthorization,
	useRoomMembersStore,
} from "@data-room";
import { mdiAccountSchoolOutline, mdiAccountOutline } from "@icons/material";
import { DataTable } from "@ui-data-table";
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
const { canAddRoomMembers } = useRoomAuthorization();
const roomMembersStore = useRoomMembersStore();
const { roomMembersForAdmins, selectedIds } = storeToRefs(roomMembersStore);
const { isRoomOwner } = roomMembersStore;

const onUpdateSelectedIds = (ids: string[]) => {
	selectedIds.value = ids;
};

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

const tableHeader = computed(() => {
	return [
		{
			title: t("common.labels.firstName"),
			key: "firstName",
		},
		{
			title: t("common.labels.lastName"),
			key: "lastName",
		},
		{
			title: t("pages.rooms.members.tableHeader.roomRole"),
			key: "displayRoomRole",
		},
		{
			title: t("pages.rooms.members.tableHeader.schoolRole"),
			key: "displaySchoolRole",
		},
		{ title: t("common.words.mainSchool"), key: "schoolName" },
		{
			title: canAddRoomMembers.value
				? t("pages.rooms.members.tableHeader.actions")
				: "",
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
</script>

<style lang="scss" scoped>
:deep(.v-data-table-header__content) {
	color: rgba(var(--v-theme-primary-darken-1));
	font-weight: bold;
}

/* table header for mobile view */
:deep(.v-data-table__td-title) {
	font-weight: bold;
}

:deep(.v-data-table__td .v-selection-control--disabled) {
	color: rgba(var(--v-theme-on-surface), var(--v-disabled-opacity));
}

.table-title-header {
	min-height: 50px;
}

.multi-action-menu {
	display: flex;
	align-items: center;
	background-color: rgba(var(--v-theme-primary), 0.12);
	border-radius: 0.25rem;
	min-height: 40px;
}

.sticky {
	position: sticky;
	z-index: 1;
	background: rgb(var(--v-theme-white));
	$space-left-right: calc(var(--space-base-vuetify) * 6);
	right: $space-left-right;
	left: $space-left-right;
	width: 100%;
}
</style>
