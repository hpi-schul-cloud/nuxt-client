import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createModuleMocks } from "@/utils/mock-store-module";
import { betaTaskFactory } from "@@/tests/test-utils/factory";
import TaskCardModule from "@/store/task-card";
import TaskStudentView from "@/components/beta-task/TaskStudentView.vue";
import { TaskCard } from "@/store/types/beta-task/beta-task";

const mockBetaTaskData = betaTaskFactory();

const getWrapper = (task: TaskCard, completed = false) => {
	return mount(TaskStudentView, {
		...createComponentMocks({
			i18n: true,
		}),
		provide: {
			i18n: { t: (key: string) => key },
			taskCardModule: createModuleMocks(TaskCardModule, {
				getCompletedForStudent: completed,
			}),
		},
		propsData: task,
	});
};

describe("TaskStudentView", () => {
	it("should render component", () => {
		const wrapper = getWrapper(mockBetaTaskData as TaskCard);
		expect(wrapper.findComponent(TaskStudentView).exists()).toBe(true);
	});
});
