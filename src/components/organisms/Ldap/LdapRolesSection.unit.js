import { mount } from "@vue/test-utils";
import LdapRolesSection from "./LdapRolesSection";

describe("@components/organisms/LdapRolesSection", () => {
	const ldapConfigData = {
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
		expect(wrapper.find(".ldapRolesMember").exists()).toBe(true);
		expect(wrapper.find(".ldapDataStudent").exists()).toBe(true);
		expect(wrapper.find(".ldapDataTeacher").exists()).toBe(true);
		expect(wrapper.find(".ldapDataAdmin").exists()).toBe(true);
		expect(wrapper.find(".ldapDataUser").exists()).toBe(true);
	});
});
