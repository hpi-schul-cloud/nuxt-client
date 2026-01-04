import Consent from "./Consent.vue";
import { LanguageType, SchulcloudTheme } from "@/serverApi/v3";
import { createTestEnvStore, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useRegistrationStepper, useRegistrationStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { computed, ref } from "vue";
import { VCheckbox } from "vuetify/components";

vi.mock("@data-room/registration/registrationStepper.composable");
const useRegistrationStepperMock = vi.mocked(useRegistrationStepper);

let registrationStore: ReturnType<typeof useRegistrationStore>;

describe("Consent.vue", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		registrationStore = mockedPiniaStoreTyping(useRegistrationStore);
	});

	const setup = (theme?: SchulcloudTheme) => {
		useRegistrationStepperMock.mockReturnValue({
			selectedLanguage: ref(LanguageType.De),
			password: ref(""),
			isPrivacyPolicyAccepted: ref(false),
			isTermsOfUseAccepted: ref(false),
			setCookie: vi.fn(),
			setSelectedLanguage: vi.fn(),
			initializeLanguage: vi.fn(),
			fullName: computed(() => "Max Mustermann"),
		});
		registrationStore.isLoading = false;
		registrationStore.registrationSecret = "";
		registrationStore.userData = {
			firstName: "Max",
			lastName: "Mustermann",
			email: "",
		};
		createTestEnvStore({
			SC_THEME: theme ?? SchulcloudTheme.Default,
		});
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

	describe("Rendering", () => {
		it("should render the component", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
		});

		describe("translation keys", () => {
			it.each([
				{
					theme: SchulcloudTheme.Default,
					translationKeys: [
						"pages.registrationExternalMembers.steps.declarationOfConsent.firstParagraph",
						"pages.registrationExternalMembers.steps.declarationOfConsent.checkbox.consent.text.default",
						"pages.registrationExternalMembers.steps.declarationOfConsent.checkbox.consent.subtext.default",
						"pages.registrationExternalMembers.steps.declarationOfConsent.checkbox.termsOfUse",
					],
					description: "should contain all necessary translation keys",
				},
				{
					theme: SchulcloudTheme.Brb,
					translationKeys: [
						"pages.registrationExternalMembers.steps.declarationOfConsent.firstParagraph",
						"pages.registrationExternalMembers.steps.declarationOfConsent.checkbox.consent.text.brb",
						"pages.registrationExternalMembers.steps.declarationOfConsent.checkbox.consent.subtext.brb",
						"pages.registrationExternalMembers.steps.declarationOfConsent.checkbox.termsOfUse",
					],
					description: "should contain all necessary translation keys when instance is BRB",
				},
			])("$description", ({ theme, translationKeys }) => {
				const { wrapper } = setup(theme);
				translationKeys.forEach((key) => {
					expect(wrapper.html()).toContain(key);
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

				expect(privacyPolicyCheckbox.text()).toContain("");
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

				expect(termsOfUseCheckbox.text()).toContain("");
			});
		});
	});
});
