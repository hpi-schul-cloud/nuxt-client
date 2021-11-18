<template>
	<default-wireframe :headline="$t('pages.tasks.title')" :full-width="false">
		<div slot="header">
			<div>
				<h1 class="text-h3">{{ $t("pages.tasks.title") }}</h1>
				<div v-if="isTeacher">
					<v-custom-switch
						:value="isSubstituteFilterEnabled"
						:label="
							$t('components.organisms.TasksDashboardMain.filter.substitute')
						"
						@input-changed="setSubstituteFilter"
					></v-custom-switch>
				</div>
				<div class="pb-0 d-flex justify-center">
					<v-tabs v-model="tab" class="tabs-max-width">
						<v-tab>
							<v-icon class="tab-icon mr-3">{{ tabOneHeader.icon }}</v-icon>
							<span class="d-none d-sm-inline" data-testid="openTasks">{{
								tabOneHeader.title
							}}</span>
						</v-tab>
						<v-tab>
							<v-icon class="tab-icon mr-3">{{ tabTwoHeader.icon }}</v-icon>
							<span class="d-none d-sm-inline" data-testid="closedTasks">{{
								tabTwoHeader.title
							}}</span>
						</v-tab>
						<v-tab>
							<v-icon class="tab-icon mr-3">{{ tabThreeHeader.icon }}</v-icon>
							<span class="d-none d-sm-inline" data-testid="finishedTasks">{{
								tabThreeHeader.title
							}}</span>
						</v-tab>
					</v-tabs>
				</div>
			</div>
		</div>
		<div class="content-max-width mx-auto mt-5 mb-14">
			<v-custom-autocomplete
				v-if="showFilter"
				:value="getSelectedCourseFilters"
				:items="getSortedCoursesFilters"
				:label="$t('pages.tasks.labels.filter')"
				:no-data-text="$t('pages.tasks.labels.noCoursesAvailable')"
				:disabled="isFilterDisabled"
				@selected-item="setCourseFilters"
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
import vCustomSwitch from "@components/atoms/vCustomSwitch";
import TasksDashboardTeacher from "./TasksDashboardTeacher";
import TasksDashboardStudent from "./TasksDashboardStudent";

export default {
	components: {
		DefaultWireframe,
		vCustomAutocomplete,
		TasksDashboardStudent,
		TasksDashboardTeacher,
		vCustomSwitch,
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
			tab: 0, // should we save this in store?
		};
	},
	computed: {
		...mapGetters("tasks", {
			status: "getStatus",
			hasTasks: "hasTasks",
			hasOpenTasksStudent: "hasOpenTasksStudent",
			hasOpenTasksTeacher: "hasOpenTasksTeacher",
			hasCompletedTasks: "hasCompletedTasks",
			hasDrafts: "hasDrafts",
			tasksCountStudent: "getTasksCountPerCourseStudent",
			tasksCountTeacher: "getTasksCountPerCourseTeacher",
			isSubstituteFilterEnabled: "isSubstituteFilterEnabled",
			courseFilters: "getCourseFilters",
			getSelectedCourseFilters: "getSelectedCourseFilters",
		}),
		// TODO: split teacher and student sides
		isStudent: function () {
			return this.role === "student";
		},
		isTeacher: function () {
			return this.role === "teacher";
		},
		showFilter: function () {
			if (this.tab === 2) return false;

			return this.hasTasks;
		},
		tabOneIsEmpty: function () {
			return this.isStudent
				? !this.hasOpenTasksStudent
				: !this.hasOpenTasksTeacher;
		},
		tabTwoIsEmpty: function () {
			return this.isStudent
				? !this.hasCompletedTasks
				: !this.hasDrafts;
		},
		isFilterDisabled: function () {
			if (this.getSelectedCourseFilters.length > 0) return false;

			if (this.tab === 0) {
				return this.tabOneIsEmpty;
			} 
			if (this.tab === 1) {
				return this.tabTwoIsEmpty;
			}

			return false;
		},
		getSortedCoursesFilters: function () {
			const filters = this.courseFilters.map((filter) => {
				const count = this.getTaskCount(filter.value);
				const name = filter.value || this.$t("pages.tasks.labels.noCourse");
				const substitution = filter.isSubstitution
					? `${this.$t("common.words.substitute")} `
					: "";
				filter.text = `${substitution}${name} (${count})`;

				return filter;
			});

			return filters.sort((a, b) => (a.text < b.text ? -1 : 1));
		},
		tabOneHeader: function () {
			const tabOne = { icon: "$taskOpenFilled" };

			tabOne.title = this.isStudent
				? this.$t("components.organisms.TasksDashboardMain.tab.open")
				: this.$t("components.organisms.TasksDashboardMain.tab.current");

			return tabOne;
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
		tabThreeHeader: function () {
			const tabThree = {
				icon: "$taskFinished",
				title: this.$t("components.organisms.TasksDashboardMain.tab.finished"),
			};

			return tabThree;
		},
	},
	mounted() {
		this.$store.dispatch("tasks/getAllTasks");
	},
	methods: {
		setCourseFilters(courseNames) {
			this.$store.commit("tasks/setCourseFilters", courseNames);
		},
		setSubstituteFilter(enabled) {
			this.$store.commit("tasks/setSubstituteFilter", enabled);
		},
		getTaskCount(courseName) {
			if (this.isStudent) {
				if (this.tab === 0) {
					return this.tasksCountStudent.open[courseName];
				}
				if (this.tab === 1) {
					return this.tasksCountStudent.completed[courseName];
				}
			}

			if (this.isTeacher) {
				if (this.tab === 0) {
					return this.tasksCountTeacher.open[courseName];
				}
				if (this.tab === 1) {
					return this.tasksCountTeacher.drafts[courseName];
				}
			}
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
	flex-basis: 50%;
	flex-grow: 1;
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
