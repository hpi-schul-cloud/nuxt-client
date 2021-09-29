<template>
	<default-wireframe :headline="$t('pages.tasks.title')" :full-width="false">
		<tasks-dashboard-main role="teacher" />
	</default-wireframe>
</template>

<script>
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import TasksDashboardMain from "@components/organisms/TasksDashboardMain";

export default {
	components: { DefaultWireframe, TasksDashboardMain },
	layout: "defaultVuetify",
	head() {
		return {
			title: this.$t("pages.tasks.title"),
		};
	},
};
</script>
