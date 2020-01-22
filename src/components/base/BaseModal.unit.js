import { mount } from "@vue/test-utils";
import BaseModal from "./BaseModal";

const wait = (duration) =>
	new Promise((resolve) => {
		setTimeout(resolve, duration);
	});

const modal = {
	data: () => ({ active: false }),
	template: `
		<base-modal id="modal" ref="modal" :active.sync="active" @close="active = false">
			<div>
				<div class="modal-header">
					<h3>custom header</h3>
				</div>

				<div class="modal-body">
					Hello I'm a modal, do you like to close me? Then just click outside of my box or the button below.
				</div>

				<div class="modal-footer">
					<base-button id="button" class="is-light" @click="$refs.modal.close()">
						OK
					</base-button>
				</div>
			</div>
		</base-modal>
	`,
	components: { BaseModal },
};

describe("@components/BaseModal", () => {
	it(...isValidComponent(BaseModal));
	it(
		...rendersSlotContent(BaseModal, ["default"], {
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

	it("pressing outside the model content should close the modal", () => {
		const wrapper = mount(modal);

		wrapper.vm.active = true;
		expect(wrapper.find("#button").exists()).toBe(true);
		wrapper.find(".base-modal-wrapper").trigger("click");
		expect(wrapper.find("#button").exists()).toBe(false);
	});

	it("closed modal can be reopened after clicking outside", async () => {
		// TODO this test may can be removed, the problematic code is removed now.
		const wrapper = mount(modal);
		wrapper.vm.active = true;
		expect(wrapper.find("#button").exists()).toBe(true);
		wrapper.find(".base-modal-wrapper").trigger("click");
		expect(wrapper.find("#button").exists()).toBe(false);
		await wait(300);
		wrapper.vm.active = true;
		expect(wrapper.find("#button").exists()).toBe(true);
	});
});
