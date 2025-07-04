import ModalBodyInfo from "./ModalBodyInfo.vue";
import { shallowMount } from "@vue/test-utils";

describe("@/components/molecules/ModalBodyInfo", () => {
	it("renders icon", () => {
		const slotContent = "hallo";
		const { element } = shallowMount(ModalBodyInfo, {
			propsData: {
				title: "hallo",
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
				title: "hallo",
			},
		});
		expect(wrapper.find(".body-container").text()).toBe("hallo");
	});
});
