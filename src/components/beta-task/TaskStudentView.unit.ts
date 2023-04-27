import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createModuleMocks } from "@/utils/mock-store-module";
import { betaTaskFactory } from "@@/tests/test-utils/factory";
import TaskCardModule from "@/store/task-card";
import TaskStudentView from "@/components/beta-task/TaskStudentView.vue";
import { TaskCard } from "@/store/types/beta-task/beta-task";

const mockBetaTaskData = betaTaskFactory();
const mockCompletedBetaTaskData = betaTaskFactory({
	completedBy: ["0000d231816abba584714c9e"],
});

let taskCardModuleMock = createModuleMocks(TaskCardModule);

const getWrapper = (task: TaskCard, completed = false) => {
	taskCardModuleMock = createModuleMocks(TaskCardModule, {
		getCompletedForStudent: completed,
	});
	return mount(TaskStudentView, {
		...createComponentMocks({
			i18n: true,
		}),
		provide: {
			i18n: { t: (key: string) => key },
			taskCardModule: taskCardModuleMock,
		},
		propsData: task,
	});
};

describe("TaskStudentView", () => {
	it("should render component", () => {
		const wrapper = getWrapper(mockBetaTaskData as TaskCard);
		expect(wrapper.findComponent(TaskStudentView).exists()).toBe(true);
	});

	describe("when task is not completed", () => {
		it("should set checkbox to false", () => {
			const wrapper = getWrapper(mockBetaTaskData as TaskCard);
			expect(wrapper.findComponent(TaskStudentView).exists()).toBe(true);

			const checkBox = wrapper.findComponent({ name: "v-checkbox" });
			expect(checkBox.exists()).toBe(true);
			expect(checkBox.classes()).not.toContain("v-input--is-label-active");
		});

		it("should undo completion on click", async () => {
			const wrapper = getWrapper(mockCompletedBetaTaskData as TaskCard);
			const checkBox = wrapper.findComponent({ name: "v-checkbox" });
			checkBox.vm.$emit("change", true);
			await wrapper.vm.$nextTick();

			expect(taskCardModuleMock.completeTaskCard).toHaveBeenCalledTimes(1);
		});
	});

	describe("when task is completed", () => {
		it("should set checkbox to true", () => {
			const wrapper = getWrapper(mockCompletedBetaTaskData as TaskCard, true);
			expect(wrapper.findComponent(TaskStudentView).exists()).toBe(true);

			const checkBox = wrapper.findComponent({ name: "v-checkbox" });
			expect(checkBox.exists()).toBe(true);
			expect(checkBox.classes()).toContain("v-input--is-label-active");
		});

		it("should undo completion on click", async () => {
			const wrapper = getWrapper(mockCompletedBetaTaskData as TaskCard, true);
			const checkBox = wrapper.findComponent({ name: "v-checkbox" });
			checkBox.vm.$emit("change", false);
			await wrapper.vm.$nextTick();

			expect(
				taskCardModuleMock.undoCompletionForTaskCard
			).toHaveBeenCalledTimes(1);
		});
	});
});
