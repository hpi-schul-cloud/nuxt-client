<template>
	<div
		class="d-flex justify-space-between align-center mb-2 table-title-header"
	>
		<template v-if="selectedMemberList.length">
			<div class="mr-2 pa-0 pl-4 multi-action-menu">
				<span class="d-inline-flex">
					{{ selectedMemberList.length }}
					{{ t("pages.administration.selected") }}
				</span>
				<v-btn
					ref="removeSelectedMembers"
					class="ml-2"
					size="x-small"
					variant="text"
					:icon="mdiTrashCanOutline"
					:aria-label="t('pages.rooms.members.multipleRemove.ariaLabel')"
					@click="onRemoveMembers(selectedMemberList)"
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
		v-model="selectedMemberList"
		data-testid="participants-table"
		hover
		item-value="userId"
		mobile-breakpoint="sm"
		:items="membersList"
		:headers="tableHeader"
		:items-per-page-options="[5, 10, 25, 50, 100]"
		:items-per-page="50"
		:no-data-text="t('common.nodata')"
		:mobile="null"
		:show-select="true"
		:sort-asc-icon="mdiMenuDown"
		:sort-desc-icon="mdiMenuUp"
		@update:current-items="onUpdateFilter"
		@update:model-value="onSelectMembers"
	>
		<template #[`item.actions`]="{ item }">
			<v-btn
				ref="removeMember"
				size="x-small"
				variant="text"
				:aria-label="getRemoveAriaLabel(item)"
				:icon="mdiTrashCanOutline"
				@click="onRemoveMembers([item.userId])"
			/>
		</template>
	</v-data-table>
</template>

<script setup lang="ts">
import { PropType, ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import {
	mdiClose,
	mdiMenuDown,
	mdiMenuUp,
	mdiMagnify,
	mdiTrashCanOutline,
} from "@icons/material";
import { RoomMemberResponse } from "@/serverApi/v3";

const props = defineProps({
	members: {
		type: Array as PropType<RoomMemberResponse[]>,
		required: true,
	},
	selectedMembers: {
		type: Array as PropType<string[]>,
		required: true,
	},
});

const emit = defineEmits(["remove:members", "select:members"]);
const { t } = useI18n();
const search = ref("");
const membersList = toRef(props, "members");
const selectedMemberList = ref<string[]>([]);
const membersFilterCount = ref(membersList.value?.length);

watch(
	() => props.selectedMembers,
	(value) => {
		selectedMemberList.value = value;
	}
);

const onUpdateFilter = (value: RoomMemberResponse[]) => {
	membersFilterCount.value =
		search.value === "" ? membersList.value.length : value.length;
};

const onRemoveMembers = (memberIds: string[]) => {
	emit("remove:members", memberIds);
};

const onSelectMembers = (userIds: string[]) => {
	emit("select:members", userIds);
};

const onResetSelectedMembers = () => {
	emit("select:members", []);
	selectedMemberList.value = [];
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
