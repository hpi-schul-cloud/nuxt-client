import ModalFooterBorder from "./ModalFooterBorder";
import { mount } from "@vue/test-utils";

describe("@/components/molecules/ModalFooterBorder", () => {
	it(...isValidComponent(ModalFooterBorder));

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
