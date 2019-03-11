import { mount } from "@vue/test-utils";
import BaseModal from "./BaseModal";

const modal = {
	data: () => ({ active: false }),
	template: `
		<BaseModal id="modal" ref="modal" :active.sync="active" @close="active = false">
			<div>
				<div class="modal-header">
					<h3>custom header</h3>
				</div>

				<div class="modal-body">
					Hello I'm a modal, do you like to close me? Then just click outside of my box or the button below.
				</div>

				<div class="modal-footer">
					<BaseButton id="button" class="is-light" @click="$refs.modal.close()">
						OK
					</BaseButton>
				</div>
			</div>
		</BaseModal>
	`,
	components: { BaseModal },
};

describe("@components/BaseModal", () => {
	it(...isValidComponent(BaseModal));
	it(
		...rendersDefaultSlotContent(BaseModal, {
			propsData: {
				active: true,
			},
		})
	);

	it("changing the active property should open and close the modal", () => {
		const wrapper = mount(modal);

		expect(wrapper.find("#button").exists()).toBe(false);
		wrapper.vm.active = true;
		expect(wrapper.find("#button").exists()).toBe(true);
	});

	it("pressing the ok button should close the modal", () => {
		const wrapper = mount(modal);

		expect(wrapper.find("#button").exists()).toBe(false);
		wrapper.vm.active = true;
		expect(wrapper.find("#button").exists()).toBe(true);
		wrapper.find("#button").trigger("click");
		expect(wrapper.find("#button").exists()).toBe(false);
	});
});
