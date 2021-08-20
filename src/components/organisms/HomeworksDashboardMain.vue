<template>
	<section>
		<section>
			<v-container v-if="status === 'pending'">
				<h1>
					<v-skeleton-loader type="text" :max-width="'30%'" />
				</h1>
			</v-container>
			<template v-else>
				<h1 v-if="isListFilled" class="h4 ml-5">
					{{ $t("pages.homeworks.teacher.title") }}
				</h1>

				<v-container v-if="isStudent()" class="v-container">
					<v-tabs v-model="tab" grow>
						<v-tab>Offene Aufgaben</v-tab>
						<v-tab>Erledigte Aufgaben</v-tab>
					</v-tabs>
				</v-container>
			</template>
		</section>

		<v-container class="v-container" mt-2>
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
			<homeworks-dashboard-student v-if="isStudent()" :tab="tab" />
			<homeworks-dashboard-teacher v-else />
			<v-custom-empty-state
				v-if="isListEmpty"
				:image="image"
				:title="getEmptyStateTitle()"
				:subtitle="getEmptyStateSubtitle()"
				class="mt-16"
			/>
		</v-container>
	</section>
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
			tab: 0,
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

.v-tab {
	font-size: var(--text-base-size);
	text-transform: none !important;
}
</style>
