import LdapUsersSection from "./LdapUsersSection";
import BaseInput from "@/components/base/BaseInput/BaseInput.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("@/components/organisms/LdapUsersSection", () => {
	const getWrapper = (props = {}) =>
		mount(LdapUsersSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				components: {
					"base-input": BaseInput,
				},
			},
			props: {
				modelValue: {
					userPath: "user=path;;user=p",
					firstName: "givenName",
					familyName: "sn",
					email: "mail@de.de",
					uid: "uid",
					uuid: "uuid",
				},
				...props,
			},
		});

	it("has correct child components", () => {
		const wrapper = getWrapper();

		expect(wrapper.find("[data-testid=ldapDataUsersUserPath]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersFirstName]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersFamilyName]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersEmail]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersUid]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersUuid]").exists()).toBe(true);
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
				userPath: "invalid",
				firstName: "",
				familyName: "",
				email: "",
				uid: "",
				uuid: "",
			},
		});
		expect(wrapper.vm.v$.$invalid).toBe(true);
	});

	it("invalid validation is true when any of the input values are invalid", async () => {
		const wrapper = getWrapper({
			modelValue: {
				userPath: "invalid",
				firstName: "",
				familyName: "",
				email: "",
				uid: "",
				uuid: "",
			},
		});

		await wrapper.vm.v$.$touch();

		const errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataUsersFirstName'] .base-input-info.base-input-error"
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
			userPath: "invalid",
			firstName: "",
			familyName: "",
			email: "",
			uid: "",
			uuid: "",
		};
		const wrapper = getWrapper({
			modelValue: ldapConfigDataTestSpecific,
		});

		let errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataUsersFirstName'] .base-input-info.base-input-error"
		);
		expect(wrapper.vm.v$.$invalid).toBe(true);
		expect(errorMessageComponent.exists()).toBeFalsy();

		const inputFirstName = wrapper.find("input[data-testid=ldapDataUsersFirstName]");
		expect(inputFirstName.exists()).toBe(true);
		expect(inputFirstName.element.value).toBe(ldapConfigDataTestSpecific.firstName);

		await inputFirstName.trigger("blur"); // without this the error is not displayed

		errorMessageComponent = wrapper.find("div[data-testid='ldapDataUsersFirstName'] .base-input-info.base-input-error");
		expect(errorMessageComponent.exists()).toBeTruthy();
	});
});
