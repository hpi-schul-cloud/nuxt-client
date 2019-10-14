import BaseModalFooterButton from "./BaseModalFooterButton";
import BaseModal from "./BaseModal";
import { mount } from "@vue/test-utils";

const button = {
	data: () => ({ active: false }),
	template: `

				<base-modal-footer-button id="button-full-width" @click="active = false"/>
			`,
	components: { BaseModalFooterButton, BaseModal },
};

describe("@components/BaseModalFooterButtton", () => {
	it(
		...isValidComponent(BaseModalFooterButton, {
			propsData: {
				active: true,
			},
		})
	);
});

it("pressing the ok button should close the modal", () => {
	const wrapper = mount(button);
	expect(wrapper.find("#button-full-width").exists()).toBe(true);
	wrapper.vm.active = true;
	expect(wrapper.find("#button-full-width").exists()).toBe(true);
	wrapper.find("#button-full-width").trigger("click");
});
