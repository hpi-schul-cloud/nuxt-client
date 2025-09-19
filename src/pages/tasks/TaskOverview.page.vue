<template>
	<tasks-dashboard-main v-if="dashboardRole" :role="dashboardRole" />
</template>

<script setup lang="ts">
import TasksDashboardMain from "@/components/templates/TasksDashboardMain.vue";
import TasksModule from "@/store/tasks";
import { useTitle } from "@vueuse/core";
import { computed, inject, onMounted } from "vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useI18n } from "vue-i18n";
import { useAuthStoreRefs } from "@data-auth";

const { t } = useI18n();
const { isTeacher, isStudent } = useAuthStoreRefs();
const tasksModule = inject<TasksModule | undefined>("tasksModule");

if (tasksModule === undefined) {
	throw new Error("tasksModule Module undefined"); // NUXT_REMOVAL use application error
}

useTitle(buildPageTitle(t("common.words.tasks")));

onMounted(() => tasksModule.fetchAllTasks());

const dashboardRole = computed(() => {
	if (isTeacher.value) return "teacher";
	if (isStudent.value) return "student";
	return undefined;
});
</script>
