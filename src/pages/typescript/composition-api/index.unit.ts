import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import Index from "./index.vue";

describe("@index", () => {
	it("index", async () => {
		const wrapper = mount(Index, {
			...createComponentMocks({
				i18n: true,
			}),
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain("Murat");
	});
});
