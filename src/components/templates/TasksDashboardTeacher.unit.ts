import TasksDashboardTeacher from "./TasksDashboardTeacher.vue";
import TasksList from "@/components/organisms/TasksList.vue";
import CopyModule, { CopyParamsTypeEnum } from "@/store/copy";
import FinishedTasksModule from "@/store/finished-tasks";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import ShareModule from "@/store/share";
import TasksModule from "@/store/tasks";
import { OpenTasksForTeacher } from "@/store/types/tasks";
import {
	COPY_MODULE_KEY,
	FINISHED_TASKS_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	SHARE_MODULE_KEY,
	TASKS_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import mocks from "@@/tests/test-utils/mockDataTasks";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { EmptyState } from "@ui-empty-state";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeAll } from "vitest";

const { overDueTasksTeacher, dueDateTasksTeacher, noDueDateTasksTeacher } = mocks;

const tabRoutes = ["current", "drafts", "finished"];

describe("@/components/templates/TasksDashboardTeacher", () => {
	let tasksModuleMock: TasksModule;
	let finishedTasksModuleMock: FinishedTasksModule;
	let copyModuleMock: CopyModule;
	let loadingStateModuleMock: LoadingStateModule;
	let notifierModuleMock: NotifierModule;
	let shareModuleMock: ShareModule;

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(TasksDashboardTeacher, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					tasksModule: tasksModuleMock,
					finishedTasksModule: finishedTasksModuleMock,
					loadingStateModule: loadingStateModuleMock,
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
					[TASKS_MODULE_KEY]: tasksModuleMock,
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
					[FINISHED_TASKS_MODULE_KEY]: finishedTasksModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
					[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
				},
			},
			...attrs,
		});

		return wrapper;
	};

	const tasksModuleGetters: Partial<TasksModule> = {
		getStatus: "completed",
		hasTasks: true,
		openTasksForTeacherIsEmpty: false,
		draftsForTeacherIsEmpty: true,
		getActiveTab: tabRoutes[0],
		getOpenTasksForTeacher: {
			overdue: overDueTasksTeacher,
			withDueDate: dueDateTasksTeacher,
			noDueDate: noDueDateTasksTeacher,
		} as unknown as OpenTasksForTeacher,
		getDraftTasksForTeacher: [],
	};

	beforeEach(() => {
		tasksModuleMock = createModuleMocks(TasksModule, tasksModuleGetters);
		finishedTasksModuleMock = createModuleMocks(FinishedTasksModule, {
			getTasks: [],
			tasksIsEmpty: true,
		});
		copyModuleMock = createModuleMocks(CopyModule);
		loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		notifierModuleMock = createModuleMocks(NotifierModule);
		shareModuleMock = createModuleMocks(ShareModule, {
			getIsShareModalOpen: false,
		});
	});

	it("should render tasks list component, with second panel expanded per default", () => {
		const wrapper = mountComponent({
			propsData: {
				tabRoutes,
			},
		});

		const expansionPanels = wrapper.findAll(".v-expansion-panel");

		expect(wrapper.findComponent(TasksList).exists()).toBe(true);
		expect(expansionPanels.length).toBeGreaterThan(0);
		expect(expansionPanels.at(0)?.classes()).not.toContain("v-expansion-panel--active");
		expect(expansionPanels.at(1)?.classes()).toContain("v-expansion-panel--active");
	});

	it("should render empty state", () => {
		tasksModuleMock = createModuleMocks(TasksModule, {
			...tasksModuleGetters,
			getActiveTab: tabRoutes[1],
			draftsForTeacherIsEmpty: true,
		});

		const wrapper = mountComponent({
			propsData: {
				tabRoutes,
			},
		});

		const emptyStateComponent = wrapper.findComponent(EmptyState);
		expect(emptyStateComponent.exists()).toBe(true);
	});

	it("should update store when tab changes", async () => {
		const wrapper = mountComponent({
			propsData: {
				tabRoutes,
			},
		});

		(wrapper.vm as unknown as typeof TasksDashboardTeacher).tab = tabRoutes[1];

		expect(tasksModuleMock.setActiveTab).toHaveBeenCalled();
	});

	it("should handle copy-task event", async () => {
		const wrapper = mountComponent({
			propsData: {
				tabRoutes,
			},
		});

		const oneTasksList = wrapper.findComponent(TasksList);
		const payload = {
			id: "123",
			courseId: "c789",
			type: CopyParamsTypeEnum.Task,
		};
		oneTasksList.vm.$emit("copy-task", payload);

		expect(copyModuleMock.copy).toHaveBeenCalledWith(payload);
	});

	describe("empty states", () => {
		const setup = (activeTab: "current" | "drafts" | "finished", openTasksForTeacherIsEmpty?: boolean) => {
			tasksModuleMock = createModuleMocks(TasksModule, {
				...tasksModuleGetters,
				getActiveTab: activeTab,
				openTasksForTeacherIsEmpty,
			});

			const wrapper = mountComponent({
				propsData: {
					tabRoutes,
				},
			});

			return wrapper;
		};

		it("should render empty state with correct title for current tab", () => {
			const wrapper = setup("current", true);

			const emptyStateComponent = wrapper.findComponent(EmptyState);
			expect(emptyStateComponent.props("title")).toBe("pages.tasks.teacher.open.emptyState.title");
		});

		it("should render empty state with correct title for drafts tab", () => {
			const wrapper = setup("drafts", true);

			const emptyStateComponent = wrapper.findComponent(EmptyState);
			expect(emptyStateComponent.props("title")).toBe("pages.tasks.teacher.drafts.emptyState.title");
		});

		it("should render empty state with correct title for finished tab", () => {
			const wrapper = setup("finished");

			const emptyStateComponent = wrapper.findComponent(EmptyState);
			expect(emptyStateComponent.props("title")).toBe("pages.tasks.finished.emptyState.title");
		});
	});
});
