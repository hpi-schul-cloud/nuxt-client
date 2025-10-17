import LdapConnectionSection from "./LdapConnectionSection";
import BaseInput from "@/components/base/BaseInput/BaseInput.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

describe("@/components/organisms/LdapConnectionSection", () => {
	beforeAll(() => {
		setActivePinia(createPinia());
	});

	const getWrapper = (props = {}) =>
		mount(LdapConnectionSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				components: {
					"base-input": BaseInput,
				},
			},
			props: {
				modelValue: {
					url: "ldaps://url.u",
					rootPath: "cn=schueler,ou=rolle",
					basisPath: "cn=schueler,ou=rolle",
					searchUser: "cn=schueler,ou=rolle",
					searchUserPassword: "pass",
				},
				...props,
			},
		});

	it("has correct child components", () => {
		const wrapper = getWrapper();

		expect(wrapper.find("[data-testid=ldapDataConnectionUrl]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataConnectionBasisPath]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataConnectionSearchUser]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataConnectionSearchUserPassword]").exists()).toBe(true);
	});

	it("loads the validator", () => {
		const wrapper = getWrapper();
		expect(wrapper.vm.v$).not.toBeUndefined();
	});

	it("invalid validation is false when valid values are sent through props", async () => {
		const wrapper = getWrapper();
		// default props values are valid so expect this assertion to succeed
		expect(wrapper.vm.v$.$invalid).toBe(false);
	});

	it("invalid validation is true when invalid values are sent through props", async () => {
		const wrapper = getWrapper({
			modelValue: {
				url: "invalid",
				rootPath: "invalid",
				basisPath: "invalid",
				searchUser: "invalid",
				searchUserPassword: "",
			},
		});

		expect(wrapper.vm.v$.$invalid).toBe(true);
	});

	it("invalid validation is true when any of the input values are invalid", async () => {
		const wrapper = getWrapper({
			modelValue: {
				url: "invalid",
				rootPath: "invalid",
				basisPath: "invalid",
				searchUser: "invalid",
				searchUserPassword: "",
			},
		});

		await wrapper.vm.v$.$touch();

		const errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataConnectionUrl'] .base-input-info.base-input-error"
		);
		expect(errorMessageComponent.exists()).toBeTruthy();
	});

	it("it emits update:errors event when validate prop changes value", async () => {
		const wrapper = getWrapper({
			validate: false,
		});
		expect(wrapper.emitted("update:errors")).toBeUndefined();

		await wrapper.setProps({
			validate: true,
		});
		expect(wrapper.vm.$props.validate).toBe(true);

		await wrapper.vm.$nextTick();
		expect(wrapper.emitted("update:errors")[0]).toHaveLength(2);
	});

	it("invalid error message is displayed only after the blur event, even if originally invalid props were passed through", async () => {
		const ldapConfigDataTestSpecific = {
			url: "invalid",
			rootPath: "invalid",
			basisPath: "invalid",
			searchUser: "invalid",
			searchUserPassword: "",
		};
		const wrapper = getWrapper({
			modelValue: ldapConfigDataTestSpecific,
		});

		let errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataConnectionUrl'] .base-input-info.base-input-error"
		);
		expect(wrapper.vm.v$.$invalid).toBe(true);
		expect(errorMessageComponent.exists()).toBeFalsy();

		const inputUrl = wrapper.find("input[data-testid=ldapDataConnectionUrl]");
		expect(inputUrl.exists()).toBe(true);
		expect(inputUrl.element.value).toBe(ldapConfigDataTestSpecific.url);

		await inputUrl.trigger("blur"); // without this the error is not displayed

		errorMessageComponent = wrapper.find("div[data-testid='ldapDataConnectionUrl'] .base-input-info.base-input-error");
		expect(errorMessageComponent.exists()).toBeTruthy();
	});
});
