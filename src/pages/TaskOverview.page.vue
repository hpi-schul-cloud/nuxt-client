<template>
	<tasks-dashboard-main v-if="dashboardRole" :role="dashboardRole" />
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from "vue";
import AuthModule from "@/store/auth";
import TasksModule from "@/store/tasks";
import TasksDashboardMain from "@/components/templates/TasksDashboardMain.vue";
import VueI18n from "vue-i18n";
import { useTitle } from "@vueuse/core";

export default defineComponent({
	components: { TasksDashboardMain },
	setup() {
		const i18n = inject<VueI18n | undefined>("i18n");
		const authModule = inject<AuthModule | undefined>("authModule");
		const tasksModule = inject<TasksModule | undefined>("tasksModule");

		if (i18n === undefined) {
			throw new Error("i18n Module undefined"); // NUXT_REMOVAL use application error
		}
		if (authModule === undefined) {
			throw new Error("authModule Module undefined"); // NUXT_REMOVAL use application error
		}

		if (tasksModule === undefined) {
			throw new Error("tasksModule Module undefined"); // NUXT_REMOVAL use application error
		}
    
		useTitle(i18n.t("common.words.tasks").toString());

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
