import Password from "./Password.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { VueWrapper } from "@vue/test-utils";
import { VTextField } from "vuetify/components";

const setup = () => {
	const wrapper = mount(Password, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
	});
	return { wrapper };
};

const getTextFieldByTestId = (wrapper: VueWrapper, testId: string) =>
	wrapper.get(`[data-testid=${testId}]`).getComponent(VTextField);

describe("Password.vue", () => {
	it("renders correctly", () => {
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
	});

	describe("password fields", () => {
		it("should render password fields", () => {
			const { wrapper } = setup();
			const password = getTextFieldByTestId(wrapper, "password");
			const confirmPassword = getTextFieldByTestId(wrapper, "confirm-password");

			expect(password.props("label")).toBe("common.labels.password");
			expect(confirmPassword.props("label")).toBe("Passwort wiederholen");
		});

		it("should associate the password field with the password instructions for accessibility", () => {
			const { wrapper } = setup();
			const password = getTextFieldByTestId(wrapper, "password");

			expect(password.attributes("aria-describedby")).toBe("password-instructions");
		});
	});
});
