import CopyModule, { CopyParamsTypeEnum } from "@/store/copy";
import FinishedTasksModule from "@/store/finished-tasks";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import TasksModule from "@/store/tasks";
import { OpenTasksForTeacher } from "@/store/types/tasks";
import { createModuleMocks } from "@/utils/mock-store-module";
import mocks from "@@/tests/test-utils/mockDataTasks";
import vCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import TasksList from "@/components/organisms/TasksList.vue";
import { mount } from "@vue/test-utils";
import TasksDashboardTeacher from "./TasksDashboardTeacher.vue";
import ShareModule from "@/store/share";
import {
	COPY_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	SHARE_MODULE_KEY,
} from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

const { overDueTasksTeacher, dueDateTasksTeacher, noDueDateTasksTeacher } =
	mocks;

const tabRoutes = ["current", "drafts", "finished"];

describe("@/components/templates/TasksDashboardTeacher", () => {
	let tasksModuleMock: TasksModule;
	let finishedTasksModuleMock: FinishedTasksModule;
	let copyModuleMock: CopyModule;
	let loadingStateModuleMock: LoadingStateModule;
	let notifierModuleMock: NotifierModule;
	let shareModuleMock: ShareModule;

	const mountComponent = (attrs = {}) => {
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getCtlToolsTabEnabled: false,
		});

		const wrapper = mount(TasksDashboardTeacher, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					tasksModule: tasksModuleMock,
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
					finishedTasksModule: finishedTasksModuleMock,
					loadingStateModule: loadingStateModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
					[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
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

	const emptyState = {
		title: "Lorem ipsum",
		image: "<svg></svg>",
		subtitle: undefined,
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

	it("Should render tasks list component, with second panel expanded per default", () => {
		const wrapper = mountComponent({
			propsData: {
				emptyState,
				tabRoutes,
			},
		});

		const expansionPanels = wrapper.findAll(".v-expansion-panel");

		expect(wrapper.findComponent(TasksList).exists()).toBe(true);
		expect(expansionPanels.length).toBeGreaterThan(0);
		expect(expansionPanels.at(0)?.classes()).not.toContain(
			"v-expansion-panel--active"
		);
		expect(expansionPanels.at(1)?.classes()).toContain(
			"v-expansion-panel--active"
		);
	});

	it("Should render empty state", () => {
		tasksModuleMock = createModuleMocks(TasksModule, {
			...tasksModuleGetters,
			getActiveTab: tabRoutes[1],
			draftsForTeacherIsEmpty: true,
		});

		const wrapper = mountComponent({
			propsData: {
				emptyState,
				tabRoutes,
			},
		});

		const emptyStateComponent = wrapper.findComponent(vCustomEmptyState);
		expect(emptyStateComponent.exists()).toBe(true);
	});

	it("Should update store when tab changes", async () => {
		const wrapper = mountComponent({
			propsData: {
				emptyState,
				tabRoutes,
			},
		});

		wrapper.vm.tab = tabRoutes[1];

		expect(tasksModuleMock.setActiveTab).toHaveBeenCalled();
	});

	it("Should handle copy-task event", async () => {
		const wrapper = mountComponent({
			propsData: {
				emptyState,
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
});
