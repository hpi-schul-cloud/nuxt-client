<template>
	<v-container class="homework-dashboard-teacher">
		<v-autocomplete
			v-if="isListFilled"
			v-model="selectedCourses"
			:items="availableCourses"
			small-chips
			deletable-chips
			:label="$t('pages.homeworks.labels.filter')"
			multiple
			clearable
			:menu-props="{ closeOnContentClick: true }"
			@change="filterByCourse"
		>
		</v-autocomplete>
		<homeworks-list
			:homeworks="overDueHomeworks"
			:title="$t('pages.homeworks.teacher.subtitleOverDue')"
			type="teacher"
		/>
		<homeworks-list
			:homeworks="dueDateHomeworks"
			:title="$t('pages.homeworks.subtitleAssigned')"
			type="teacher"
		/>
		<homeworks-list
			:homeworks="noDueDateHomeworks"
			:title="$t('pages.homeworks.teacher.subtitleNoDue')"
			type="teacher"
		/>
	</v-container>
</template>

<script>
import HomeworksList from "@components/organisms/HomeworksList";
import { mapGetters } from "vuex";

export default {
	components: { HomeworksList },
	data() {
		return {
			selectedCourses: [],
		};
	},
	computed: {
		...mapGetters("homeworks", {
			dueDateHomeworks: "getOpenHomeworksWithDueDate",
			overDueHomeworks: "getOverDueHomeworks",
			noDueDateHomeworks: "getOpenHomeworksWithoutDueDate",
			availableCourses: "getCourses",
			isListFilled: "isListFilled",
		}),
	},
	methods: {
		filterByCourse() {
			this.$store.dispatch("homeworks/updateFilter", this.selectedCourses);
		},
	},
};
</script>
