import { mount } from "@vue/test-utils";
import LdapClassesSection from "./LdapClassesSection";
import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import BaseInput from "@/components/base/BaseInput/BaseInput.vue";

describe("@/components/administration/LdapClassesSection", () => {
	const setup = (props = {}) => {
		const wrapper = mount(LdapClassesSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				components: {
					"base-input": BaseInput,
				},
			},
			props: {
				modelValue: {
					classPath: "class=path",
					nameAttribute: "description",
					participantAttribute: "member",
				},
				...props,
			},
		});
		return { wrapper };
	};

	it("has correct child components", () => {
		const { wrapper } = setup();

		expect(wrapper.find("[data-testid=ldapDataClassesPath]").exists()).toBe(
			true
		);
		expect(
			wrapper.find("[data-testid=ldapDataClassesNameAttribute]").exists()
		).toBe(true);
		expect(
			wrapper
				.find("[data-testid=ldapDataClassesNameparticipantAttribute]")
				.exists()
		).toBe(true);
	});

	it("loads the validator", async () => {
		const { wrapper } = setup();

		expect(wrapper.vm.v$).not.toBeUndefined();
	});

	describe("valid values", () => {
		it("should set the validator to valid", async () => {
			const { wrapper } = setup();

			// validations are only active when checked === true
			await wrapper.setData({ checked: true });
			// default props values are valid so expect this assertion to succeed
			expect(wrapper.vm.v$.$invalid).toBe(false);
		});
	});

	describe("invalid values", () => {
		it("should set the validator to invalid", async () => {
			const { wrapper } = setup({
				modelValue: {
					classPath: "invalid",
					nameAttribute: "",
					participantAttribute: "",
				},
			});

			// validations are only active when checked === true
			await wrapper.setData({ checked: true });

			expect(wrapper.vm.v$.$invalid).toBe(true);
		});

		it("should render an error message", async () => {
			const { wrapper } = setup({
				modelValue: {
					classPath: "",
					nameAttribute: "",
					participantAttribute: "",
				},
			});

			// validations are only active when checked === true
			await wrapper.setData({ checked: true });
			await wrapper.vm.v$.$touch();

			const errorMessageComponent = wrapper.find(
				'[data-testid="ldapDataClassesPath"] .base-input-info.base-input-error'
			);

			expect(errorMessageComponent.text()).toEqual(
				"common.validation.required"
			);
		});
	});

	it("it emits update:errors event when validate prop changes value", async () => {
		const { wrapper } = setup({
			validate: false,
		});

		expect(wrapper.emitted("update:errors")).toHaveLength(1);

		await wrapper.setProps({
			validate: true,
		});

		expect(wrapper.emitted("update:errors")).toHaveLength(2);
	});

	it("invalid error message is displayed only after the blur event, even if originally invalid props were passed through", async () => {
		const { wrapper } = setup({
			modelValue: {
				classPath: "invalid",
				nameAttribute: "",
				participantAttribute: "",
			},
		});

		// validations are only active when checked === true
		await wrapper.setData({ checked: true });

		expect(wrapper.vm.v$.$invalid).toBe(true);
		const errorMessageComponentBefore = wrapper.find(
			'[data-testid="ldapDataClassesPath"] .base-input-info.base-input-error'
		);
		expect(errorMessageComponentBefore.exists()).toBe(false);

		await wrapper.vm.v$.$touch(); // without this the error is not displayed

		const errorMessageComponentAfter = wrapper.find(
			'[data-testid="ldapDataClassesPath"] .base-input-info.base-input-error'
		);

		expect(errorMessageComponentAfter.text()).toEqual(
			"pages.administration.ldapEdit.validation.path"
		);
	});
});
