<template>
	<section class="homework-dashboard-teacher">
		<homeworks-dashboard-panels>
			<template v-slot:panelOne>
				<homeworks-list :homeworks="noDueDateHomeworks" type="teacher" />
			</template>
			<template v-slot:panelTwo>
				<homeworks-list
					:homeworks="overDueHomeworks"
					:title="$t('pages.homeworks.teacher.subtitleOverDue')"
					type="teacher"
				/>
				<homeworks-list
					:homeworks="dueDateHomeworks"
					:title="$t('pages.homeworks.subtitleOpen')"
					type="teacher"
				/>
			</template>
		</homeworks-dashboard-panels>
	</section>
</template>

<script>
import HomeworksList from "@components/organisms/HomeworksList";
import HomeworksDashboardPanels from "@components/organisms/HomeworksDashboardPanels";
import { mapGetters } from "vuex";

export default {
	components: { HomeworksList, HomeworksDashboardPanels },
	computed: {
		...mapGetters("homeworks", {
			dueDateHomeworks: "getOpenHomeworksWithDueDate",
			overDueHomeworks: "getOverDueHomeworks",
			noDueDateHomeworks: "getOpenHomeworksWithoutDueDate",
		}),
	},
};
</script>
