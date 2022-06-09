import vCustomFab from "@/components/atoms/vCustomFab.vue";
import FinishedTaskModule from "@/store/finished-tasks";
import TaskModule from "@/store/tasks";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "@nuxtjs/composition-api";
import { mount, Wrapper } from "@vue/test-utils";
import TasksDashboardMain from "./TasksDashboardMain.vue";
import TasksDashboardStudent from "./TasksDashboardStudent.vue";
import TasksDashboardTeacher from "./TasksDashboardTeacher.vue";

const $route = {
	query: {
		tab: "",
	},
};

const $router = { replace: jest.fn() };

describe("@components/templates/TasksDashboardMain", () => {
	let taskModuleMock: TaskModule;
	let finishedTaskModuleMock: FinishedTaskModule;
	let wrapper: Wrapper<Vue>;

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				$router,
				$route,
			}),
			setup() {
				provide("taskModule", taskModuleMock);
				provide("finishedTaskModule", finishedTaskModuleMock);
			},
			...attrs,
		});

		return wrapper;
	};

	describe("when mounting the component", () => {
		it("should receive valid role props", () => {
			const validRoles = ["student", "teacher"];
			const invalidRoles = ["janitor", "principal"];
			// @ts-ignore
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
		const taskModuleGetters: Partial<TaskModule> = {
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

		beforeEach(() => {
			taskModuleMock = createModuleMocks(TaskModule, taskModuleGetters);

			finishedTaskModuleMock = createModuleMocks(FinishedTaskModule, {
				getTasks: [],
				tasksIsEmpty: false,
			});

			wrapper = mountComponent({
				propsData: {
					role: "student",
				},
			});
		});

		it("should set isStudent true", () => {
			//@ts-ignore
			expect(wrapper.vm.isStudent).toBe(true);
			//@ts-ignore
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
			//@ts-ignore
			expect(wrapper.vm.showSubstituteFilter).toBe(false);
		});

		describe("with hasTasks === true", () => {
			beforeEach(() => {
				taskModuleMock = createModuleMocks(TaskModule, {
					...taskModuleGetters,
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

			it("should call 'setCourseFilters' mutation with v-autocomplete on change", () => {
				const autocompleteEl = wrapper.find(".v-autocomplete");
				autocompleteEl.vm.$emit("selected-item");

				expect(taskModuleMock.setCourseFilters).toHaveBeenCalled();
			});
		});
	});

	describe("when user role is teacher", () => {
		const taskModuleGetters: Partial<TaskModule> = {
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

		beforeEach(() => {
			taskModuleMock = createModuleMocks(TaskModule, taskModuleGetters);

			finishedTaskModuleMock = createModuleMocks(FinishedTaskModule, {
				getTasks: [],
				tasksIsEmpty: false,
			});

			wrapper = mountComponent({
				propsData: {
					role: "teacher",
				},
			});
		});

		it("should set isTeacher true", () => {
			//@ts-ignore
			expect(wrapper.vm.isTeacher).toBe(true);
			//@ts-ignore
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
			wrapper.setData({ tab: "open" });
			//@ts-ignore
			expect(wrapper.vm.showSubstituteFilter).toBe(true);
		});

		it("should show substituteFilter on 2nd tab", async () => {
			wrapper.setData({ tab: "drafts" });
			//@ts-ignore
			expect(wrapper.vm.showSubstituteFilter).toBe(true);
		});

		it("should hide substituteFilter on 3rd tab", async () => {
			wrapper.setData({ tab: "finished" });
			//@ts-ignore
			expect(wrapper.vm.showSubstituteFilter).toBe(false);
		});

		it("should call 'setSubstituteFilter' mutation on switch 'input-changed' event", () => {
			wrapper.setData({ tab: "open" });
			const switchEl = wrapper.find(".v-input--switch");
			switchEl.vm.$emit("input-changed");
			expect(taskModuleMock.setSubstituteFilter).toHaveBeenCalled();
		});

		describe("with hasTasks === true", () => {
			beforeEach(() => {
				taskModuleMock = createModuleMocks(TaskModule, {
					...taskModuleGetters,
					hasTasks: true,
					getCourseFilters: [],
					getSelectedCourseFilters: [],
				});

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

		it("should disable filter when active tab contains empty list and no course is selected", () => {
			taskModuleMock = createModuleMocks(TaskModule, {
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
				hasTasks: false,

				// make tab 2 report as not empty
				openTasksForStudentIsEmpty: true,
				completedTasksForStudentIsEmpty: false,
				getCourseFilters: [],
				getSelectedCourseFilters: [],
			});

			const wrapper = mountComponent({
				propsData: {
					role: "student",
				},
			});

			wrapper.setData({ tab: "open" });
			//@ts-ignore
			expect(wrapper.vm.isCourseFilterDisabled).toBe(true);
			wrapper.setData({ tab: "completed" });
			//@ts-ignore
			expect(wrapper.vm.isCourseFilterDisabled).toBe(false);
		});
	});

	describe("filter work correctly", () => {
		it.todo(
			"course filter dont show filter of substitutes if toggle is set disabled"
		);

		describe("when substitution toggle is enabled and task with substitute flag exist", () => {
			it.todo("substitution toggle for teachers is displayed");

			it.todo("substitution toggle for student is not displayed");

			it.todo("course filter show filter for substitutes filters");

			it.todo("course filter show substitute prefix for substitutes filters");
		});
	});
});
