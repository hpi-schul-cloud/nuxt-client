<template>
	<SvsSuspense :loading="isRunning">
		<template v-if="isTeacher">
			<DashboardTasksOpen
				:title="t('common.labels.tasks.assigned')"
				data-testid="teacher-tasks-open"
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
				data-testid="teacher-tasks-drafts"
				:title="t('common.words.drafts')"
				:tasks="draftTasks"
			/>
		</template>
		<template v-else-if="isStudent">
			<DashboardTasksOpen
				:title="t('pages.tasks.student.openTasks')"
				data-testid="student-tasks-open"
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

		<VBtn class="mt-12" variant="outlined" data-test-id="show-all-tasks" to="/tasks">
			{{ t("common.actions.show.all") }}
		</VBtn>
	</SvsSuspense>
</template>

<script setup lang="ts">
import DashboardTasksOpen from "./DashboardTasksOpen.vue";
import DashboardTasksSection from "./DashboardTasksSection.vue";
import { useAppStoreRefs } from "@data-app";
import { useTasks } from "@data-tasks";
import { SvsSuspense } from "@ui-containers";
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
