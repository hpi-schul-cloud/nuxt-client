// import Vue from "vue";
// import CompositionApi from "@vue/composition-api";

import { mount } from "@vue/test-utils";
import Index from "./index.vue";

// Vue.use(CompositionApi);

describe("@index", () => {
	it("index", async () => {
		const wrapper = mount<Index>(Index, {});

		await wrapper.vm.$nextTick();

		// const vm: any = wrapper.vm;
		// expect(vm.isMounted).toBe(true);

		expect(wrapper.vm.isMounted).toBe(true);
	});
});
