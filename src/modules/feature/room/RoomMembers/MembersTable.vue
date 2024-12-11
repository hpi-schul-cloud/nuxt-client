<template>
	<div
		class="d-flex justify-space-between align-center mb-2 table-title-header"
	>
		<template v-if="selectedUserIds.length">
			<div
				class="mr-2 pa-0 pl-4 multi-action-menu"
				data-testid="multi-action-menu"
			>
				<span class="d-inline-flex">
					{{ selectedUserIds.length }}
					{{ t("pages.administration.selected") }}
				</span>
				<v-btn
					ref="removeSelectedMembers"
					class="ml-2"
					size="x-small"
					variant="text"
					:icon="mdiTrashCanOutline"
					:aria-label="t('pages.rooms.members.multipleRemove.ariaLabel')"
					@click="onRemoveMembers(selectedUserIds)"
				/>

				<v-btn
					ref="resetSelectedMembers"
					class="ml-8 mr-2"
					size="x-small"
					variant="text"
					:icon="mdiClose"
					:aria-label="t('pages.rooms.members.remove.ariaLabel')"
					@click="onResetSelectedMembers"
				/>
			</div>
		</template>
		<v-spacer />
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
				:data-testid="`remove-member-${index}`"
				v-if="item.roleName !== RoleName.Roomowner"
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
import { PropType, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import {
	mdiClose,
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

const { askConfirmation } = useConfirmationDialog();

const selectedUserIds = ref<string[]>([]);

const props = defineProps({
	members: {
		type: Array as PropType<RoomMemberResponse[]>,
		required: true,
	},
});

const emit = defineEmits(["remove:members", "select:members"]);
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
		title: t("common.labels.role"),
		key: "displayRoleName",
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

:deep(.v-data-table__td .v-selection-control--disabled i) {
	color: rgba(var(--v-theme-on-surface), 0.6);
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
</style>
