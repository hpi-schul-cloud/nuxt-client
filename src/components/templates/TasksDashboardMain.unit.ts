/* eslint-disable max-lines */
import vCustomFab from "@/components/atoms/vCustomFab.vue";
import { authModule, envConfigModule } from "@/store";
import AuthModule from "@/store/auth";
import CopyModule from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import FinishedTasksModule from "@/store/finished-tasks";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import ShareModule from "@/store/share";
import TasksModule from "@/store/tasks";
import { User } from "@/store/types/auth";
import { Envs } from "@/store/types/env-config";
import {
	ENV_CONFIG_MODULE_KEY,
	I18N_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupStores from "@@/tests/test-utils/setupStores";
import { MountOptions, Wrapper, mount } from "@vue/test-utils";
import Vue from "vue";
import TasksDashboardMain from "./TasksDashboardMain.vue";
import TasksDashboardStudent from "./TasksDashboardStudent.vue";
import TasksDashboardTeacher from "./TasksDashboardTeacher.vue";

const $route = {
	query: {
		tab: "drafts",
	},
};

const $router = { replace: jest.fn(), resolve: jest.fn() };

const defaultTasksModuleGetters: Partial<TasksModule> = {
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

const mockAuthStoreDataTeacher = {
	__v: 1,
	_id: "asdfg",
	id: "asdfg",
	firstName: "Peter",
	lastName: "Parker",
	email: "peter.parker@hitchhiker.org",
	roles: [{ name: "teacher" }],
	permissions: [
		"COURSE_CREATE",
		"COURSE_EDIT",
		"TOPIC_CREATE",
		"TASK_CARD_EDIT",
		"HOMEWORK_CREATE",
	],
};

describe("@/components/templates/TasksDashboardMain", () => {
	let tasksModuleMock: TasksModule;
	let copyModuleMock: CopyModule;
	let finishedTasksModuleMock: FinishedTasksModule;
	let loadingStateModuleMock: LoadingStateModule;
	let notifierModuleMock: NotifierModule;
	let shareModuleMock: ShareModule;
	let authModuleMock: AuthModule;
	let envConfigModuleMock: EnvConfigModule;
	let wrapper: Wrapper<Vue>;

	const mountComponent = (attrs = {}) => {
		return mount(TasksDashboardMain as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
				$router,
				$route,
			}),
			provide: {
				tasksModule: tasksModuleMock,
				copyModule: copyModuleMock,
				finishedTasksModule: finishedTasksModuleMock,
				loadingStateModule: loadingStateModuleMock,
				[NOTIFIER_MODULE_KEY as symbol]: notifierModuleMock,
				shareModule: shareModuleMock,
				authModule: authModuleMock,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
				[I18N_KEY as symbol]: { t: (key: string) => key },
			},
			...attrs,
		});
	};

	describe("when mounting the component", () => {
		it("should receive valid role props", () => {
			const validRoles = ["student", "teacher"];
			const invalidRoles = ["janitor", "principal"];

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
			tasksModuleMock = createModuleMocks(
				TasksModule,
				defaultTasksModuleGetters
			);
			copyModuleMock = createModuleMocks(CopyModule);
			loadingStateModuleMock = createModuleMocks(LoadingStateModule);

			finishedTasksModuleMock = createModuleMocks(FinishedTasksModule, {
				getTasks: [],
				tasksIsEmpty: false,
			});

			setupStores({
				authModule: AuthModule,
				envConfigModule: EnvConfigModule,
			});

			wrapper = mountComponent({
				propsData: {
					role: "student",
				},
			});
		});

		it("should set isStudent true", () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			expect(wrapper.vm.isStudent).toBe(true);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			expect(wrapper.vm.tab).toStrictEqual("open");
		});

		it("should hide substituteFilter", async () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			expect(wrapper.vm.showSubstituteFilter).toBe(false);
		});

		describe("with hasTasks === true", () => {
			beforeEach(() => {
				tasksModuleMock = createModuleMocks(TasksModule, {
					...defaultTasksModuleGetters,
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

				expect(tasksModuleMock.setCourseFilters).toHaveBeenCalled();
			});
		});
	});

	describe("when user role is teacher", () => {
		const tasksModuleGetters: Partial<TasksModule> = {
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
			tasksModuleMock = createModuleMocks(TasksModule, tasksModuleGetters);
			copyModuleMock = createModuleMocks(CopyModule, {
				getIsResultModalOpen: false,
			});
			loadingStateModuleMock = createModuleMocks(LoadingStateModule);
			notifierModuleMock = createModuleMocks(NotifierModule);
			shareModuleMock = createModuleMocks(ShareModule);

			finishedTasksModuleMock = createModuleMocks(FinishedTasksModule, {
				getTasks: [],
				tasksIsEmpty: false,
			});

			setupStores({
				copyModule: CopyModule,
				authModule: AuthModule,
				envConfigModule: EnvConfigModule,
			});

			envConfigModule.setEnvs({ FEATURE_TASK_CARD_ENABLED: false } as Envs);
			authModule.setUser(mockAuthStoreDataTeacher as User);
			wrapper = mountComponent({
				propsData: {
					role: "teacher",
				},
			});
		});

		it("should set isTeacher true", () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			expect(wrapper.vm.isTeacher).toBe(true);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
			const fabComponent: any = wrapper.find(".wireframe-fab");
			expect(fabComponent.exists()).toEqual(true);
		});

		it("'add task' button should have correct path", async () => {
			const fabComponent: any = wrapper.find(".wireframe-fab");
			expect(fabComponent.vm.href).toStrictEqual(
				"/homework/new?returnUrl=tasks"
			);
		});

		describe("new beta task button", () => {
			const mockRoute = { name: "tasks-beta-task-new" };

			it("should show if FEATURE_TASK_CARD_ENABLED is true", () => {
				envConfigModule.setEnvs({ FEATURE_TASK_CARD_ENABLED: true } as Envs);
				wrapper = mountComponent({
					propsData: {
						role: "teacher",
					},
				});
				const fabComponent: any = wrapper.find(".wireframe-fab");
				expect(fabComponent.vm.actions.length).toEqual(2);
			});
			it("should not show if FEATURE_TASK_CARD_ENABLED is false", () => {
				wrapper = mountComponent({
					propsData: {
						role: "teacher",
					},
				});
				const fabComponent: any = wrapper.find(".wireframe-fab");
				expect(fabComponent.vm.actions.length).toEqual(0);
				expect(fabComponent.vm.href).toStrictEqual(
					"/homework/new?returnUrl=tasks"
				);
			});
			it("should have correct path to task card page", () => {
				envConfigModule.setEnvs({ FEATURE_TASK_CARD_ENABLED: true } as Envs);
				wrapper = mountComponent({
					propsData: {
						role: "teacher",
					},
				});
				const fabComponent: any = wrapper.find(".wireframe-fab");
				const newTaskCardAction = fabComponent.vm.actions[1];
				expect(newTaskCardAction.to).toStrictEqual(mockRoute);
			});
		});

		it("should open tab from store state", async () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			expect(wrapper.vm.tab).toStrictEqual("current");
		});

		it("should show substituteFilter on 1st tab", async () => {
			tasksModuleMock = createModuleMocks(TasksModule, {
				...tasksModuleGetters,
				getActiveTab: "current",
			});

			wrapper = mountComponent({
				propsData: {
					role: "teacher",
				},
			});

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			expect(wrapper.vm.showSubstituteFilter).toBe(true);
		});

		it("should show substituteFilter on 2nd tab", async () => {
			tasksModuleMock = createModuleMocks(TasksModule, {
				...tasksModuleGetters,
				getActiveTab: "drafts",
			});

			wrapper = mountComponent({
				propsData: {
					role: "teacher",
				},
			});

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			expect(wrapper.vm.showSubstituteFilter).toBe(true);
		});

		it("should hide substituteFilter on 3rd tab", async () => {
			tasksModuleMock = createModuleMocks(TasksModule, {
				...tasksModuleGetters,
				getActiveTab: "finished",
			});

			wrapper = mountComponent({
				propsData: {
					role: "teacher",
				},
			});

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			expect(wrapper.vm.showSubstituteFilter).toBe(false);
		});

		it("Should update state when tab changes", async () => {
			tasksModuleMock = createModuleMocks(TasksModule, {
				...tasksModuleGetters,
				getActiveTab: "finished",
			});

			wrapper = mountComponent({
				propsData: {
					role: "teacher",
				},
			});

			await wrapper.setData({ tab: "drafts" });

			expect(tasksModuleMock.setActiveTab).toHaveBeenCalled();
		});

		it("should call 'setSubstituteFilter' mutation on switch 'input-changed' event", async () => {
			const switchEl = wrapper.find(".v-input--switch");
			switchEl.vm.$emit("input-changed");
			expect(tasksModuleMock.setSubstituteFilter).toHaveBeenCalled();
		});

		describe("with hasTasks === true", () => {
			beforeEach(() => {
				tasksModuleMock = createModuleMocks(TasksModule, {
					...tasksModuleGetters,
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
			tasksModuleMock = createModuleMocks(TasksModule, {
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

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			expect(wrapper.vm.isCourseFilterDisabled).toBe(true);
		});

		it("should enable filter when active tab is not empty and no course is selected", () => {
			tasksModuleMock = createModuleMocks(TasksModule, {
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

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
