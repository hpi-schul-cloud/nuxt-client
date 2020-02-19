import { mount } from "@vue/test-utils";
import BaseModal from "./BaseModal";

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
					<base-button id="btn-close" class="is-light" @click="$refs.modal.close()">
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

	it("changing the active property should open and close the modal", async () => {
		const wrapper = mount(modal);

		expect(wrapper.find("#btn-close").exists()).toBe(false);
		wrapper.vm.active = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find("#btn-close").exists()).toBe(true);
	});

	it("pressing the ok button should close the modal", async () => {
		const wrapper = mount(modal, {
			...createComponentMocks({ stubs: { transition: true } }),
		});

		expect(wrapper.find("#btn-close").exists()).toBe(false);
		wrapper.vm.active = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find("#btn-close").exists()).toBe(true);
		wrapper.find("#btn-close").trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.find("#btn-close").exists()).toBe(false);
	});

	it("pressing outside the model content should close the modal", async () => {
		const wrapper = mount(modal);

		wrapper.vm.active = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find("#btn-close").exists()).toBe(true);
		wrapper.find(".base-modal-wrapper").trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.find("#btn-close").exists()).toBe(false);
	});

	it("closed modal can be reopened after clicking outside", async () => {
		// TODO this test may can be removed, the problematic code is removed now.
		const wrapper = mount(modal);
		wrapper.vm.active = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find("#btn-close").exists()).toBe(true);
		wrapper.find(".base-modal-wrapper").trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.find("#btn-close").exists()).toBe(false);
		await wait(300);
		wrapper.vm.active = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find("#btn-close").exists()).toBe(true);
	});
});
