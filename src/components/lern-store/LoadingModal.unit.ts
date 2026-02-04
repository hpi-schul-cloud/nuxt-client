import LoadingModal from "./LoadingModal.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { VBtn, VCard, VDialog, VProgressCircular } from "vuetify/components";

describe("@/components/lern-store/LoadingModal", () => {
	it(`should render correctly `, () => {
		const wrapper = mount(LoadingModal, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			props: {
				modelValue: true,
			},
		});

		const dialogContent = wrapper.findComponent(VDialog).findComponent(VCard);

		const spinner = dialogContent.findComponent(VProgressCircular);
		const title = dialogContent.find("h2");
		const cancelButton = dialogContent.findComponent(VBtn);

		expect(spinner.exists()).toBe(true);
		expect(title.text()).toBe("pages.content.notification.loading");
		expect(cancelButton.exists()).toBe(true);
		expect(cancelButton.text()).toBe("common.actions.cancel");
	});
});
