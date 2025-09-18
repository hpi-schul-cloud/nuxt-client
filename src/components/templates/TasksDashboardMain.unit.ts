import { authModule } from "@/store";
import AuthModule from "@/store/auth";
import CopyModule from "@/store/copy";
import FinishedTasksModule from "@/store/finished-tasks";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import ShareModule from "@/store/share";
import TasksModule from "@/store/tasks";
import {
	COPY_MODULE_KEY,
	FINISHED_TASKS_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	SHARE_MODULE_KEY,
	TASKS_MODULE_KEY,
} from "@/utils/inject";
import { meResponseFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { SpeedDialMenu } from "@ui-speed-dial-menu";
import { mount, VueWrapper } from "@vue/test-utils";
import { VAutocomplete } from "vuetify/lib/components/index";
import TasksDashboardMain from "./TasksDashboardMain.vue";
import TasksDashboardStudent from "./TasksDashboardStudent.vue";
import TasksDashboardTeacher from "./TasksDashboardTeacher.vue";

const $route = {
	query: {
		tab: "drafts",
	},
};

const $router = { replace: vi.fn(), resolve: vi.fn() };

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

describe("@/components/templates/TasksDashboardMain", () => {
	let tasksModuleMock: TasksModule;
	let copyModuleMock: CopyModule;
	let finishedTasksModuleMock: FinishedTasksModule;
	let loadingStateModuleMock: LoadingStateModule;
	let notifierModuleMock: NotifierModule;
	let shareModuleMock: ShareModule;
	let wrapper: VueWrapper;

	const mountComponent = (options = {}) => {
		return mount(TasksDashboardMain, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					tasksModule: tasksModuleMock,
					finishedTasksModule: finishedTasksModuleMock,
					loadingStateModule: loadingStateModuleMock,
					[TASKS_MODULE_KEY]: tasksModuleMock,
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
					[FINISHED_TASKS_MODULE_KEY]: finishedTasksModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
					[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
				},
				mocks: {
					$router,
					$route,
				},
			},
			...options,
		});
	};

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
		beforeEach(() => {
			tasksModuleMock = createModuleMocks(
				TasksModule,
				defaultTasksModuleGetters
			);
			copyModuleMock = createModuleMocks(CopyModule, {
				getIsResultModalOpen: false,
			});
			loadingStateModuleMock = createModuleMocks(LoadingStateModule);

			finishedTasksModuleMock = createModuleMocks(FinishedTasksModule, {
				getTasks: [],
				tasksIsEmpty: false,
			});

			setupStores({
				authModule: AuthModule,
			});

			wrapper = mountComponent({
				props: {
					role: "student",
				},
			});
		});

		it("should render student's tasks dashboard", () => {
			const studentDashboard = wrapper.findComponent(TasksDashboardStudent);
			expect(studentDashboard.exists()).toBe(true);
			const teacherDashboard = wrapper.findComponent(TasksDashboardTeacher);
			expect(teacherDashboard.exists()).toBe(false);
		});

		it("should not render add task button", () => {
			const fab = wrapper.findComponent(SpeedDialMenu);
			expect(fab.exists()).toBe(false);
		});

		it("should open tab from store state", () => {
			const studentDashboard = wrapper.findComponent(TasksDashboardStudent);
			expect(studentDashboard.props("tabRoutes")).toContain("open");
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
					props: {
						role: "student",
					},
				});
			});

			it("should call 'setCourseFilters' mutation with v-autocomplete on change", () => {
				const autocompleteEl =
					wrapper.findComponent<VAutocomplete>(".v-autocomplete");
				autocompleteEl.vm.$emit("update:modelValue");

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
			shareModuleMock = createModuleMocks(ShareModule, {
				getIsShareModalOpen: false,
			});

			finishedTasksModuleMock = createModuleMocks(FinishedTasksModule, {
				getTasks: [],
				tasksIsEmpty: false,
			});

			setupStores({
				copyModule: CopyModule,
				authModule: AuthModule,
			});

			const mockMe = meResponseFactory.build({
				permissions: ["HOMEWORK_CREATE"],
			});
			authModule.setMe(mockMe);
			wrapper = mountComponent({
				props: {
					role: "teacher",
				},
			});
		});

		it("should render teacher's tasks dashboard", () => {
			const teacherDashboard = wrapper.findComponent(TasksDashboardTeacher);
			expect(teacherDashboard.exists()).toBe(true);
			const studentDashboard = wrapper.findComponent(TasksDashboardStudent);
			expect(studentDashboard.exists()).toBe(false);
		});

		it("should render add task button", () => {
			const fabComponent = wrapper.find(".fab-wrapper");
			expect(fabComponent.exists()).toEqual(true);
		});

		it("'add task' button should have correct path", () => {
			const fabComponent = wrapper.findComponent(SpeedDialMenu);
			expect(fabComponent.props("href")).toStrictEqual(
				"/homework/new?returnUrl=tasks"
			);
		});

		it("should open tab from store state", () => {
			const teacherDashboard = wrapper.findComponent(TasksDashboardTeacher);
			expect(teacherDashboard.props("tabRoutes")).toContain("current");
		});

		it("should show substituteFilter on 1st tab", () => {
			tasksModuleMock = createModuleMocks(TasksModule, {
				...tasksModuleGetters,
				getActiveTab: "current",
			});

			wrapper = mountComponent({
				props: {
					role: "teacher",
				},
			});
			expect(wrapper.findComponent({ name: "v-switch" }).exists()).toBe(true);
		});

		it("should show substituteFilter on 2nd tab", () => {
			tasksModuleMock = createModuleMocks(TasksModule, {
				...tasksModuleGetters,
				getActiveTab: "drafts",
			});

			wrapper = mountComponent({
				props: {
					role: "teacher",
				},
			});
			expect(wrapper.findComponent({ name: "v-switch" }).exists()).toBe(true);
		});

		it("should hide substituteFilter on 3rd tab", () => {
			tasksModuleMock = createModuleMocks(TasksModule, {
				...tasksModuleGetters,
				getActiveTab: "finished",
			});

			wrapper = mountComponent({
				props: {
					role: "teacher",
				},
			});

			const substituteFilterPlaceholder = wrapper.find(
				".substitute-filter-placeholder"
			);
			expect(substituteFilterPlaceholder.exists()).toBe(true);
		});

		it("Should update state when tab changes", async () => {
			tasksModuleMock = createModuleMocks(TasksModule, {
				...tasksModuleGetters,
				getActiveTab: "finished",
			});

			wrapper = mountComponent({
				props: {
					role: "teacher",
				},
			});

			await wrapper.setData({ tab: "drafts" });

			expect(tasksModuleMock.setActiveTab).toHaveBeenCalled();
		});

		it("should call 'setSubstituteFilter' mutation on switch 'input-changed' event", async () => {
			const switchEl = wrapper
				.findComponent({ name: "v-switch" })
				.get('input[type="checkbox"');
			await switchEl.trigger("input");
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
					props: {
						role: "teacher",
					},
				});
			});

			it("should render v-autocomplete component", () => {
				const autocompleteEl = wrapper.find(".v-autocomplete");
				expect(autocompleteEl.exists()).toBe(true);
			});
		});

		it("should not display filter when active tab contains empty list and no course is selected", () => {
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
				props: {
					role: "student",
				},
			});

			const autoComplete = wrapper.findComponent({ name: "v-autocomplete" });

			expect(autoComplete.exists()).toBe(false);
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
				hasTasks: true,
				getActiveTab: "completed",

				// make tab 2 report as not empty
				openTasksForStudentIsEmpty: true,
				completedTasksForStudentIsEmpty: false,
				getCourseFilters: [],
				getSelectedCourseFilters: [],
			});

			wrapper = mountComponent({
				props: {
					role: "student",
				},
			});

			const autoComplete = wrapper.findComponent({ name: "v-autocomplete" });

			expect(autoComplete.exists()).toBe(true);
			expect(autoComplete.classes()).not.toContain("v-input--disabled");
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
