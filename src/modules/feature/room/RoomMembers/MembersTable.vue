<template>
	<v-card flat>
		<v-card-title class="d-flex align-center pe-2">
			<span class="table-title">{{ tableTitle }}</span>
			<v-spacer />
			<v-spacer />
			<v-text-field
				v-model="search"
				density="compact"
				variant="solo-filled"
				flat
				hide-details
				single-line
				:label="t('common.labels.search')"
				:prepend-inner-icon="mdiMagnify"
			/>
		</v-card-title>
		<div>
			<v-btn variant="tonal" class="mb-2" @click="toggleMultiSelection">
				Activate Multi Selection
			</v-btn>
		</div>

		<v-divider role="presentation" />
		<v-data-table
			v-model:search="search"
			v-model="selectedMembers"
			item-value="userId"
			:items="membersList"
			:headers="tableHeader"
			:sort-asc-icon="mdiMenuDown"
			:sort-desc-icon="mdiMenuUp"
			:items-per-page-options="[5, 10, 25, 50, 100]"
			:items-per-page="50"
			:no-data-text="t('common.nodata')"
			:mobile="null"
			:show-select="multiSelection"
			data-testid="participants-table"
			mobile-breakpoint="sm"
			@update:current-items="onUpdateFilter"
		>
			<template v-if="selectedMembers.length" #[`header.actions`]="{}">
				<v-btn
					variant="text"
					:icon="mdiDeleteSweepOutline"
					:aria-label="t('pages.rooms.members.remove')"
					@click="onRemoveMembers(selectedMembers)"
				/>
			</template>
			<template #[`item.actions`]="{ item }">
				<v-btn
					ref="removeMember"
					variant="text"
					:icon="mdiTrashCanOutline"
					:aria-label="getRemoveAriaLabel(item)"
          @click="onRemoveMembers([item.userId])"
				/>
			</template>
		</v-data-table>
	</v-card>
</template>

<script setup lang="ts">
import { computed, PropType, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import {
	mdiMenuDown,
	mdiMenuUp,
	mdiMagnify,
	mdiTrashCanOutline,
	mdiDeleteSweepOutline,
} from "@icons/material";
import { RoomMemberResponse } from "@/serverApi/v3";

const props = defineProps({
	members: {
		type: Array as PropType<RoomMemberResponse[]>,
		required: true,
	},
});

const emit = defineEmits(["remove:member", "remove:members"]);

const { t } = useI18n();
const search = ref("");
const membersList = toRef(props, "members");
const selectedMembers = ref<string[]>([]);
const membersFilterCount = ref(membersList.value?.length);
const multiSelection = ref(false);

const onUpdateFilter = (value: RoomMemberResponse[]) => {
	membersFilterCount.value =
		search.value === "" ? membersList.value.length : value.length;
};

const tableTitle = computed(
	() => `${t("pages.rooms.members.label")} (${membersFilterCount.value})`
);

const onRemoveMembers = (userIds?: string[]) => {
	emit("remove:members", userIds);
};

const toggleMultiSelection = () => {
	multiSelection.value = !multiSelection.value;
	selectedMembers.value = [];
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
		title: t("common.labels.role"),
		key: "displayRoleName",
	},
	{ title: t("common.words.mainSchool"), key: "schoolName" },
	{ title: "", key: "actions", sortable: false, width: 50 },
];

const getRemoveAriaLabel = (member: RoomMemberResponse) =>
	t("pages.rooms.members.remove.ariaLabel", {
		memberName: `${member.firstName} ${member.lastName}`,
	});
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
</style>
