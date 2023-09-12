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
						>{{ open }}
						{{ $t("components.cardElement.submissionElement.open") }}</v-chip
					>
					<v-chip v-if="completed" class="grey lighten-3 mr-2" disabled small
						>{{ completed }}
						{{
							$t("components.cardElement.submissionElement.completed")
						}}</v-chip
					>
					<v-chip v-if="missed" class="grey lighten-3 mr-2" disabled small
						>{{ missed }}
						{{ $t("components.cardElement.submissionElement.missed") }}</v-chip
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
						<template #[`item.status`]="{ item }">
							<v-chip class="grey lighten-3" disabled small>
								<span v-if="item.status === 'open'"
									>{{ $t("components.cardElement.submissionElement.open") }}
								</span>
								<span v-if="item.status === 'completed'"
									>{{
										$t("components.cardElement.submissionElement.completed")
									}}
								</span>
								<span v-if="item.status === 'missed'"
									>{{ $t("components.cardElement.submissionElement.missed") }}
								</span>
							</v-chip>
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

type Status = "completed" | "open" | "missed";
type SubmissionInfo = {
	status: Status;
	firstName: string;
	lastName: string;
};

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
		editable: {
			type: Boolean,
			required: true,
		},
	},
	setup(props) {
		const i18n = injectStrict(I18N_KEY);
		const headers: DataTableHeader[] = [
			{
				text: i18n.t("common.labels.status").toString(),
				value: "status",
			},
			{
				text: i18n.t("common.labels.lastName").toString(),
				value: "lastName",
			},
			{
				text: i18n.t("common.labels.firstName").toString(),
				value: "firstName",
			},
		];

		const items = computed<Array<SubmissionInfo>>(() => {
			return props.submissionItems.map((item) => {
				const submissionInfo: Partial<SubmissionInfo> = {
					firstName: item.userData.firstName,
					lastName: item.userData.lastName,
				};
				if (item.completed) {
					submissionInfo.status = "completed";
				}
				if (!item.completed && props.editable) {
					submissionInfo.status = "open";
				}
				if (!item.completed && !props.editable) {
					submissionInfo.status = "missed";
				}

				return submissionInfo as SubmissionInfo;
			});
		});

		const open = computed<number>(() => {
			return items.value.filter((item) => {
				return item.status === "open";
			}).length;
		});

		const completed = computed<number>(() => {
			return items.value.filter((item) => {
				return item.status === "completed";
			}).length;
		});

		const missed = computed<number>(() => {
			return items.value.filter((item) => {
				return item.status === "missed";
			}).length;
		});

		return {
			headers,
			items,
			open,
			completed,
			missed,
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
