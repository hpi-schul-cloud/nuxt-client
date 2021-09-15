<template>
	<section class="homework-dashboard-student">
		<v-tabs-items v-model="tab">
			<v-tab-item>
				<v-custom-double-panels
					:panel-one-count="noDueDateHomeworks.length"
					:panel-two-count="
						withDueDateHomeworks.length + overdueHomeworks.length
					"
					:panel-one-title="$t('pages.homeworks.subtitleNoDue')"
					:panel-two-title="$t('pages.homeworks.subtitleWithDue')"
					:status="status"
					:is-empty="hasNoOpenHomeworks"
					:expanded-default="1"
				>
					<template v-slot:panelOne>
						<homeworks-list :homeworks="noDueDateHomeworks" type="student" />
					</template>
					<template v-slot:panelTwo>
						<homeworks-list
							:homeworks="withDueDateHomeworks"
							:title="$t('pages.homeworks.subtitleOpen')"
							type="student"
						/>
						<homeworks-list
							:homeworks="overdueHomeworks"
							:title="$t('pages.homeworks.student.subtitleOverDue')"
							type="student"
						/>
					</template>
				</v-custom-double-panels>
				<v-custom-empty-state
					v-if="hasNoOpenHomeworks"
					:image="emptyStateImage"
					:title="$t('pages.homeworks.student.open.emptyState.title')"
					:subtitle="$t('pages.homeworks.student.open.emptyState.subtitle')"
					class="mt-16"
				/>
			</v-tab-item>
			<v-tab-item>
				<v-custom-double-panels
					:panel-one-count="gradedHomeworks.length"
					:panel-two-count="submittedHomeworks.length"
					:panel-one-title="$t('pages.homeworks.subtitleGraded')"
					:panel-two-title="$t('pages.homeworks.subtitleNotGraded')"
					:status="status"
					:is-empty="hasNoCompletedHomeworks"
					:expanded-default="0"
				>
					<template v-slot:panelOne>
						<homeworks-list :homeworks="gradedHomeworks" type="student" />
					</template>
					<template v-slot:panelTwo>
						<homeworks-list :homeworks="submittedHomeworks" type="student" />
					</template>
				</v-custom-double-panels>
				<v-custom-empty-state
					v-if="hasNoCompletedHomeworks"
					:image="emptyStateImage"
					:title="$t('pages.homeworks.student.submitted.emptyState.title')"
					class="mt-16"
				/>
			</v-tab-item>
		</v-tabs-items>
	</section>
</template>

<script>
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import HomeworksList from "@components/organisms/HomeworksList";
import vCustomDoublePanels from "@components/molecules/vCustomDoublePanels";
import tasksEmptyState from "@assets/img/empty-state/Task_Empty_State.svg";
import { mapGetters } from "vuex";

export default {
	components: { HomeworksList, vCustomDoublePanels, vCustomEmptyState },
	props: {
		tab: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			emptyStateImage: tasksEmptyState,
		};
	},
	computed: {
		...mapGetters("homeworks", {
			status: "getStatus",
			openHomeworks: "getOpenHomeworksForStudent",
			completedHomeworks: "getCompletedHomeworksForStudent",
			hasNoHomeworks: "hasNoHomeworks",
			hasNoOpenHomeworks: "hasNoOpenHomeworks",
			hasNoCompletedHomeworks: "hasNoCompletedHomeworks",
		}),
		overdueHomeworks: function () {
			return this.openHomeworks.overdue;
		},
		noDueDateHomeworks: function () {
			return this.openHomeworks.noDueDate;
		},
		withDueDateHomeworks: function () {
			return this.openHomeworks.withDueDate;
		},
		submittedHomeworks: function () {
			return this.completedHomeworks.submitted;
		},
		gradedHomeworks: function () {
			return this.completedHomeworks.graded;
		},
	},
};
</script>
