import TasksOverviewList from "./TasksOverviewList.vue";
import TasksOverviewListItemStudent from "./TasksOverviewListItemStudent.vue";
import TasksOverviewListItemTeacher from "./TasksOverviewListItemTeacher.vue";
import TasksOverviewPane from "./TasksOverviewPane.vue";
import { CopyParamsTypeEnum } from "@/store/copy";
import { createTestAppStoreWithRole, mockComposable, taskResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoleName } from "@api-server";
import { DueStatus, GradeStatus, useTasksFilter } from "@data-tasks";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { computed, ref } from "vue";
import { VAutocomplete, VBtn } from "vuetify/components";

vi.mock("@data-tasks");

describe("TasksOverviewPane", () => {
	let useTasksFilterMock: Mocked<ReturnType<typeof useTasksFilter>>;

	const tasks = [
		taskResponseFactory.build({ id: "task-1", name: "Task 1" }),
		taskResponseFactory.build({ id: "task-2", name: "Task 2" }),
	];

	beforeEach(() => {
		setActivePinia(createTestingPinia());

		useTasksFilterMock = mockComposable(useTasksFilter, {
			filteredTasks: computed(() => tasks),
			selectedCourseNames: ref([]),
			includeSubstitute: ref(false),
			gradeStatus: ref(undefined),
			dueStatus: ref(undefined),
			courseFilterOptions: computed(() => [
				{ value: "Mathe", title: "Mathe", count: 2 },
				{ value: "Deutsch", title: "Deutsch", count: 1 },
			]),
			gradeStatusOptions: [
				{ value: GradeStatus.Graded, title: "Bewertet" },
				{ value: GradeStatus.NotGraded, title: "Nicht bewertet" },
			],
			dueStatusOptions: [
				{ value: DueStatus.Overdue, title: "Überfällig" },
				{ value: DueStatus.WithDue, title: "Nicht überfällig" },
			],
		});
		vi.mocked(useTasksFilter).mockReturnValue(useTasksFilterMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const mountComponent = (role: RoleName = RoleName.TEACHER, props = {}) => {
		createTestAppStoreWithRole(role);

		return shallowMount(TasksOverviewPane, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					VAutocomplete: {
						template: "<div><slot /></div>",
						props: ["modelValue", "items", "label", "density"],
					},
					TasksOverviewList: {
						template: "<div><slot :task='{}' /></div>",
						props: ["tasks", "isLoadingMoreItems", "hasPagination"],
					},
				},
			},
			props: {
				value: "open",
				tasks,
				...props,
			},
		});
	};

	describe("rendering", () => {
		it("should render TasksOverviewList with filtered tasks", () => {
			const wrapper = mountComponent();

			const list = wrapper.findComponent(TasksOverviewList);
			expect(list.exists()).toBe(true);
			expect(list.props("tasks")).toEqual(tasks);
		});

		it("should render TasksOverviewListItemTeacher for teacher role", () => {
			const wrapper = mountComponent(RoleName.TEACHER);

			expect(wrapper.findComponent(TasksOverviewListItemTeacher).exists()).toBe(true);
			expect(wrapper.findComponent(TasksOverviewListItemStudent).exists()).toBe(false);
		});

		it("should render TasksOverviewListItemStudent for student role", () => {
			const wrapper = mountComponent(RoleName.STUDENT);

			expect(wrapper.findComponent(TasksOverviewListItemStudent).exists()).toBe(true);
			expect(wrapper.findComponent(TasksOverviewListItemTeacher).exists()).toBe(false);
		});
	});

	describe("filter controls", () => {
		it("should render course filter", () => {
			const wrapper = mountComponent();

			expect(wrapper.find("[data-testid='course-filter']").exists()).toBe(true);
		});

		it("should render grade status filter", () => {
			const wrapper = mountComponent();

			expect(wrapper.find("[data-testid='grade-status-filter']").exists()).toBe(true);
		});

		it("should render due status filter", () => {
			const wrapper = mountComponent();

			expect(wrapper.find("[data-testid='due-status-filter']").exists()).toBe(true);
		});

		it("should show reset button when filters are active", async () => {
			useTasksFilterMock.selectedCourseNames = ref(["Mathe"]);
			vi.mocked(useTasksFilter).mockReturnValue(useTasksFilterMock);

			const wrapper = mountComponent();

			const resetButton = wrapper.findComponent(VBtn);
			expect(resetButton.exists()).toBe(true);
		});

		it("should call clearFilters when reset button is clicked", async () => {
			useTasksFilterMock.selectedCourseNames = ref(["Mathe"]);
			vi.mocked(useTasksFilter).mockReturnValue(useTasksFilterMock);

			const wrapper = mountComponent();

			const resetButton = wrapper.findComponent(VBtn);
			await resetButton.trigger("click");

			expect(useTasksFilterMock.clearFilters).toHaveBeenCalled();
		});
	});

	describe("events", () => {
		it("should emit load-more-tasks when TasksOverviewList emits it", () => {
			const wrapper = mountComponent();

			const list = wrapper.findComponent(TasksOverviewList);
			list.vm.$emit("load-more-tasks");

			expect(wrapper.emitted("load-more-tasks")).toHaveLength(1);
		});

		it("should emit copy-task when TasksOverviewListItemTeacher emits it", () => {
			const wrapper = mountComponent(RoleName.TEACHER);
			const payload = { id: "task-1", type: CopyParamsTypeEnum.Task };

			const listItem = wrapper.findComponent(TasksOverviewListItemTeacher);
			listItem.vm.$emit("copy-task", payload);

			expect(wrapper.emitted("copy-task")).toEqual([[payload]]);
		});

		it("should emit share-task with task id when TasksOverviewListItemTeacher emits it", () => {
			const wrapper = mountComponent(RoleName.TEACHER);

			const listItem = wrapper.findComponent(TasksOverviewListItemTeacher);
			listItem.vm.$emit("share-task");

			expect(wrapper.emitted("share-task")).toBeTruthy();
		});
	});

	describe("courseFilterOptionsWithCount", () => {
		it("should format course options with count in title", () => {
			const wrapper = mountComponent();

			const courseFilter = wrapper.findComponent<typeof VAutocomplete>("[data-testid='course-filter']");
			const items = courseFilter.props("items");

			expect(items).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ title: "Mathe (2)" }),
					expect.objectContaining({ title: "Deutsch (1)" }),
				])
			);
		});
	});
});
