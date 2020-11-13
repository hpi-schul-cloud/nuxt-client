import { mount } from "@vue/test-utils";
import LdapConnectionSection from "./LdapConnectionSection";

describe("@components/organisms/LdapConnectionSection", () => {
	const ldapConfigData = {
		url: "ldaps://url.u",
		rootPath: "cn=schueler,ou=rolle",
		basisPfad: "cn=schueler,ou=rolle",
		searchUser: "cn=schueler,ou=rolle",
		searchUserPassword: "pass",
	};
	it(...isValidComponent(LdapConnectionSection));

	it("has correct child components", () => {
		const wrapper = mount(LdapConnectionSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});

		expect(wrapper.find("[data-testid=ldapDataConnectionUrl]").exists()).toBe(
			true
		);
		expect(
			wrapper.find("[data-testid=ldapDataConnectionBasisPfad]").exists()
		).toBe(true);
		expect(
			wrapper.find("[data-testid=ldapDataConnectionSearchUser]").exists()
		).toBe(true);
		expect(
			wrapper
				.find("[data-testid=ldapDataConnectionSearchUserPassword]")
				.exists()
		).toBe(true);
	});

	it("loads the validator", () => {
		const wrapper = mount(LdapConnectionSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});
		expect(wrapper.vm.$v).not.toBeUndefined();
	});

	it("invalid validation is false when valid values are sent thorugh props", async () => {
		const wrapper = mount(LdapConnectionSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});

		await wrapper.vm.$v.$touch();
		// default props values are valid so expect this assertion to succeed
		expect(wrapper.vm.$v.$invalid).toBe(false);
	});

	it("invalid validation is true when invalid values are sent thorugh props", async () => {
		const wrapper = mount(LdapConnectionSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});

		await wrapper.setProps({
			value: {
				url: "invalid",
				rootPath: "invalid",
				basisPfad: "invalid",
				searchUser: "invalid",
				searchUserPassword: "",
			},
		});

		await wrapper.vm.$v.$touch();
		expect(wrapper.vm.$v.$invalid).toBe(true);
	});

	it("invalid validation is true when any of the input values are invalid", async () => {
		const wrapper = mount(LdapConnectionSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});

		const inputUrl = wrapper.find("input[data-testid=ldapDataConnectionUrl]");
		expect(inputUrl.exists()).toBe(true);

		// inputUrl.setValue("");
		// expect(inputUrl.element.value).toBe("");

		// temporary fix for validation model not updating
		wrapper.vm.$v.value.url.$model = "";

		expect(wrapper.vm.$v.$invalid).toBe(true);
	});

	it("it emits update:errors event when validate prop changes value", async () => {
		const wrapper = mount(LdapConnectionSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
				validate: false,
			},
		});
		expect(wrapper.emitted("update:errors")).toBeUndefined();

		await wrapper.setProps({
			validate: true,
		});
		expect(wrapper.vm.$props.validate).toBe(true);

		await wrapper.vm.$nextTick();
		expect(wrapper.emitted("update:errors")[0]).toHaveLength(2);
	});
});
