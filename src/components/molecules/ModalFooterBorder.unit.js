import ModalFooterBorder from "./ModalFooterBorder";
import { mount } from "@vue/test-utils";

describe("@/components/molecules/ModalFooterBorder", () => {
	it("renders with some slots", () => {
		const wrapper = mount(ModalFooterBorder, {
			slots: {
				right: "right",
			},
		});
		expect(wrapper.find(".modal-border").exists()).toBe(true);
		expect(wrapper.find(".right-container").text()).toBe("right");
	});
});
