import RegistrationInfo from "./RegistrationInfo.vue";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VBtn, VCardText, VCardTitle } from "vuetify/components";

describe("RegistrationInfo", () => {
	const setup = async (props = {}, { isConsentNecessary = true } = {}) => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({
			FEATURE_CONSENT_NECESSARY: isConsentNecessary,
		});

		const wrapper = mount(RegistrationInfo, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		const button = wrapper.findComponent(VBtn);
		await button.trigger("click");

		const title = wrapper.findComponent(VCardTitle);

		return { wrapper, title };
	};

	describe("when consent is necessary", () => {
		it("should render consent headline", async () => {
			const { title } = await setup();
			expect(title.text()).toContain("pages.administration.students.infobox.headline");
		});

		it("when showExternalText is false it should render default consent content ", async () => {
			const { wrapper } = await setup({ showExternalText: false });
			const textContent = wrapper.findComponent(VCardText);

			expect(textContent.text()).toContain("pages.administration.students.infobox.paragraph-1");
			expect(textContent.text()).toContain("pages.administration.students.infobox.li-1");
		});

		it("should render LDAP content when showExternalText is true", async () => {
			const { wrapper } = await setup({ showExternalText: true });
			const textContent = wrapper.findComponent(VCardText);

			expect(textContent.text()).toContain("pages.administration.students.infobox.LDAP.paragraph-1");
			expect(textContent.text()).toContain("pages.administration.students.infobox.LDAP.paragraph-3");
		});
	});

	describe("when consent is not necessary", () => {
		it("should render registration only headline", async () => {
			const { title } = await setup({}, { isConsentNecessary: false });

			expect(title.text()).toContain("pages.administration.students.infobox.registrationOnly.headline");
		});

		it("should render registration only content", async () => {
			const { wrapper } = await setup({}, { isConsentNecessary: false });
			const textContent = wrapper.findComponent(VCardText);

			expect(textContent.text()).toContain("pages.administration.students.infobox.registrationOnly.paragraph-1");
			expect(textContent.text()).toContain("pages.administration.students.infobox.registrationOnly.li-1");
		});
	});
});
