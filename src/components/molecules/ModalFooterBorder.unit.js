import ModalFooterBorder from "./ModalFooterBorder";
import { mount } from "@vue/test-utils";

describe("@components/ModalFooterBorder", () => {
	it(...isValidComponent(ModalFooterBorder));

	it("renders with some slots", () => {
		const wrapper = mount(ModalFooterBorder, {
			slots: {
				right: "right",
			},
		});
		expect(wrapper.find(".border").exists()).toBe(true);
		expect(wrapper.find(".button-container").text()).toBe("right");
	});
});
