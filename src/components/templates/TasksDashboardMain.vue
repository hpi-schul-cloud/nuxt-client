<template>
	<DefaultWireframe
		:headline="$t('common.words.tasks')"
		max-width="short"
		:fab-items="fabItems"
	>
		<template #header>
			<h1>{{ $t("common.words.tasks") }}</h1>
			<div v-if="isTeacher">
				<v-switch
					v-if="showSubstituteFilter"
					v-model="isSubstituteFilterEnabled"
					:label="
						$t('components.organisms.TasksDashboardMain.filter.substitute')
					"
					:aria-label="
						$t('components.organisms.TasksDashboardMain.filter.substitute')
					"
					:true-icon="mdiCheck"
				/>
				<div v-else class="substitute-filter-placeholder" />
			</div>
			<div class="mx-n6 mx-md-0 pb-0 d-flex justify-center">
				<v-tabs v-model="tab" class="tabs-max-width" grow>
					<v-tab :value="tabRoutes[0]">
						<v-icon size="large" class="tab-icon mr-sm-3">
							{{ tabOneHeader.icon }}
						</v-icon>
						<span class="d-none d-sm-inline" data-testid="openTasks">
							{{ tabOneHeader.title }}
						</span>
					</v-tab>
					<v-tab :value="tabRoutes[1]">
						<v-icon size="large" class="tab-icon mr-sm-3">
							{{ tabTwoHeader.icon }}
						</v-icon>
						<span
							class="d-none d-sm-inline"
							:data-testid="tabTwoHeader.dataTestId"
						>
							{{ tabTwoHeader.title }}
						</span>
					</v-tab>
					<v-tab :value="tabRoutes[2]"
						><v-icon size="large" class="tab-icon mr-sm-3">
							{{ tabThreeHeader.icon }}
						</v-icon>
						<span class="d-none d-sm-inline" data-testid="finishedTasks">
							{{ tabThreeHeader.title }}
						</span>
					</v-tab>
				</v-tabs>
			</div>
		</template>
		<div class="content-max-width mx-auto mt-5 mb-14">
			<v-autocomplete
				v-if="showCourseFilter"
				v-model="selectedCourseFilters"
				closable-chips
				multiple
				clearable
				variant="solo"
				rounded
				chips
				data-testid="courseFilter"
				item-title="text"
				item-value="value"
				:menu-props="{ closeOnContentClick: false, zIndex: 30 }"
				:items="getSortedCoursesFilters"
				:label="$t('pages.tasks.labels.filter')"
				:aria-label="$t('pages.tasks.labels.filter')"
				:no-data-text="$t('pages.tasks.labels.noCoursesAvailable')"
				:disabled="isCourseFilterDisabled"
				class="mb-4"
			/>
			<div v-else class="course-filter-placeholder" />
			<tasks-dashboard-student v-if="isStudent" :tab-routes="tabRoutes" />
			<tasks-dashboard-teacher v-else :tab-routes="tabRoutes" />
		</div>
		<copy-result-modal
			v-if="isTeacher"
			:is-open="isCopyModalOpen"
			:copy-result-items="copyResultModalItems"
			:copy-result-root-item-type="copyResultRootItemType"
			@copy-dialog-closed="onCopyResultModalClosed"
		/>
	</DefaultWireframe>
</template>

<script>
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { authModule } from "@/store";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal";
import {
	mdiArchiveOutline,
	mdiCheck,
	mdiCheckCircleOutline,
	mdiFormatListChecks,
	mdiPlaylistEdit,
	mdiPlus,
} from "@icons/material";

import TasksDashboardStudent from "./TasksDashboardStudent";
import TasksDashboardTeacher from "./TasksDashboardTeacher";
import { COPY_MODULE_KEY } from "@/utils/inject";

const roleBasedRoutes = {
	[Roles.Teacher]: ["current", "drafts", "finished"],
	[Roles.Student]: ["open", "completed", "finished"],
};

export default {
	components: {
		DefaultWireframe,
		TasksDashboardStudent,
		TasksDashboardTeacher,
		CopyResultModal,
	},
	inject: {
		tasksModule: "tasksModule",
		copyModule: { from: COPY_MODULE_KEY },
		finishedTasksModule: "finishedTasksModule",
		loadingStateModule: "loadingStateModule",
	},
	props: {
		role: {
			type: String,
			required: true,
			validator: (val) => ["student", "teacher"].includes(val),
		},
	},
	data() {
		return { mdiPlus, mdiCheck };
	},
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
		isSubstituteFilterEnabled: {
			get() {
				return this.tasksModule.isSubstituteFilterEnabled;
			},
			set(enabled) {
				this.tasksModule.setSubstituteFilter(enabled);
			},
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
		selectedCourseFilters: {
			get() {
				return this.tasksModule.getSelectedCourseFilters;
			},
			set(courseNames) {
				this.tasksModule.setCourseFilters(courseNames);
			},
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
				route: `?tab=${this.tabRoutes[0]}`,
				title: this.isStudent
					? this.$t("components.organisms.TasksDashboardMain.tab.open")
					: this.$t("components.organisms.TasksDashboardMain.tab.current"),
			};
		},
		tabTwoHeader() {
			return {
				icon: this.isStudent ? mdiCheckCircleOutline : mdiPlaylistEdit,
				route: `?tab=${this.tabRoutes[1]}`,
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
				route: `?tab=${this.tabRoutes[2]}`,
			};
		},
		fabItems() {
			if (
				!this.isStudent &&
				authModule.getUserPermissions.includes("HOMEWORK_CREATE".toLowerCase())
			) {
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
				this.$router.push({ query: { ...this.$route.query, tab } });
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
@use "sass:map";
@use "@/styles/settings.scss" as *;

.substitute-filter-placeholder {
	min-height: 78px;
}

.content-max-width {
	max-width: var(--content-max-width);
}

@media #{map.get($display-breakpoints, 'md-and-up')} {
	.tabs-max-width {
		max-width: var(--content-max-width);
	}
}

// even out border
.v-tabs {
	margin-bottom: -2px;
}

// remove background color from expansion panel title
:deep(
	.v-expansion-panel-title[aria-haspopup="menu"][aria-expanded="true"]
		> .v-expansion-panel-title__overlay
) {
	opacity: 0;
}

:deep(.v-expansion-panel--disabled .v-expansion-panel-title) {
	.v-expansion-panel-title__overlay {
		opacity: 0;
	}
}

:deep(.v-expansion-panel::after) {
	border: none;
}

// don´t show breadcrumb placeholder for tasks
:deep(.breadcrumbs-placeholder) {
	height: 0;
}
</style>
