import CopyModule from "@/store/copy";
import FinishedTaskModule from "@/store/finished-tasks";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import TaskModule from "@/store/tasks";
import { OpenTasksForTeacher } from "@/store/types/tasks";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import mocks from "@@/tests/test-utils/mockDataTasks";
import vCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import TasksList from "@/components/organisms/TasksList.vue";
import { provide } from "vue";
import { mount, Wrapper } from "@vue/test-utils";
import TasksDashboardTeacher from "./TasksDashboardTeacher.vue";

const { overDueTasksTeacher, dueDateTasksTeacher, noDueDateTasksTeacher } =
	mocks;

const tabRoutes = ["current", "drafts", "finished"];

describe("@/components/templates/TasksDashboardTeacher", () => {
	let taskModuleMock: TaskModule;
	let finishedTaskModuleMock: FinishedTaskModule;
	let copyModuleMock: CopyModule;
	let loadingStateModuleMock: LoadingStateModule;
	let notifierModuleMock: NotifierModule;

	let wrapper: Wrapper<Vue>;

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(TasksDashboardTeacher, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("taskModule", taskModuleMock);
				provide("finishedTaskModule", finishedTaskModuleMock);
				provide("copyModule", copyModuleMock);
				provide("loadingStateModule", loadingStateModuleMock);
				provide("notifierModule", notifierModuleMock);
				provide("i18n", { t: (key: string) => key });
			},
			...attrs,
		});

		return wrapper;
	};

	const taskModuleGetters: Partial<TaskModule> = {
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
		taskModuleMock = createModuleMocks(TaskModule, taskModuleGetters);
		finishedTaskModuleMock = createModuleMocks(FinishedTaskModule, {
			getTasks: [],
			tasksIsEmpty: true,
		});
		copyModuleMock = createModuleMocks(CopyModule);
		loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		notifierModuleMock = createModuleMocks(NotifierModule);
	});

	it("Should render tasks list component, with second panel expanded per default", () => {
		wrapper = mountComponent({
			propsData: {
				emptyState,
				tabRoutes,
			},
		});

		const expansionPanels = wrapper.findAll(".v-expansion-panel");

		expect(wrapper.findComponent(TasksList).exists()).toBe(true);
		expect(expansionPanels.exists()).toBe(true);
		expect(expansionPanels.at(0).classes()).not.toContain(
			"v-expansion-panel--active"
		);
		expect(expansionPanels.at(1).classes()).toContain(
			"v-expansion-panel--active"
		);
	});

	it("Should render empty state", () => {
		taskModuleMock = createModuleMocks(TaskModule, {
			...taskModuleGetters,
			getActiveTab: tabRoutes[1],
			draftsForTeacherIsEmpty: true,
		});

		wrapper = mountComponent({
			propsData: {
				emptyState,
				tabRoutes,
			},
		});

		const emptyStateComponent = wrapper.findComponent(vCustomEmptyState);
		expect(emptyStateComponent.exists()).toBe(true);
	});

	it("Should update store when tab changes", async () => {
		wrapper = mountComponent({
			propsData: {
				emptyState,
				tabRoutes,
			},
		});

		await wrapper.setData({ tab: tabRoutes[1] });

		expect(taskModuleMock.setActiveTab).toHaveBeenCalled();
	});

	it("Should handle copy-task event", async () => {
		wrapper = mountComponent({
			propsData: {
				emptyState,
				tabRoutes,
			},
		});

		const oneTasksList = wrapper.findComponent(TasksList);
		const payload = {
			id: "123",
			courseId: "c789",
			type: "task",
		};
		oneTasksList.vm.$emit("copy-task", payload);

		expect(copyModuleMock.copy).toHaveBeenCalledWith(payload);
	});
});
