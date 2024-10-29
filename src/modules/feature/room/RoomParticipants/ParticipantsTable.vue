<template>
	<v-card flat>
		<v-card-title class="d-flex align-center pe-2">
			<span class="table-title">{{ tableTitle }}</span>
			<v-spacer />
			<v-spacer />
			<v-text-field
				v-model="search"
				density="compact"
				:label="t('common.labels.search')"
				:prepend-inner-icon="mdiMagnify"
				variant="solo-filled"
				flat
				hide-details
				single-line
			/>
			<!-- width="200" -->
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
			:items-per-page="5"
			:items-per-page-text="
				t('pages.rooms.participants.participantTable.itemsPerPage')
			"
			@update:current-items="onUpdateFilter"
		>
			<template #[`item.actions`]="{ item }">
				<v-icon
					class="cursor-pointer"
					:icon="mdiTrashCanOutline"
					:aria-label="t('pages.rooms.participants.removeParticipants')"
					:title="t('pages.rooms.participants.removeParticipants')"
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
import { RoomParticipantResponse } from "@/serverApi/v3";

const props = defineProps({
	participants: {
		type: Array as PropType<RoomParticipantResponse[]>,
		required: true,
	},
});

const emit = defineEmits(["remove:participant"]);

const { t } = useI18n();
const search = ref("");
const participantsList = toRef(props, "participants");
const selectedParticipants = ref<string[]>([]);
const participantsFilterCount = ref(participantsList.value.length);

const onUpdateFilter = (value: RoomParticipantResponse[]) => {
	participantsFilterCount.value =
		search.value === "" ? participantsList.value.length : value.length;
};

const tableTitle = computed(
	() =>
		`${t("pages.rooms.participants.label")} (${participantsFilterCount.value})`
);

const onRemoveParticipant = (participant: RoomParticipantResponse) => {
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
	{ title: "", key: "actions", sortable: false },
];
</script>

<style lang="scss" scoped>
:deep .v-data-table-header__content {
	color: rgba(var(--v-theme-primary-darken-1));
	font-weight: bold;
}
</style>
