<template>
	<div
		class="d-flex justify-space-between align-center ga-2 mb-2 table-title-header"
		:class="{ sticky: isMobileDevice, 'flex-column': isExtraSmallDisplay }"
		:style="stickyStyle"
	>
		<ActionMenu
			v-if="selectedIds.length"
			class="multi-action-menu"
			:class="{ 'order-2': isExtraSmallDisplay }"
			:selected-ids="selectedIds"
			@reset:selected="onResetSelectedMembers"
		>
			<KebabMenuActionChangePermission
				v-if="canAddRoomMembers"
				@click="onChangePermission(selectedIds)"
			/>
			<KebabMenuActionRemoveMember @click="onRemoveMembers(selectedIds)" />
		</ActionMenu>
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
			:class="{ 'order-1 w-100 mt-2': isExtraSmallDisplay }"
			:label="t('common.labels.search')"
			:prepend-inner-icon="mdiMagnify"
			:aria-label="t('pages.rooms.members.filter')"
		/>
	</div>

	<v-divider role="presentation" />

	<v-data-table
		v-model:search="search"
		v-model="selectedIds"
		data-testid="participants-table"
		hover
		item-value="userId"
		mobile-breakpoint="sm"
		:items="roomMembersWithoutApplicants"
		item-selectable="isSelectable"
		:headers="tableHeader"
		:items-per-page-options="[5, 10, 25, 50, 100]"
		:items-per-page="50"
		:mobile="null"
		:show-select="canAddRoomMembers"
		:sort-asc-icon="mdiMenuDown"
		:sort-desc-icon="mdiMenuUp"
		@update:current-items="onUpdateFilter"
	>
		<template
			#[`header.data-table-select`]="{ someSelected, allSelected, selectAll }"
		>
			<VCheckboxBtn
				:model-value="allSelected"
				:indeterminate="someSelected && !allSelected"
				:aria-label="t('pages.rooms.members.select.all')"
				@click="selectAll(!allSelected)"
			/>
		</template>
		<template #[`item.data-table-select`]="{ item, isSelected, toggleSelect }">
			<VCheckboxBtn
				:model-value="
					isSelected({
						value: item.userId,
						selectable: item.isSelectable ?? true,
					})
				"
				:disabled="item.isSelectable === false"
				:aria-label="`${item.fullName}`"
				@click="
					toggleSelect({
						value: item.userId,
						selectable: item.isSelectable ?? true,
					})
				"
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
		<template v-if="canAddRoomMembers" #[`item.actions`]="{ item, index }">
			<KebabMenu
				v-if="isNeitherRoomOwnerNorCurrentUser(item.userId)"
				:data-testid="`kebab-menu-${index}`"
				:aria-label="getAriaLabel(item)"
			>
				<KebabMenuActionChangePermission
					:aria-label="getAriaLabel(item, 'changeRole')"
					@click="onChangePermission([item.userId])"
				/>
				<KebabMenuActionRemoveMember
					v-if="!isRoomOwner(item.userId)"
					:aria-label="getAriaLabel(item, 'remove')"
					@click="onRemoveMembers([item.userId])"
				/>
			</KebabMenu>
		</template>
	</v-data-table>
	<VDialog
		v-model="isChangeRoleDialogOpen"
		:width="isExtraSmallDisplay ? 'auto' : 480"
		data-testid="dialog-change-role-participants"
		max-width="480"
		@keydown.esc="onDialogClose"
	>
		<ChangeRole :members="membersToChangeRole" @close="onDialogClose" />
	</VDialog>
	<ConfirmationDialog />
</template>

<script setup lang="ts">
import ActionMenu from "./ActionMenu.vue";
import {
	KebabMenu,
	KebabMenuActionChangePermission,
	KebabMenuActionRemoveMember,
} from "@ui-kebab-menu";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import {
	mdiMenuDown,
	mdiMenuUp,
	mdiMagnify,
	mdiAccountSchoolOutline,
	mdiAccountOutline,
} from "@icons/material";
import {
	ConfirmationDialog,
	useConfirmationDialog,
} from "@ui-confirmation-dialog";
import {
	RoomMember,
	useRoomAuthorization,
	useRoomMembersStore,
} from "@data-room";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import { ChangeRole } from "@feature-room";
import { authModule } from "@/store/store-accessor";
import { RoleName } from "@/serverApi/v3";

const { canAddRoomMembers } = useRoomAuthorization();

const props = defineProps({
	headerBottom: {
		type: Number,
		default: 0,
	},
});

const { t } = useI18n();
const { xs: isExtraSmallDisplay, mdAndDown: isMobileDevice } = useDisplay();

const roomMembersStore = useRoomMembersStore();
const { roomMembersWithoutApplicants, selectedIds } =
	storeToRefs(roomMembersStore);
const { isRoomOwner, removeMembers } = roomMembersStore;

const { askConfirmation } = useConfirmationDialog();

const isChangeRoleDialogOpen = ref(false);
const membersToChangeRole = ref<RoomMember[]>([]);

const search = ref("");
const stickyStyle = computed(() => ({
	top: `${props.headerBottom}px`,
}));

const membersFilterCount = ref(roomMembersWithoutApplicants.value?.length);
const isNeitherRoomOwnerNorCurrentUser = (userId: string) => {
	const isNotCurrentUser = userId !== authModule.getUser?.id;
	const isNotRoomOwner = !isRoomOwner(userId);
	return isNotCurrentUser && isNotRoomOwner;
};

const onDialogClose = () => {
	isChangeRoleDialogOpen.value = false;
};

const onUpdateFilter = (filteredMembers: RoomMember[]) => {
	membersFilterCount.value =
		search.value === ""
			? roomMembersWithoutApplicants.value.length
			: filteredMembers.length;
};

const onResetSelectedMembers = () => {
	selectedIds.value = [];
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
	membersToChangeRole.value = roomMembersWithoutApplicants.value.filter(
		(member) => userIds.includes(member.userId)
	);

	isChangeRoleDialogOpen.value = true;
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
