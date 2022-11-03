/* eslint-disable max-lines */
import vCustomFab from "@/components/atoms/vCustomFab.vue";
import CopyModule from "@/store/copy";
import FinishedTaskModule from "@/store/finished-tasks";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import TaskModule from "@/store/tasks";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount, Wrapper } from "@vue/test-utils";
import TasksDashboardMain from "./TasksDashboardMain.vue";
import TasksDashboardStudent from "./TasksDashboardStudent.vue";
import TasksDashboardTeacher from "./TasksDashboardTeacher.vue";

const $route = {
	query: {
		tab: "drafts",
	},
};

const $router = { replace: jest.fn() };

const defaultTaskModuleGetters: Partial<TaskModule> = {
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
	getActiveTab: "open",
	getTasks: [],
	openTasksForStudentIsEmpty: true,
	completedTasksForStudentIsEmpty: true,
	hasTasks: false,
};

describe("@/components/templates/TasksDashboardMain", () => {
	let taskModuleMock: TaskModule;
	let copyModuleMock: CopyModule;
	let finishedTaskModuleMock: FinishedTaskModule;
	let loadingStateModuleMock: LoadingStateModule;
	let notifierModuleMock: NotifierModule;
	let wrapper: Wrapper<Vue>;

	const mountComponent = (attrs = {}) => {
		return mount(TasksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				$router,
				$route,
			}),
			provide: {
				taskModule: taskModuleMock,
				copyModule: copyModuleMock,
				finishedTaskModule: finishedTaskModuleMock,
				loadingStateModule: loadingStateModuleMock,
				notifierModule: notifierModuleMock,
				i18n: { t: (key: string) => key },
			},
			...attrs,
		});
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
		beforeEach(() => {
			taskModuleMock = createModuleMocks(TaskModule, defaultTaskModuleGetters);
			copyModuleMock = createModuleMocks(CopyModule);
			loadingStateModuleMock = createModuleMocks(LoadingStateModule);

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

		it("should open tab from store state", async () => {
			//@ts-ignore
			expect(wrapper.vm.tab).toStrictEqual("open");
		});

		it("should hide substituteFilter", async () => {
			//@ts-ignore
			expect(wrapper.vm.showSubstituteFilter).toBe(false);
		});

		describe("with hasTasks === true", () => {
			beforeEach(() => {
				taskModuleMock = createModuleMocks(TaskModule, {
					...defaultTaskModuleGetters,
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
			getActiveTab: "current",
			openTasksForTeacherIsEmpty: true,
			draftsForTeacherIsEmpty: true,
		};

		beforeEach(() => {
			taskModuleMock = createModuleMocks(TaskModule, taskModuleGetters);
			copyModuleMock = createModuleMocks(CopyModule, {
				getIsResultModalOpen: false,
			});
			loadingStateModuleMock = createModuleMocks(LoadingStateModule);
			notifierModuleMock = createModuleMocks(NotifierModule);

			finishedTaskModuleMock = createModuleMocks(FinishedTaskModule, {
				getTasks: [],
				tasksIsEmpty: false,
			});

			setupStores({
				copyModule: CopyModule,
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

		it("should open tab from store state", async () => {
			//@ts-ignore
			expect(wrapper.vm.tab).toStrictEqual("current");
		});

		it("should show substituteFilter on 1st tab", async () => {
			taskModuleMock = createModuleMocks(TaskModule, {
				...taskModuleGetters,
				getActiveTab: "current",
			});

			wrapper = mountComponent({
				propsData: {
					role: "teacher",
				},
			});

			//@ts-ignore
			expect(wrapper.vm.showSubstituteFilter).toBe(true);
		});

		it("should show substituteFilter on 2nd tab", async () => {
			taskModuleMock = createModuleMocks(TaskModule, {
				...taskModuleGetters,
				getActiveTab: "drafts",
			});

			wrapper = mountComponent({
				propsData: {
					role: "teacher",
				},
			});

			//@ts-ignore
			expect(wrapper.vm.showSubstituteFilter).toBe(true);
		});

		it("should hide substituteFilter on 3rd tab", async () => {
			taskModuleMock = createModuleMocks(TaskModule, {
				...taskModuleGetters,
				getActiveTab: "finished",
			});

			wrapper = mountComponent({
				propsData: {
					role: "teacher",
				},
			});

			//@ts-ignore
			expect(wrapper.vm.showSubstituteFilter).toBe(false);
		});

		it("Should update state when tab changes", async () => {
			taskModuleMock = createModuleMocks(TaskModule, {
				...taskModuleGetters,
				getActiveTab: "finished",
			});

			wrapper = mountComponent({
				propsData: {
					role: "teacher",
				},
			});

			await wrapper.setData({ tab: "drafts" });

			expect(taskModuleMock.setActiveTab).toHaveBeenCalled();
		});

		it("should call 'setSubstituteFilter' mutation on switch 'input-changed' event", async () => {
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
				getActiveTab: "open",

				// make tab 2 report as not empty
				openTasksForStudentIsEmpty: true,
				completedTasksForStudentIsEmpty: false,
				getCourseFilters: [],
				getSelectedCourseFilters: [],
			});

			wrapper = mountComponent({
				propsData: {
					role: "student",
				},
			});

			//@ts-ignore
			expect(wrapper.vm.isCourseFilterDisabled).toBe(true);
		});

		it("should enable filter when active tab is not empty and no course is selected", () => {
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
				getActiveTab: "completed",

				// make tab 2 report as not empty
				openTasksForStudentIsEmpty: true,
				completedTasksForStudentIsEmpty: false,
				getCourseFilters: [],
				getSelectedCourseFilters: [],
			});

			wrapper = mountComponent({
				propsData: {
					role: "student",
				},
			});

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
