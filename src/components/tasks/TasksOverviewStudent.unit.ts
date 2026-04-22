import TasksOverviewPane from "./TasksOverviewPane.vue";
import TasksOverviewStudent from "./TasksOverviewStudent.vue";
import { createTestAppStoreWithRole, mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoleName } from "@api-server";
import { useTasksOfOverview } from "@data-tasks";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { computed, ref } from "vue";

vi.mock("@data-tasks");

describe("TasksOverviewStudent", () => {
	let useTasksOfOverviewMock: Mocked<ReturnType<typeof useTasksOfOverview>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStoreWithRole(RoleName.STUDENT);

		useTasksOfOverviewMock = mockComposable(useTasksOfOverview, {
			openForStudent: computed(() => []),
			submittedForStudent: computed(() => []),
			finishedTasks: ref([]),
			isLoadingFinishedTasks: computed(() => false),
		});
		vi.mocked(useTasksOfOverview).mockReturnValue(useTasksOfOverviewMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const mountComponent = (options = {}) =>
		shallowMount(TasksOverviewStudent, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
		});

	it("should render three TasksOverviewPane components", () => {
		const wrapper = mountComponent();

		const panes = wrapper.findAllComponents(TasksOverviewPane);
		expect(panes).toHaveLength(3);
	});

	it("should call loadMoreFinishedTasks when load-more-tasks event is emitted", () => {
		const wrapper = mountComponent();

		const panes = wrapper.findAllComponents(TasksOverviewPane);
		const finishedPane = panes.find((p) => p.props("value") === "finished");
		finishedPane?.vm.$emit("load-more-tasks");

		expect(useTasksOfOverviewMock.loadMoreFinishedTasks).toHaveBeenCalled();
	});
});
