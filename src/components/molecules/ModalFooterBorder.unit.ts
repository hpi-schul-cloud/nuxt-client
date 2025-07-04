import ModalFooterBorder from "./ModalFooterBorder.vue";
import { mount } from "@vue/test-utils";

describe("@/components/molecules/ModalFooterBorder", () => {
	it("renders with some slots", () => {
		const wrapper = mount(ModalFooterBorder, {
			slots: {
				right: "right",
			},
		});
		expect(wrapper.find(".border").exists()).toBe(true);
		expect(wrapper.find(".right-container").text()).toBe("right");
	});
});
