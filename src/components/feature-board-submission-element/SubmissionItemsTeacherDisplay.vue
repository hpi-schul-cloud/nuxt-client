<template>
	<div class="white rounded-b-sm">
		<v-skeleton-loader
			v-if="loading"
			class="mt-5 ml-5 mb-6"
			type="image"
			width="120"
			height="22"
		/>
		<VExpansionPanels v-else>
			<VExpansionPanel>
				<VExpansionPanelHeader class="pl-4 pr-4">
					<v-chip v-if="open" class="grey lighten-3 mr-2" disabled small
						>{{ open }} offen</v-chip
					>
					<v-chip v-if="done" class="grey lighten-3 mr-2" disabled small
						>{{ done }} erledigt</v-chip
					>
				</VExpansionPanelHeader>
				<VExpansionPanelContent>
					<v-data-table
						:headers="headers"
						:items="items"
						:disable-pagination="true"
						:hide-default-footer="true"
						:multi-sort="true"
					>
						<template #[`item.completed`]="{ item }">
							<v-chip
								v-if="item.completed"
								class="grey lighten-3"
								disabled
								small
								>erledigt</v-chip
							>
							<v-chip v-else class="grey lighten-3" disabled small
								>offen</v-chip
							>
						</template>
					</v-data-table>
				</VExpansionPanelContent>
			</VExpansionPanel>
		</VExpansionPanels>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { SubmissionItemResponse } from "@/serverApi/v3";
import { DataTableHeader } from "vuetify";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import {
	VExpansionPanels,
	VExpansionPanel,
	VExpansionPanelContent,
	VExpansionPanelHeader,
} from "vuetify/lib";

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
	components: {
		VExpansionPanels,
		VExpansionPanel,
		VExpansionPanelHeader,
		VExpansionPanelContent,
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

		const open = computed(() => {
			return props.submissionItems.filter((item) => {
				return !item.completed;
			}).length;
		});

		const done = computed(() => {
			return props.submissionItems.filter((item) => {
				return item.completed;
			}).length;
		});

		return {
			headers,
			items,
			open,
			done,
		};
	},
});
</script>
<style lang="scss" scoped>
.v-chip {
	opacity: 1;
	flex: none;
}

::v-deep {
	.v-expansion-panel-content__wrap {
		padding: 0;
	}

	.text-start {
		font-size: 0.75rem !important;
		height: 30px;
	}
}
</style>
