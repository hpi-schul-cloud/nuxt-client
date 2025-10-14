import Registration from "./Registration.vue";
import { LanguageType } from "@/serverApi/v3";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { useRegistration } from "@data-room";
import { nextTick, ref } from "vue";

vi.mock("vue-i18n", () => ({
	useI18n: () => ({
		t: vi.fn().mockImplementation((key) => key),
	}),
}));

vi.mock("@data-room/registration/registration.composable");
const useRegistrationMock = vi.mocked(useRegistration);

describe("Registration.vue", () => {
	const setup = () => {
		useRegistrationMock.mockReturnValue({
			selectedLanguage: ref(LanguageType.De),
			setCookie: vi.fn(),
			setSelectedLanguage: vi.fn(),
			initializeLanguage: vi.fn(),
		});

		const wrapper = mount(Registration, {
			global: {
				plugins: [createTestingVuetify()],
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
			const stepperComponent = wrapper.findComponent({ name: "VStepper" });
			expect(stepperComponent.exists()).toBe(true);
			expect(stepperComponent.props("modelValue")).toBe(1);
		});

		it("should have 6 steps", () => {
			const { wrapper } = setup();

			const stepComponents = wrapper.findAllComponents({ name: "VStepperItem" });
			expect(stepComponents.length).toBe(6);
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
					const nextButton = wrapper.find("[data-testid='registiration-continue-button']");

					expect(backButton.exists()).toBe(false);
					expect(nextButton.exists()).toBe(true);
				});

				it("should have 'Language Selection' component", () => {
					const { wrapper } = setup();
					const languageSelectionComponent = wrapper.findComponent({ name: "LanguageSelection" });
					expect(languageSelectionComponent.exists()).toBe(true);
				});
			});

			describe("when step is greater than 1", () => {
				it("should have 'Back' and 'Continue' buttons", async () => {
					const { wrapper } = setup();
					const nextButton = wrapper.find("[data-testid='registiration-continue-button']");

					await nextButton.trigger("click");

					const backButton = wrapper.find("[data-testid='registration-back-button']");
					expect(backButton.exists()).toBe(true);
					expect(nextButton.exists()).toBe(true);
				});
			});
		});

		it("should call setSelectedLanguage when language is updated", async () => {
			const { wrapper, useRegistration } = setup();
			const languageSelectionComponent = wrapper.findComponent({ name: "LanguageSelection" });

			languageSelectionComponent.vm.$emit("update:selected-language", LanguageType.En);
			await nextTick();

			expect(useRegistration.setSelectedLanguage).toHaveBeenCalledWith(LanguageType.En);
		});
	});
});
