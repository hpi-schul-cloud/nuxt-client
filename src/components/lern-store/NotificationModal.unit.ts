import NotificationModal from "./NotificationModal.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiAlertCircle, mdiCheckCircle } from "@icons/material";
import { mount } from "@vue/test-utils";
import { VBtn, VCard, VDialog, VIcon } from "vuetify/components";

const testProps = {
	showNotificationModal: true,
	successMsg: "test success",
	errorMsg: "test error",
};

describe("@/components/molecules/NotificationModal", () => {
	const setup = (isSuccess: boolean) =>
		mount(NotificationModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				...testProps,
				isSuccess,
			},
		});

	describe("success case", () => {
		it("should render correct title", () => {
			const wrapper = setup(true);

			const content = wrapper.findComponent(VDialog).findComponent(VCard);
			const title = content.find("h2");

			expect(title.text()).toBe(testProps.successMsg);
		});

		it("should render success icon", () => {
			const wrapper = setup(true);

			const content = wrapper.findComponent(VDialog).findComponent(VCard);
			const icon = content.findComponent(VIcon);

			expect(icon.exists()).toBe(true);
			expect(icon.props("icon")).toBe(mdiCheckCircle);
		});
	});

	describe("error case", () => {
		it("should render corect title", () => {
			const wrapper = setup(false);

			const content = wrapper.findComponent(VDialog).findComponent(VCard);
			const title = content.find("h2");

			expect(title.text()).toBe(testProps.errorMsg);
		});

		it("should render error icon", () => {
			const wrapper = setup(false);

			const content = wrapper.findComponent(VDialog).findComponent(VCard);
			const icon = content.findComponent(VIcon);

			expect(icon.exists()).toBe(true);
			expect(icon.props("icon")).toBe(mdiAlertCircle);
		});
	});

	it("executes close action after close", async () => {
		const wrapper = setup(false);

		const content = wrapper.findComponent(VDialog).findComponent(VCard);

		const button = content.getComponent(VBtn);
		await button.trigger("click");

		expect(wrapper.emitted("close")).toBeDefined();
		expect(wrapper.emitted("update:show-notification-modal")).toBeDefined();
	});
});
