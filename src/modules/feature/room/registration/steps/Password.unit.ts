import Password from "./Password.vue";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VTextField } from "vuetify/components";

describe("Password.vue", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore();
	});

	const setup = (
		options?: Partial<{
			windowWidth: number;
		}>
	) => {
		Object.defineProperty(globalThis, "innerWidth", {
			value: options?.windowWidth || 600,
		});

		const wrapper = mount(Password, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		return { wrapper };
	};

	const getTextFieldByTestId = (wrapper: VueWrapper, testId: string) =>
		wrapper.get(`[data-testid=${testId}]`).getComponent(VTextField);

	it(" should render", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	describe("readonly pre-filled data", () => {
		it("should render first name field", () => {
			const { wrapper } = setup();
			const firstName = getTextFieldByTestId(wrapper, "first-name");

			expect(firstName.props("readonly")).toBe(true);
			expect(firstName.props("modelValue")).toBe("Vorname");
		});

		it("should render last name field", () => {
			const { wrapper } = setup();
			const lastName = getTextFieldByTestId(wrapper, "last-name");

			expect(lastName.props("readonly")).toBe(true);
			expect(lastName.props("modelValue")).toBe("Nachname");
		});

		it("should render email field", () => {
			const { wrapper } = setup();
			const email = getTextFieldByTestId(wrapper, "email");

			expect(email.props("readonly")).toBe(true);
			expect(email.props("modelValue")).toBe("Email");
		});

		it("should render first and last name in a row on display sizes bigger than 600px", () => {
			const { wrapper } = setup();
			const firstName = getTextFieldByTestId(wrapper, "first-name");
			const parent = firstName.element.parentElement;

			expect(parent.className).not.toContain("flex-column");
		});

		it("should render first and last name in column on display sizes below 600px", () => {
			const { wrapper } = setup({ windowWidth: 500 });
			const firstName = getTextFieldByTestId(wrapper, "first-name");
			const parent = firstName.element.parentElement;

			expect(parent.className).toContain("flex-column");
		});
	});

	describe("password fields", () => {
		it("should render password fields", () => {
			const { wrapper } = setup();
			const password = getTextFieldByTestId(wrapper, "password");
			const confirmPassword = getTextFieldByTestId(wrapper, "confirm-password");

			expect(password.props("label")).toBe("common.labels.password");
			expect(confirmPassword.props("label")).toBe("common.labels.password.confirmation");
		});

		it("should associate the password field with the password instructions for accessibility", () => {
			const { wrapper } = setup();
			const password = getTextFieldByTestId(wrapper, "password").find("input");

			expect(password.attributes("aria-describedby")).toBe("password-instructions");
		});

		it("should render in a row on display sizes bigger than 600px", () => {
			const { wrapper } = setup();
			const password = getTextFieldByTestId(wrapper, "password");
			const parent = password.element.parentElement;

			expect(parent.className).not.toContain("flex-column");
		});

		it("should render in column on display sizes below 600px", () => {
			const { wrapper } = setup({ windowWidth: 500 });
			const password = getTextFieldByTestId(wrapper, "password");
			const parent = password.element.parentElement;

			expect(parent.className).toContain("flex-column");
		});

		describe("validation", () => {
			it("should show an error if password is empty", async () => {
				const { wrapper } = setup();
				const password = getTextFieldByTestId(wrapper, "password");

				await password.setValue("");
				await password.trigger("blur");

				expect(password.text()).toContain("pages.registrationExternalMembers.steps.password.validation.required");
			});

			it("should show an error if password is too short", async () => {
				const { wrapper } = setup();
				const password = getTextFieldByTestId(wrapper, "password");
				const shortPassword = "a".repeat(7);

				await password.setValue(shortPassword);
				await password.trigger("blur");
				await flushPromises();

				expect(password.text()).toContain("pages.registrationExternalMembers.steps.password.validation.minLength");
			});

			it("should show an error if password has no uppercase letter", async () => {
				const { wrapper } = setup();
				const password = getTextFieldByTestId(wrapper, "password");

				await password.setValue("password123!");
				await password.trigger("blur");
				await flushPromises();

				expect(password.text()).toContain("pages.registrationExternalMembers.steps.password.validation.upperCase");
			});

			it("should show an error if password has no lowercase letter", async () => {
				const { wrapper } = setup();
				const password = getTextFieldByTestId(wrapper, "password");

				await password.setValue("PASSWORD123!");
				await password.trigger("blur");
				await flushPromises();

				expect(password.text()).toContain("pages.registrationExternalMembers.steps.password.validation.lowerCase");
			});

			it("should show an error if password has no number", async () => {
				const { wrapper } = setup();
				const password = getTextFieldByTestId(wrapper, "password");

				await password.setValue("Password!");
				await password.trigger("blur");
				await flushPromises();

				expect(password.text()).toContain("pages.registrationExternalMembers.steps.password.validation.number");
			});

			it("should show an error if password has no special character", async () => {
				const { wrapper } = setup();
				const password = getTextFieldByTestId(wrapper, "password");

				await password.setValue("Password123");
				await password.trigger("blur");
				await flushPromises();

				expect(password.text()).toContain(
					"pages.registrationExternalMembers.steps.password.validation.specialCharacter"
				);
			});

			it("should show an error if passwords do not match", async () => {
				const { wrapper } = setup();
				const password = getTextFieldByTestId(wrapper, "password");
				const confirmPassword = getTextFieldByTestId(wrapper, "confirm-password");

				await password.setValue("Password123!");
				await confirmPassword.setValue("DifferentPassword123!");
				await confirmPassword.trigger("blur");

				expect(confirmPassword.text()).toContain(
					"pages.registrationExternalMembers.steps.password.validation.passwordsMatch"
				);
			});

			it("should trigger validation for non empty confirm password when password changes", async () => {
				const { wrapper } = setup();
				const password = getTextFieldByTestId(wrapper, "password");
				const confirmPassword = getTextFieldByTestId(wrapper, "confirm-password");

				await confirmPassword.setValue("Password123!");
				await confirmPassword.trigger("blur");
				expect(confirmPassword.text()).toContain(
					"pages.registrationExternalMembers.steps.password.validation.passwordsMatch"
				);

				await password.setValue("Password123!");
				await flushPromises();

				expect(confirmPassword.text()).not.toContain(
					"pages.registrationExternalMembers.steps.password.validation.passwordsMatch"
				);
			});

			it("should not trigger validation for empty confirm password when password changes", async () => {
				const { wrapper } = setup();
				const password = getTextFieldByTestId(wrapper, "password");
				const confirmPassword = getTextFieldByTestId(wrapper, "confirm-password");

				await password.setValue("Password123!");
				await password.trigger("blur");
				await flushPromises();

				expect(confirmPassword.text()).not.toContain(
					"pages.registrationExternalMembers.steps.password.validation.passwordsMatch"
				);
			});
		});
	});
});
