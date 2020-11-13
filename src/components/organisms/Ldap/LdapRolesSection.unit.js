import { mount } from "@vue/test-utils";
import LdapRolesSection from "./LdapRolesSection";

describe("@components/organisms/LdapRolesSection", () => {
	const ldapConfigData = {
		groupOption: "ldap_group",
		member: "description",
		student: "cn=schueler,ou=rolle",
		teacher: "cn=lehrer,ou=rolle",
		admin: "cn=admin,ou=rolle",
		user: "cn=ehemalige,ou=rolle",
	};
	it(...isValidComponent(LdapRolesSection));

	it("has correct child components", () => {
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});

		expect(wrapper.find(".section-sub-header").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataRolesMember]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataRolesStudent]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataRolesTeacher]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataRolesAdmin]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataRolesUser]").exists()).toBe(true);
	});

	it("loads the validator", async () => {
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});
		// validations are only active when groupOption !== ldap_group
		await wrapper.setProps({
			value: { ...ldapConfigData, groupOption: "not LDAP_group" },
		});
		expect(wrapper.vm.$v).not.toBeUndefined();
	});

	it("invalid validation is false when valid values are sent thorugh props", async () => {
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});
		// validations are only active when groupOption !== ldap_group
		await wrapper.setProps({
			value: { ...ldapConfigData, groupOption: "not LDAP_group" },
		});
		await wrapper.vm.$v.$touch();
		// default props values are valid so expect this assertion to succeed
		expect(wrapper.vm.$v.$invalid).toBe(false);
	});

	it("invalid validation is true when invalid values are sent thorugh props", async () => {
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});
		// validations are only active when groupOption !== ldap_group
		await wrapper.setProps({
			value: {
				groupOption: "not ldap group",
				member: "",
				student: "invalid",
				teacher: "invalid",
				admin: "invalid",
				user: "invalid",
			},
		});

		await wrapper.vm.$v.$touch();
		expect(wrapper.vm.$v.$invalid).toBe(true);
	});

	it("invalid validation is true when any of the input values are invalid", async () => {
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});
		// validations are only active when groupOption !== ldap_group
		await wrapper.setProps({
			value: { ...ldapConfigData, groupOption: "not LDAP_group" },
		});

		const inputMember = wrapper.find("input[data-testid=ldapDataRolesMember]");
		expect(inputMember.exists()).toBe(true);

		// inputMember.setValue("");
		// expect(inputMember.element.value).toBe("");

		// temporary fix for validation model not updating
		wrapper.vm.$v.value.member.$model = "";

		expect(wrapper.vm.$v.$invalid).toBe(true);
	});

	it("it emits update:errors event when validate prop changes value", async () => {
		const wrapper = mount(LdapRolesSection, {
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
