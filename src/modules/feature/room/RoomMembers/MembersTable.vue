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
			@remove:selected="onRemoveMembers"
			@reset:selected="onResetSelectedMembers"
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
		v-model="selectedUserIds"
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
		:show-select="true"
		:sort-asc-icon="mdiMenuDown"
		:sort-desc-icon="mdiMenuUp"
		@update:current-items="onUpdateFilter"
		@update:model-value="onSelectMembers"
	>
		<template #[`item.actions`]="{ item, index }">
			<v-btn
				v-if="item.roomRoleName !== RoleName.Roomowner"
				:data-testid="`remove-member-${index}`"
				size="x-small"
				variant="text"
				:aria-label="getRemoveAriaLabel(item)"
				:icon="mdiTrashCanOutline"
				@click="onRemoveMembers([item.userId])"
			/>
		</template>
	</v-data-table>
	<ConfirmationDialog />
</template>

<script setup lang="ts">
import ActionMenu from "./ActionMenu.vue";
import { PropType, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import {
	mdiMenuDown,
	mdiMenuUp,
	mdiMagnify,
	mdiTrashCanOutline,
} from "@icons/material";
import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
import {
	ConfirmationDialog,
	useConfirmationDialog,
} from "@ui-confirmation-dialog";

const props = defineProps({
	members: {
		type: Array as PropType<RoomMemberResponse[]>,
		required: true,
	},
	fixedPosition: {
		type: Object as PropType<{ enabled: boolean; positionTop: number }>,
		default: () => ({ enabled: false, positionTop: 0 }),
	},
});
const { askConfirmation } = useConfirmationDialog();
const selectedUserIds = ref<string[]>([]);

const emit = defineEmits<{
	(e: "remove:members", userIds: string[]): void;
	(e: "select:members", userIds: string[]): void;
}>();

const { t } = useI18n();
const search = ref("");
const memberList = toRef(props, "members");
const membersFilterCount = ref(memberList.value?.length);

const onUpdateFilter = (filteredMembers: RoomMemberResponse[]) => {
	membersFilterCount.value =
		search.value === "" ? memberList.value.length : filteredMembers.length;
};

const onSelectMembers = (userIds: string[]) => {
	emit("select:members", userIds);
};

const onResetSelectedMembers = () => {
	selectedUserIds.value = [];
};

const onRemoveMembers = async (userIds: string[]) => {
	const shouldRemove = await confirmRemoval(userIds);
	if (shouldRemove) {
		selectedUserIds.value = selectedUserIds.value.filter(
			(userId) => !userIds.includes(userId)
		);
		emit("remove:members", userIds);
	}
};

const confirmRemoval = async (userIds: string[]) => {
	let message = t("pages.rooms.members.multipleRemove.confirmation");
	if (userIds.length === 1) {
		const member = memberList.value.find(
			(member) => member.userId === userIds[0]
		);
		message = t("pages.rooms.members.remove.confirmation", {
			memberName: `${member?.firstName} ${member?.lastName}`,
		});
	}

	const shouldRemove = await askConfirmation({
		message,
		confirmActionLangKey: "common.actions.remove",
	});

	return shouldRemove;
};

const getRemoveAriaLabel = (member: RoomMemberResponse) =>
	t("pages.rooms.members.remove.ariaLabel", {
		memberName: `${member.firstName} ${member.lastName}`,
	});

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
	{ title: "", key: "actions", sortable: false, width: 50 },
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
