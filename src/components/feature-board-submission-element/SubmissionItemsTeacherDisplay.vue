<template>
	<div class="white rounded-b-sm">
		<v-skeleton-loader
			v-if="loading"
			class="mt-5 ml-5 mb-6"
			type="image"
			width="120"
			height="22"
		/>
		<v-data-table
			v-else
			:headers="headers"
			:items="items"
			:disable-pagination="true"
			:hide-default-footer="true"
			:multi-sort="true"
		>
			<template #[`item.completed`]="{ item }">
				<v-chip v-if="item.completed">erledigt</v-chip>
				<v-chip v-else>offen</v-chip>
			</template>
		</v-data-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { SubmissionItemResponse } from "@/serverApi/v3";
import { DataTableHeader } from "vuetify";
import { I18N_KEY, injectStrict } from "@/utils/inject";

export default defineComponent({
	name: "SubmissionItemsTeacherDisplay",
	props: {
		loading: {
			type: Boolean,
			required: true,
		},
		submissionItems: {
			type: Array as PropType<SubmissionItemResponse[]>,
			required: true,
		},
	},
	setup(props) {
		const i18n = injectStrict(I18N_KEY);
		const headers: DataTableHeader[] = [
			{
				text: i18n.t("common.labels.status").toString(),
				value: "completed",
			},
			{
				text: i18n.t("common.labels.lastName").toString(),
				value: "lastname",
			},
			{
				text: i18n.t("common.labels.firstName").toString(),
				value: "firstname",
			},
		];

		const items = computed(() => {
			return props.submissionItems.map((item) => {
				return {
					completed: item.completed,
					firstname: item.userData.firstName,
					lastname: item.userData.lastName,
				};
			});
		});
		return {
			headers,
			items,
		};
	},
});
</script>
