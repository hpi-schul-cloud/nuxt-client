<template>
	<v-card flat>
		<v-card-title class="d-flex align-center pe-2">
			<span>Participants (5)</span>
			<v-spacer />
			<v-spacer />
			<v-text-field
				v-model="search"
				density="compact"
				label="Search"
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
			color="primary"
			v-model:search="search"
			:items="participants"
			item-value="id"
			:headers="tableHeader"
			:sort-asc-icon="mdiMenuDown"
			:sort-desc-icon="mdiMenuUp"
		/>
	</v-card>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { Participants } from "./types";
import { useI18n } from "vue-i18n";
import { mdiMenuDown, mdiMenuUp, mdiMagnify } from "@icons/material";

defineProps({
	participants: {
		type: Array as PropType<Participants[]>,
		required: true,
	},
});
const { t } = useI18n();
const search = ref("");
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
	{ title: "School", key: "school" },
];
</script>

<style lang="scss" scoped>
:deep .v-data-table-header__content {
	color: rgba(var(--v-theme-primary-darken-1));
	font-weight: bold;
}
</style>
