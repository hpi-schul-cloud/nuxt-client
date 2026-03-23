<template>
	<SvsLoadingSpinner :loading="isRunning">
		<template v-if="isTeacher">
			<DashboardTasksOpen
				:title="t('common.labels.tasks.assigned')"
				test-id="teacher-open-tasks"
				:empty-msg="t('pages.dashboard.no.tasks')"
				:tasks="take10(openTasksForTeacher)"
			/>

			<DashboardTasksSection
				v-if="ungradedForTeacher.length > 0"
				data-testid="teacher-tasks-not-graded"
				:title="t('pages.tasks.subtitleNotGraded')"
				:tasks="take10(ungradedForTeacher)"
			/>

			<DashboardTasksSection
				v-if="gradedForTeacher.length > 0"
				data-testid="teacher-tasks-graded"
				:title="t('pages.room.taskCard.label.graded')"
				:tasks="take10(gradedForTeacher)"
			/>

			<!-- Tasks Draft and Private for teacher -->
			<DashboardTasksSection
				v-if="draft.length > 0"
				data-testid="teacher-tasks-private"
				:title="t('common.words.drafts')"
				:tasks="take10(draft)"
			/>
		</template>
		<template v-else-if="isStudent">
			<DashboardTasksOpen
				:title="t('pages.tasks.student.openTasks')"
				test-id="student-open-tasks"
				:empty-msg="t('pages.tasks.student.open.emptyState.title')"
				:tasks="take10(openTasksForStudents)"
			/>

			<DashboardTasksSection
				v-if="ungradedForStudent.length > 0"
				data-testid="student-tasks-not-graded"
				:title="t('pages.tasks.subtitleNotGraded')"
				:tasks="take10(ungradedForStudent)"
			/>

			<DashboardTasksSection
				v-if="gradedForStudent.length > 0"
				data-testid="student-tasks-graded"
				:title="t('pages.room.taskCard.label.graded')"
				:tasks="take10(gradedForStudent)"
			/>
		</template>

		<div class="d-flex mt-2">
			<VBtn variant="outlined" to="/tasks">
				{{ t("common.actions.show.all") }}
			</VBtn>
		</div>
	</SvsLoadingSpinner>
</template>

<script setup lang="ts">
import DashboardTasksOpen from "./DashboardTasksOpen.vue";
import DashboardTasksSection from "./DashboardTasksSection.vue";
import { take10 } from "@/utils/array.utils";
import { useAppStoreRefs } from "@data-app";
import { TASKS_RECENT_RANGE, useTasks } from "@data-tasks";
import { SvsLoadingSpinner } from "@ui-containers";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { isTeacher, isStudent } = useAppStoreRefs();
const {
	draft,
	gradedForTeacher,
	gradedForStudent,
	ungradedForTeacher,
	ungradedForStudent,
	openTasksForTeacher,
	openTasksForStudents,
	isRunning,
} = useTasks({
	range: TASKS_RECENT_RANGE,
});
</script>

<style scoped lang="scss"></style>
