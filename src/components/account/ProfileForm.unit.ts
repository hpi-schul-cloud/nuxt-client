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

	const setup = (props = defaultProps) =>
		mount(ProfileForm, {
			props,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

	it("renders first name, last name, and email for non-SSO teachers", () => {
		const wrapper = setup();
		expect(wrapper.find('[data-test-id="input_first_name"]').exists()).toBe(true);
		expect(wrapper.find('[data-test-id="input_last_name"]').exists()).toBe(true);
		expect(wrapper.find('[data-test-id="input_email"]').exists()).toBe(true);
		expect(wrapper.find('[data-test-id="input_current_password"]').exists()).toBe(true);
	});

	it("hides name fields for student users", () => {
		const wrapper = setup({ ...defaultProps, isStudent: true });
		expect(wrapper.find('[data-test-id="input_first_name"]').exists()).toBe(false);
		expect(wrapper.find('[data-test-id="input_last_name"]').exists()).toBe(false);
		expect(wrapper.find('[data-test-id="input_email"]').exists()).toBe(true);
	});

	it("renders read-only fields and SSO notice for SSO users", () => {
		const wrapper = setup({ ...defaultProps, isSSO: true });
		expect(wrapper.find('[data-testid="sso-notice"]').exists()).toBe(true);
		expect(wrapper.find('[data-test-id="input_current_password"]').exists()).toBe(false);
		expect(wrapper.find('[data-testid="submit_new_password_btn"]').exists()).toBe(false);
	});

	it("emits submit event when form is saved", async () => {
		const wrapper = setup();
		await wrapper.find("form").trigger("submit.prevent");
		await flushPromises();

		expect(wrapper.emitted("submit")).toBeTruthy();
		expect(wrapper.emitted("submit")?.[0][0]).toEqual({
			passwordOld: "",
			email: undefined,
			firstName: undefined,
			lastName: undefined,
			passwordNew: undefined,
		});
	});
});
