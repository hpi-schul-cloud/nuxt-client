import RegistrationInfo from "./RegistrationInfo.vue";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VBtn, VCardTitle } from "vuetify/components";

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

	//afterEach(() => {
	//	wrapper?.unmount();
	//	vi.clearAllMocks();
	//});

	describe("when consent is necessary", () => {
		it("should render consent headline", async () => {
			const { title } = await setup();
			expect(title.text()).toContain("pages.administration.students.infobox.headline");
		});

		it("should render default consent content when showExternalText is false", async () => {
			await setup({ showExternalText: false });

			expect(document.body.textContent).toContain("pages.administration.students.infobox.paragraph-1");
			expect(document.body.textContent).toContain("pages.administration.students.infobox.li-1");
		});

		it("should render LDAP content when showExternalText is true", async () => {
			await setup({ showExternalText: true });

			expect(document.body.textContent).toContain("pages.administration.students.infobox.LDAP.paragraph-1");
			expect(document.body.textContent).toContain("pages.administration.students.infobox.LDAP.paragraph-3");
		});
	});

	describe("when consent is not necessary", () => {
		it("should render registration only headline", async () => {
			await setup({}, { isConsentNecessary: false });
			const title = document.querySelector('[data-testid="infobox-title"]');

			expect(title?.textContent).toContain("pages.administration.students.infobox.registrationOnly.headline");
		});

		it("should render registration only content", async () => {
			await setup({}, { isConsentNecessary: false });

			expect(document.body.textContent).toContain("pages.administration.students.infobox.registrationOnly.paragraph-1");
			expect(document.body.textContent).toContain("pages.administration.students.infobox.registrationOnly.li-1");
		});
	});
});
