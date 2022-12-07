import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import CardTitle from "./CardTitle.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(CardTitle, {
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
		expect(wrapper.findComponent(CardTitle).exists()).toBe(true);
	});
});
