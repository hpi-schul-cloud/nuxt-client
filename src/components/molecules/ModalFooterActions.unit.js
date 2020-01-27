import ModalFooterActions from "./ModalFooterActions";
import { mount } from "@vue/test-utils";

describe("@components/ModalFooterAction", () => {
	it(...isValidComponent(ModalFooterActions));

	it("renders with some slots", () => {
		const wrapper = mount(ModalFooterActions, {
			slots: {
				left: "left",
				right: "right",
			},
		});

		expect(wrapper.find(".slot-container").text()).toBe("left");
		expect(wrapper.find(".button-container").text()).toBe("right");
	});
});
