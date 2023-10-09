<template>
	<div class="rounded-b-sm">
		<v-skeleton-loader
			v-if="loading"
			class="mt-5 ml-5 mb-6"
			type="image"
			width="120"
			height="22"
		/>
		<VExpansionPanels
			v-else
			v-model="panel"
			flat
			class="rounded-0 rounded-b-sm"
		>
			<VExpansionPanel>
				<VExpansionPanelHeader @dblclick.stop="() => {}" class="pl-4 pr-4">
					<v-chip
						v-if="!isOverdue"
						ref="v-chip-open"
						class="mr-2"
						:class="
							activeFilter === 'open' ? 'active-chip' : 'grey black--text'
						"
						small
						label
						:disabled="openCount === 0"
						:outlined="activeFilter !== 'open'"
						:ripple="false"
						@click.stop="() => setFilter('open')"
					>
						{{ openCount }}
						{{ t("components.cardElement.submissionElement.open") }}
					</v-chip>
					<v-chip
						ref="v-chip-completed"
						class="mr-2"
						:class="
							activeFilter === 'completed' ? 'active-chip' : 'grey black--text'
						"
						small
						label
						:disabled="completedCount === 0"
						:outlined="activeFilter !== 'completed'"
						:ripple="false"
						@click.stop="() => setFilter('completed')"
					>
						{{ completedCount }}
						{{ t("components.cardElement.submissionElement.completed") }}
					</v-chip>
					<v-chip
						v-if="isOverdue"
						ref="v-chip-expired"
						class="mr-2"
						:class="
							activeFilter === 'expired' ? 'active-chip' : 'grey black--text'
						"
						small
						label
						:disabled="overdueCount === 0"
						:outlined="activeFilter !== 'expired'"
						:ripple="false"
						@click.stop="() => setFilter('expired')"
					>
						{{ overdueCount }}
						{{ t("components.cardElement.submissionElement.expired") }}
					</v-chip>
				</VExpansionPanelHeader>
				<VExpansionPanelContent>
					<v-data-table
						:headers="headers"
						:items="filteredSubmissions"
						disable-pagination
						hide-default-footer
					>
						<template #[`item.status`]="{ item }">
							<span data-testid="submission-item">
								<v-icon color="black" small>
									{{ item.status === "completed" ? "$mdiCheck" : "$mdiClose" }}
								</v-icon>
							</span>
						</template>
					</v-data-table>
				</VExpansionPanelContent>
			</VExpansionPanel>
		</VExpansionPanels>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from "vue";
import { TeacherSubmission, Status } from "../types/submission";
import { DataTableHeader } from "vuetify";
import { useI18n } from "@/composables/i18n.composable";

type StatusFilter = "all" | Status;

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
		isOverdue: {
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

		const allSubmissions = computed<Array<TeacherSubmission>>(() => {
			return props.submissions;
		});

		const openCount = computed<number>(() => {
			return allSubmissions.value.filter((item) => {
				return item.status === "open";
			}).length;
		});

		const completedCount = computed<number>(() => {
			return allSubmissions.value.filter((item) => {
				return item.status === "completed";
			}).length;
		});

		const overdueCount = computed<number>(() => {
			return allSubmissions.value.filter((item) => {
				return item.status === "expired";
			}).length;
		});

		//	Filter Functionality
		const filteredSubmissions = ref<Array<TeacherSubmission>>([]);
		const activeFilter = ref<StatusFilter>("all");
		const panel = ref<number | undefined>(undefined);

		watch(allSubmissions, (newValue) => {
			filteredSubmissions.value = newValue;
		});

		const filterByStatus = (statusFilter: StatusFilter) => {
			if (statusFilter === "all") {
				filteredSubmissions.value = allSubmissions.value;
				return;
			}

			filteredSubmissions.value = allSubmissions.value.filter(
				(item: TeacherSubmission) => {
					return item.status === statusFilter;
				}
			);
		};

		const setFilter = (filter: StatusFilter) => {
			if (filter === activeFilter.value) {
				activeFilter.value = "all";
			} else {
				activeFilter.value = filter;
			}
		};

		watch(activeFilter, (newFilter) => {
			filterByStatus(newFilter);
			openPanel();
		});

		const openPanel = () => {
			if (panel.value === undefined && activeFilter.value !== "all") {
				panel.value = 0;
			}
		};

		return {
			panel,
			headers,
			filteredSubmissions,
			openCount,
			completedCount,
			overdueCount,
			activeFilter,
			setFilter,
			t,
		};
	},
});
</script>
<style lang="scss" scoped>
.active-chip {
	background-color: map-get($grey, lighten-2);
	border: 1px solid map-get($grey, lighten-2);
}
.v-chip {
	opacity: 1;
	flex: none;
}

::v-deep {
	.theme--light.v-expansion-panels .v-expansion-panel,
	.v-expansion-panel-header:before {
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

	.v-chip--clickable:active {
		box-shadow: unset;
	}
}
</style>
