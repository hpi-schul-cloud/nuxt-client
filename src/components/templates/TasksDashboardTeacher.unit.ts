import TasksDashboardTeacher from "./TasksDashboardTeacher.vue";
import TasksList from "@components/organisms/TasksList.vue";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState.vue";
import mocks from "@@/tests/test-utils/mockDataTasks";
import TaskModule from "@/store/tasks";
import FinishedTaskModule from "@/store/finished-tasks";
import { provide } from "@nuxtjs/composition-api";
import { mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { OpenTasksForTeacher } from "@/store/types/tasks";
import { createModuleMocks } from "@/utils/mock-store-module";

const { overDueTasksTeacher, dueDateTasksTeacher, noDueDateTasksTeacher } =
	mocks;

const tabRoutes = ["current", "drafts", "finished"];

describe("@components/templates/TasksDashboardTeacher", () => {
	let taskModuleMock: TaskModule;
	let finishedTaskModuleMock: FinishedTaskModule;
	let wrapper: Wrapper<Vue>;

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(TasksDashboardTeacher, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("taskModule", taskModuleMock);
				provide("finishedTaskModule", finishedTaskModuleMock);
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
	});

	it("Should render tasks list component, with second panel expanded per default", () => {
		wrapper = mountComponent({
			propsData: {
				tab: tabRoutes[0],
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
			draftsForTeacherIsEmpty: true,
		});

		wrapper = mountComponent({
			propsData: {
				tab: tabRoutes[1],
				emptyState,
				tabRoutes,
			},
		});

		const emptyStateComponent = wrapper.findComponent(vCustomEmptyState);
		expect(emptyStateComponent.exists()).toBe(true);
	});

	it("Should trigger event to update tab property", async () => {
		wrapper = mountComponent({
			propsData: {
				tab: tabRoutes[1],
				emptyState,
				tabRoutes,
			},
		});

		await wrapper.setData({ currentTab: tabRoutes[0] });

		expect(wrapper.emitted("update:tab")).toHaveLength(1);
		expect(wrapper.emitted("update:tab")?.at(0)).toStrictEqual([tabRoutes[0]]);
	});
});
