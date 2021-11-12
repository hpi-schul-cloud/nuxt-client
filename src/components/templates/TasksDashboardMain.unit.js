import TasksDashboardMain from "./TasksDashboardMain";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import Vuetify from "vuetify";
import mocks from "@@/stories/mockData/Tasks";

import storeModule from "../../store/tasks";

const {
	overDueTasksTeacher,
	dueDateTasksTeacher,
	noDueDateTasksTeacher,
	openTasksWithDueDate,
	openTasksWithoutDueDate,
	overDueTasks,
	gradedTasks,
	submittedTasks,
	tasks,
	tasksCountStudent,
	tasksCountTeacher,
	drafts,
} = mocks;

describe("@components/templates/TasksDashboardMain", () => {
	const getAllTasks = jest.fn();
	const setCourseFilters = jest.fn();
	const setSubstituteFilter = jest.fn();

	const state = storeModule.state();

	const mockStoreStudent = {
		tasks: {
			getters: {
				getStatus: () => "completed",
				hasTasks: () => true,
				hasOpenTasksStudent: () => true,
				getTasks: () => tasks,
				getOpenTasksForStudent: () => ({
					overdue: overDueTasks,
					withDueDate: openTasksWithDueDate,
					noDueDate: openTasksWithoutDueDate,
				}),
				getCompletedTasksForStudent: () => ({
					submitted: submittedTasks,
					graded: gradedTasks,
				}),
				isSubstituteFilterEnabled: () => state.substituteFilter,
				getCourseFilters: () => storeModule.getters.getCourseFilters({ tasks }),
				getSelectedCourseFilters: () => [],
				hasOpenTasks: () => true,
				hasCompletedTasks: () => true,
				getTasksCountPerCourseStudent: () => tasksCountStudent,
				hasFilterSelected: () => false,
			},
			actions: {
				getAllTasks,
			},
			mutations: {
				setCourseFilters,
				setSubstituteFilter,
			},
		},
	};

	const mockStoreTeacher = {
		tasks: {
			getters: {
				getStatus: () => "completed",
				hasTasks: () => true,
				hasOpenTasksTeacher: () => true,
				hasDrafts: () => false,
				getTasks: () => tasks,
				getOpenTasksForTeacher: () => ({
					overdue: overDueTasksTeacher,
					withDueDate: dueDateTasksTeacher,
					noDueDate: noDueDateTasksTeacher,
				}),
				getDraftTasksForTeacher: () => drafts,
				isSubstituteFilterEnabled: () => state.substituteFilter,
				getCourseFilters: () => storeModule.getters.getCourseFilters({ tasks }),
				getSelectedCourseFilters: () => [],
				hasOpenTasks: () => true,
				getTasksCountPerCourseTeacher: () => tasksCountTeacher,
				hasFilterSelected: () => false,
			},
			actions: {
				getAllTasks,
			},
			mutations: {
				setCourseFilters,
				setSubstituteFilter,
			},
		},
	};

	const mockStoreEmpty = {
		tasks: {
			getters: {
				getStatus: () => "completed",
				hasTasks: () => false,
				hasOpenTasksStudent: () => false,
				hasCompletedTasks: () => false,
				hasOpenTasksTeacher: () => false,
				hasDrafts: () => false,
				getTasks: () => [],
				getOpenTasksForTeacher: () => ({
					overdue: [],
					withDueDate: [],
					noDueDate: [],
				}),
				isSubstituteFilterEnabled: () => state.substituteFilter,
				getCourseFilters: () => storeModule.getters.getCourseFilters({ tasks }),
				getSelectedCourseFilters: () => [],
				getDraftTasksForTeacher: () => [],
				hasFilterSelected: () => false,
			},
			actions: {
				getAllTasks,
			},
			mutations: {
				setCourseFilters,
				setSubstituteFilter,
			},
		},
	};

	const mockStoreEmptyOpen = {
		tasks: {
			getters: {
				getStatus: () => "completed",
				getTasks: () => [...submittedTasks, ...gradedTasks],
				getOpenTasksForStudent: () => ({
					overdue: [],
					noDueDate: [],
					withDueDate: [],
				}),
				getCompletedTasksForStudent: () => ({
					submitted: submittedTasks,
					graded: gradedTasks,
				}),
				hasOpenTasksStudent: () => false,
				hasCompletedTasks: () => true,
				isSubstituteFilterEnabled: () => state.substituteFilter,
				getCourseFilters: () => storeModule.getters.getCourseFilters({ tasks }),
				getSelectedCourseFilters: () => [],
				hasTasks: () => true,
				getTasksCountPerCourseStudent: () => tasksCountStudent,
				hasFilterSelected: () => false,
			},
			actions: {
				getAllTasks,
			},
			mutations: {
				setCourseFilters,
				setSubstituteFilter,
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

		expect(mockStoreStudent.tasks.actions.getAllTasks).toHaveBeenCalled();
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

	it("Should call 'setCourseFilters' method with v-autocomplete on change", async () => {
		const mockMethod = jest.spyOn(
			TasksDashboardMain.methods,
			"setCourseFilters"
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

	it("Should disable filter when active tab contains empty list and no course is selected", () => {
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

	describe("filter work correctly", () => {
		// TODO: if ts exist we can fast add test to it... :D

		it.todo(
			"course filter dont show filter of substitutes if toggle is set disabled"
		);

		// TODO: different tabs and set filter still alive by toggling tabs, or substitute toggle

		it.todo("should sort the course filters by text property");

		it("Should set correct course name with task count for filter", () => {
			const wrapper = mount(TasksDashboardMain, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
					store: mockStoreTeacher,
				}),
				vuetify,
				data() {
					return {
						tab: 1,
					};
				},
				propsData: {
					role: "teacher",
				},
			});

			expect(wrapper.vm.getSortedCoursesFilters[0]).toStrictEqual({
				isSubstitution: false,
				text: "Biologie (undefined)", // undefined?
				value: "Biologie",
			});

			expect(wrapper.vm.getSortedCoursesFilters[1]).toStrictEqual({
				isSubstitution: false,
				text: "Chemie (undefined)", // undefined?
				value: "Chemie",
			});

			expect(wrapper.vm.getSortedCoursesFilters[2]).toStrictEqual({
				isSubstitution: false,
				text: "Mathe (0)",
				value: "Mathe",
			});

			expect(wrapper.vm.getSortedCoursesFilters).toHaveLength(3);
		});

		describe("when substitution toggle is enabled and task with substitute flag exist", () => {
			it.todo("substitution toggle for teachers is displayed");

			it.todo("substitution toggle for student is not displayed");

			it.todo("course filter show filter for substitutes filters");

			it.todo("course filter show substitute prefix for substitutes filters");
		});
	});
});
