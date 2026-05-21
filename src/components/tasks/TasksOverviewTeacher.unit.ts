import TasksOverviewPane from "./TasksOverviewPane.vue";
import TasksOverviewTeacher from "./TasksOverviewTeacher.vue";
import { CopyParams } from "@/types/copy/CopyParams";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { createTestAppStoreWithRole, createTestEnvStore, mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { CopyApiResponseStatus, CopyApiResponseType, RoleName, ShareTokenBodyParamsParentType } from "@api-server";
import { useTasksOfOverview } from "@data-tasks";
import { useCopyFlow } from "@feature-copy";
import { useShareFlow } from "@feature-share";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { computed, ref } from "vue";

vi.mock("@data-tasks");
vi.mock("@feature-copy/copy-flow.composable");
vi.mock("@feature-share/share-flow.composable");

describe("TasksOverviewTeacher", () => {
	let useTasksOfOverviewMock: Mocked<ReturnType<typeof useTasksOfOverview>>;
	let useCopyFlowMock: Mocked<ReturnType<typeof useCopyFlow>>;
	let useShareFlowMock: Mocked<ReturnType<typeof useShareFlow>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStoreWithRole(RoleName.TEACHER);
		createTestEnvStore({ FEATURE_TASK_SHARE: true });

		useTasksOfOverviewMock = mockComposable(useTasksOfOverview, {
			drafts: computed(() => []),
			openForTeacher: computed(() => []),
			finishedTasks: ref([]),
			isLoadingFinishedTasks: computed(() => false),
		});
		vi.mocked(useTasksOfOverview).mockReturnValue(useTasksOfOverviewMock);

		useCopyFlowMock = mockComposable(useCopyFlow, {});
		vi.mocked(useCopyFlow).mockReturnValue(useCopyFlowMock);

		useShareFlowMock = mockComposable(useShareFlow, {});
		vi.mocked(useShareFlow).mockReturnValue(useShareFlowMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const mountComponent = (attrs = {}) =>
		shallowMount(TasksOverviewTeacher, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
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
		beforeEach(() => {
			useCopyFlowMock.executeCopyTask.mockResolvedValue({
				success: true,
				result: { id: "copied-id", type: CopyApiResponseType.TASK, status: CopyApiResponseStatus.SUCCESS },
				error: undefined,
			});
		});

		it("should call copy when copy-task event is emitted", async () => {
			const wrapper = mountComponent();
			const payload: CopyParams = {
				id: "task-123",
				courseId: "course-456",
				type: ContentItemTypeEnum.Task,
			};

			const pane = wrapper.findComponent(TasksOverviewPane);
			pane.vm.$emit("copy-task", payload);
			await flushPromises();

			expect(useCopyFlowMock.executeCopyTask).toHaveBeenCalledWith(payload.id, payload.courseId);
		});

		it("should fetch tasks after copy", async () => {
			const wrapper = mountComponent();
			const payload: CopyParams = {
				id: "task-123",
				courseId: "course-456",
				type: ContentItemTypeEnum.Task,
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

			expect(useShareFlowMock.executeShare).toHaveBeenCalledWith({
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
});
