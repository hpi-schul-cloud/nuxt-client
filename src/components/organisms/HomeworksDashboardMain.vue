<template>
	<section>
		<section>
			<template v-if="status === 'pending'">
				<h1 class="h4 ml-10 pb-15">
					<v-skeleton-loader type="heading" max-width="40%" class="pb-15" />
				</h1>
				<v-container class="v-container">
					<v-skeleton-loader type="text" />
				</v-container>
			</template>

			<template v-else>
				<v-banner>
					<h1 v-if="isListFilled" class="h4 ml-10 pb-15">
						{{ $t("pages.homeworks.title") }}
					</h1>

					<v-container v-if="showTabs" class="v-container">
						<v-tabs v-model="tab" grow>
							<v-tab>{{
								$t("components.organisms.HomeworksDashboardMain.tab.open")
							}}</v-tab>
							<v-tab>{{
								$t("components.organisms.HomeworksDashboardMain.tab.completed")
							}}</v-tab>
						</v-tabs>
					</v-container>
				</v-banner>
			</template>
		</section>

		<v-container class="v-container mt-5">
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
			<homeworks-dashboard-student v-if="isStudent" :tab="tab" />
			<homeworks-dashboard-teacher v-else />
			<v-custom-empty-state
				v-if="isListEmpty"
				:image="image"
				:title="emptyStateTitle"
				:subtitle="emptyStateSubtitle"
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
		isStudent: function () {
			return this.role === "student";
		},
		emptyStateTitle: function () {
			return this.isStudent
				? this.$t("pages.homeworks.student.emptyState.title")
				: this.$t("pages.homeworks.teacher.emptyState.title");
		},
		emptyStateSubtitle: function () {
			return this.isStudent
				? this.$t("pages.homeworks.student.emptyState.subtitle")
				: this.$t("pages.homeworks.teacher.emptyState.subtitle");
		},
		showTabs: function () {
			return this.isStudent && this.isListFilled;
		},
	},
	mounted() {
		this.$store.dispatch("homeworks/getHomeworksDashboard");
	},
	methods: {
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
