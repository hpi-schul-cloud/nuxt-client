<template>
	<tasks-dashboard-main v-if="dashBoardRole" :role="dashBoardRole" />
</template>

<script>
import { authModule, taskModule } from "@/store";
import TasksDashboardMain from "@components/templates/TasksDashboardMain";

export default {
	components: { TasksDashboardMain },
	layout: "defaultVuetify",
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
		taskModule.fetchAllTasks();
	},
	head() {
		return {
			title: this.$t("common.words.tasks"),
		};
	},
};
</script>
