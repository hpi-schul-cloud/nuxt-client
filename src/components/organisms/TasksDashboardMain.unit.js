import TasksDashboardMain from "./TasksDashboardMain";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import Vuetify from "vuetify";
import {
	overDueTasksTeacher,
	dueDateTasksTeacher,
	noDueDateTasksTeacher,
	courses,
	coursesTeacher,
	openTasksWithDueDate,
	openTasksWithoutDueDate,
	overDueTasks,
	gradedTasks,
	submittedTasks,
} from "@@/stories/mockData/Tasks";

describe("@components/organisms/TasksDashboardMain", () => {
	const getAllTasks = jest.fn();
	const setFilter = jest.fn();
	const mockStoreStudent = {
		tasks: {
			getters: {
				getStatus: () => "completed",
				hasNoTasks: () => false,
				getOpenTasksForStudent: () => ({
					overdue: overDueTasks,
					withDueDate: openTasksWithDueDate,
					noDueDate: openTasksWithoutDueDate,
				}),
				getCompletedTasksForStudent: () => ({
					submitted: submittedTasks,
					graded: gradedTasks,
				}),
				getCourses: () => courses,
				hasNoOpenTasks: () => false,
				hasNoCompletedTasks: () => false,
			},
			actions: {
				getAllTasks,
			},
			mutations: {
				setFilter,
			},
		},
	};

	const mockStoreTeacher = {
		tasks: {
			getters: {
				getStatus: () => "completed",
				hasNoTasks: () => false,
				getOpenTasksForTeacher: () => ({
					overdue: overDueTasksTeacher,
					withDueDate: dueDateTasksTeacher,
					noDueDate: noDueDateTasksTeacher,
				}),
				getCourses: () => coursesTeacher,
				hasNoOpenTasks: () => false,
			},
			actions: {
				getAllTasks,
			},
		},
	};

	const mockStoreEmpty = {
		tasks: {
			getters: {
				getStatus: () => "completed",
				hasNoTasks: () => true,
				getOpenTasksForTeacher: () => ({
					overdue: [],
					withDueDate: [],
					noDueDate: [],
				}),
				getCourses: () => [],
			},
			actions: {
				getAllTasks,
			},
		},
	};

	const mockStoreEmptyOpen = {
		tasks: {
			getters: {
				getStatus: () => "completed",
				getOpenTasksForStudent: () => ({
					overdue: [],
					noDueDate: [],
					withDueDate: [],
				}),
				getCompletedTasksForStudent: () => ({
					submitted: submittedTasks,
					graded: gradedTasks,
				}),
				hasNoOpenTasks: () => true,
				hasNoCompletedTasks: () => false,
				hasNoTasks: () => false,
				getCourses: () => courses,
			},
			actions: {
				getAllTasks,
			},
		},
	};
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(TasksDashboardMain));

	it("Should render empty state, if there are no tasks", () => {
		const wrapper = mount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreEmpty,
			}),
			vuetify,
			propsData: {
				role: "teacher",
			},
		});

		expect(wrapper.findComponent(vCustomEmptyState).exists()).toBe(true);
	});

	it("Should should trigger a store action", async () => {
		mockStoreStudent.tasks.actions.getAllTasks.mockClear();

		shallowMount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreStudent,
			}),
			vuetify,
			propsData: {
				role: "student",
			},
		});

		expect(
			mockStoreStudent.tasks.actions.getAllTasks
		).toHaveBeenCalled();
	});

	it("Should render student's tasks dashboard for a student", () => {
		const wrapper = mount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreStudent,
			}),
			vuetify,
			propsData: {
				role: "student",
			},
		});

		expect(wrapper.find(".task-dashboard-student").exists()).toBe(true);
		expect(wrapper.find(".task-dashboard-teacher").exists()).toBe(false);
	});

	it("Should render teacher's tasks dashboard for a teacher", () => {
		const wrapper = mount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreTeacher,
			}),
			vuetify,
			propsData: {
				role: "teacher",
			},
		});

		expect(wrapper.find(".task-dashboard-teacher").exists()).toBe(true);
		expect(wrapper.find(".task-dashboard-student").exists()).toBe(false);
	});

	it("Should receive valid role props", () => {
		const validRoles = ["student", "teacher"];
		const invalidRoles = ["janitor", "principal"];
		const { validator } = TasksDashboardMain.props.role;

		validRoles.forEach((role) => {
			expect(validator(role)).toBe(true);
		});
		invalidRoles.forEach((role) => {
			expect(validator(role)).toBe(false);
		});
	});

	it("Should render v-autocomplete component", () => {
		const wrapper = mount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreTeacher,
			}),
			vuetify,
			propsData: {
				role: "teacher",
			},
		});

		const autocompleteEl = wrapper.find(".v-autocomplete");
		expect(autocompleteEl.exists()).toBe(true);
	});

	it("Should call 'filterByCourse' method with v-autocomplete on change", async () => {
		const mockMethod = jest.spyOn(
			TasksDashboardMain.methods,
			"filterByCourse"
		);
		const wrapper = await mount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreStudent,
			}),
			vuetify,
			propsData: {
				role: "student",
			},
		});

		const autocompleteEl = wrapper.find(".v-autocomplete");
		await autocompleteEl.vm.$emit("selected-item");

		expect(mockMethod).toHaveBeenCalled();
	});

	it("Should set available courses based on the active tab", () => {
		const wrapper = mount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreStudent,
			}),
			vuetify,
			data() {
				return {
					tab: 0,
				};
			},
			propsData: {
				role: "student",
			},
		});

		expect(wrapper.vm.availableCourses).toStrictEqual(courses);
		wrapper.setData({ tab: 1 });
		expect(wrapper.vm.availableCourses).toStrictEqual(courses);
	});

	it("Should disable filter when active tab contains empty list", () => {
		const wrapper = mount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreEmptyOpen,
			}),
			vuetify,
			data() {
				return {
					tab: 0,
				};
			},
			propsData: {
				role: "student",
			},
		});

		expect(wrapper.vm.isFilterDisabled).toBe(true);
		wrapper.setData({ tab: 1 });
		expect(wrapper.vm.isFilterDisabled).toBe(false);
	});
});
