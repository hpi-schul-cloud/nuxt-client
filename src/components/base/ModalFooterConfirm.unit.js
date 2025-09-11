import ModalFooterConfirm from "./ModalFooterConfirm";
import { mount } from "@vue/test-utils";

const button = {
	data: () => ({ active: false }),
	template: `<modal-footer-confirm id="confirm" @click="active = false"/>`,
	components: { ModalFooterConfirm },
};

describe("@/components/molecules/ModalFooterConfirm", () => {
	it("pressing the ok button should close the modal", () => {
		const wrapper = mount(button);
		expect(wrapper.find("#confirm").exists()).toBe(true);
		wrapper.vm.active = true;
		expect(wrapper.find("#confirm").exists()).toBe(true);
		wrapper.find("#confirm").trigger("click");
	});
});
