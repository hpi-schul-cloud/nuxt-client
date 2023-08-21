<template>
	<tasks-dashboard-main v-if="dashboardRole" :role="dashboardRole" />
</template>

<script lang="ts">
import TasksDashboardMain from "@/components/templates/TasksDashboardMain.vue";
import AuthModule from "@/store/auth";
import TasksModule from "@/store/tasks";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useTitle } from "@vueuse/core";
import { computed, defineComponent, inject, onMounted, ref } from "vue";
import { useI18n } from "@/composables/i18n.composable";
import { buildPageTitle } from "@/utils/pageTitle";

export default defineComponent({
	components: { TasksDashboardMain },
	setup() {
		const { t } = useI18n();
		const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
		const tasksModule = inject<TasksModule | undefined>("tasksModule");

		if (tasksModule === undefined) {
			throw new Error("tasksModule Module undefined"); // NUXT_REMOVAL use application error
		}

		useTitle(buildPageTitle(t("common.words.tasks")));

		onMounted(() => tasksModule.fetchAllTasks());

		const userRoles = ref(authModule.getUserRoles);

		const dashboardRole = computed(() => {
			if (userRoles.value.includes("teacher")) return "teacher";
			if (userRoles.value.includes("student")) return "student";
			return undefined;
		});

		return {
			dashboardRole,
		};
	},
});
</script>
