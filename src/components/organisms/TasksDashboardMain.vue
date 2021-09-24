<template>
	<section>
		<div class="border-bottom">
			<v-container>
				<h1 class="h4">
					{{ $t("pages.tasks.title") }}
				</h1>
			</v-container>
			<div v-if="isStudent" class="pb-0 d-flex justify-center">
				<v-tabs v-model="tab" grow class="tabs-max-width">
					<v-tab>
						<v-icon class="tab-icon mr-3">$taskOpenFilled</v-icon>
						<span class="d-none d-sm-inline">{{
							$t("components.organisms.TasksDashboardMain.tab.open")
						}}</span>
					</v-tab>
					<v-tab>
						<v-icon class="tab-icon mr-3">$taskDoneFilled</v-icon>
						<span class="d-none d-sm-inline">{{
							$t("components.organisms.TasksDashboardMain.tab.completed")
						}}</span>
					</v-tab>
				</v-tabs>
			</div>
		</div>
		<v-container class="v-container mt-5 mb-14">
			<v-custom-autocomplete
				v-if="hasTasks"
				v-model="selectedCourses"
				:items="coursesWithTaskCount"
				:label="$t('pages.tasks.labels.filter')"
				:no-data-text="$t('pages.tasks.labels.noCoursesAvailable')"
				:disabled="isFilterDisabled"
				@selected-item="filterByCourse"
			/>
			<tasks-dashboard-student v-if="isStudent" :tab.sync="tab" />
			<tasks-dashboard-teacher v-else />
		</v-container>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
import vCustomAutocomplete from "@components/atoms/vCustomAutocomplete";
import TasksDashboardTeacher from "./TasksDashboardTeacher";
import TasksDashboardStudent from "./TasksDashboardStudent";

export default {
	components: {
		vCustomAutocomplete,
		TasksDashboardStudent,
		TasksDashboardTeacher,
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
			selectedCourses: [],
			tab: 0,
		};
	},
	computed: {
		...mapGetters("tasks", {
			status: "getStatus",
			tasks: "getTasks",
			hasNoTasks: "hasNoTasks",
			hasNoOpenTasks: "hasNoOpenTasks",
			hasNoCompletedTasks: "hasNoCompletedTasks",
			courses: "getCourses",
		}),
		isStudent: function () {
			return this.role === "student";
		},
		isFilterDisabled: function () {
			if (this.selectedCourses.length > 0) return false;

			if (this.tab === 0 && this.hasNoOpenTasks) {
				return true;
			} else if (this.tab === 1 && this.hasNoCompletedTasks) {
				return true;
			} else {
				return false;
			}
		},
		hasTasks: function () {
			return !this.hasNoTasks;
		},
		coursesWithTaskCount: function () {
			return this.courses.map((courseName) => ({
				value: courseName,
				text: `${courseName} (${
					this.tasks.filter((task) => {
						return task.courseName === courseName;
					}).length
				})`,
			}));
		},
	},
	mounted() {
		this.$store.dispatch("tasks/getAllTasks");
	},
	methods: {
		filterByCourse() {
			this.$store.commit("tasks/setFilter", this.selectedCourses);
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@variables";

.v-container {
	max-width: var(--size-content-width-max);
}

.tabs-max-width {
	max-width: 500px;
}

// even out border
.v-tabs {
	margin-bottom: -2px; // stylelint-disable sh-waqar/declaration-use-variable
	font-family: var(--heading-font-family);
}

.v-tab {
	font-size: var(--text-base-size);
	text-transform: none !important;
	border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}

.tab-icon {
	fill: currentColor;
}

::v-deep .v-slide-group__prev,
::v-deep .v-slide-group__next {
	display: none !important;
}

.border-bottom {
	border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}
</style>
