import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import CardText from "./CardTitle.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(CardText, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: props,
		...options,
	});
};

describe("CardTitle", () => {
	it("should render component with defaults", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(CardText).exists()).toBe(true);
	});
});
