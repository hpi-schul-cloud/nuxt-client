<template>
	<section class="homework-dashboard-teacher">
		<v-custom-empty-state
			v-if="isListEmpty"
			:image="emptyStateImage"
			:title="$t('pages.homeworks.teacher.emptyState.title')"
			:subtitle="$t('pages.homeworks.teacher.emptyState.subtitle')"
			class="mt-16"
		/>
		<v-custom-double-panels
			v-else
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
import { mapGetters } from "vuex";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import HomeworksList from "@components/organisms/HomeworksList";
import vCustomDoublePanels from "@components/molecules/vCustomDoublePanels";
import tasksEmptyState from "@assets/img/empty-state/Task_Empty_State.svg";

export default {
	components: { vCustomEmptyState, HomeworksList, vCustomDoublePanels },
	data() {
		return {
			emptyStateImage: tasksEmptyState,
		};
	},
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
