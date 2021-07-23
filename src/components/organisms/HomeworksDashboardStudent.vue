<template>
	<section class="homework-dashboard-student">
		<v-custom-double-panels
			:panel-one-count="noDueDateHomeworks.length"
			:panel-two-count="dueDateHomeworks.length + overDueHomeworks.length"
			:panel-one-title="$t('pages.homeworks.subtitleNoDue')"
			:panel-two-title="$t('pages.homeworks.subtitleWithDue')"
			:status="status"
			:is-empty="isListEmpty"
			:expanded-default="1"
		>
			<template v-slot:panelOne>
				<homeworks-list :homeworks="noDueDateHomeworks" type="student" />
			</template>
			<template v-slot:panelTwo>
				<homeworks-list
					:homeworks="dueDateHomeworks"
					:title="$t('pages.homeworks.subtitleOpen')"
					type="student"
				/>
				<homeworks-list
					:homeworks="overDueHomeworks"
					:title="$t('pages.homeworks.student.subtitleOverDue')"
					type="student"
				/>
			</template>
		</v-custom-double-panels>
	</section>
</template>

<script>
import HomeworksList from "@components/organisms/HomeworksList";
import vCustomDoublePanels from "@components/molecules/vCustomDoublePanels";
import { mapGetters } from "vuex";

export default {
	components: { HomeworksList, vCustomDoublePanels },
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
