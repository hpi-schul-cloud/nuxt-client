import CopyModule from "@/store/copy";
import FinishedTasksModule from "@/store/finished-tasks";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import TasksModule from "@/store/tasks";
import { OpenTasksForStudent } from "@/store/types/tasks";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import mocks from "@@/tests/test-utils/mockDataTasks";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState.vue";
import TasksList from "@components/organisms/TasksList.vue";
import TasksDashboardStudent from "@components/templates/TasksDashboardStudent.vue";
import { provide } from "@nuxtjs/composition-api";
import { mount, Wrapper } from "@vue/test-utils";

const { overDueTasks, openTasksWithoutDueDate, openTasksWithDueDate } = mocks;

describe("@components/templates/TasksDashboardStudent", () => {
	let tasksModuleMock: TasksModule;
	let copyModuleMock: CopyModule;
	let finishedTasksModuleMock: FinishedTasksModule;
	let loadingStateModuleMock: LoadingStateModule;
	let notifierModuleMock: NotifierModule;
	let wrapper: Wrapper<Vue>;

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(TasksDashboardStudent, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("tasksModule", tasksModuleMock);
				provide("copyModule", copyModuleMock);
				provide("finishedTasksModule", finishedTasksModuleMock);
				provide("loadingStateModule", loadingStateModuleMock);
				provide("notifierModule", notifierModuleMock);
				provide("i18n", { t: (key: string) => key });
			},
			...attrs,
		});

		return wrapper;
	};

	const tabRoutes = ["open", "completed", "finished"];

	const tasksModuleGetters: Partial<TasksModule> = {
		getOpenTasksForStudent: {
			overdue: overDueTasks,
			withDueDate: openTasksWithDueDate,
			noDueDate: openTasksWithoutDueDate,
		} as unknown as OpenTasksForStudent,
		getStatus: "completed",
		hasTasks: true,
		getActiveTab: tabRoutes[0],
		getCompletedTasksForStudent: { submitted: [], graded: [] },
		openTasksForStudentIsEmpty: false,
		completedTasksForStudentIsEmpty: true,
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
	});

	it("Should render tasks list component", () => {
		wrapper = mountComponent({
			propsData: {
				emptyState,
				tabRoutes,
			},
		});

		expect(wrapper.findComponent(TasksList).exists()).toBe(true);
	});

	it("Should render empty state", () => {
		tasksModuleMock = createModuleMocks(TasksModule, {
			...tasksModuleGetters,
			getActiveTab: tabRoutes[1],
			completedTasksForStudentIsEmpty: true,
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

		await wrapper.setData({ tab: tabRoutes[0] });

		expect(tasksModuleMock.setActiveTab).toHaveBeenCalled();
	});
});
