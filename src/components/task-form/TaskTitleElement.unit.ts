import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TaskTitleElement from "@components/task-form/TaskTitleElement.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(TaskTitleElement, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: props,
		...options,
	});
};

describe("TaskTitleElemnt", () => {
	it("should render component with defaults", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(TaskTitleElement).exists()).toBe(true);
	});
});
