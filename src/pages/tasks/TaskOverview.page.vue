<template>
	<tasks-dashboard-main v-if="dashboardRole" :role="dashboardRole" />
</template>

<script setup lang="ts">
import TasksDashboardMain from "@/components/templates/TasksDashboardMain.vue";
import AuthModule from "@/store/auth";
import TasksModule from "@/store/tasks";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import { computed, inject, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
const tasksModule = inject<TasksModule | undefined>("tasksModule");

if (tasksModule === undefined) {
	throw new Error("tasksModule Module undefined"); // NUXT_REMOVAL use application error
}

useTitle(buildPageTitle(t("common.words.tasks")));

onMounted(() => tasksModule.fetchAllTasks());

const dashboardRole = computed(() => {
	if (authModule.getUserRoles.includes("teacher")) return "teacher";
	if (authModule.getUserRoles.includes("student")) return "student";
	return undefined;
});
</script>
