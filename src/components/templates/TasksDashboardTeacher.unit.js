import TasksDashboardTeacher from "./TasksDashboardTeacher";
import TasksList from "@components/organisms/TasksList";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import TaskModule from "@/store/tasks";
import mocks from "@@/tests/test-utils/mockDataTasks";
import Vuetify from "vuetify";
import tasksEmptyStateImage from "@assets/img/empty-state/Task_Empty_State.svg";

const { overDueTasksTeacher, dueDateTasksTeacher, noDueDateTasksTeacher } =
	mocks;

describe("@components/templates/TasksDashboardTeacher", () => {
	const mockStore = {
		tasks: {
			getters: {
				getStatus: () => "completed",
				hasTasks: () => true,
				openTasksForTeacherIsEmpty: () => false,
				draftsForTeacherIsEmpty: () => true,
				getOpenTasksForTeacher: () => ({
					overdue: overDueTasksTeacher,
					withDueDate: dueDateTasksTeacher,
					noDueDate: noDueDateTasksTeacher,
				}),
				getDraftTasksForTeacher: () => [],
			},
		},
	};

	const emptyState = {
		title: "Lorem ipsum",
		image: tasksEmptyStateImage,
		subtitle: undefined,
	};

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(TasksDashboardTeacher));

	it("Should render tasks list component, with second panel expanded per default", () => {
		const wrapper = mount(TasksDashboardTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
			propsData: {
				tab: 0,
				emptyState,
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
		const spy = jest
			.spyOn(TaskModule, "draftsForTeacherIsEmpty", "get")
			.mockReturnValue(true);

		const wrapper = mount(TasksDashboardTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				tab: 1,
				emptyState,
			},
		});

		const emptyStateComponent = wrapper.findComponent(vCustomEmptyState);
		expect(emptyStateComponent.exists()).toBe(true);

		spy.mockRestore();
	});

	it("Should trigger event to update tab property", async () => {
		const wrapper = mount(TasksDashboardTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
			propsData: {
				tab: 1,
				emptyState,
			},
		});

		await wrapper.setData({ currentTab: 0 });

		expect(wrapper.emitted("update:tab")).toHaveLength(1);
		expect(wrapper.emitted("update:tab")[0]).toStrictEqual([0]);
	});
});
