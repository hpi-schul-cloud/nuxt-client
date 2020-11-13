import { mount } from "@vue/test-utils";
import LdapUsersSection from "./LdapUsersSection";

describe("@components/organisms/LdapUsersSection", () => {
	const ldapConfigData = {
		userPfad: "userPfad",
		firstName: "givenName",
		familyName: "sn",
		email: "mail",
		uid: "uid",
		uuid: "uuid",
	};
	it(...isValidComponent(LdapUsersSection));

	it("has correct child components", () => {
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});

		expect(wrapper.find("[data-testid=ldapDataUsersUserPfad]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataUsersFirstName]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataUsersFamilyName]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataUsersEmail]").exists()).toBe(
			true
		);
		expect(wrapper.find("[data-testid=ldapDataUsersUid]").exists()).toBe(true);
		expect(wrapper.find("[data-testid=ldapDataUsersUuid]").exists()).toBe(true);
	});
});
