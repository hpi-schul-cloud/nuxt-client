import ProfileForm from "./ProfileForm.vue";
import { createTestAppStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

describe("ProfileForm.vue", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
	});

	const defaultProps = {
		initialData: {
			firstName: "Max",
			lastName: "Mustermann",
			email: "max@example.com",
		},
		isSSO: false,
		isStudent: false,
		canEditPassword: true,
		loading: false,
	};

	const setup = (props: Partial<typeof defaultProps> = {}) =>
		mount(ProfileForm, {
			props: { ...defaultProps, ...props },
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

	const setInput = async (wrapper: ReturnType<typeof setup>, testId: string, value: string) => {
		await wrapper.find(`[data-test-id="${testId}"] input`).setValue(value);
	};

	const submit = async (wrapper: ReturnType<typeof setup>) => {
		await wrapper.find("form").trigger("submit.prevent");
		await flushPromises();
	};

	describe("rendering", () => {
		it("renders name, email and all password fields for teachers", () => {
			const wrapper = setup();

			expect(wrapper.find('[data-test-id="input_first_name"]').exists()).toBe(true);
			expect(wrapper.find('[data-test-id="input_last_name"]').exists()).toBe(true);
			expect(wrapper.find('[data-test-id="input_email"]').exists()).toBe(true);
			expect(wrapper.find('[data-test-id="input_current_password"]').exists()).toBe(true);
			expect(wrapper.find('[data-test-id="input_new_password"]').exists()).toBe(true);
			expect(wrapper.find('[data-test-id="input_confirm_password"]').exists()).toBe(true);
		});

		it("puts the legacy id and test id on the email input itself", () => {
			const wrapper = setup();
			const input = wrapper.find('[data-test-id="input_email"] input');

			expect(input.attributes("id")).toBe("email");
			expect(input.attributes("data-testid")).toBe("user_email");
			expect(wrapper.find('label[for="email"]').exists()).toBe(true);
		});

		it("hides name fields for students", () => {
			const wrapper = setup({ isStudent: true });

			expect(wrapper.find('[data-test-id="input_first_name"]').exists()).toBe(false);
			expect(wrapper.find('[data-test-id="input_last_name"]').exists()).toBe(false);
			expect(wrapper.find('[data-test-id="input_email"]').exists()).toBe(true);
		});

		it("keeps the current password but hides new password fields without PASSWORD_EDIT", () => {
			const wrapper = setup({ canEditPassword: false });

			expect(wrapper.find('[data-test-id="input_current_password"]').exists()).toBe(true);
			expect(wrapper.find('[data-test-id="input_new_password"]').exists()).toBe(false);
			expect(wrapper.find('[data-test-id="input_confirm_password"]').exists()).toBe(false);
		});

		it.each([false, true])("shows read-only data and the SSO notice for SSO users (student: %s)", (isStudent) => {
			const wrapper = setup({ isSSO: true, isStudent });

			expect(wrapper.find('[data-testid="sso-notice"]').exists()).toBe(true);
			expect(wrapper.find('[data-test-id="input_first_name"] input').attributes("readonly")).toBeDefined();
			expect(wrapper.find('[data-test-id="input_email"] input').attributes("data-testid")).toBe("user_email_readonly");
			expect(wrapper.find('[data-test-id="input_current_password"]').exists()).toBe(false);
			expect(wrapper.find('[data-testid="submit_new_password_btn"]').exists()).toBe(false);
		});
	});

	describe("submitting", () => {
		it("emits only changed fields together with the new password", async () => {
			const wrapper = setup();
			await setInput(wrapper, "input_first_name", "Moritz");
			await setInput(wrapper, "input_last_name", "Musterfrau");
			await setInput(wrapper, "input_email", "moritz@example.com");
			await setInput(wrapper, "input_current_password", "OldPass1!");
			await setInput(wrapper, "input_new_password", "NewPass1/");
			await setInput(wrapper, "input_confirm_password", "NewPass1/");
			await submit(wrapper);

			expect(wrapper.emitted("submit")?.[0][0]).toEqual({
				passwordOld: "OldPass1!",
				email: "moritz@example.com",
				firstName: "Moritz",
				lastName: "Musterfrau",
				passwordNew: "NewPass1/",
			});
		});

		it("requires the current password for a name-only change", async () => {
			const wrapper = setup();
			await setInput(wrapper, "input_first_name", "Moritz");
			await submit(wrapper);

			expect(wrapper.emitted("submit")).toBeUndefined();
			expect(wrapper.text()).toContain("pages.account.password.errors.currentRequired");
		});

		it("does not emit name changes for students", async () => {
			const wrapper = setup({ isStudent: true });
			await setInput(wrapper, "input_current_password", "OldPass1!");
			await submit(wrapper);

			expect(wrapper.emitted("submit")?.[0][0]).toEqual(
				expect.objectContaining({ firstName: undefined, lastName: undefined })
			);
		});

		it.each([
			["too short", "Ab1!"],
			["no lowercase letter", "ABCDEFG1!"],
			["no uppercase letter", "abcdefg1!"],
			["no number", "Abcdefgh!"],
			["no special character", "Abcdefg1"],
		])("rejects a new password with %s", async (_, password) => {
			const wrapper = setup();
			await setInput(wrapper, "input_current_password", "OldPass1!");
			await setInput(wrapper, "input_new_password", password);
			await setInput(wrapper, "input_confirm_password", password);
			await submit(wrapper);

			expect(wrapper.emitted("submit")).toBeUndefined();
			expect(wrapper.find('[data-test-id="input_new_password"] .v-messages__message').exists()).toBe(true);
		});

		it("rejects a password confirmation that does not match", async () => {
			const wrapper = setup();
			await setInput(wrapper, "input_current_password", "OldPass1!");
			await setInput(wrapper, "input_new_password", "NewPass1!");
			await setInput(wrapper, "input_confirm_password", "OtherPass1!");
			await submit(wrapper);

			expect(wrapper.emitted("submit")).toBeUndefined();
			expect(wrapper.text()).toContain("pages.account.password.errors.mismatch");
		});
	});

	it("resets the form including passwords when new profile data arrives", async () => {
		const wrapper = setup();
		await setInput(wrapper, "input_first_name", "Moritz");
		await setInput(wrapper, "input_current_password", "OldPass1!");
		await setInput(wrapper, "input_new_password", "NewPass1!");

		await wrapper.setProps({ initialData: { ...defaultProps.initialData, email: "new@example.com" } });

		const value = (testId: string) =>
			(wrapper.find(`[data-test-id="${testId}"] input`).element as HTMLInputElement).value;
		expect(value("input_first_name")).toBe("Max");
		expect(value("input_email")).toBe("new@example.com");
		expect(value("input_current_password")).toBe("");
		expect(value("input_new_password")).toBe("");
	});

	it("does not mark the cleared password fields as invalid after a successful save", async () => {
		const wrapper = setup();
		await setInput(wrapper, "input_current_password", "OldPass1!");
		await setInput(wrapper, "input_new_password", "NewPass1!");
		await setInput(wrapper, "input_confirm_password", "NewPass1!");
		await submit(wrapper);

		await wrapper.setProps({ initialData: { ...defaultProps.initialData } });
		await flushPromises();

		expect(wrapper.find(".v-input--error").exists()).toBe(false);
	});
});
