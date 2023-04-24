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
						<v-tab :href="tabThreeHeader.route">
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
				:empty-state="emptyState"
				:tab-routes="tabRoutes"
			/>
			<tasks-dashboard-teacher
				v-else
				:empty-state="emptyState"
				:tab-routes="tabRoutes"
			/>
		</div>
		<copy-result-modal
			v-if="isTeacher"
			:is-open="isCopyModalOpen"
			:copy-result-items="copyResultModalItems"
			:copy-result-root-item-type="copyResultRootItemType"
			@dialog-closed="onCopyResultModalClosed"
		></copy-result-modal>
	</default-wireframe>
</template>

<script>
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { authModule, envConfigModule } from "@/store";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import vCustomAutocomplete from "@/components/atoms/vCustomAutocomplete";
import vCustomSwitch from "@/components/atoms/vCustomSwitch";
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal";
import {
	mdiPlus,
	mdiFormatListChecks,
	mdiArchiveOutline,
	mdiCheckCircleOutline,
	mdiPlaylistEdit,
} from "@mdi/js";

import TasksDashboardStudent from "./TasksDashboardStudent";
import TasksDashboardTeacher from "./TasksDashboardTeacher";

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
		CopyResultModal,
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
			mdiPlus,
		};
	},
	inject: [
		"tasksModule",
		"copyModule",
		"finishedTasksModule",
		"loadingStateModule",
	],
	computed: {
		hasTasks() {
			return this.tasksModule.hasTasks;
		},
		openTasksForStudentIsEmpty() {
			return this.tasksModule.openTasksForStudentIsEmpty;
		},
		openTasksForTeacherIsEmpty() {
			return this.tasksModule.openTasksForTeacherIsEmpty;
		},
		completedTasksForStudentIsEmpty() {
			return this.tasksModule.completedTasksForStudentIsEmpty;
		},
		draftsForTeacherIsEmpty() {
			return this.tasksModule.draftsForTeacherIsEmpty;
		},
		tasksCountStudent() {
			return this.tasksModule.getTasksCountPerCourseStudent;
		},
		tasksCountTeacher() {
			return this.tasksModule.getTasksCountPerCourseForTeacher;
		},
		isSubstituteFilterEnabled() {
			return this.tasksModule.isSubstituteFilterEnabled;
		},
		courseFilters() {
			return this.tasksModule.getCourseFilters;
		},
		tab: {
			get() {
				return this.tasksModule.getActiveTab;
			},
			set(newTab) {
				this.setActiveTab(newTab);
			},
		},
		selectedCourseFilters() {
			return this.tasksModule.getSelectedCourseFilters;
		},
		finishedTasksIsInitialized() {
			return this.finishedTasksModule.getIsInitialized;
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
			return roleBasedRoutes[this.role];
		},
		tabOneHeader() {
			return {
				icon: mdiFormatListChecks,
				route: `#${this.tabRoutes[0]}`,
				title: this.isStudent
					? this.$t("components.organisms.TasksDashboardMain.tab.open")
					: this.$t("components.organisms.TasksDashboardMain.tab.current"),
			};
		},
		tabTwoHeader() {
			return {
				icon: this.isStudent ? mdiCheckCircleOutline : mdiPlaylistEdit,
				route: `#${this.tabRoutes[1]}`,
				title: this.isStudent
					? this.$t("components.organisms.TasksDashboardMain.tab.completed")
					: this.$t("components.organisms.TasksDashboardMain.tab.drafts"),
				dataTestId: this.isStudent ? "closedTasks" : "draftTasks",
			};
		},
		tabThreeHeader() {
			return {
				icon: mdiArchiveOutline,
				title: this.$t("components.organisms.TasksDashboardMain.tab.finished"),
				route: `#${this.tabRoutes[2]}`,
			};
		},
		fabItems() {
			const actions = [];
			if (
				!this.isStudent &&
				authModule.getUserPermissions.includes("HOMEWORK_CREATE".toLowerCase())
			) {
				actions.push({
					label: this.$t("pages.rooms.fab.add.task"),
					icon: mdiFormatListChecks,
					href: "/homework/new?returnUrl=tasks",
					ariaLabel: this.$t("pages.rooms.fab.add.task"),
					dataTestid: "fab_button_add_task",
				});
			}
			if (
				envConfigModule.getEnv.FEATURE_TASK_CARD_ENABLED &&
				authModule.getUserPermissions.includes("TASK_CARD_EDIT".toLowerCase())
			) {
				const action = {
					label: this.$t("pages.rooms.fab.add.betatask"),
					icon: mdiFormatListChecks,
					to: {
						name: "tasks-beta-task-new",
					},
					ariaLabel: this.$t("common.actions.create"),
					dataTestid: "fab_button_add_beta_task",
				};
				actions.push(action);
			}

			if (actions.length === 0) {
				return null;
			}
			if (actions.length === 1) {
				return {
					icon: mdiPlus,
					title: this.$t("common.actions.create"),
					href: "/homework/new?returnUrl=tasks",
					ariaLabel: this.$t("common.actions.create"),
					testId: "addTask",
				};
			}
			const items = {
				icon: mdiPlus,
				title: this.$t("common.actions.create"),
				ariaLabel: this.$t("common.actions.create"),
				testId: "add-content-button",
				actions: actions,
			};
			return items;
		},
		emptyState() {
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
				image: "tasks-empty-state",
				title,
				subtitle,
			};
		},
		copyResultModalItems() {
			return this.copyModule.getCopyResultFailedItems;
		},
		copyResultRootItemType() {
			return this.copyModule.getCopyResult?.type;
		},
		isCopyModalOpen() {
			return this.copyModule.getIsResultModalOpen;
		},
	},
	watch: {
		tab(tab, oldTab) {
			if (oldTab !== "") {
				this.$router.replace({ query: { ...this.$route.query, tab } });
			}
			if (tab === "finished") {
				this.finishedTasksModule.fetchFinishedTasks();
			}
		},
	},
	created() {
		this.initTabState();
	},
	methods: {
		setCourseFilters(courseNames) {
			this.tasksModule.setCourseFilters(courseNames);
		},
		setSubstituteFilter(enabled) {
			this.tasksModule.setSubstituteFilter(enabled);
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
		initTabState() {
			if (!this.tabRoutes.includes(this.$route.query.tab)) {
				this.setActiveTab(this.tabRoutes[0]);
				return;
			}

			this.setActiveTab(this.$route.query.tab);
		},
		setActiveTab(tab) {
			this.tasksModule.setActiveTab(tab);
		},
		onCopyResultModalClosed() {
			this.copyModule.reset();
		},
	},
};
</script>
<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";

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
