import TaskOverviewPage from "./TaskOverview.page.vue";
import TasksOverviewStudent from "@/components/tasks/TasksOverviewStudent.vue";
import TasksOverviewTeacher from "@/components/tasks/TasksOverviewTeacher.vue";
import { Status } from "@/store/types/commons";
import { createTestAppStore, mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Permission, RoleName } from "@api-server";
import { useTasksOfOverview } from "@data-tasks";
import { createTestingPinia } from "@pinia/testing";
import { DefaultWireframe } from "@ui-layout";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { computed, ref } from "vue";

vi.mock("@data-tasks");

describe("TaskOverview.page", () => {
	let useTasksOfOverviewMock: Mocked<ReturnType<typeof useTasksOfOverview>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		useTasksOfOverviewMock = mockComposable(useTasksOfOverview, {
			isLoadingTasks: computed(() => false),
			status: ref("completed"),
		});
		vi.mocked(useTasksOfOverview).mockReturnValue(useTasksOfOverviewMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const setup = ({
		role = RoleName.STUDENT,
		isLoading = false,
		status = "completed" as Status,
		permissions = [Permission.HOMEWORK_CREATE],
	} = {}) => {
		useTasksOfOverviewMock.isLoadingTasks = computed(() => isLoading);
		useTasksOfOverviewMock.status = ref(status);

		createTestAppStore({
			me: {
				roles: [{ id: role, name: role }],
				permissions,
			},
		});

		const wrapper = shallowMount(TaskOverviewPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	describe("when page is mounted", () => {
		it("should have the correct page title", () => {
			setup();
			expect(document.title).toContain("common.words.tasks");
		});

		it("should render DefaultWireframe with correct headline", () => {
			const { wrapper } = setup();

			const wireframe = wrapper.findComponent(DefaultWireframe);

			expect(wireframe.exists()).toBe(true);
			expect(wireframe.props("headline")).toBe("common.words.tasks");
		});
	});

	describe("when loading tasks", () => {
		it("should pass loading state to SvsSuspense", () => {
			const { wrapper } = setup({ isLoading: true, status: "pending" });

			const suspense = wrapper.findComponent({ name: "SvsSuspense" });

			expect(suspense.exists()).toBe(true);
			expect(suspense.props("loading")).toBe(true);
		});
	});

	describe("when user is student", () => {
		it("should render TasksOverviewStudent component", () => {
			const { wrapper } = setup();

			const studentComponent = wrapper.findComponent(TasksOverviewStudent);
			const teacherComponent = wrapper.findComponent(TasksOverviewTeacher);

			expect(studentComponent.exists()).toBe(true);
			expect(teacherComponent.exists()).toBe(false);
		});

		it("should not show FAB items", () => {
			const { wrapper } = setup();

			const wireframe = wrapper.findComponent(DefaultWireframe);

			expect(wireframe.props("fabItems")).toBeUndefined();
		});
	});

	describe("when user is teacher", () => {
		it("should render TasksOverviewTeacher component", () => {
			const { wrapper } = setup({ role: RoleName.TEACHER });

			const teacherComponent = wrapper.findComponent(TasksOverviewTeacher);
			const studentComponent = wrapper.findComponent(TasksOverviewStudent);

			expect(teacherComponent.exists()).toBe(true);
			expect(studentComponent.exists()).toBe(false);
		});

		describe("when teacher has HOMEWORK_CREATE permission", () => {
			it("should show FAB items with create task option", () => {
				const { wrapper } = setup({ role: RoleName.TEACHER });

				const wireframe = wrapper.findComponent(DefaultWireframe);
				const fabItems = wireframe.props("fabItems");

				expect(fabItems).toBeDefined();
				expect(fabItems).toHaveLength(1);
				expect(fabItems?.[0]).toEqual(
					expect.objectContaining({
						href: "/homework/new?returnUrl=tasks",
						dataTestId: "add-task",
					})
				);
			});
		});

		describe("when teacher does not have HOMEWORK_CREATE permission", () => {
			it("should not show FAB items", () => {
				const { wrapper } = setup({ role: RoleName.TEACHER, permissions: [] });

				const wireframe = wrapper.findComponent(DefaultWireframe);

				expect(wireframe.props("fabItems")).toBeUndefined();
			});
		});
	});
});
