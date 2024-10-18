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
				width="200"
			/>
		</v-card-title>

		<v-divider />
		<v-data-table
			v-model:search="search"
			:items="participants"
			item-value="id"
			:headers="tableHeader"
			:sort-asc-icon="mdiMenuDown"
			:sort-desc-icon="mdiMenuUp"
			:items-per-page-options="[5, 10, 25, 50, 100]"
			:items-per-page="50"
			:items-per-page-text="
				t('pages.rooms.participants.participantTable.itemsPerPage')
			"
			@update:current-items="onUpdateFilter"
		/>
	</v-card>
</template>

<script setup lang="ts">
import { computed, PropType, ref, toRef } from "vue";
import { Participants } from "@data-room";
import { useI18n } from "vue-i18n";
import { mdiMenuDown, mdiMenuUp, mdiMagnify } from "@icons/material";

const props = defineProps({
	participants: {
		type: Array as PropType<Participants[]>,
		required: true,
	},
});
const { t } = useI18n();
const search = ref("");
const participantsCount = toRef(props, "participants").value.length;
const participantsFilterCount = ref(participantsCount);

const onUpdateFilter = (value: Participants[]) => {
	participantsFilterCount.value =
		search.value === "" ? participantsCount : value.length;
};

const tableTitle = computed(
	() =>
		`${t("pages.rooms.participants.label")} (${participantsFilterCount.value})`
);
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
		key: "role",
	},
	{
		title: t("common.words.classes"),
		key: "classes",
	},
	{ title: t("common.words.mainSchool"), key: "school" },
];
</script>

<style lang="scss" scoped>
:deep .v-data-table-header__content {
	color: rgba(var(--v-theme-primary-darken-1));
	font-weight: bold;
}
</style>
