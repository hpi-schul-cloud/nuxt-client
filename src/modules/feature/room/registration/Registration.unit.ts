import Registration from "./Registration.vue";
import Consent from "./steps/Consent.vue";
import LanguageSelection from "./steps/LanguageSelection.vue";
import Password from "./steps/Password.vue";
import { LanguageType } from "@/serverApi/v3";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { useRegistration } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick, ref } from "vue";
import { VStepper, VStepperItem } from "vuetify/components";

vi.mock("vue-i18n", () => ({
	useI18n: () => ({
		t: vi.fn().mockImplementation((key) => key),
	}),
}));

vi.mock("@data-room/registration/registration.composable");
const useRegistrationMock = vi.mocked(useRegistration);

describe("Registration.vue", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore();
	});
	const setup = (
		options?: Partial<{
			password: string;
		}>
	) => {
		useRegistrationMock.mockReturnValue({
			selectedLanguage: ref(LanguageType.De),
			password: ref(options?.password ?? ""),
			isPrivacyPolicyAccepted: ref(false),
			isTermsOfUseAccepted: ref(false),
			setCookie: vi.fn(),
			setSelectedLanguage: vi.fn(),
			initializeLanguage: vi.fn(),
			userName: ref("Max Mustermann"),
		});

		const wrapper = mount(Registration, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify()],
				stubs: { I18nT: true },
			},
		});

		return { wrapper, useRegistration: useRegistrationMock() };
	};

	it("should be rendered", () => {
		const { wrapper, useRegistration } = setup();
		expect(wrapper).toBeDefined();
		expect(useRegistration.initializeLanguage).toHaveBeenCalled();
		expect(useRegistration.selectedLanguage.value).toStrictEqual(LanguageType.De);
	});

	describe("Stepper Component", () => {
		it("should have stepper component", () => {
			const { wrapper } = setup();
			const stepperComponent = wrapper.findComponent(VStepper);
			expect(stepperComponent.exists()).toBe(true);
			expect(stepperComponent.props("modelValue")).toBe(1);
		});

		it("should have 5 steps", () => {
			const { wrapper } = setup();

			const stepComponents = wrapper.findAllComponents(VStepperItem);
			expect(stepComponents.length).toBe(5);
		});

		describe("Stepper Actions", () => {
			it("should have stepper actions component", () => {
				const { wrapper } = setup();
				const stepperActionsComponent = wrapper.findComponent({ name: "VStepperActions" });
				expect(stepperActionsComponent.exists()).toBe(true);
			});

			describe("when step is 1", () => {
				it("should have only 'Continue' button", () => {
					const { wrapper } = setup();

					const backButton = wrapper.find("[data-testid='registration-back-button']");
					const nextButton = wrapper.find("[data-testid='registration-continue-button']");

					expect(backButton.exists()).toBe(false);
					expect(nextButton.exists()).toBe(true);
				});
			});

			describe("when step is greater than 1", () => {
				it("should have 'Back' and 'Continue' buttons", async () => {
					const { wrapper } = setup();
					const nextButton = wrapper.find("[data-testid='registration-continue-button']");

					await nextButton.trigger("click");

					const backButton = wrapper.find("[data-testid='registration-back-button']");
					expect(backButton.exists()).toBe(true);
					expect(nextButton.exists()).toBe(true);
				});
			});

			describe("back button", () => {
				it("should go to previous step on click", async () => {
					const { wrapper } = setup();
					const stepper = wrapper.findComponent(VStepper);
					await stepper.setValue(2);
					expect(stepper.props("modelValue")).toBe(2);

					const backButton = wrapper.get("[data-testid='registration-back-button']");
					await backButton.trigger("click");
					expect(stepper.props("modelValue")).toBe(1);
				});

				it("should focus heading of previous step on click", async () => {
					const { wrapper } = setup();
					const stepper = wrapper.findComponent(VStepper);
					await stepper.setValue(2);

					const backButton = wrapper.get("[data-testid='registration-back-button']");
					await backButton.trigger("click");

					const welcomeStepHeading = wrapper.get("#step-heading-language");
					expect(document.activeElement).toEqual(welcomeStepHeading.element);
				});
			});

			describe("continue button", () => {
				it("should go to next step on click", async () => {
					const { wrapper } = setup();
					const stepper = wrapper.findComponent(VStepper);
					const continueButton = wrapper.get("[data-testid='registration-continue-button']");

					expect(stepper.props("modelValue")).toBe(1);

					await continueButton.trigger("click");
					expect(stepper.props("modelValue")).toBe(2);
				});

				it("should focus heading of next step on click", async () => {
					const { wrapper } = setup();
					const continueButton = wrapper.get("[data-testid='registration-continue-button']");

					await continueButton.trigger("click");
					await nextTick();

					const welcomeStepHeading = wrapper.get("#step-heading-welcome");
					expect(document.activeElement).toEqual(welcomeStepHeading.element);
				});
			});
		});

		describe("Language Selection Component", () => {
			it("should call setSelectedLanguage when language is updated", async () => {
				const { wrapper, useRegistration } = setup();
				const languageSelectionComponent = wrapper.getComponent(LanguageSelection);

				languageSelectionComponent.vm.$emit("update:selected-language", LanguageType.En);
				await nextTick();

				expect(useRegistration.setSelectedLanguage).toHaveBeenCalledWith(LanguageType.En);
			});

			it("should have default language as German even if the selectedLanguage's value is undefined", () => {
				const { wrapper, useRegistration } = setup();
				useRegistration.selectedLanguage.value = undefined;
				const languageSelectionComponent = wrapper.getComponent(LanguageSelection);

				expect(languageSelectionComponent.props("selectedLanguage")).toBe(LanguageType.De);
			});
		});

		describe("Password Step", () => {
			it("should render Password component at password step (3)", async () => {
				const { wrapper } = setup();
				const stepper = wrapper.findComponent(VStepper);
				await stepper.setValue(3);

				const passwordComponent = wrapper.findComponent(Password);
				expect(passwordComponent.exists()).toBe(true);
			});

			it("should focus first invalid field on continue button click", async () => {
				const { wrapper } = setup();
				// we need to step twice here to reach the password step as just setValue() will not initiliaze the step forms array properly
				const continueButton = wrapper.get("[data-testid='registration-continue-button']");
				await continueButton.trigger("click");
				await continueButton.trigger("click");

				await continueButton.trigger("click");
				await flushPromises();

				const passwordField = wrapper.get("[data-testid='password']").get("input");
				expect(document.activeElement).toBe(passwordField.element);
			});
		});

		describe("Consent Step", () => {
			it("should render Consent component at consent step (4)", async () => {
				const { wrapper } = setup();
				const stepper = wrapper.findComponent(VStepper);
				await stepper.setValue(4);

				const consentComponent = wrapper.findComponent(Consent);
				expect(consentComponent.exists()).toBe(true);
			});

			it("should properly pass v-model values to Consent component", async () => {
				const { wrapper, useRegistration } = setup();
				const stepper = wrapper.findComponent(VStepper);
				await stepper.setValue(4);

				const consentComponent = wrapper.getComponent(Consent);

				expect(consentComponent.props("isPrivacyPolicyAccepted")).toBe(useRegistration.isPrivacyPolicyAccepted.value);
				expect(consentComponent.props("isTermsOfUseAccepted")).toBe(useRegistration.isTermsOfUseAccepted.value);
			});

			it("should focus first invalid checkbox on continue button click", async () => {
				const validPassword = "ValidPassword1!";
				const { wrapper } = setup({ password: validPassword });
				// we need to trigger to reach the consent step as just setValue() will not initiliaze the step forms array properly
				const continueButton = wrapper.get("[data-testid='registration-continue-button']");
				await continueButton.trigger("click");
				await continueButton.trigger("click");
				const passwordField = wrapper.get("[data-testid='confirm-password']").get("input");
				await passwordField.setValue(validPassword);
				await continueButton.trigger("click");
				await flushPromises();

				await continueButton.trigger("click");
				await flushPromises();

				const privacyPolicyCheckbox = wrapper.get("[data-testid='privacy-policy-checkbox']").get("input");
				expect(document.activeElement).toBe(privacyPolicyCheckbox.element);
			});
		});
	});
});
