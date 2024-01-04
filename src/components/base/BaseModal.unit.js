import { mount } from "@vue/test-utils";
import BaseModal from "./BaseModal";
import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";

describe("@/components/base/BaseModal", () => {
	const setup = (options = {}) => {
		const wrapper = mount(BaseModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			slots: {
				default: `<div class="modal-content"/>`,
			},
			...options,
		});

		return { wrapper };
	};

	it("changing the active property should open and close the modal", async () => {
		const { wrapper } = setup();

		expect(wrapper.find(".modal-content").exists()).toBe(false);

		await wrapper.setProps({ active: true });

		expect(wrapper.find(".modal-content").exists()).toBe(true);
	});

	describe("when clicking outside the modal", () => {
		it("should emit the update:active event", async () => {
			const { wrapper } = setup({ props: { active: true } });

			await wrapper.find(".base-modal-wrapper").trigger("click");

			expect(wrapper.emitted("update:active")[0][0]).toBe(false);
		});

		it("should emit the onBackdropClick event", async () => {
			const { wrapper } = setup({ props: { active: true } });

			await wrapper.find(".base-modal-wrapper").trigger("click");

			expect(wrapper.emitted("onBackdropClick").length).toBe(1);
		});
	});
});
