import Registration from "./Registration.vue";
import Consent from "./steps/Consent.vue";
import LanguageSelection from "./steps/LanguageSelection.vue";
import Password from "./steps/Password.vue";
import { createTestEnvStore, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { LanguageType } from "@api-server";
import { useRegistrationStepper, useRegistrationStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { computed, nextTick, ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VStepper, VStepperItem } from "vuetify/components";

vi.mock("vue-i18n", async () => {
	const actual = await vi.importActual<typeof import("vue-i18n")>("vue-i18n");

	return {
		...actual,
		useI18n: () => ({
			t: vi.fn().mockImplementation((key) => key),
		}),
	};
});

vi.mock("@data-room/registration/registrationStepper.composable");
const useRegistrationStepperMock = vi.mocked(useRegistrationStepper);

let registrationStore: ReturnType<typeof useRegistrationStore>;

describe("Registration.vue", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore();
		registrationStore = mockedPiniaStoreTyping(useRegistrationStore);
	});
	const setup = (
		options?: Partial<{
			password: string;
			queryParams?: string;
			hasApiErrorOccurred?: boolean;
			registeredUserExists?: boolean;
			completeRegistrationSuccess?: boolean;
			omitQueryParam?: boolean;
		}>
	) => {
		useRegistrationStepperMock.mockReturnValue({
			selectedLanguage: ref(LanguageType.DE),
			password: ref(options?.password ?? ""),
			isPrivacyPolicyAccepted: ref(false),
			isTermsOfUseAccepted: ref(false),
			setCookie: vi.fn(),
			setSelectedLanguage: vi.fn(),
			initializeLanguage: vi.fn(),
			fullName: computed(() => "Max Mustermann"),
		});
		registrationStore.isLoading = false;
		registrationStore.registrationSecret = options?.queryParams ?? "secret-value";
		registrationStore.userData = {
			firstName: "Max",
			lastName: "Mustermann",
			email: "",
			registeredUserExists: options?.registeredUserExists ?? false,
		};
		registrationStore.hasApiErrorOccurred = options?.hasApiErrorOccurred ?? false;
		registrationStore.completeRegistration = vi.fn().mockResolvedValue(options?.completeRegistrationSuccess ?? true);

		const router = createRouterMock();
		if (options?.omitQueryParam) {
			router.setQuery({});
		} else {
			router.setQuery({ "registration-secret": options?.queryParams ?? "secret-value" });
		}
		injectRouterMock(router);

		const wrapper = mount(Registration, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify()],
				stubs: { I18nT: true, VMain: true },
			},
		});

		return { wrapper, useRegistrationStepper: useRegistrationStepperMock(), router };
	};

	it("should be rendered", () => {
		const { wrapper, useRegistrationStepper } = setup();
		expect(wrapper).toBeDefined();
		expect(useRegistrationStepper.initializeLanguage).toHaveBeenCalled();
		expect(useRegistrationStepper.selectedLanguage.value).toStrictEqual(LanguageType.DE);
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

				describe("when API error has occurred", () => {
					it("should be disabled", async () => {
						const { wrapper } = setup({ hasApiErrorOccurred: true });
						const stepper = wrapper.findComponent(VStepper);
						const continueButton = wrapper
							.find("[data-testid='registration-continue-button']")
							.getComponent({ name: "VBtn" });

						expect(stepper.props("modelValue")).toBe(1);
						expect(continueButton.props("disabled")).toStrictEqual(true);
					});
				});
			});
		});

		describe("Language Selection Component", () => {
			describe("when language is updated", () => {
				it("should call setSelectedLanguage", async () => {
					const { wrapper, useRegistrationStepper } = setup();
					const languageSelectionComponent = wrapper.getComponent(LanguageSelection);

					languageSelectionComponent.vm.$emit("update:selected-language", LanguageType.EN);
					await nextTick();

					expect(useRegistrationStepper.setSelectedLanguage).toHaveBeenCalledWith(LanguageType.EN);
				});
			});

			describe("when selectedLanguage value is undefined", () => {
				it("should have default language as German", () => {
					const { wrapper, useRegistrationStepper } = setup();
					useRegistrationStepper.selectedLanguage.value = undefined;
					const languageSelectionComponent = wrapper.getComponent(LanguageSelection);

					expect(languageSelectionComponent.props("selectedLanguage")).toBe(LanguageType.DE);
				});
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
				const { wrapper, useRegistrationStepper } = setup();
				const stepper = wrapper.findComponent(VStepper);
				await stepper.setValue(4);

				const consentComponent = wrapper.getComponent(Consent);

				expect(consentComponent.props("isPrivacyPolicyAccepted")).toBe(
					useRegistrationStepper.isPrivacyPolicyAccepted.value
				);
				expect(consentComponent.props("isTermsOfUseAccepted")).toBe(useRegistrationStepper.isTermsOfUseAccepted.value);
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

	describe("onMounted behavior", () => {
		describe("when query param is missing", () => {
			it("should redirect to home page", async () => {
				const { router } = setup({ omitQueryParam: true });
				await flushPromises();

				expect(router.replace).toHaveBeenCalledWith("/");
			});
		});

		describe("when query param is empty string", () => {
			it("should redirect to home page", async () => {
				const { router } = setup({ queryParams: "   " });
				await flushPromises();

				expect(router.replace).toHaveBeenCalledWith("/");
			});
		});

		describe("when registered user already exists", () => {
			describe("when completeRegistration succeeds", () => {
				it("should navigate to Success step", async () => {
					const { wrapper } = setup({
						registeredUserExists: true,
						completeRegistrationSuccess: true,
					});
					await flushPromises();

					const stepper = wrapper.findComponent(VStepper);
					expect(stepper.props("modelValue")).toBe(5);
				});

				it("should call completeRegistration", async () => {
					setup({
						registeredUserExists: true,
						completeRegistrationSuccess: true,
					});
					await flushPromises();

					expect(registrationStore.completeRegistration).toHaveBeenCalled();
				});
			});

			describe("when completeRegistration fails", () => {
				it("should not navigate to Success step", async () => {
					const { wrapper } = setup({
						registeredUserExists: true,
						completeRegistrationSuccess: false,
					});
					await flushPromises();

					const stepper = wrapper.findComponent(VStepper);
					expect(stepper.props("modelValue")).toBe(1);
				});
			});
		});
	});

	describe("onContinue behavior at consent step", () => {
		describe("when completeRegistration fails", () => {
			it("should not advance to next step", async () => {
				const validPassword = "ValidPassword1!";
				const { wrapper } = setup({
					password: validPassword,
					completeRegistrationSuccess: false,
				});

				// Navigate to consent step
				const continueButton = wrapper.get("[data-testid='registration-continue-button']");
				await continueButton.trigger("click"); // step 1 -> 2
				await continueButton.trigger("click"); // step 2 -> 3

				// Fill password
				const confirmPasswordField = wrapper.get("[data-testid='confirm-password']").get("input");
				await confirmPasswordField.setValue(validPassword);
				await continueButton.trigger("click"); // step 3 -> 4
				await flushPromises();

				// Accept consent
				const privacyCheckbox = wrapper.get("[data-testid='privacy-policy-checkbox']").get("input");
				const termsCheckbox = wrapper.get("[data-testid='terms-of-use-checkbox']").get("input");
				await privacyCheckbox.setValue(true);
				await termsCheckbox.setValue(true);

				// Click continue at consent step - should fail
				await continueButton.trigger("click");
				await flushPromises();

				const stepper = wrapper.findComponent(VStepper);
				expect(stepper.props("modelValue")).toBe(4);
			});
		});

		describe("when completeRegistration succeeds", () => {
			it("should advance to Success step", async () => {
				const validPassword = "ValidPassword1!";
				const { wrapper } = setup({
					password: validPassword,
					completeRegistrationSuccess: true,
				});

				// Navigate to consent step
				const continueButton = wrapper.get("[data-testid='registration-continue-button']");
				await continueButton.trigger("click"); // step 1 -> 2
				await continueButton.trigger("click"); // step 2 -> 3

				// Fill password
				const confirmPasswordField = wrapper.get("[data-testid='confirm-password']").get("input");
				await confirmPasswordField.setValue(validPassword);
				await continueButton.trigger("click"); // step 3 -> 4
				await flushPromises();

				// Accept consent
				const privacyCheckbox = wrapper.get("[data-testid='privacy-policy-checkbox']").get("input");
				const termsCheckbox = wrapper.get("[data-testid='terms-of-use-checkbox']").get("input");
				await privacyCheckbox.setValue(true);
				await termsCheckbox.setValue(true);

				// Click continue at consent step - should succeed
				await continueButton.trigger("click");
				await flushPromises();

				const stepper = wrapper.findComponent(VStepper);
				expect(stepper.props("modelValue")).toBe(5);
			});
		});
	});
});
