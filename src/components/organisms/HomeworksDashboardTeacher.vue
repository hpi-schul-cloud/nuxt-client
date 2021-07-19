<template>
	<section class="homework-dashboard-teacher">
		<homeworks-dashboard-panels
			:panel-one-count="noDueDateHomeworks.length"
			:panel-two-count="dueDateHomeworks.length + overDueHomeworks.length"
			:panel-one-title="$t('pages.homeworks.subtitleNoDue')"
			:panel-two-title="$t('pages.homeworks.subtitleWithDue')"
			:status="status"
			:is-empty="isListEmpty"
			:expanded="1"
		>
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
			status: "getStatus",
			isListEmpty: "isListEmpty",
		}),
	},
};
</script>
