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
				<VExpansionPanelHeader
					@dblclick.stop="() => {}"
					class="pl-4 pr-4 rounded-tr-0 rounded-tl-0"
				>
					<v-chip
						v-if="!isOverdue"
						ref="v-chip-open"
						class="mr-2"
						:class="getFilterClass('open', openCount)"
						small
						label
						:ripple="false"
						:disabled="isDisabled(openCount)"
						:tabindex="getTabIndex(isDisabled(openCount))"
						@click.stop="() => setFilter('open')"
						@keydown.space.stop.prevent="() => setFilter('open')"
						@keydown.enter.stop.prevent="() => setFilter('open')"
					>
						{{ openCount }}
						{{ t("components.cardElement.submissionElement.open") }}
					</v-chip>
					<v-chip
						ref="v-chip-completed"
						class="mr-2"
						:class="getFilterClass('completed', completedCount)"
						small
						label
						:ripple="false"
						:disabled="isDisabled(completedCount)"
						:tabindex="getTabIndex(isDisabled(completedCount))"
						@click.stop="() => setFilter('completed')"
						@keydown.space.stop.prevent="() => setFilter('completed')"
						@keydown.enter.stop.prevent="() => setFilter('completed')"
					>
						{{ completedCount }}
						{{ t("components.cardElement.submissionElement.completed") }}
					</v-chip>
					<v-chip
						v-if="isOverdue"
						ref="v-chip-expired"
						class="mr-2"
						:class="getFilterClass('expired', overdueCount)"
						small
						label
						:ripple="false"
						:disabled="isDisabled(overdueCount)"
						:tabindex="getTabIndex(isDisabled(overdueCount))"
						@click.stop="() => setFilter('expired')"
						@keydown.space.stop.prevent="() => setFilter('expired')"
						@keydown.enter.stop.prevent="() => setFilter('expired')"
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
									{{ getStatusIcon(item) }}
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
import {
	defineComponent,
	PropType,
	computed,
	ref,
	watch,
	watchEffect,
} from "vue";
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

		const getStatusIcon = (item: TeacherSubmission) => {
			if (item.status === "open") {
				return "$mdiMinus";
			}
			if (item.status === "completed") {
				return "$mdiCheck";
			}
			if (item.status === "expired") {
				return "$mdiClose";
			}
		};

		const getFilterClass = (filter: StatusFilter, count: number) => {
			if (isDisabled(count)) {
				return "filter-chip--disabled";
			}
			return activeFilter.value === filter
				? "filter-chip--active"
				: "filter-chip";
		};

		const isDisabled = (count: number) => {
			return count === 0;
		};

		const getTabIndex = (isDisabled: boolean) => {
			return isDisabled ? -1 : 0;
		};

		//	Filter Functionality
		const filteredSubmissions = ref<Array<TeacherSubmission>>([]);
		const activeFilter = ref<StatusFilter>("all");
		const panel = ref<number | undefined>(undefined);

		watchEffect(() => {
			filteredSubmissions.value = allSubmissions.value;
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
			t,
			panel,
			headers,
			filteredSubmissions,
			openCount,
			completedCount,
			overdueCount,
			activeFilter,
			setFilter,
			getStatusIcon,
			getFilterClass,
			isDisabled,
			getTabIndex,
		};
	},
});
</script>
<style lang="scss" scoped>
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

	.v-chip--clickable:active {
		box-shadow: unset;
	}
}

.filter-chip {
	background-color: var(--v-white-base) !important;
	border: 1px solid map-get($grey, base);
	border-color: map-get($grey, base);
}

.filter-chip--active {
	background-color: map-get($grey, lighten-2);
	border: 1px solid map-get($grey, lighten-2);
}

.filter-chip--disabled {
	opacity: 1;
	background-color: var(--v-white-base) !important;
	color: rgba(map-get($grey, base), 0.9);
	border: 1px solid rgba(map-get($grey, base), 0.4);
}

.v-chip {
	flex: none;
}
</style>
