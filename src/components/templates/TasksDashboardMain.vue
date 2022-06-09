<template>
	<default-wireframe
		:headline="$t('common.words.tasks')"
		:full-width="false"
		:fab-items="fabItems"
	>
		<div slot="header">
			<div>
				<h1 class="text-h3">{{ $t("common.words.tasks") }}</h1>
				<div v-if="showSubstituteFilter">
					<v-custom-switch
						:value="isSubstituteFilterEnabled"
						:label="
							$t('components.organisms.TasksDashboardMain.filter.substitute')
						"
						@input-changed="setSubstituteFilter"
					></v-custom-switch>
				</div>
				<div v-else class="substitute-filter-placeholder"></div>
				<div class="mx-n6 mx-md-0 pb-0 d-flex justify-center">
					<v-tabs v-model="tab" class="tabs-max-width" grow>
						<v-tab :href="tabOneHeader.route">
							<v-icon class="tab-icon mr-sm-3">{{ tabOneHeader.icon }}</v-icon>
							<span class="d-none d-sm-inline" data-testid="openTasks">{{
								tabOneHeader.title
							}}</span>
						</v-tab>
						<v-tab :href="tabTwoHeader.route">
							<v-icon class="tab-icon mr-sm-3">{{ tabTwoHeader.icon }}</v-icon>
							<span
								class="d-none d-sm-inline"
								:data-testid="tabTwoHeader.dataTestId"
								>{{ tabTwoHeader.title }}</span
							>
						</v-tab>
						<v-tab
							:href="tabThreeHeader.route"
							@change="onOpenFinishedTasksTab"
						>
							<v-icon class="tab-icon mr-sm-3">{{
								tabThreeHeader.icon
							}}</v-icon>
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
				v-if="showCourseFilter"
				:value="selectedCourseFilters"
				:items="getSortedCoursesFilters"
				:label="$t('pages.tasks.labels.filter')"
				:no-data-text="$t('pages.tasks.labels.noCoursesAvailable')"
				:disabled="isCourseFilterDisabled"
				@selected-item="setCourseFilters"
			/>
			<div v-else class="course-filter-placeholder"></div>
			<tasks-dashboard-student
				v-if="isStudent"
				:tab.sync="tab"
				:empty-state="emptyState"
				:tab-routes="tabRoutes"
			/>
			<tasks-dashboard-teacher
				v-else
				:tab.sync="tab"
				:empty-state="emptyState"
				:tab-routes="tabRoutes"
			/>
		</div>
	</default-wireframe>
</template>

<script>
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import vCustomAutocomplete from "@components/atoms/vCustomAutocomplete";
import vCustomSwitch from "@components/atoms/vCustomSwitch";
import TasksDashboardTeacher from "./TasksDashboardTeacher";
import TasksDashboardStudent from "./TasksDashboardStudent";
import { mdiPlus } from "@mdi/js";
import tasksEmptyStateImage from "@assets/img/empty-state/tasks-empty-state.svg";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";

const roleBasedRoutes = {
	[Roles.Teacher]: ["current", "drafts", "finished"],
	[Roles.Student]: ["open", "completed", "finished"],
};

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
			tab: "", // should we save this in store?
			mdiPlus,
			tasksEmptyStateImage,
		};
	},
	inject: ["taskModule", "finishedTaskModule"],
	computed: {
		hasTasks() {
			return this.taskModule.hasTasks;
		},
		openTasksForStudentIsEmpty() {
			return this.taskModule.openTasksForStudentIsEmpty;
		},
		openTasksForTeacherIsEmpty() {
			return this.taskModule.openTasksForTeacherIsEmpty;
		},
		completedTasksForStudentIsEmpty() {
			return this.taskModule.completedTasksForStudentIsEmpty;
		},
		draftsForTeacherIsEmpty() {
			return this.taskModule.draftsForTeacherIsEmpty;
		},
		tasksCountStudent() {
			return this.taskModule.getTasksCountPerCourseStudent;
		},
		tasksCountTeacher() {
			return this.taskModule.getTasksCountPerCourseForTeacher;
		},
		isSubstituteFilterEnabled() {
			return this.taskModule.isSubstituteFilterEnabled;
		},
		courseFilters() {
			return this.taskModule.getCourseFilters;
		},
		selectedCourseFilters() {
			return this.taskModule.getSelectedCourseFilters;
		},
		finishedTasksIsInitialized() {
			return this.finishedTaskModule.getIsInitialized;
		},
		// TODO: split teacher and student sides
		isStudent() {
			return this.role === Roles.Student;
		},
		isTeacher() {
			return this.role === Roles.Teacher;
		},
		showCourseFilter() {
			if (this.tab === this.tabRoutes[2]) return false;

			return this.hasTasks;
		},
		showSubstituteFilter() {
			return this.isTeacher && this.tab !== this.tabRoutes[2];
		},
		tabOneIsEmpty() {
			return this.isStudent
				? this.openTasksForStudentIsEmpty
				: this.openTasksForTeacherIsEmpty;
		},
		tabTwoIsEmpty() {
			return this.isStudent
				? this.completedTasksForStudentIsEmpty
				: this.draftsForTeacherIsEmpty;
		},
		isCourseFilterDisabled() {
			if (this.selectedCourseFilters.length > 0) return false;

			if (this.tab === this.tabRoutes[0]) {
				return this.tabOneIsEmpty;
			}
			if (this.tab === this.tabRoutes[1]) {
				return this.tabTwoIsEmpty;
			}

			return false;
		},
		getSortedCoursesFilters() {
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
		tabRoutes() {
			if (this.isTeacher) {
				return roleBasedRoutes[Roles.Teacher];
			}
			if (this.isStudent) {
				return roleBasedRoutes[Roles.Student];
			}

			return null;
		},
		tabOneHeader() {
			const tabOne = { icon: "$taskOpenFilled" };

			if (this.isStudent) {
				tabOne.title = this.$t(
					"components.organisms.TasksDashboardMain.tab.open"
				);
				tabOne.route = `#${this.tabRoutes[0]}`;
			} else {
				tabOne.title = this.$t(
					"components.organisms.TasksDashboardMain.tab.current"
				);
				tabOne.route = `#${this.tabRoutes[0]}`;
			}

			return tabOne;
		},
		tabTwoHeader() {
			const tabTwo = {};
			if (this.isStudent) {
				tabTwo.icon = "$taskDoneFilled";
				tabTwo.title = this.$t(
					"components.organisms.TasksDashboardMain.tab.completed"
				);
				tabTwo.dataTestId = "closedTasks";
				tabTwo.route = `#${this.tabRoutes[1]}`;
			} else {
				tabTwo.icon = "$taskDraft";
				tabTwo.title = this.$t("common.words.drafts");
				tabTwo.dataTestId = "draftTasks";
				tabTwo.route = `#${this.tabRoutes[1]}`;
			}

			return tabTwo;
		},
		tabThreeHeader() {
			const tabThree = {
				icon: "$taskFinished",
				title: this.$t("components.organisms.TasksDashboardMain.tab.finished"),
				route: `#${this.tabRoutes[2]}`,
			};

			return tabThree;
		},
		fabItems() {
			if (!this.isStudent) {
				return {
					icon: mdiPlus,
					title: this.$t("common.actions.create"),
					href: "/homework/new?returnUrl=tasks",
					ariaLabel: this.$t("common.actions.create"),
					testId: "addTask",
				};
			}
			return null;
		},
		emptyState() {
			const image = tasksEmptyStateImage;
			let title = "";
			let subtitle = undefined;

			if (this.hasFilterSelected) {
				title = this.$t("pages.tasks.emptyStateOnFilter.title");
			} else {
				if (this.tab === this.tabRoutes[0]) {
					title = this.$t(`pages.tasks.${this.role}.open.emptyState.title`);
					subtitle = this.$t(
						`pages.tasks.${this.role}.open.emptyState.subtitle`
					);
				}
				if (this.tab === this.tabRoutes[1]) {
					title = this.isStudent
						? this.$t("pages.tasks.student.completed.emptyState.title")
						: this.$t("pages.tasks.teacher.drafts.emptyState.title");
				}
				if (this.tab === this.tabRoutes[2]) {
					title = this.$t("pages.tasks.finished.emptyState.title");
				}
			}

			return {
				image,
				title,
				subtitle,
			};
		},
	},
	watch: {
		tab(tab, oldTab) {
			if (oldTab !== "") {
				this.$router.replace({ query: { ...this.$route.query, tab } });
			}
		},
	},
	created() {
		this.initTabState();
	},
	methods: {
		setCourseFilters(courseNames) {
			this.taskModule.setCourseFilters(courseNames);
		},
		setSubstituteFilter(enabled) {
			this.taskModule.setSubstituteFilter(enabled);
		},
		getTaskCount(courseName) {
			if (this.tab === this.tabRoutes[0]) {
				return this.isStudent
					? this.tasksCountStudent.open[courseName]
					: this.tasksCountTeacher.open[courseName];
			}
			if (this.tab === this.tabRoutes[1]) {
				return this.isStudent
					? this.tasksCountStudent.completed[courseName]
					: this.tasksCountTeacher.drafts[courseName];
			}
		},
		onOpenFinishedTasksTab() {
			// TODO - this only properly works, because we switch between clients when archiving a task and therefor trigger a full reload
			// we should probably find a better solution :D
			if (!this.finishedTasksIsInitialized) {
				this.finishedTaskModule.fetchFinishedTasks();
			}
		},
		initTabState() {
			if (this.tabRoutes.includes(this.$route.query.tab)) {
				if (this.$route.query.tab == this.tabRoutes[2]) {
					this.onOpenFinishedTasksTab();
				}
				this.tab = this.$route.query.tab;
			} else {
				this.tab = this.tabRoutes[0];
			}
		},
	},
};
</script>
<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@variables";

.substitute-filter-placeholder {
	min-height: 46px;
}
.content-max-width {
	max-width: var(--size-content-width-max);
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
	.tabs-max-width {
		max-width: var(--size-content-width-max);
	}
}

.tab-icon {
	fill: currentColor;
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
