import TasksDashboardStudent from "./TasksDashboardStudent.vue";
import TasksList from "./TasksList.vue";
import FinishedTasksModule from "@/store/finished-tasks";
import TasksModule from "@/store/tasks";
import { OpenTasksForStudent } from "@/store/types/tasks";
import { FINISHED_TASKS_MODULE_KEY, TASKS_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import mocks from "@@/tests/test-utils/mockDataTasks";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { EmptyState } from "@ui-empty-state";
import { shallowMount } from "@vue/test-utils";

const { overDueTasks, openTasksWithoutDueDate, openTasksWithDueDate } = mocks;

describe("TasksDashboardStudent", () => {
	let tasksModuleMock: TasksModule;
	let finishedTasksModuleMock: FinishedTasksModule;

	const mountComponent = (options = {}) => {
		const wrapper = shallowMount(TasksDashboardStudent, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[TASKS_MODULE_KEY]: tasksModuleMock,
					[FINISHED_TASKS_MODULE_KEY]: finishedTasksModuleMock,
				},
			},
			...options,
		});

		return wrapper;
	};

	const tasksModuleGetters: Partial<TasksModule> = {
		getOpenTasksForStudent: {
			overdue: overDueTasks,
			withDueDate: openTasksWithDueDate,
			noDueDate: openTasksWithoutDueDate,
		} as unknown as OpenTasksForStudent,
		getStatus: "completed",
		hasTasks: true,
		getCompletedTasksForStudent: { submitted: [], graded: [] },
		openTasksForStudentIsEmpty: false,
		completedTasksForStudentIsEmpty: true,
		getCourseFilters: [],
		getSelectedCourseFilters: [],
		getTasksCountPerCourseStudent: { open: {}, completed: {} },
	};

	beforeEach(() => {
		tasksModuleMock = createModuleMocks(TasksModule, tasksModuleGetters);

		finishedTasksModuleMock = createModuleMocks(FinishedTasksModule, {
			getTasks: [],
			tasksIsEmpty: true,
		});
	});

	it("Should render tasks list component", () => {
		const wrapper = mountComponent();

		expect(wrapper.findComponent(TasksList).exists()).toBe(true);
	});

	it("Should render empty state on completed tab when completed tasks are empty", async () => {
		tasksModuleMock = createModuleMocks(TasksModule, {
			...tasksModuleGetters,
			completedTasksForStudentIsEmpty: true,
		});

		const wrapper = mountComponent();

		// Navigate to completed tab
		const tabs = wrapper.findComponent({ name: "v-tabs" });
		expect(tabs.exists()).toBe(true);

		// Check for empty state existence in template
		const emptyStateComponent = wrapper.findComponent(EmptyState);
		expect(emptyStateComponent.exists()).toBe(true);
	});

	it("Should render tabs with correct labels", () => {
		const wrapper = mountComponent();

		const tabs = wrapper.findAllComponents({ name: "v-tab" });
		expect(tabs.length).toBe(3);
	});

	it("Should render course filter autocomplete", () => {
		const wrapper = mountComponent();

		const autocomplete = wrapper.findComponent({ name: "v-autocomplete" });
		expect(autocomplete.exists()).toBe(true);
	});

	it("Should call setCourseFilters when filter selection changes", async () => {
		const wrapper = mountComponent();

		const autocomplete = wrapper.findComponent({ name: "v-autocomplete" });
		await autocomplete.vm.$emit("update:modelValue", ["Course 1"]);

		expect(tasksModuleMock.setCourseFilters).toHaveBeenCalledWith(["Course 1"]);
	});
});
