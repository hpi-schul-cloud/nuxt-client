import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createModuleMocks } from "@/utils/mock-store-module";
import { betaTaskFactory } from "@@/tests/test-utils/factory";
import TaskCardModule from "@/store/task-card";
import TaskStudentView from "@/components/beta-task/TaskStudentView.vue";

const mockBetaTaskData = betaTaskFactory();

const getWrapper = (props?: object, completed = false) => {
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
		propsData: props,
	});
};

describe("TaskStudentView", () => {
	it("should render component", () => {
		const wrapper = getWrapper(mockBetaTaskData);
		expect(wrapper.findComponent(TaskStudentView).exists()).toBe(true);
	});
});
