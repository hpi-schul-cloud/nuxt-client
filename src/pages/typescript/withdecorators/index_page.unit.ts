import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import Index from "./index.vue";
// import Vue from "vue";

describe("@index", () => {
	it("index", async () => {
		const wrapper = mount<Index>(Index, {
			...createComponentMocks({
				i18n: true,
			}),
		});

		await wrapper.vm.$nextTick();

		// const vm: any = wrapper.vm;
		// expect(vm.isMounted).toBe(true);

		expect(wrapper.vm.isMounted).toBe(true);
	});
});
