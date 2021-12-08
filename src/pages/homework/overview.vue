<template>
	<tasks-dashboard-main :role="userRoles[0]" />
</template>

<script>
import authModule from "@/store/auth";
import TasksDashboardMain from "@components/templates/TasksDashboardMain";

export default {
	components: { TasksDashboardMain },
	layout: "defaultVuetify",
	computed: {
		userRoles: () => authModule.getUserRoles, // TODO - how to handle multiple roles & is not teacher or student
	},
	head() {
		return {
			title: this.$t("pages.tasks.title"),
		};
	},
};
</script>
