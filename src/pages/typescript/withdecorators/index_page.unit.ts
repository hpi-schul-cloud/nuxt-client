import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import index from "./index.vue";
// import Vue from "vue";

describe("@index", () => {
	it("index", async () => {
		const wrapper: any = mount(index, {
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
