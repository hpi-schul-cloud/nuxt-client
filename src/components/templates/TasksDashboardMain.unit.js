import TasksDashboardMain from "./TasksDashboardMain";
import TasksDashboardStudent from "./TasksDashboardStudent";
import TasksDashboardTeacher from "./TasksDashboardTeacher";
import vCustomFab from "@components/atoms/vCustomFab";
import Vuetify from "vuetify";
import taskModule, { TaskModule } from "@/store/tasks";

const mockModule = jest.fn();
jest.mock("@store/tasks", () => ({
	...jest.requireActual("@store/tasks"),
	__esModule: true,
	get default() {
		return mockModule();
	},
}));

const createStoreModuleMock = (module) => {
	const statics = {};

	// mock mutations
	Object.keys(module.mutations).forEach((key) => {
		// eslint-disable-next-line jest/prefer-spy-on
		statics[key] = jest.fn();
	});

	Object.keys(module.actions).forEach((key) => {
		// eslint-disable-next-line jest/prefer-spy-on
		statics[key] = jest.fn();
	});

	return statics;
};

describe("@components/templates/TasksDashboardMain", () => {
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(TasksDashboardMain));

	describe("mock store module", () => {
		it("should be able to mock the store", () => {
			mockModule.mockReturnValue({ foo: "bar" });

			expect(taskModule).toStrictEqual({ foo: "bar" });
		});

		it("should make the mocked store available in the component", () => {
			const taskModuleMock = {
				...createStoreModuleMock(TaskModule),
				getOpenTasksForTeacher: {
					overdue: [],
					noDueDate: [],
					withDueDate: [],
				},
				getDraftTasksForTeacher: [],
				getStatus: "completed",
				hasTasks: false,
				openTasksForTeacherIsEmpty: true,
				draftsForTeacherIsEmpty: true,
			};

			mockModule.mockReturnValue(taskModuleMock);

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
			expect(wrapper.vm.isTeacher).toBe(true);
		});
	});

	describe("when mounting the component", () => {
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
	});

	describe("when user role is student", () => {
		let taskModuleMock;

		beforeEach(() => {
			taskModuleMock = {
				...createStoreModuleMock(TaskModule),
				getStatus: "completed",
				getOpenTasksForStudent: {
					overdue: [],
					noDueDate: [],
					withDueDate: [],
				},
				getCompletedTasksForStudent: {
					submitted: [],
					graded: [],
				},
				openTasksForStudentIsEmpty: true,
				completedTasksForStudentIsEmpty: true,
				hasTasks: false,
			};
			mockModule.mockReturnValue(taskModuleMock);
		});

		it("Should set isStudent true", () => {
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

			expect(wrapper.vm.isStudent).toBe(true);
			expect(wrapper.vm.isTeacher).toBe(false);
		});

		it("Should render student's tasks dashboard", () => {
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

			const studentDashboard = wrapper.findComponent(TasksDashboardStudent);
			expect(studentDashboard.exists()).toBe(true);
			const teacherDashboard = wrapper.findComponent(TasksDashboardTeacher);
			expect(teacherDashboard.exists()).toBe(false);
		});

		it("Should not render add task button", () => {
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

			const fab = wrapper.findComponent(vCustomFab);
			expect(fab.exists()).toBe(false);
		});

		it("Should call 'setCourseFilters' mutation with v-autocomplete on change", async () => {
			taskModuleMock.hasTasks = true;
			taskModuleMock.getCourseFilters = [];
			taskModuleMock.getSelectedCourseFilters = [];

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

			expect(taskModuleMock.setCourseFilters).toHaveBeenCalled();
		});
	});

	describe("when user role is teacher", () => {
		let taskModuleMock;

		beforeEach(() => {
			taskModuleMock = {
				...createStoreModuleMock(TaskModule),
				getOpenTasksForTeacher: {
					overdue: [],
					noDueDate: [],
					withDueDate: [],
				},
				getDraftTasksForTeacher: [],
				getStatus: "completed",
				hasTasks: false,
				openTasksForTeacherIsEmpty: true,
				draftsForTeacherIsEmpty: true,
			};

			mockModule.mockReturnValue(taskModuleMock);
		});

		it("Should set isTeacher true", () => {
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

			expect(wrapper.vm.isTeacher).toBe(true);
			expect(wrapper.vm.isStudent).toBe(false);
		});

		it("Should render teacher's tasks dashboard", () => {
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

			const teacherDashboard = wrapper.findComponent(TasksDashboardTeacher);
			expect(teacherDashboard.exists()).toBe(true);
			const studentDashboard = wrapper.findComponent(TasksDashboardStudent);
			expect(studentDashboard.exists()).toBe(false);
		});

		it("Should render add task button", () => {
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

			const fab = wrapper.findComponent(vCustomFab);
			expect(fab.exists()).toBe(true);
		});

		it("Should render v-autocomplete component", () => {
			taskModuleMock.hasTasks = true;
			taskModuleMock.getCourseFilters = [];
			taskModuleMock.getSelectedCourseFilters = [];

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
		});
	});

	// it("Should disable filter when active tab contains empty list and no course is selected", () => {
	// 	// make tab 2 report as not empty
	// 	const spy0 = jest
	// 		.spyOn(TaskModule, "openTasksForStudentIsEmpty", "get")
	// 		.mockReturnValue(false);

	// 	const spy1 = jest
	// 		.spyOn(TaskModule, "completedTasksForStudentIsEmpty", "get")
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
