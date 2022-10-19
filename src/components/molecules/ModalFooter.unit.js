import ModalFooter from "./ModalFooter";
import { shallowMount } from "@vue/test-utils";

describe("@/components/molecules/ModalFooter", () => {
	it(...isValidComponent(ModalFooter));

	it("Render with some slots", () => {
		const wrapper = shallowMount(ModalFooter, {
			slots: {
				left: "left",
				right: "right",
			},
		});
		expect(wrapper.find(".left-container").text()).toBe("left");
		expect(wrapper.find(".right-container").text()).toBe("right");
	});
});
