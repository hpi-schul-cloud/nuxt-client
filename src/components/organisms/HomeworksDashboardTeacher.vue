<template>
	<section class="homework-dashboard-teacher">
		<homeworks-list
			:homeworks="overDueHomeworks"
			:title="$t('pages.homeworks.teacher.subtitleOverDue')"
			type="teacher"
		/>
		<homeworks-list
			:homeworks="dueDateHomeworks"
			:title="$t('pages.homeworks.teacher.subtitleAssigned')"
			type="teacher"
		/>
		<homeworks-list
			:homeworks="noDueDateHomeworks"
			:title="$t('pages.homeworks.teacher.subtitleNoDue')"
			type="teacher"
		/>
	</section>
</template>

<script>
import HomeworksList from "@components/organisms/HomeworksList";
import { mapGetters } from "vuex";

export default {
	components: { HomeworksList },
	computed: {
		...mapGetters("homeworks", {
			dueDateHomeworks: "getOpenHomeworksWithDueDate",
			overDueHomeworks: "getOverDueHomeworks",
			noDueDateHomeworks: "getOpenHomeworksWithoutDueDate",
		}),
	},
};
</script>
