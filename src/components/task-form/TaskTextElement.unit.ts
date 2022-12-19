import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TaskTextElement from "@components/task-form/TaskTextElement.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(TaskTextElement, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: props,
		...options,
	});
};

describe("TaskTextElement", () => {
	it("should render component with defaults", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(TaskTextElement).exists()).toBe(true);
	});
});
