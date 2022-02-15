import TasksDashboardMain from "./TasksDashboardMain";
import TasksDashboardStudent from "./TasksDashboardStudent";
import TasksDashboardTeacher from "./TasksDashboardTeacher";
import vCustomFab from "@components/atoms/vCustomFab";
import Vuetify from "vuetify";
import { TaskModule } from "@/store/tasks";
import { createModuleMocks } from "@/utils/mock-store-module";

const mockTaskModule = jest.fn();
jest.mock("@store/tasks", () => ({
	...jest.requireActual("@store/tasks"),
	__esModule: true,
	get default() {
		return mockTaskModule();
	},
}));

describe("@components/templates/TasksDashboardMain", () => {
	let vuetify;

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(TasksDashboardMain));

	describe("when mounting the component", () => {
		it("should receive valid role props", () => {
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
		let wrapper;
		let taskModuleMock;

		beforeEach(() => {
			taskModuleMock = {
				...createModuleMocks(TaskModule),
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
			mockTaskModule.mockReturnValue(taskModuleMock);

			wrapper = mountComponent({
				propsData: {
					role: "student",
				},
			});
		});

		it("should set isStudent true", () => {
			expect(wrapper.vm.isStudent).toBe(true);
			expect(wrapper.vm.isTeacher).toBe(false);
		});

		it("should render student's tasks dashboard", () => {
			const studentDashboard = wrapper.findComponent(TasksDashboardStudent);
			expect(studentDashboard.exists()).toBe(true);
			const teacherDashboard = wrapper.findComponent(TasksDashboardTeacher);
			expect(teacherDashboard.exists()).toBe(false);
		});

		it("should not render add task button", () => {
			const fab = wrapper.findComponent(vCustomFab);
			expect(fab.exists()).toBe(false);
		});

		it("should hide substituteFilter", async () => {
			expect(wrapper.vm.showSubstituteFilter).toBe(false);
		});

		describe("with hasTasks === true", () => {
			beforeEach(() => {
				Object.assign(taskModuleMock, {
					hasTasks: true,
					getCourseFilters: [],
					getSelectedCourseFilters: [],
				});
				wrapper = mountComponent({
					propsData: {
						role: "student",
					},
				});
			});

			it("should call 'setCourseFilters' mutation with v-autocomplete on change", async () => {
				const autocompleteEl = wrapper.find(".v-autocomplete");
				await autocompleteEl.vm.$emit("selected-item");

				expect(taskModuleMock.setCourseFilters).toHaveBeenCalled();
			});
		});
	});

	describe("when user role is teacher", () => {
		let taskModuleMock;
		let wrapper;

		beforeEach(() => {
			taskModuleMock = {
				...createModuleMocks(TaskModule),
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
			mockTaskModule.mockReturnValue(taskModuleMock);

			wrapper = mountComponent({
				propsData: {
					role: "teacher",
				},
			});
		});

		it("should set isTeacher true", () => {
			expect(wrapper.vm.isTeacher).toBe(true);
			expect(wrapper.vm.isStudent).toBe(false);
		});

		it("should render teacher's tasks dashboard", () => {
			const teacherDashboard = wrapper.findComponent(TasksDashboardTeacher);
			expect(teacherDashboard.exists()).toBe(true);
			const studentDashboard = wrapper.findComponent(TasksDashboardStudent);
			expect(studentDashboard.exists()).toBe(false);
		});

		it("should render add task button", () => {
			const fab = wrapper.findComponent(vCustomFab);
			expect(fab.exists()).toBe(true);
		});

		it("should show substituteFilter on 1st tab", async () => {
			wrapper.setData({ tab: 0 });
			expect(wrapper.vm.showSubstituteFilter).toBe(true);
		});

		it("should show substituteFilter on 2nd tab", async () => {
			wrapper.setData({ tab: 1 });
			expect(wrapper.vm.showSubstituteFilter).toBe(true);
		});

		it("should hide substituteFilter on 3rd tab", async () => {
			wrapper.setData({ tab: 2 });
			expect(wrapper.vm.showSubstituteFilter).toBe(false);
		});

		it("should call 'setSubstituteFilter' mutation on switch 'input-changed' event", async () => {
			wrapper.setData({ tab: 0 });
			const switchEl = wrapper.find(".v-input--switch");
			await switchEl.vm.$emit("input-changed");
			expect(taskModuleMock.setSubstituteFilter).toHaveBeenCalled();
		});

		describe("with hasTasks === true", () => {
			beforeEach(() => {
				taskModuleMock = {
					...taskModuleMock,
					hasTasks: true,
					getCourseFilters: [],
					getSelectedCourseFilters: [],
				};
				mockTaskModule.mockReturnValue(taskModuleMock);

				wrapper = mountComponent({
					propsData: {
						role: "teacher",
					},
				});
			});

			it("should render v-autocomplete component", () => {
				const autocompleteEl = wrapper.find(".v-autocomplete");
				expect(autocompleteEl.exists()).toBe(true);
			});
		});
	});

	it("should disable filter when active tab contains empty list and no course is selected", () => {
		const taskModuleMock = {
			...createModuleMocks(TaskModule),
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

			// make tab 2 report as not empty
			openTasksForStudentIsEmpty: true,
			completedTasksForStudentIsEmpty: false,
			getCourseFilters: [],
			getSelectedCourseFilters: [],
		};
		mockTaskModule.mockReturnValue(taskModuleMock);

		const wrapper = mountComponent({
			propsData: {
				role: "student",
			},
		});

		expect(wrapper.vm.isCourseFilterDisabled).toBe(true);
		wrapper.setData({ tab: 1 });
		expect(wrapper.vm.isCourseFilterDisabled).toBe(false);
	});

	describe("filter work correctly", () => {
		it.todo(
			"course filter dont show filter of substitutes if toggle is set disabled"
		);

		// TODO: different tabs and set filter still alive by toggling tabs, or substitute toggle

		it.todo("should sort the course filters by text property");

		// it("should set correct course name with task count for filter", () => {
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
