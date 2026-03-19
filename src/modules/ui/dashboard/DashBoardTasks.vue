<template>
	<!-- Teacher tasks -->
	<div v-if="isRunning" class="d-flex mt-10 justify-center align-center">
		<VProgressCircular indeterminate size="115" />
	</div>
	<template v-else>
		<template v-if="isTeacher">
			<!-- Tasks Feedback required -->
			<DashboardTasksSection
				v-if="feedbackRequired.length > 0"
				data-testid="tasks-with-required-feedback"
				:title="t('pages.dashboard.schedule.with.feedback')"
				:tasks="take10(feedbackRequired)"
			/>

			<DashboardTasksAssigned :tasks="take10(assignedToTeacher)" />

			<!-- Tasks Private -->
			<DashboardTasksSection
				v-if="draftByCreated.length > 0"
				data-testid="tasks-private"
				:title="t('common.words.drafts')"
				:tasks="take10(draftByCreated)"
			/>
			<div class="d-flex mt-2">
				<VBtn variant="outlined" to="/tasks">
					{{ t("common.actions.show.all") }}
				</VBtn>
			</div>
		</template>

		<!-- Student tasks -->
		<template v-else-if="isStudent">
			<DashboardTasksAssigned :tasks="take10(assignedToStudent)" />

			<!-- Tasks with feedback -->
			<DashboardTasksSection
				v-if="withFeedback.length > 0"
				data-testid="tasks-with-feedback"
				:title="t('pages.dashboard.schedule.with.feedback')"
				:tasks="take10(withFeedback)"
			/>
			<div class="d-flex mt-2">
				<VBtn variant="outlined" to="/tasks">
					{{ t("common.actions.show.all") }}
				</VBtn>
			</div>
		</template>
	</template>
</template>

<script setup lang="ts">
import DashboardTasksAssigned from "./DashboardTasksAssigned.vue";
import DashboardTasksSection from "./DashboardTasksSection.vue";
import { take10 } from "@/utils/array.utils";
import { useAppStoreRefs } from "@data-app";
import { TASKS_ONE_YEAR_RANGE, toSortedByCreatedDate, useTasks } from "@data-tasks";
import { refDebounced } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { isTeacher, isStudent } = useAppStoreRefs();
const { assignedToStudent, assignedToTeacher, draft, feedbackRequired, withFeedback, status, isRunning } = useTasks({
	range: TASKS_ONE_YEAR_RANGE,
});

const isLoadingTasks = computed(() => status.value !== "completed");
const draftByCreated = computed(() => take10(toSortedByCreatedDate(draft.value)));
const debouncedIsLoading = refDebounced(isLoadingTasks, 200);
</script>

<style scoped lang="scss"></style>
