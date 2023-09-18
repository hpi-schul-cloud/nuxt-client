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
				<VExpansionPanelHeader @dblclick.stop="() => {}" class="pl-4 pr-4">
					<v-chip
						v-if="open"
						ref="v-chip-open"
						class="grey lighten-3 mr-2"
						disabled
						small
						>{{ open }}
						{{ $t("components.cardElement.submissionElement.open") }}</v-chip
					>
					<v-chip
						v-if="completed"
						ref="v-chip-completed"
						class="grey lighten-3 mr-2"
						disabled
						small
						>{{ completed }}
						{{
							$t("components.cardElement.submissionElement.completed")
						}}</v-chip
					>
					<v-chip
						v-if="expired"
						ref="v-chip-expired"
						class="grey lighten-3 mr-2"
						disabled
						small
						>{{ expired }}
						{{ $t("components.cardElement.submissionElement.expired") }}</v-chip
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
							<v-chip
								class="grey lighten-3"
								disabled
								small
								data-testid="submission-item"
							>
								<span v-if="item.status === 'open'"
									>{{ $t("components.cardElement.submissionElement.open") }}
								</span>
								<span v-if="item.status === 'completed'"
									>{{
										$t("components.cardElement.submissionElement.completed")
									}}
								</span>
								<span v-if="item.status === 'expired'"
									>{{ $t("components.cardElement.submissionElement.expired") }}
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
import { SubmissionsResponse } from "@/serverApi/v3";
import { DataTableHeader } from "vuetify";
import { I18N_KEY, injectStrict } from "@/utils/inject";

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
			type: Object as PropType<SubmissionsResponse>,
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

		const sortByName = (
			submissionA: SubmissionInfo,
			submissionB: SubmissionInfo
		) => {
			const lastNameA = submissionA.lastName.toUpperCase();
			const lastNameB = submissionB.lastName.toUpperCase();
			if (lastNameA < lastNameB) {
				return -1;
			}
			if (lastNameA > lastNameB) {
				return 1;
			}

			return 0;
		};

		const items = computed<Array<SubmissionInfo>>(() => {
			return props.submissions.users
				.map((student) => {
					const submissionInfo: Partial<SubmissionInfo> = {
						firstName: student.firstName,
						lastName: student.lastName,
					};

					const submission = props.submissions.submissionItemsResponse.find(
						(submission) => submission.userId === student.userId
					);

					if (!submission) {
						submissionInfo.status = props.editable ? "open" : "expired";
						return submissionInfo as SubmissionInfo;
					}

					if (submission.completed) {
						submissionInfo.status = "completed";
					}
					if (!submission.completed && props.editable) {
						submissionInfo.status = "open";
					}
					if (!submission.completed && !props.editable) {
						submissionInfo.status = "expired";
					}

					return submissionInfo as SubmissionInfo;
				})
				.sort(sortByName);
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

		const expired = computed<number>(() => {
			return items.value.filter((item) => {
				return item.status === "expired";
			}).length;
		});

		return {
			headers,
			items,
			open,
			completed,
			expired,
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

	.v-data-table__wrapper {
		overflow-x: hidden;
	}

	.v-data-table-header {
		span:first-child {
			display: block;
		}
	}
}
</style>
