<template>
	<div
		class="d-flex justify-space-between align-center mb-2 table-title-header"
		:class="{ 'fixed-position': fixedPosition.enabled }"
		:style="{ top: `${fixedPosition.positionTop}px` }"
	>
		<ActionMenu
			v-if="selectedUserIds.length"
			class="multi-action-menu"
			:selectedIds="selectedUserIds"
			:isVisibleChangeRoleButton="isVisibleChangeRoleButton"
			@remove:selected="onRemoveMembers"
			@reset:selected="onResetSelectedMembers"
			@change:role="onChangePermission"
		/>
		<v-spacer v-else />
		<v-text-field
			v-model="search"
			density="compact"
			flat
			hide-details
			max-width="400px"
			mobile-breakpoint="sm"
			single-line
			variant="solo-filled"
			:label="t('common.labels.search')"
			:prepend-inner-icon="mdiMagnify"
		/>
	</div>

	<v-divider role="presentation" />
	<v-data-table
		v-model:search="search"
		v-model="tableSelectedUserIds"
		data-testid="participants-table"
		hover
		item-value="userId"
		mobile-breakpoint="sm"
		:items="memberList"
		item-selectable="isSelectable"
		:headers="tableHeader"
		:items-per-page-options="[5, 10, 25, 50, 100]"
		:items-per-page="50"
		:mobile="null"
		:show-select="isVisibleSelectionColumn"
		:sort-asc-icon="mdiMenuDown"
		:sort-desc-icon="mdiMenuUp"
		@update:current-items="onUpdateFilter"
		@update:model-value="onSelectMembers"
	>
		<template #[`item.actions`]="{ item, index }" v-if="isVisibleActionColumn">
			<KebabMenu
				v-if="isVisibleActionInRow(item)"
				:data-testid="`kebab-menu-${index}`"
				:aria-label="getAriaLabel(item)"
			>
				<KebabMenuActionChangePermission
					v-if="isVisibleChangeRoleButton"
					@click="onChangePermission([item.userId])"
					:aria-label="getAriaLabel(item, 'changeRole')"
					:test-id="`btn-change-role-${index}`"
				/>
				<KebabMenuActionRemoveMember
					v-if="isVisibleRemoveMemberButton(item)"
					:test-id="`remove-member-${index}`"
					:aria-label="getAriaLabel(item, 'remove')"
					@click="onRemoveMembers([item.userId])"
				/>
			</KebabMenu>
		</template>
	</v-data-table>
	<ConfirmationDialog />
</template>

<script setup lang="ts">
import ActionMenu from "./ActionMenu.vue";
import {
	KebabMenu,
	KebabMenuActionChangePermission,
	KebabMenuActionRemoveMember,
} from "@ui-kebab-menu";
import { computed, PropType, ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { mdiMenuDown, mdiMenuUp, mdiMagnify } from "@icons/material";
import {
	ConfirmationDialog,
	useConfirmationDialog,
} from "@ui-confirmation-dialog";
import { RoomMember, useRoomMemberVisibilityOptions } from "@data-room";

const props = defineProps({
	members: {
		type: Array as PropType<RoomMember[]>,
		required: true,
	},
	currentUser: {
		type: Object as PropType<RoomMember>,
		required: true,
	},
	fixedPosition: {
		type: Object as PropType<{ enabled: boolean; positionTop: number }>,
		default: () => ({ enabled: false, positionTop: 0 }),
	},
	selectedUserIds: {
		type: Array as PropType<string[]>,
		default: () => [],
	},
});
const { askConfirmation } = useConfirmationDialog();
const tableSelectedUserIds = ref<string[]>([]);

watch(
	() => props.selectedUserIds,
	(newVal: string[]) => {
		tableSelectedUserIds.value = newVal;
	}
);

const emit = defineEmits<{
	(e: "remove:members", userIds: string[]): void;
	(e: "select:members", userIds: string[]): void;
	(e: "change:permission", userIds: string[]): void;
}>();

const { t } = useI18n();
const search = ref("");
const memberList = toRef(props, "members");
const membersFilterCount = ref(memberList.value?.length);

const currentUser = computed(() => props.currentUser);

const {
	isVisibleActionColumn,
	isVisibleChangeRoleButton,
	isVisibleSelectionColumn,
	isVisibleActionInRow,
	isVisibleRemoveMemberButton,
} = useRoomMemberVisibilityOptions(currentUser);

const onUpdateFilter = (filteredMembers: RoomMember[]) => {
	membersFilterCount.value =
		search.value === "" ? memberList.value.length : filteredMembers.length;
};

const onSelectMembers = (userIds: string[]) => {
	emit("select:members", userIds);
};

const onResetSelectedMembers = () => {
	emit("select:members", []);
};

const onRemoveMembers = async (userIds: string[]) => {
	const shouldRemove = await confirmRemoval(userIds);
	if (shouldRemove) emit("remove:members", userIds);
};

const confirmRemoval = async (userIds: string[]) => {
	let message = t("pages.rooms.members.multipleRemove.confirmation");
	if (userIds.length === 1) {
		const member = memberList.value.find(
			(member) => member.userId === userIds[0]
		);
		message = t("pages.rooms.members.remove.confirmation", {
			memberFullName: `${member?.firstName} ${member?.lastName}`,
		});
	}
	const shouldRemove = await askConfirmation({
		message,
		confirmActionLangKey: "common.actions.remove",
	});
	return shouldRemove;
};

const getAriaLabel = (
	member: RoomMember,
	actionFor?: "remove" | "changeRole"
) => {
	const memberFullName = `${member.firstName} ${member.lastName}`;
	if (actionFor === "changeRole") {
		return t("pages.rooms.members.changePermission.ariaLabel", {
			memberFullName,
		});
	}
	if (actionFor === "remove") {
		return t("pages.rooms.members.remove.ariaLabel", {
			memberFullName,
		});
	}
	return t("pages.rooms.members.actionMenu.ariaLabel", {
		memberFullName,
	});
};

const onChangePermission = (userIds: string[]) => {
	emit("change:permission", userIds);
};

const tableHeader = [
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
		title: isVisibleActionColumn.value
			? t("pages.rooms.members.tableHeader.actions")
			: "",
		key: "actions",
		sortable: false,
		width: 50,
	},
];
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

.fixed-position {
	$space-left-right: calc(var(--space-base-vuetify) * 6);
	position: fixed;
	right: $space-left-right;
	left: $space-left-right;
	width: calc(100% - $space-left-right * 2);
	z-index: 1;
	background: rgb(var(--v-theme-white));
}
</style>
