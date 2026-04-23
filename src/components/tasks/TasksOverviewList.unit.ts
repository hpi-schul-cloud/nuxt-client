import TasksOverviewList from "./TasksOverviewList.vue";
import { taskResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { TaskResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VProgressCircular } from "vuetify/components";

describe("TasksOverviewList", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = (
		props: {
			tasks?: TaskResponse[];
			hasPagination?: boolean;
			isLoadingMoreItems?: boolean;
		} = {}
	) => {
		const { tasks = [], hasPagination = false, isLoadingMoreItems = false } = props;

		return mount(TasksOverviewList, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				tasks,
				hasPagination,
				isLoadingMoreItems,
			},
		});
	};

	describe("when there are no tasks", () => {
		it("should render an empty list", () => {
			const wrapper = setup({ tasks: [] });

			const taskItems = wrapper.findAll("[data-testid='task-item']");
			expect(taskItems).toHaveLength(0);
		});

		it("should show empty state", () => {
			const wrapper = setup({ tasks: [] });

			expect(wrapper.text()).toContain("pages.tasks.state.empty");
		});
	});

	describe("when there are tasks", () => {
		it("should render task items for each task", () => {
			const tasks = [
				taskResponseFactory.build({ id: "1", name: "Task 1" }),
				taskResponseFactory.build({ id: "2", name: "Task 2" }),
				taskResponseFactory.build({ id: "3", name: "Task 3" }),
			];
			const wrapper = setup({ tasks });

			const taskItems = wrapper.findAll("[data-testid='task-item']");
			expect(taskItems).toHaveLength(3);
		});

		it("should not show empty state", () => {
			const tasks = [taskResponseFactory.build()];
			const wrapper = setup({ tasks });

			expect(wrapper.text()).not.toContain("pages.tasks.state.empty");
		});
	});

	describe("pagination", () => {
		it("should show spinner when loading more items", () => {
			const tasks = [taskResponseFactory.build()];
			const wrapper = setup({ tasks, hasPagination: true, isLoadingMoreItems: true });

			expect(wrapper.findComponent(VProgressCircular).exists()).toBe(true);
		});

		it("should not show spinner when not loading", () => {
			const tasks = [taskResponseFactory.build()];
			const wrapper = setup({ tasks, hasPagination: true, isLoadingMoreItems: false });

			expect(wrapper.findComponent(VProgressCircular).exists()).toBe(false);
		});

		it("should not show spinner when pagination is disabled", () => {
			const tasks = [taskResponseFactory.build()];
			const wrapper = setup({ tasks, hasPagination: false, isLoadingMoreItems: true });

			expect(wrapper.findComponent(VProgressCircular).exists()).toBe(false);
		});
	});
});
