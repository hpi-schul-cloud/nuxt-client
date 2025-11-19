import Consent from "./Consent.vue";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VCheckbox } from "vuetify/components";

describe("Consent.vue", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore();
	});

	const setup = () => {
		const wrapper = mount(Consent, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				isTermsOfUseAccepted: false,
				isPrivacyPolicyAccepted: false,
				userName: "Max Mustermann",
			},
		});
		return { wrapper };
	};

	const getCheckbpoxByTestId = (wrapper: VueWrapper, testId: string) =>
		wrapper.get(`[data-testid=${testId}]`).getComponent(VCheckbox);

	describe("Consent.vue", () => {
		it("should render", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
		});

		describe("translation keys", () => {
			it("should contain all necessary translation keys", () => {
				const { wrapper } = setup();
				const translationKeys = [
					"pages.registrationExternalMembers.steps.declarationOfConsent.firstParagraph",
					"pages.registrationExternalMembers.steps.declarationOfConsent.checkbox.consent",
					"pages.registrationExternalMembers.steps.declarationOfConsent.checkbox.consent.subtext",
					"pages.registrationExternalMembers.steps.declarationOfConsent.checkbox.termsOfUse",
					// "pages.registrationExternalMembers.steps.declarationOfConsent.validation.required",
				];

				translationKeys.forEach((key) => {
					expect(wrapper.html()).toContain(key);
				});
			});
		});
	});

	describe("privacy policy checkbox", () => {
		it("should render privacy policy checkbox", () => {
			const { wrapper } = setup();
			const privacyPolicyCheckbox = getCheckbpoxByTestId(wrapper, "privacy-policy-checkbox");

			expect(privacyPolicyCheckbox.props("modelValue")).toBe(false);
		});

		it("should show validation error when checkboxes are not checked", async () => {
			const { wrapper } = setup();
			const privacyPolicyCheckbox = getCheckbpoxByTestId(wrapper, "privacy-policy-checkbox");

			await privacyPolicyCheckbox.setValue(true);
			await privacyPolicyCheckbox.setValue(false);
			await privacyPolicyCheckbox.trigger("blur");

			expect(privacyPolicyCheckbox.text()).toContain(
				"pages.registrationExternalMembers.steps.declarationOfConsent.validation.required"
			);
		});
	});

	describe("terms of use checkbox", () => {
		it("should render terms of use checkbox", () => {
			const { wrapper } = setup();
			const termsOfUseCheckbox = getCheckbpoxByTestId(wrapper, "terms-of-use-checkbox");

			expect(termsOfUseCheckbox.props("modelValue")).toBe(false);
		});

		it("should show validation error when checkboxes are not checked", async () => {
			const { wrapper } = setup();
			const termsOfUseCheckbox = getCheckbpoxByTestId(wrapper, "terms-of-use-checkbox");

			await termsOfUseCheckbox.setValue(true);
			await termsOfUseCheckbox.setValue(false);
			await termsOfUseCheckbox.trigger("blur");

			expect(termsOfUseCheckbox.text()).toContain(
				"pages.registrationExternalMembers.steps.declarationOfConsent.validation.required"
			);
		});
	});
});
