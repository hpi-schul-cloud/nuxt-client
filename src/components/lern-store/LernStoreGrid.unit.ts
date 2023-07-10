import Vue from "vue";
import { MountOptions, mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import LernStoreGrid from "./LernStoreGrid.vue";

describe("@/components/lern-store/LernStoreGrid", () => {
	const wrapper = mount(LernStoreGrid as MountOptions<Vue>, {
		...createComponentMocks({
			i18n: true,
		}),
	});

	it("should render component", () => {
		expect(wrapper.findComponent(LernStoreGrid).exists()).toBe(true);
	});
});
