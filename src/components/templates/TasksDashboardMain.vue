<template>
	<default-wireframe :headline="$t('pages.tasks.title')" :full-width="false">
		<div slot="header">
			<div>
				<h1 class="text-h3">{{ $t("pages.tasks.title") }}</h1>
				<div class="pb-0 d-flex justify-center">
					<v-tabs v-model="tab" class="tabs-max-width" grow>
						<v-tab>
							<v-icon class="tab-icon mr-3">{{ tabOneHeader.icon }}</v-icon>
							<span class="d-none d-sm-inline">{{ tabOneHeader.title }}</span>
						</v-tab>
						<v-tab>
							<v-icon class="tab-icon mr-3">{{ tabTwoHeader.icon }}</v-icon>
							<span class="d-none d-sm-inline">{{ tabTwoHeader.title }}</span>
						</v-tab>
					</v-tabs>
				</div>
			</div>
		</div>
		<div class="content-max-width mx-auto mt-5 mb-14">
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
			<tasks-dashboard-teacher v-else :tab.sync="tab" />
		</div>
	</default-wireframe>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import vCustomAutocomplete from "@components/atoms/vCustomAutocomplete";
import TasksDashboardTeacher from "./TasksDashboardTeacher";
import TasksDashboardStudent from "./TasksDashboardStudent";

export default {
	components: {
		DefaultWireframe,
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
			hasNoOpenTasksStudent: "hasNoOpenTasksStudent",
			hasNoOpenTasksTeacher: "hasNoOpenTasksTeacher",
			hasNoCompletedTasks: "hasNoCompletedTasks",
			hasNoDrafts: "hasNoDrafts",
			courses: "getCourses",
		}),
		isStudent: function () {
			return this.role === "student";
		},
		isFilterDisabled: function () {
			if (this.selectedCourses.length > 0) return false;

			const tabOneIsEmpty =
				this.role === "student"
					? this.hasNoOpenTasksStudent
					: this.hasNoOpenTasksTeacher;
			const tabTwoIsEmpty =
				this.role === "student" ? this.hasNoCompletedTasks : this.hasNoDrafts;

			if (this.tab === 0 && tabOneIsEmpty) {
				return true;
			} else if (this.tab === 1 && tabTwoIsEmpty) {
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
				text: `${courseName} (${this.getTaskCount(courseName)})`,
			}));
		},
		tabOneHeader: function () {
			return {
				icon: "$taskOpenFilled",
				title: this.$t("components.organisms.TasksDashboardMain.tab.open"),
			};
		},
		tabTwoHeader: function () {
			const tabTwo = {};
			if (this.isStudent) {
				tabTwo.icon = "$taskDoneFilled";
				tabTwo.title = this.$t(
					"components.organisms.TasksDashboardMain.tab.completed"
				);
			} else {
				tabTwo.icon = "$taskDraft";
				tabTwo.title = this.$t(
					"components.organisms.TasksDashboardMain.tab.drafts"
				);
			}

			return tabTwo;
		},
	},
	mounted() {
		this.$store.dispatch("tasks/getAllTasks");
	},
	methods: {
		filterByCourse() {
			this.$store.commit("tasks/setFilter", this.selectedCourses);
		},
		getTaskCount(courseName) {
			let { tasks } = this;

			if (this.isStudent) {
				if (this.tab === 0) {
					tasks = tasks.filter(
						(task) => task.status.submitted === 0 && task.status.graded === 0
					);
				}
				if (this.tab === 1) {
					tasks = tasks.filter(
						(task) => task.status.submitted >= 1 || task.status.graded >= 1
					);
				}
			}

			return tasks.filter((task) => {
				return task.courseName === courseName;
			}).length;
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@variables";

.content-max-width {
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
	margin-right: calc(-1 * var(--space-lg));
	margin-left: calc(-1 * var(--space-lg));
	border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}
</style>
