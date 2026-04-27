import SvsTransition from "./SvsTransition.vue";
import { mount } from "@vue/test-utils";

describe("SvsTransition", () => {
	it("mounts without an error", () => {
		const wrapper = mount(SvsTransition, {
			slots: { default: '<div data-testid="content">hello</div>' },
		});

		expect(wrapper).toBeTruthy();
	});
});
