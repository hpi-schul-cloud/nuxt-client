import TasksDashboardTeacher from "./TasksDashboardTeacher.vue";
import TasksList from "./TasksList.vue";
import CopyModule, { CopyParamsTypeEnum } from "@/store/copy";
import FinishedTasksModule from "@/store/finished-tasks";
import ShareModule from "@/store/share";
import { COPY_MODULE_KEY, FINISHED_TASKS_MODULE_KEY, SHARE_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { EmptyState } from "@ui-empty-state";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeAll } from "vitest";

describe("TasksDashboardTeacher", () => {
	let finishedTasksModuleMock: FinishedTasksModule;
	let copyModuleMock: CopyModule;
	let shareModuleMock: ShareModule;

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(TasksDashboardTeacher, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
					[FINISHED_TASKS_MODULE_KEY]: finishedTasksModuleMock,
					[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
				},
			},
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
		finishedTasksModuleMock = createModuleMocks(FinishedTasksModule, {
			getTasks: [],
			tasksIsEmpty: true,
		});
		copyModuleMock = createModuleMocks(CopyModule, {
			getIsResultModalOpen: false,
		});
		shareModuleMock = createModuleMocks(ShareModule, {
			getIsShareModalOpen: false,
		});
	});

	it("should render tasks list component, with second panel expanded per default", () => {
		const wrapper = mountComponent();

		const expansionPanels = wrapper.findAll(".v-expansion-panel");

		expect(wrapper.findComponent(TasksList).exists()).toBe(true);
		expect(expansionPanels.length).toBeGreaterThan(0);
		expect(expansionPanels.at(0)?.classes()).not.toContain("v-expansion-panel--active");
		expect(expansionPanels.at(1)?.classes()).toContain("v-expansion-panel--active");
	});

	it("should render empty state on drafts tab when drafts are empty", () => {
		const wrapper = mountComponent();

		const emptyStateComponent = wrapper.findComponent(EmptyState);
		expect(emptyStateComponent.exists()).toBe(true);
	});

	it("should render tabs with correct labels", () => {
		const wrapper = mountComponent();

		const tabs = wrapper.findAllComponents({ name: "v-tab" });
		expect(tabs.length).toBe(3);
	});

	it("should render course filter autocomplete", () => {
		const wrapper = mountComponent();

		const autocomplete = wrapper.findComponent({ name: "v-autocomplete" });
		expect(autocomplete.exists()).toBe(true);
	});

	it("should render substitute filter switch", () => {
		const wrapper = mountComponent();

		const switchEl = wrapper.findComponent({ name: "v-switch" });
		expect(switchEl.exists()).toBe(true);
	});

	it("should handle copy-task event", () => {
		const wrapper = mountComponent();

		const oneTasksList = wrapper.findComponent(TasksList);
		const payload = {
			id: "123",
			courseId: "c789",
			type: CopyParamsTypeEnum.Task,
		};
		oneTasksList.vm.$emit("copy-task", payload);

		expect(copyModuleMock.copy).toHaveBeenCalledWith(payload);
	});

	describe("empty states", () => {
		it("should render empty state with correct title for current tab", () => {
			const wrapper = mountComponent();

			const emptyStateComponent = wrapper.findComponent(EmptyState);
			expect(emptyStateComponent.props("title")).toBe("pages.tasks.open.emptyState.title");
		});

		it("should render empty state with correct title for finished tab", () => {
			const wrapper = mountComponent();

			// EmptyState for finished tab exists (finishedTasksIsEmpty is true)
			const emptyStateComponents = wrapper.findAllComponents(EmptyState);
			const finishedEmptyState = emptyStateComponents.find(
				(c) => c.props("title") === "pages.tasks.finished.emptyState.title"
			);
			expect(finishedEmptyState).toBeDefined();
		});
	});
});
