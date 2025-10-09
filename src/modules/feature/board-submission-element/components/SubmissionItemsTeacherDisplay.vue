<template>
	<div class="rounded-b-sm">
		<v-skeleton-loader v-if="loading" class="mt-5 ml-5 mb-6" type="image" width="120" height="22" />
		<VExpansionPanels v-else v-model="panel" class="rounded-0 rounded-b-sm">
			<VExpansionPanel elevation="0">
				<VExpansionPanelTitle class="pl-4 pr-4 rounded-te-0 rounded-ts-0" @dblclick.stop="() => {}">
					<v-chip
						v-if="!isOverdue"
						ref="v-chip-open"
						class="mr-2"
						:class="getFilterClass('open', openCount)"
						size="small"
						label
						variant="outlined"
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
						size="small"
						label
						variant="outlined"
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
						size="small"
						label
						variant="outlined"
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
				</VExpansionPanelTitle>
				<v-expansion-panel-text>
					<v-data-table :headers="headers" :items="filteredSubmissions" hover>
						<template #[`item.status`]="{ item }">
							<span data-testid="submission-item">
								<v-icon size="small">
									{{ getStatusIcon(item) }}
								</v-icon>
							</span>
						</template>
						<template #bottom />
					</v-data-table>
				</v-expansion-panel-text>
			</VExpansionPanel>
		</VExpansionPanels>
	</div>
</template>

<script lang="ts">
import { Status, TeacherSubmission } from "../types/submission";
import { mdiCheck, mdiClose, mdiMinus } from "@icons/material";
import { MaybeRef } from "@vueuse/core";
import { computed, defineComponent, PropType, Ref, ref, toRef, unref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { DataTableHeader } from "vuetify";
import { VExpansionPanelTitle } from "vuetify/components";

type StatusFilter = "all" | Status;

export default defineComponent({
	name: "SubmissionItemsTeacherDisplay",
	components: { VExpansionPanelTitle },
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
				title: t("common.labels.status"),
				key: "status",
			},
			{
				title: t("common.labels.lastName"),
				key: "lastName",
			},
			{
				title: t("common.labels.firstName"),
				key: "firstName",
			},
		];
		const panel = ref<number | undefined>(undefined);
		const allSubmissions = toRef(props, "submissions");
		const activeFilter = ref<StatusFilter>("all");
		const filteredSubmissions = computed(() => filterByStatus(allSubmissions, activeFilter));
		const filterByStatus = (submissions: Ref<TeacherSubmission[]>, statusFilter: MaybeRef<StatusFilter>) => {
			const status = unref(statusFilter);
			return submissions.value.filter((item) => status === "all" || item.status === status);
		};
		const setFilter = (filter: StatusFilter) => {
			if (filter === activeFilter.value) {
				activeFilter.value = "all";
			} else {
				activeFilter.value = filter;
			}
		};
		const openCount = computed<number>(() => filterByStatus(allSubmissions, "open").length);
		const completedCount = computed<number>(() => filterByStatus(allSubmissions, "completed").length);
		const overdueCount = computed<number>(() => filterByStatus(allSubmissions, "expired").length);
		const isDisabled = (count: number) => count === 0;
		const getTabIndex = (isDisabled: boolean) => (isDisabled ? -1 : 0);
		const getStatusIcon = (item: TeacherSubmission) => {
			if (item.status === "open") {
				return mdiMinus;
			}
			if (item.status === "completed") {
				return mdiCheck;
			}
			if (item.status === "expired") {
				return mdiClose;
			}
		};
		const getFilterClass = (filter: StatusFilter, count: number) => {
			if (isDisabled(count)) {
				return "filter-chip--disabled";
			}
			return activeFilter.value === filter ? "filter-chip--active" : "filter-chip";
		};
		watch(activeFilter, () => {
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
@use "sass:map";
@use "@/styles/settings.scss" as *;

:deep(.v-expansion-panel-text__wrapper) {
	padding: 0;
}

:deep(.v-expansion-panel-title--active > .v-expansion-panel-title__overlay) {
	opacity: 0;
}

.filter-chip--active {
	background-color: map.get($grey, lighten-2);
	border: 1px solid map.get($grey, lighten-2);
}

.filter-chip--disabled {
	opacity: 1;
	background-color: rgba(var(--v-theme-white)) !important;
	color: rgba(map.get($grey, base), 0.9);
	border: 1px solid rgba(map.get($grey, base), 0.4);
}
</style>
