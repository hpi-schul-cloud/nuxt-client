import BaseLink from "@/components/base/BaseLink.vue";
import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import { envsFactory } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { RouterLinkStub } from "@vue/test-utils";
import Impressum from "./impressum.vue";

describe("impressum.vue", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = (mail = "") => {
		const envs = envsFactory.build({
			SC_CONTACT_EMAIL: mail,
		});
		envConfigModule.setEnvs(envs);

		const wrapper = mount(Impressum, {
			global: {
				plugins: [createTestingI18n()],
				stubs: { RouterLink: RouterLinkStub },
			},
			components: {
				BaseLink,
			},
		});
		return wrapper;
	};

	it("renders the component", () => {
		const wrapper = setup();
		expect(wrapper.findComponent(Impressum).exists()).toBeTruthy();
	});

	describe("when environment variable is no valid email", () => {
		it("should use correct values fro contactEmail and mailtocontactEmail", () => {
			const contactEmail = "support@example.com";
			const wrapper = setup(contactEmail);

			const mailtocontactEmail = `mailto:${contactEmail}`;
			const contactEmailLink = wrapper.find("[data-testid=support-mail]");
			expect(contactEmailLink.attributes("href")).toBe(mailtocontactEmail);
			expect(contactEmailLink.text()).toBe(contactEmail);
		});
	});

	describe("when environment variable is no valid email", () => {
		it("should not use environment variable", () => {
			const wrapper = setup("invalid-email");

			const contactEmailLink = wrapper.find("[data-testid=support-mail]");

			const fallbackEmail = "support@dbildungscloud.de";
			const mailtocontactEmail = `mailto:${fallbackEmail}`;
			expect(contactEmailLink.attributes("href")).toBe(mailtocontactEmail);
			expect(contactEmailLink.text()).toBe(fallbackEmail);
		});
	});
});
