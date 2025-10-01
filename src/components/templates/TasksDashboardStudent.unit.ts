import TasksList from "@/components/organisms/TasksList.vue";
import TasksDashboardStudent from "@/components/templates/TasksDashboardStudent.vue";
import FinishedTasksModule from "@/store/finished-tasks";
import NotifierModule from "@/store/notifier";
import TasksModule from "@/store/tasks";
import { OpenTasksForStudent } from "@/store/types/tasks";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import mocks from "@@/tests/test-utils/mockDataTasks";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { EmptyState } from "@ui-empty-state";
import { shallowMount } from "@vue/test-utils";

const { overDueTasks, openTasksWithoutDueDate, openTasksWithDueDate } = mocks;

describe("@/components/templates/TasksDashboardStudent", () => {
	let tasksModuleMock: TasksModule;
	let finishedTasksModuleMock: FinishedTasksModule;
	let notifierModuleMock: NotifierModule;

	const mountComponent = (options = {}) => {
		const wrapper = shallowMount(TasksDashboardStudent, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					tasksModule: tasksModuleMock,
					finishedTasksModule: finishedTasksModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
				},
			},
			...options,
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

	beforeEach(() => {
		tasksModuleMock = createModuleMocks(TasksModule, tasksModuleGetters);
		notifierModuleMock = createModuleMocks(NotifierModule);

		finishedTasksModuleMock = createModuleMocks(FinishedTasksModule, {
			getTasks: [],
			tasksIsEmpty: true,
		});
	});

	it("Should render tasks list component", () => {
		const wrapper = mountComponent({
			props: {
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

		const wrapper = mountComponent({
			props: {
				tabRoutes,
			},
		});

		const emptyStateComponent = wrapper.findComponent(EmptyState);
		expect(emptyStateComponent.exists()).toBe(true);
	});

	it("Should update store when tab changes", () => {
		const wrapper = mountComponent({
			props: {
				tabRoutes,
			},
		});

		wrapper.vm.tab = tabRoutes[0];

		expect(tasksModuleMock.setActiveTab).toHaveBeenCalled();
	});
});
