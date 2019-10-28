import ModalBodyInfo from "./ModalBodyInfo";
import { shallowMount } from "@vue/test-utils";

describe("@components/ModalBodyInfo", () => {
	it(...isValidComponent(ModalBodyInfo));

	it("renders icon", () => {
		const slotContent = "hallo";
		const { element } = shallowMount(ModalBodyInfo, {
			propsData: {
				text: "hallo",
			},
			slots: {
				icon: slotContent,
			},
		});
		expect(element.innerHTML).toContain(slotContent);
	});

	it("contains text", () => {
		const wrapper = mount(ModalBodyInfo, {
			propsData: {
				text: "hallo",
			},
		});
		expect(wrapper.find(".body-container").text()).toBe("hallo");
	});
});
