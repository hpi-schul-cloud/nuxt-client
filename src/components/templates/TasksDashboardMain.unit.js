import TasksDashboardMain from "./TasksDashboardMain";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import Vuetify from "vuetify";
import TaskModule from "@/store/tasks";

describe("@components/templates/TasksDashboardMain", () => {
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
			}),
			vuetify,
			propsData: {
				role: "teacher",
			},
		});

		expect(wrapper.findComponent(vCustomEmptyState).exists()).toBe(true);
	});

	it("Should should trigger a store action", async () => {
		const spy = jest.spyOn(TaskModule, "getAllTasks");

		shallowMount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				role: "student",
			},
		});

		expect(spy).toHaveBeenCalled();
	});

	it("Should render student's tasks dashboard for a student", () => {
		const wrapper = mount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
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
		const spy = jest.spyOn(TaskModule, "hasTasks", "get").mockReturnValue(true);

		const wrapper = mount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				role: "teacher",
			},
		});

		const autocompleteEl = wrapper.find(".v-autocomplete");
		expect(autocompleteEl.exists()).toBe(true);

		spy.mockRestore();
	});

	it("Should call 'setCourseFilters' method with v-autocomplete on change", async () => {
		const spy1 = jest
			.spyOn(TaskModule, "hasTasks", "get")
			.mockReturnValue(true);

		const setterSpy = jest.spyOn(
			TasksDashboardMain.methods,
			"setCourseFilters"
		);
		const wrapper = await mount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				role: "student",
			},
		});

		const autocompleteEl = wrapper.find(".v-autocomplete");
		await autocompleteEl.vm.$emit("selected-item");

		expect(setterSpy).toHaveBeenCalled();

		spy1.mockRestore();
	});

	// it("Should disable filter when active tab contains empty list and no course is selected", () => {
	// 	// make tab 2 report as not empty
	// 	const spy0 = jest
	// 		.spyOn(TaskModule, "hasOpenTasksForStudent", "get")
	// 		.mockReturnValue(false);

	// 	const spy1 = jest
	// 		.spyOn(TaskModule, "hasCompletedTasksForStudent", "get")
	// 		.mockReturnValue(true);

	// 	const spy2 = jest
	// 		.spyOn(TaskModule, "getOpenTasksForStudent", "get")
	// 		.mockReturnValue({
	// 			overdue: [],
	// 			noDueDate: [],
	// 			withDueDate: [],
	// 		});

	// 	const spy3 = jest
	// 		.spyOn(TaskModule, "getCompletedTasksForStudent", "get")
	// 		.mockReturnValue({
	// 			graded: [],
	// 			submitted: [],
	// 		});

	// 	const spy4 = jest
	// 		.spyOn(TaskModule, "getCourseFilters", "get")
	// 		.mockReturnValue([
	// 			{ value: "Biologie", text: "Biologie", isSubstitution: false },
	// 			{ value: "Chemie", text: "Chemie", isSubstitution: false },
	// 			{ value: "Mathe", text: "Mathe", isSubstitution: false },
	// 		]);

	// 	const spy5 = jest
	// 		.spyOn(TaskModule, "getSelectedCourseFilters", "get")
	// 		.mockReturnValue([]);

	// 	const wrapper = mount(TasksDashboardMain, {
	// 		...createComponentMocks({
	// 			i18n: true,
	// 			vuetify: true,
	// 		}),
	// 		vuetify,
	// 		data() {
	// 			return {
	// 				tab: 0,
	// 			};
	// 		},
	// 		propsData: {
	// 			role: "student",
	// 		},
	// 	});

	// 	expect(wrapper.vm.isFilterDisabled).toBe(true);
	// 	wrapper.setData({ tab: 1 });
	// 	expect(wrapper.vm.isFilterDisabled).toBe(false);

	// 	spy0.mockRestore();
	// 	spy1.mockRestore();
	// 	spy2.mockRestore();
	// 	spy3.mockRestore();
	// 	spy4.mockRestore();
	// 	spy5.mockRestore();
	// });

	describe("filter work correctly", () => {
		// TODO: if ts exist we can fast add test to it... :D

		it.todo(
			"course filter dont show filter of substitutes if toggle is set disabled"
		);

		// TODO: different tabs and set filter still alive by toggling tabs, or substitute toggle

		it.todo("should sort the course filters by text property");

		// it("Should set correct course name with task count for filter", () => {
		// 	const spy1 = jest
		// 		.spyOn(TaskModule, "getCourseFilters", "get")
		// 		.mockReturnValue([
		// 			{ value: "Biologie", text: "Biologie", isSubstitution: false },
		// 			{ value: "Chemie", text: "Chemie", isSubstitution: false },
		// 			{ value: "Mathe", text: "Mathe", isSubstitution: false },
		// 		]);

		// 	const spy2 = jest
		// 		.spyOn(TasksDashboardMain.methods, "getTaskCount")
		// 		.mockReturnValue(3);

		// 	const wrapper = mount(TasksDashboardMain, {
		// 		...createComponentMocks({
		// 			i18n: true,
		// 			vuetify: true,
		// 		}),
		// 		vuetify,
		// 		propsData: {
		// 			role: "teacher",
		// 		},
		// 	});

		// 	expect(wrapper.vm.getSortedCoursesFilters[0]).toStrictEqual({
		// 		isSubstitution: false,
		// 		text: "Biologie (3)", // undefined?
		// 		value: "Biologie",
		// 	});

		// 	expect(wrapper.vm.getSortedCoursesFilters[1]).toStrictEqual({
		// 		isSubstitution: false,
		// 		text: "Chemie (3)", // undefined?
		// 		value: "Chemie",
		// 	});

		// 	expect(wrapper.vm.getSortedCoursesFilters[2]).toStrictEqual({
		// 		isSubstitution: false,
		// 		text: "Mathe (3)",
		// 		value: "Mathe",
		// 	});

		// 	expect(wrapper.vm.getSortedCoursesFilters).toHaveLength(3);

		// 	spy1.mockRestore();
		// 	spy2.mockRestore();
		// });

		describe("when substitution toggle is enabled and task with substitute flag exist", () => {
			it.todo("substitution toggle for teachers is displayed");

			it.todo("substitution toggle for student is not displayed");

			it.todo("course filter show filter for substitutes filters");

			it.todo("course filter show substitute prefix for substitutes filters");
		});
	});
});
