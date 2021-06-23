<template>
	<v-container class="v-container">
		<h1 v-if="loading">
			<v-skeleton-loader :type="'text'" :max-width="'30%'" />
		</h1>
		<template v-else>
			<h1 v-if="isListFilled" class="h4">
				{{ $t("pages.homeworks.title") }}
			</h1>
		</template>
		<homeworks-dashboard-student v-if="isStudent()" />
		<homeworks-dashboard-teacher v-else />
		<v-custom-empty-state
			v-if="isListEmpty"
			:image="image"
			:title="getEmptyStateTitle()"
			:subtitle="getEmptyStateSubtitle()"
			class="mt-16"
		/>
	</v-container>
</template>

<script>
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import tasksEmptyState from "@assets/img/empty-state/Task_Empty_State.svg";
import HomeworksDashboardTeacher from "./HomeworksDashboardTeacher";
import HomeworksDashboardStudent from "./HomeworksDashboardStudent";
import { mapGetters } from "vuex";

export default {
	components: {
		HomeworksDashboardStudent,
		HomeworksDashboardTeacher,
		vCustomEmptyState,
	},
	props: {
		role: {
			type: String,
			required: true,
			validator: (val) => ["student", "teacher"].includes(val),
		},
	},
	data() {
		return {
			image: tasksEmptyState,
		};
	},
	computed: {
		...mapGetters("homeworks", {
			loading: "loading",
			isListFilled: "isListFilled",
			isListEmpty: "isListEmpty",
		}),
	},
	mounted() {
		this.$store.dispatch("homeworks/getHomeworksDashboard");
	},
	methods: {
		isStudent: function () {
			return this.role === "student";
		},
		getEmptyStateTitle: function () {
			return this.isStudent()
				? this.$t("pages.homeworks.student.emptyState.title")
				: this.$t("pages.homeworks.teacher.emptyState.title");
		},
		getEmptyStateSubtitle: function () {
			return this.isStudent()
				? this.$t("pages.homeworks.student.emptyState.subtitle")
				: this.$t("pages.homeworks.teacher.emptyState.subtitle");
		},
	},
};
</script>
