<template>
	<tasks-dashboard-main v-if="dashBoardRole" :role="dashBoardRole" />
</template>

<script>
import AuthModule from "@/store/auth";
import TaskModule from "@/store/tasks";
import TasksDashboardMain from "@components/templates/TasksDashboardMain";

export default {
	components: { TasksDashboardMain },
	layout: "defaultVuetify",
	computed: {
		userRoles: () => AuthModule.getUserRoles,
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
		TaskModule.fetchAllTasks();
	},
	head() {
		return {
			title: this.$t("pages.tasks.title"),
		};
	},
};
</script>
