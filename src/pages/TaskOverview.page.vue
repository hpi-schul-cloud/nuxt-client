<template>
	<tasks-dashboard-main v-if="dashBoardRole" :role="dashBoardRole" />
</template>

<script>
import { authModule, tasksModule } from "@/store";
import TasksDashboardMain from "@components/templates/TasksDashboardMain";

export default {
	components: { TasksDashboardMain },
	computed: {
		userRoles: () => authModule.getUserRoles,
		dashBoardRole: function () {
			let role = undefined;

			if (this.userRoles.includes("teacher")) {
				role = "teacher";
			} else if (this.userRoles.includes("student")) {
				role = "student";
			}

			return role;
		},
	},
	mounted() {
		tasksModule.fetchAllTasks();
	},
	head() {
		return {
			title: this.$t("common.words.tasks"),
		};
	},
};
</script>
