<template>
	<homeworks-dashboard-main :role="'student'" />
</template>

<script>
import HomeworksDashboardMain from "@components/organisms/HomeworksDashboardMain";

export default {
	components: { HomeworksDashboardMain },
	layout: "defaultVuetify",

	head() {
		return {
			title: this.$t("pages.homeworks.student.title"),
		};
	},
};
</script>
