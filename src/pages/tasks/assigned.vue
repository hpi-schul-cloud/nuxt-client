<template>
	<tasks-dashboard-main role="teacher" />
</template>

<script>
import TasksDashboardMain from "@components/organisms/TasksDashboardMain";

export default {
	components: { TasksDashboardMain },
	layout: "defaultVuetify",
	head() {
		return {
			title: this.$t("pages.tasks.title"),
		};
	},
};
</script>
