import ModalFooter from "./ModalFooter";
import { shallowMount } from "@vue/test-utils";

describe("@components/ModalFooter", () => {
	it(...isValidComponent(ModalFooter));
});

it("Render with some slots", () => {
	const wrapper = shallowMount(ModalFooter, {
		slots: {
			left: "left",
			right: "right",
		},
	});
	expect(wrapper.find(".icon-container").text()).toBe("left");
	expect(wrapper.find(".button-container").text()).toBe("right");
});
