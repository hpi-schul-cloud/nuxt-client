import TasksOverviewPane from "./TasksOverviewPane.vue";
import TasksOverviewTeacher from "./TasksOverviewTeacher.vue";
import CopyModule, { CopyParamsTypeEnum } from "@/store/copy";
import ShareModule from "@/store/share";
import { COPY_MODULE_KEY, SHARE_MODULE_KEY } from "@/utils/inject";
import { createTestAppStoreWithRole, createTestEnvStore, mockComposable } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoleName, ShareTokenBodyParamsParentType } from "@api-server";
import { useTasksOfOverview } from "@data-tasks";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { computed, ref } from "vue";

vi.mock("@data-tasks");

describe("TasksOverviewTeacher", () => {
	let copyModuleMock: CopyModule;
	let shareModuleMock: ShareModule;
	let useTasksOfOverviewMock: Mocked<ReturnType<typeof useTasksOfOverview>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStoreWithRole(RoleName.TEACHER);
		createTestEnvStore({ FEATURE_TASK_SHARE: true });

		copyModuleMock = createModuleMocks(CopyModule, {
			getIsResultModalOpen: false,
		});
		shareModuleMock = createModuleMocks(ShareModule, {
			getIsShareModalOpen: false,
		});

		useTasksOfOverviewMock = mockComposable(useTasksOfOverview, {
			drafts: computed(() => []),
			openForTeacher: computed(() => []),
			finishedTasks: ref([]),
			isLoadingFinishedTasks: computed(() => false),
		});
		vi.mocked(useTasksOfOverview).mockReturnValue(useTasksOfOverviewMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const mountComponent = (attrs = {}) =>
		shallowMount(TasksOverviewTeacher, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
					[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
				},
			},
			...attrs,
		});

	it("should render three TasksOverviewPane components", () => {
		const wrapper = mountComponent();

		const panes = wrapper.findAllComponents(TasksOverviewPane);
		expect(panes).toHaveLength(3);
	});

	describe("TasksOverviewPane components", () => {
		it("should render three TasksOverviewPane components", () => {
			const wrapper = mountComponent();

			const panes = wrapper.findAllComponents(TasksOverviewPane);
			expect(panes).toHaveLength(3);
		});
	});

	describe("Copy Task", () => {
		it("should call copy when copy-task event is emitted", async () => {
			const wrapper = mountComponent();
			const payload = {
				id: "task-123",
				courseId: "course-456",
				type: CopyParamsTypeEnum.Task,
			};

			const pane = wrapper.findComponent(TasksOverviewPane);
			await pane.vm.$emit("copy-task", payload);
			await flushPromises();

			// useCopy is used internally, which calls copyModule.copy
			expect(copyModuleMock.copy).toHaveBeenCalled();
		});

		it("should fetch tasks after copy", async () => {
			const wrapper = mountComponent();
			const payload = {
				id: "task-123",
				courseId: "course-456",
				type: CopyParamsTypeEnum.Task,
			};

			const pane = wrapper.findComponent(TasksOverviewPane);
			await pane.vm.$emit("copy-task", payload);
			await flushPromises();

			expect(useTasksOfOverviewMock.fetchTasks).toHaveBeenCalled();
		});
	});

	describe("Share Task", () => {
		it("should call startShareFlow when share-task event is emitted", () => {
			const wrapper = mountComponent();
			const taskId = "task-123";

			const pane = wrapper.findComponent(TasksOverviewPane);
			pane.vm.$emit("share-task", taskId);

			expect(shareModuleMock.startShareFlow).toHaveBeenCalledWith({
				id: taskId,
				type: ShareTokenBodyParamsParentType.TASKS,
			});
		});
	});

	describe("Load More Finished Tasks", () => {
		it("should call loadMoreFinishedTasks when load-more-tasks event is emitted", () => {
			const wrapper = mountComponent();

			const panes = wrapper.findAllComponents(TasksOverviewPane);
			const finishedPane = panes.find((p) => p.props("value") === "finished");
			finishedPane?.vm.$emit("load-more-tasks");

			expect(useTasksOfOverviewMock.loadMoreFinishedTasks).toHaveBeenCalled();
		});
	});

	describe("Copy Result Modal", () => {
		it("should render CopyResultModal", () => {
			const wrapper = mountComponent();

			const modal = wrapper.findComponent({ name: "CopyResultModal" });
			expect(modal.exists()).toBe(true);
		});

		it("should call copyModule.reset when copy dialog is closed", () => {
			const wrapper = mountComponent();

			const modal = wrapper.findComponent({ name: "CopyResultModal" });
			modal.vm.$emit("copy-dialog-closed");

			expect(copyModuleMock.reset).toHaveBeenCalled();
		});
	});

	describe("Share Modal", () => {
		it("should render ShareModal for tasks", () => {
			const wrapper = mountComponent();

			const modal = wrapper.findComponent({ name: "ShareModal" });
			expect(modal.exists()).toBe(true);
			expect(modal.props("type")).toBe(ShareTokenBodyParamsParentType.TASKS);
		});
	});
});
