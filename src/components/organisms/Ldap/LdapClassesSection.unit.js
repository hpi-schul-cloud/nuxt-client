import { mount } from "@vue/test-utils";
import LdapClassesSection from "./LdapClassesSection";

describe("@components/organisms/LdapClassesSection", () => {
	const ldapConfigData = {
		classPfad: "classPfad",
		nameAttribute: "description",
		participantAttribute: "member",
	};
	it(...isValidComponent(LdapClassesSection));

	it("has correct child components", () => {
		const wrapper = mount(LdapClassesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});

		expect(wrapper.find("[data-testid=ldapDataClassesPfad]").exists()).toBe(
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
});
