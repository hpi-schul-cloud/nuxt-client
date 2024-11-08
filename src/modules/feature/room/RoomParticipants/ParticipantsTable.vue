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

		<v-divider />
		<v-data-table
			v-model:search="search"
			v-model="selectedParticipants"
			item-value="userId"
			:items="participantsList"
			:headers="tableHeader"
			:sort-asc-icon="mdiMenuDown"
			:sort-desc-icon="mdiMenuUp"
			:items-per-page-options="[5, 10, 25, 50, 100]"
			:items-per-page="50"
			:items-per-page-text="
				t('pages.rooms.participants.participantTable.itemsPerPage')
			"
			:no-data-text="t('common.nodata')"
			:mobile="null"
			mobile-breakpoint="sm"
			@update:current-items="onUpdateFilter"
		>
			<template #[`item.actions`]="{ item }">
				<v-btn
					variant="text"
					:aria-label="t('pages.rooms.participants.removeParticipants')"
					:icon="mdiTrashCanOutline"
					@click="onRemoveParticipant(item)"
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
} from "@icons/material";
import { RoomMemberResponse } from "@/serverApi/v3";

const props = defineProps({
	participants: {
		type: Array as PropType<RoomMemberResponse[]>,
		required: true,
	},
});

const emit = defineEmits(["remove:participant"]);

const { t } = useI18n();
const search = ref("");
const participantsList = toRef(props, "participants");
const selectedParticipants = ref<string[]>([]);
const participantsFilterCount = ref(participantsList.value.length);

const onUpdateFilter = (value: RoomMemberResponse[]) => {
	participantsFilterCount.value =
		search.value === "" ? participantsList.value.length : value.length;
};

const tableTitle = computed(
	() =>
		`${t("pages.rooms.participants.label")} (${participantsFilterCount.value})`
);

const onRemoveParticipant = (participant: RoomMemberResponse) => {
	emit("remove:participant", participant);
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
	// TODO: Decide if we want to show classes in the table or not
	// {
	// 	title: t("common.words.classes"),
	// 	key: "classes",
	// },
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
</style>
