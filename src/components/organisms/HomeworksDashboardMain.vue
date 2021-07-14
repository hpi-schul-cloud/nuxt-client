<template>
	<v-container class="v-container">
		<h1 v-if="status === 'pending'">
			<v-skeleton-loader type="text" :max-width="'30%'" />
		</h1>
		<template v-else>
			<h1 v-if="isListFilled" class="h4">
				{{ getTitle() }}
			</h1>
		</template>
		<section>
			<v-autocomplete
				v-if="isListFilled"
				v-model="selectedCourses"
				:items="availableCourses"
				small-chips
				deletable-chips
				:label="$t('pages.homeworks.labels.filter')"
				:no-data-text="$t('pages.homeworks.labels.noCoursesAvailable')"
				multiple
				clearable
				solo
				rounded
				:menu-props="{ closeOnContentClick: false }"
				@change="filterByCourse"
			/>
		</section>
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
			selectedCourses: [],
		};
	},
	computed: {
		...mapGetters("homeworks", {
			status: "getStatus",
			isListFilled: "isListFilled",
			isListEmpty: "isListEmpty",
			availableCourses: "getCourses",
		}),
	},
	mounted() {
		this.$store.dispatch("homeworks/getHomeworksDashboard");
	},
	methods: {
		isStudent: function () {
			return this.role === "student";
		},
		getTitle: function () {
			return this.role === "student"
				? this.$t("pages.homeworks.student.title")
				: this.$t("pages.homeworks.teacher.title");
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
		filterByCourse() {
			this.$store.commit("homeworks/setFilter", this.selectedCourses);
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@variables";

.v-container {
	max-width: var(--size-content-width-max);
}
</style>
