<template>
	<div class="rounded-b-sm">
		<v-skeleton-loader
			v-if="loading"
			class="mt-5 ml-5 mb-6"
			type="image"
			width="120"
			height="22"
		/>
		<VExpansionPanels v-else flat class="rounded-0 rounded-b-sm">
			<VExpansionPanel>
				<VExpansionPanelHeader @dblclick.stop="() => {}" class="pl-4 pr-4">
					<v-chip
						v-if="openCount"
						ref="v-chip-open"
						class="grey lighten-3 mr-2"
						disabled
						small
					>
						{{ openCount }}
						{{ t("components.cardElement.submissionElement.open") }}
					</v-chip>
					<v-chip
						v-if="completedCount"
						ref="v-chip-completed"
						class="grey lighten-3 mr-2"
						disabled
						small
					>
						{{ completedCount }}
						{{ t("components.cardElement.submissionElement.completed") }}
					</v-chip>
					<v-chip
						v-if="expiredCount"
						ref="v-chip-expired"
						class="grey lighten-3 mr-2"
						disabled
						small
					>
						{{ expiredCount }}
						{{ t("components.cardElement.submissionElement.expired") }}
					</v-chip>
				</VExpansionPanelHeader>
				<VExpansionPanelContent>
					<v-data-table
						:headers="headers"
						:items="items"
						disable-pagination
						hide-default-footer
					>
						<template #[`item.status`]="{ item }">
							<v-chip
								class="grey lighten-3"
								disabled
								small
								data-testid="submission-item"
							>
								<span v-if="item.status === 'open'">
									{{ t("components.cardElement.submissionElement.open") }}
								</span>
								<span v-if="item.status === 'completed'">
									{{ t("components.cardElement.submissionElement.completed") }}
								</span>
								<span v-if="item.status === 'expired'">
									{{ t("components.cardElement.submissionElement.expired") }}
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
import { TeacherSubmission } from "../types/submission";
import { DataTableHeader } from "vuetify";
import { useI18n } from "@/composables/i18n.composable";

type Status = "completed" | "open" | "expired";
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
		submissions: {
			type: Array as PropType<Array<TeacherSubmission>>,
			required: true,
		},
		editable: {
			type: Boolean,
			required: true,
		},
	},
	setup(props) {
		const { t } = useI18n();

		const headers: DataTableHeader[] = [
			{
				text: t("common.labels.status"),
				value: "status",
			},
			{
				text: t("common.labels.lastName"),
				value: "lastName",
			},
			{
				text: t("common.labels.firstName"),
				value: "firstName",
			},
		];

		const items = computed<Array<SubmissionInfo>>(() => {
			return props.submissions;
		});

		const openCount = computed<number>(() => {
			return items.value.filter((item) => {
				return item.status === "open";
			}).length;
		});

		const completedCount = computed<number>(() => {
			return items.value.filter((item) => {
				return item.status === "completed";
			}).length;
		});

		const expiredCount = computed<number>(() => {
			return items.value.filter((item) => {
				return item.status === "expired";
			}).length;
		});

		return {
			headers,
			items,
			openCount,
			completedCount,
			expiredCount,
			t,
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
	.theme--light.v-expansion-panels .v-expansion-panel {
		background-color: transparent;
	}

	.v-data-table
		> .v-data-table__wrapper
		tbody
		tr:first-child:hover
		td:last-child {
		border-top-right-radius: 0;
	}

	.v-data-table
		> .v-data-table__wrapper
		tbody
		tr:first-child:hover
		td:first-child {
		border-top-left-radius: 0;
	}

	.v-expansion-panel-content__wrap {
		padding: 0;
	}

	.v-data-table__wrapper {
		overflow-x: hidden;

		.text-start {
			font-size: 0.75rem;
		}

		table > thead > tr > th > .v-icon {
			font-size: 0.75rem !important;
			height: 0.75rem !important;
			width: 0.75rem !important;
			margin-left: 2px;
		}
	}
}
</style>
