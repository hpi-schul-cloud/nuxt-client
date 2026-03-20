<template>
	<SvsLoadingSpinner :loading="isRunning">
		<template v-if="isTeacher">
			<!-- Tasks Feedback required -->
			<DashboardTasksSection
				v-if="feedbackRequired.length > 0"
				data-testid="tasks-with-required-feedback"
				:title="t('pages.dashboard.schedule.with.required.feedback')"
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
	</SvsLoadingSpinner>
</template>

<script setup lang="ts">
import DashboardTasksAssigned from "./DashboardTasksAssigned.vue";
import DashboardTasksSection from "./DashboardTasksSection.vue";
import { take10 } from "@/utils/array.utils";
import { useAppStoreRefs } from "@data-app";
import { TASKS_ONE_YEAR_RANGE, toSortedByCreatedDate, useTasks } from "@data-tasks";
import { SvsLoadingSpinner } from "@ui-containers";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { isTeacher, isStudent } = useAppStoreRefs();
const { assignedToStudent, assignedToTeacher, draft, feedbackRequired, withFeedback, isRunning } = useTasks({
	range: TASKS_ONE_YEAR_RANGE,
});
const draftByCreated = computed(() => take10(toSortedByCreatedDate(draft.value)));
</script>

<style scoped lang="scss"></style>
