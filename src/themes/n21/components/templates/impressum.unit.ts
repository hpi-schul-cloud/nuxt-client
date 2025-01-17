import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import Impressum from "./impressum.vue";
import { envsFactory } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";

describe("impressum.vue", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = (mail = "") => {
		const envs = envsFactory.build({
			SUPPORT_PROBLEM_EMAIL_ADDRESS: mail,
		});
		envConfigModule.setEnvs(envs);

		const wrapper = mount(Impressum, {
			global: {
				plugins: [createTestingI18n()],
				stubs: ["base-link"],
			},
		});
		return wrapper;
	};

	it("renders the component", () => {
		const wrapper = setup();
		expect(wrapper.findComponent(Impressum).exists()).toBeTruthy();
	});

	describe("when environment variable is no valid email", () => {
		it("should use correct values fro supportMail and mailtoSupportMail", () => {
			const supportMail = "support@example.com";
			const wrapper = setup(supportMail);

			const mailtoSupportMail = `mailto:${supportMail}`;
			const supportMailLink = wrapper.findComponent(
				"[data-testid=support-mail]"
			);
			expect(supportMailLink.attributes("href")).toBe(mailtoSupportMail);
			expect(supportMailLink.text()).toBe(supportMail);
		});
	});

	describe("when environment variable is no valid email", () => {
		it("should not use environment variable", () => {
			const wrapper = setup("invalid-email");

			expect(wrapper.vm.supportMail).toBe("");
			expect(wrapper.vm.mailtoSupportMail).toBe("#");
		});
	});
});
