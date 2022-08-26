import { mount } from "@vue/test-utils";
import Impressum from "./Impressum.vue";

describe("Impressum", () => {
	it("renders properly", () => {
		const wrapper = mount(Impressum);
		expect(wrapper.text()).toContain("Impressum");
	});
});
