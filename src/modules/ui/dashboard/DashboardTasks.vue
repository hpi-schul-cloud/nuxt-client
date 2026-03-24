<template>
	<SvsLoadingSpinner :loading="isRunning">
		<template v-if="isTeacher">
			<DashboardTasksOpen
				:title="t('common.labels.tasks.assigned')"
				test-id="teacher-tasks-open"
				:empty-msg="t('pages.dashboard.no.tasks')"
				:tasks="openTasksForTeacher"
			/>

			<DashboardTasksSection
				v-if="ungradedTasksForTeacher.length > 0"
				data-testid="teacher-tasks-not-graded"
				:title="t('pages.tasks.subtitleNotGraded')"
				:tasks="ungradedTasksForTeacher"
			/>

			<DashboardTasksSection
				v-if="gradedTasksForTeacher.length > 0"
				data-testid="teacher-tasks-graded"
				:title="t('pages.tasks.subtitleGraded')"
				:tasks="gradedTasksForTeacher"
			/>

			<!-- Tasks Draft and Private for teacher -->
			<DashboardTasksSection
				v-if="draftTasks.length > 0"
				data-testid="teacher-tasks-private"
				:title="t('common.words.drafts')"
				:tasks="draftTasks"
			/>
		</template>
		<template v-else-if="isStudent">
			<DashboardTasksOpen
				:title="t('pages.tasks.student.openTasks')"
				test-id="student-tasks-open"
				:empty-msg="t('pages.tasks.student.open.emptyState.title')"
				:tasks="openTasksForStudents"
			/>

			<DashboardTasksSection
				v-if="ungradedTasksForStudent.length > 0"
				data-testid="student-tasks-not-graded"
				:title="t('pages.tasks.subtitleNotGraded')"
				:tasks="ungradedTasksForStudent"
			/>

			<DashboardTasksSection
				v-if="gradedTasksForStudent.length > 0"
				data-testid="student-tasks-graded"
				:title="t('pages.tasks.subtitleGraded')"
				:tasks="gradedTasksForStudent"
			/>
		</template>

		<VBtn class="mt-4" variant="outlined" to="/tasks">
			{{ t("common.actions.show.all") }}
		</VBtn>
	</SvsLoadingSpinner>
</template>

<script setup lang="ts">
import DashboardTasksOpen from "./DashboardTasksOpen.vue";
import DashboardTasksSection from "./DashboardTasksSection.vue";
import { useAppStoreRefs } from "@data-app";
import { useTasks } from "@data-tasks";
import { SvsLoadingSpinner } from "@ui-containers";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { isTeacher, isStudent } = useAppStoreRefs();

const {
	draftTasks,
	gradedTasksForTeacher,
	gradedTasksForStudent,
	ungradedTasksForTeacher,
	ungradedTasksForStudent,
	openTasksForTeacher,
	openTasksForStudents,
	isRunning,
} = useTasks({
	range: {
		from: { amount: 1, unit: "month" },
		to: { amount: 14, unit: "day" },
	},
});
</script>
