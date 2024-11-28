<template>
	<v-card flat>
		<v-card-title>
			<span class="table-title">{{ tableTitle }}</span>
		</v-card-title>
		<div
			class="d-flex justify-space-between align-end mb-2"
			style="min-height: 50px"
		>
			<div class="align-center ml-4">
				<div v-if="selectedMembers.length">
					<span>
						({{ selectedMembers.length }})
						{{ t("pages.administration.selected") }}
					</span>
					<v-btn
						class="ml-2"
						variant="text"
						:icon="mdiTrashCanOutline"
						:aria-label="t('pages.rooms.members.multipleRemove.ariaLabel')"
						@click="onRemoveMembers(selectedMembers)"
					/>
				</div>
			</div>
			<v-spacer />
			<v-spacer />
			<v-text-field
				v-model="search"
				density="compact"
				flat
				hide-details
				max-width="300px"
				single-line
				variant="solo-filled"
				mobile-breakpoint="sm"
				:label="t('common.labels.search')"
				:prepend-inner-icon="mdiMagnify"
			/>
		</div>

		<v-divider role="presentation" />
		<v-data-table
			v-model:search="search"
			v-model="selectedMembers"
			data-testid="participants-table"
			hover
			item-value="userId"
			mobile-breakpoint="sm"
			:items="membersList"
			:headers="tableHeader"
			:sort-asc-icon="mdiMenuDown"
			:sort-desc-icon="mdiMenuUp"
			:items-per-page-options="[5, 10, 25, 50, 100]"
			:items-per-page="50"
			:no-data-text="t('common.nodata')"
			:mobile="null"
			:show-select="true"
			@update:current-items="onUpdateFilter"
		>
			<template #[`item.actions`]="{ item }">
				<div class="d-flex justify-end">
					<v-btn
						ref="removeMember"
						variant="text"
						:icon="mdiTrashCanOutline"
						:aria-label="getRemoveAriaLabel(item)"
						@click="onRemoveMembers([item.userId])"
					/>
				</div>
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
} from "@icons/material";
import { RoomMemberResponse } from "@/serverApi/v3";

const props = defineProps({
	members: {
		type: Array as PropType<RoomMemberResponse[]>,
		required: true,
	},
});

const emit = defineEmits(["remove:members"]);
const { t } = useI18n();
const search = ref("");
const membersList = toRef(props, "members");
const selectedMembers = ref<string[]>([]);
const membersFilterCount = ref(membersList.value?.length);

const tableTitle = computed(
	() => `${t("pages.rooms.members.label")} (${membersFilterCount.value})`
);

const onUpdateFilter = (value: RoomMemberResponse[]) => {
	membersFilterCount.value =
		search.value === "" ? membersList.value.length : value.length;
};

const onRemoveMembers = (userIds: string[]) => {
	emit("remove:members", userIds);
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
	{ title: "", key: "actions", sortable: false, width: 180 },
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
</style>
