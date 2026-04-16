import TaskOverviewPage from "./TaskOverview.page.vue";
import TasksDashboardStudent from "@/components/tasks/TasksDashboardStudent.vue";
import TasksDashboardTeacher from "@/components/tasks/TasksDashboardTeacher.vue";
import CopyModule from "@/store/copy";
import FinishedTasksModule from "@/store/finished-tasks";
import ShareModule from "@/store/share";
import { COPY_MODULE_KEY, FINISHED_TASKS_MODULE_KEY, SHARE_MODULE_KEY } from "@/utils/inject";
import { createTestAppStoreWithPermissions } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { Permission } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { SpeedDialMenu } from "@ui-speed-dial-menu";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeAll } from "vitest";

const $route = {
	query: {
		tab: "drafts",
	},
};

const $router = { replace: vi.fn(), resolve: vi.fn() };

describe("TaskOverviewPage", () => {
	let copyModuleMock: CopyModule;
	let finishedTasksModuleMock: FinishedTasksModule;
	let shareModuleMock: ShareModule;
	let wrapper: VueWrapper;

	const mountComponent = (options = {}) =>
		shallowMount(TaskOverviewPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
					[FINISHED_TASKS_MODULE_KEY]: finishedTasksModuleMock,
					[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
				},
				mocks: {
					$router,
					$route,
				},
			},
			...options,
		});

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	describe("when user role is student", () => {
		beforeEach(() => {
			copyModuleMock = createModuleMocks(CopyModule, {
				getIsResultModalOpen: false,
			});

			finishedTasksModuleMock = createModuleMocks(FinishedTasksModule, {
				getTasks: [],
				tasksIsEmpty: false,
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
	});

	describe("when user role is teacher", () => {
		beforeEach(() => {
			copyModuleMock = createModuleMocks(CopyModule, {
				getIsResultModalOpen: false,
			});
			shareModuleMock = createModuleMocks(ShareModule, {
				getIsShareModalOpen: false,
			});

			finishedTasksModuleMock = createModuleMocks(FinishedTasksModule, {
				getTasks: [],
				tasksIsEmpty: false,
			});

			setupStores({
				copyModule: CopyModule,
			});
			createTestAppStoreWithPermissions([Permission.HOMEWORK_CREATE]);

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
			const fabComponent = wrapper.findComponent(SpeedDialMenu);
			expect(fabComponent.exists()).toEqual(true);
		});

		it("'add task' button should have correct path", () => {
			const fabComponent = wrapper.findComponent(SpeedDialMenu);
			expect(fabComponent.vm.actions[0].href).toStrictEqual("/homework/new?returnUrl=tasks");
		});
	});
});
