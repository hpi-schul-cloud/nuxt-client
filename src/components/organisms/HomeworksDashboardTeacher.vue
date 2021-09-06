<template>
	<section class="homework-dashboard-teacher">
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
			dueDateHomeworks: "getOpenHomeworksWithDueDateTeacher",
			overDueHomeworks: "getOverDueHomeworksTeacher",
			noDueDateHomeworks: "getOpenHomeworksWithoutDueDateTeacher",
			status: "getStatus",
			isListEmpty: "isListEmpty",
		}),
	},
};
</script>
