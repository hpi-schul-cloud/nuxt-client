<template>
	<homeworks-dashboard-main :role="'student'" />
</template>

<script>
import { mapGetters } from "vuex";
import tasksEmptyState from "@assets/img/empty-state/Task_Empty_State.svg";
import HomeworksDashboardMain from "@components/organisms/HomeworksDashboardMain";

export default {
	components: { HomeworksDashboardMain },
	layout: "defaultVuetify",
	data() {
		return {
			image: tasksEmptyState,
		};
	},
	computed: {
		...mapGetters("homeworks", {
			homeworks: "getList",
			isListEmpty: "isListEmpty",
			isListFilled: "isListFilled",
			openHomeworks: "getOpenHomeworks",
			overDueHomeworks: "getOverDueHomeworks",
		}),
	},
	mounted() {
		this.$store.dispatch("homeworks/getHomeworksDashboard");
	},
	head() {
		return {
			title: this.$t("pages.homeworks.student.title"),
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.v-container {
	max-width: var(--size-content-width-max);
}
</style>
