import ModalFooterConfirm from "./ModalFooterConfirm.vue";
import { mount } from "@vue/test-utils";

const button = {
	data: () => ({ active: false }),
	template: `<ModalFooterConfirm id="confirm" @click="active = false"/>`,
	components: { ModalFooterConfirm },
};

describe("ModalFooterConfirm", () => {
	it("pressing the ok button should close the modal", () => {
		const wrapper = mount(button);
		expect(wrapper.find("#confirm").exists()).toBe(true);
		wrapper.find("#confirm").trigger("click");
	});
});
