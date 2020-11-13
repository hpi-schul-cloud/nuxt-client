import { mount } from "@vue/test-utils";
import LdapConnectionSection from "./LdapConnectionSection";

describe("@components/organisms/LdapConnectionSection", () => {
	const ldapConfigData = {
		url: "url",
		rootPath: "rootPath",
		basisPfad: "basisPfad",
		searchUser: "searchUser",
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
});
