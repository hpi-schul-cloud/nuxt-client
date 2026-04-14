<template>
	<SvsSuspense :loading="isLoading">
		<h2 class="mb-0 mt-16">{{ t("common.words.tasks") }}</h2>
		<template v-if="isTeacher">
			<DashboardTasksOpen
				:title="t('components.organisms.TasksDashboardMain.tab.current')"
				data-testid="teacher-tasks-open"
				:empty-msg="t('pages.tasks.open.emptyState.title')"
				:tasks="openForTeacherNotOverdue"
			/>

			<DashboardTasksSection
				v-if="ungradedForTeacherOverdue.length > 0"
				data-testid="teacher-tasks-not-graded"
				:title="t('pages.tasks.subtitleNotGraded')"
				:tasks="ungradedForTeacherOverdue"
			/>

			<DashboardTasksSection
				v-if="gradedForTeacherOverdue.length > 0"
				data-testid="teacher-tasks-graded"
				:title="t('pages.tasks.subtitleGraded')"
				:tasks="gradedForTeacherOverdue"
			/>

			<DashboardTasksSection
				v-if="drafts.length > 0"
				data-testid="teacher-tasks-drafts"
				:title="t('common.words.drafts')"
				:tasks="drafts"
			/>
		</template>
		<template v-else-if="isStudent">
			<DashboardTasksOpen
				:title="t('components.organisms.TasksDashboardMain.tab.open')"
				data-testid="student-tasks-open"
				:empty-msg="t('pages.tasks.open.emptyState.title')"
				:tasks="openForStudent"
			/>

			<DashboardTasksSection
				v-if="submittedForStudent.length > 0"
				data-testid="student-tasks-not-graded"
				:title="t('pages.tasks.subtitleNotGraded')"
				:tasks="submittedForStudent"
			/>

			<DashboardTasksSection
				v-if="gradedForStudent.length > 0"
				data-testid="student-tasks-graded"
				:title="t('pages.tasks.subtitleGraded')"
				:tasks="gradedForStudent"
			/>
		</template>

		<VBtn class="mt-8" variant="outlined" data-test-id="show-all-tasks" to="/tasks">
			{{ t("common.actions.show.all") }}
		</VBtn>
	</SvsSuspense>
</template>

<script setup lang="ts">
import DashboardTasksOpen from "./DashboardTasksOpen.vue";
import DashboardTasksSection from "./DashboardTasksSection.vue";
import { useAppStoreRefs } from "@data-app";
import { isTaskOverdue, toSortedByDueDate, useTasks } from "@data-tasks";
import { SvsSuspense } from "@ui-containers";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { isTeacher, isStudent } = useAppStoreRefs();

const {
	drafts,
	openForTeacher,
	gradedForTeacher,
	ungradedForTeacher,
	openForStudent,
	submittedForStudent,
	gradedForStudent,
	isLoading,
} = useTasks({
	range: {
		from: { amount: 1, unit: "month" },
		to: { amount: 14, unit: "day" },
	},
});

const openForTeacherNotOverdue = computed(() => openForTeacher.value.filter((task) => !isTaskOverdue(task)));
const gradedForTeacherOverdue = computed(() => toSortedByDueDate(gradedForTeacher.value.filter(isTaskOverdue)));
const ungradedForTeacherOverdue = computed(() => toSortedByDueDate(ungradedForTeacher.value.filter(isTaskOverdue)));
</script>
