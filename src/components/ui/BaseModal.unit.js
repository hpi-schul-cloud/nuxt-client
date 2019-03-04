import { mount } from "@vue/test-utils";
import BaseModal from "./BaseModal";

const modal = {
	data: () => ({ showModal: false }),
	template: `
	<BaseModal id="modal" :show-modal="showModal" @close="showModal = false">
		<h3 slot="header">custom header</h3>
		<div slot="body">
			Hello I'm a modal, do you like to close me? Then just click outside of my box or the button below.
		</div>
		<div slot="footer">
			<BaseButton id="button" class="is-light" @click="showModal = false">
				OK
			</BaseButton>
		</div>
	</BaseModal>				
	`,
	components: { BaseModal },
};

describe("@components/BaseButton", () => {
	it("exports a valid component", () => {
		expect(BaseModal).toBeAComponent();
	});

	it("changing the showModal property should open the modal", () => {
		const wrapper = mount(modal);

		expect(wrapper.find("#button").exists()).toBe(false);
		wrapper.vm.showModal = true;
		expect(wrapper.find("#button").exists()).toBe(true);
	});

	it("pressing the ok button should close the modal", () => {
		const wrapper = mount(modal);

		expect(wrapper.find("#button").exists()).toBe(false);

		wrapper.vm.showModal = true;

		expect(wrapper.find("#button").exists()).toBe(true);

		wrapper.find("#button").trigger("click");

		expect(wrapper.find("#button").exists()).toBe(false);
	});
});
