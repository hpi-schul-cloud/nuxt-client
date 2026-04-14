<template>
	<DefaultWireframe :headline="$t('common.words.tasks')" max-width="short" :fab-items="fabItems">
		<template #header>
			<h1>{{ $t("common.words.tasks") }}</h1>
			<div v-if="isTeacher">
				<VSwitch
					v-if="showSubstituteFilter"
					v-model="includeSubstitute"
					:label="$t('components.organisms.TasksDashboardMain.filter.substitute')"
					:true-icon="mdiCheck"
				/>
				<div v-else class="substitute-filter-placeholder" />
			</div>
			<div class="mx-n6 mx-md-0 pb-0 d-flex justify-center">
				<VTabs v-model="params.tab" class="tabs-max-width" grow>
					<VTab :value="tabRoutes[0]">
						<VIcon size="large" class="tab-icon mr-sm-3">
							{{ tabOneHeader.icon }}
						</VIcon>
						<span class="d-none d-sm-inline" data-testid="openTasks">
							{{ tabOneHeader.title }}
						</span>
					</VTab>
					<VTab :value="tabRoutes[1]">
						<VIcon size="large" class="tab-icon mr-sm-3">
							{{ tabTwoHeader.icon }}
						</VIcon>
						<span class="d-none d-sm-inline" :data-testid="tabTwoHeader.dataTestId">
							{{ tabTwoHeader.title }}
						</span>
					</VTab>
					<VTab :value="tabRoutes[2]">
						<VIcon size="large" class="tab-icon mr-sm-3"> {{ tabThreeHeader.icon }} </VIcon>
						<span class="d-none d-sm-inline" data-testid="finishedTasks">
							{{ tabThreeHeader.title }}
						</span>
					</VTab>
				</VTabs>
			</div>
		</template>
		<div class="content-max-width mx-auto mt-5 mb-14">
			<VAutocomplete
				v-model="selectedCourseFilters"
				closable-chips
				multiple
				clearable
				variant="solo-filled"
				flat
				chips
				data-testid="courseFilter"
				item-title="text"
				item-value="value"
				:prepend-inner-icon="mdiMagnify"
				:menu-props="{ closeOnContentClick: false, zIndex: 30 }"
				:items="getSortedCoursesFilters"
				:label="t('pages.tasks.labels.filter')"
				:aria-label="t('pages.tasks.labels.filter')"
				:no-data-text="t('pages.tasks.labels.noCoursesAvailable')"
				class="mb-4"
			/>
			<TasksDashboardStudent v-if="isStudent" :tab-routes="tabRoutes" />
			<TasksDashboardTeacher v-else :tab="activeTab" :tab-routes />
		</div>
		<CopyResultModal
			v-if="isTeacher"
			:is-open="isCopyModalOpen"
			:copy-result-items="copyResultModalItems"
			:copy-result-root-item-type="copyResultRootItemType"
			@copy-dialog-closed="onCopyResultModalClosed"
		/>
	</DefaultWireframe>
</template>

<script setup>
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal.vue";
import TasksDashboardStudent from "@/components/tasks/TasksDashboardStudent.vue";
import TasksDashboardTeacher from "@/components/tasks/TasksDashboardTeacher.vue";
import { COPY_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle.ts";
import { Permission } from "@api-server";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { useTasks } from "@data-tasks";
import {
	mdiArchiveOutline,
	mdiCheck,
	mdiCheckCircleOutline,
	mdiFormatListChecks,
	mdiMagnify,
	mdiPlaylistEdit,
	mdiPlus,
} from "@icons/material";
import { DefaultWireframe } from "@ui-layout";
import { useTitle, useUrlSearchParams } from "@vueuse/core";
import { computed, inject, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { isTeacher, isStudent } = useAppStoreRefs();
const params = useUrlSearchParams("history");
const activeTab = computed(() => params.tab);
const { t } = useI18n();

const tasksModule = inject("tasksModule");
const copyModule = inject(COPY_MODULE_KEY);

if (!tasksModule) throw new Error("TasksDashboardMain: missing injection 'tasksModule'");
if (!copyModule) throw new Error("TasksDashboardMain: missing injection copyModule (COPY_MODULE_KEY)");

useTitle(buildPageTitle(t("common.words.tasks")));

const appStore = useAppStore();

const { allTasks, includeSubstitute } = useTasks({ includeSubstitute: false });

onMounted(() => tasksModule.fetchAllTasks());

const tasksCountStudent = computed(() => tasksModule.getTasksCountPerCourseStudent);
const tasksCountTeacher = computed(() => tasksModule.getTasksCountPerCourseForTeacher);

const courseFilters = computed(() => tasksModule.getCourseFilters);

const tabRoutes = computed(() => {
	if (isTeacher.value) {
		return ["current", "drafts", "finished"];
	} else if (isStudent.value) {
		return ["open", "completed", "finished"];
	}
	return [];
});

const selectedCourseFilters = computed({
	get: () => tasksModule.getSelectedCourseFilters,
	set: (courseNames) => tasksModule.setCourseFilters(courseNames),
});

const showSubstituteFilter = computed(() => isTeacher.value && activeTab.value !== tabRoutes.value[2]);

const getTaskCount = (courseName) => {
	if (activeTab.value === tabRoutes.value[0]) {
		return isStudent.value ? tasksCountStudent.value.open[courseName] : tasksCountTeacher.value.open[courseName];
	}
	if (activeTab.value === tabRoutes.value[1]) {
		return isStudent.value ? tasksCountStudent.value.completed[courseName] : tasksCountTeacher.value.drafts[courseName];
	}
};

const getSortedCoursesFilters = computed(() => {
	const filters = courseFilters.value.map((filter) => {
		const count = getTaskCount(filter.value);
		const name = filter.value || t("pages.tasks.labels.noCourse");
		const substitution = filter.isSubstitution ? `${t("common.words.substitute")} ` : "";
		filter.text = `${substitution}${name} (${count})`;
		return filter;
	});

	return filters.sort((a, b) => (a.text < b.text ? -1 : 1));
});

const tabOneHeader = computed(() => ({
	icon: mdiFormatListChecks,
	title: isStudent.value
		? t("components.organisms.TasksDashboardMain.tab.open")
		: t("components.organisms.TasksDashboardMain.tab.current"),
}));

const tabTwoHeader = computed(() => ({
	icon: isStudent.value ? mdiCheckCircleOutline : mdiPlaylistEdit,
	title: isStudent.value
		? t("components.organisms.TasksDashboardMain.tab.completed")
		: t("components.organisms.TasksDashboardMain.tab.drafts"),
	dataTestId: isStudent.value ? "closedTasks" : "draftTasks",
}));

const tabThreeHeader = computed(() => ({
	icon: mdiArchiveOutline,
	title: t("components.organisms.TasksDashboardMain.tab.finished"),
}));

const fabItems = computed(() => {
	if (!isStudent.value && appStore.userPermissions.includes(Permission.HOMEWORK_CREATE)) {
		return [
			{
				icon: mdiPlus,
				label: t("components.organisms.TasksDashboardMain.fab.createTask"),
				href: "/homework/new?returnUrl=tasks",
				dataTestId: "add-task",
			},
		];
	}

	return undefined;
});

const copyResultModalItems = computed(() => copyModule.getCopyResultFailedItems);
const copyResultRootItemType = computed(() => copyModule.getCopyResult?.type);
const isCopyModalOpen = computed(() => copyModule.getIsResultModalOpen);

const onCopyResultModalClosed = () => {
	copyModule.reset();
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings" as *;

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
:deep(.v-expansion-panel-title[aria-haspopup="menu"][aria-expanded="true"] > .v-expansion-panel-title__overlay) {
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
