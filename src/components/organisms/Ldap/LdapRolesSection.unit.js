import { mount } from "@vue/test-utils";
import LdapRolesSection from "./LdapRolesSection";

describe("@components/organisms/LdapRolesSection", () => {
	const ldapConfigData = {
		groupOption: "group",
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
				// validations are only active when groupOption !== group
				value: { ...ldapConfigData, groupOption: "not group" },
			},
		});
		expect(wrapper.vm.$v).not.toBeUndefined();
	});

	it("invalid validation is false when valid values are sent through props", async () => {
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				// validations are only active when groupOption !== group
				value: { ...ldapConfigData, groupOption: "not group" },
			},
		});
		// default props values are valid so expect this assertion to succeed
		expect(wrapper.vm.$v.$invalid).toBe(false);
	});

	it("invalid validation is true when invalid values are sent through props", async () => {
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: {
					// validations are only active when groupOption !== group
					groupOption: "not ldap group",
					member: "",
					student: "invalid",
					teacher: "invalid",
					admin: "invalid",
					user: "invalid",
				},
			},
		});
		expect(wrapper.vm.$v.$invalid).toBe(true);
	});

	it("invalid validation is true when any of the input values are invalid", async () => {
		const ldapConfigDataTestSpecific = {
			...ldapConfigData,
			// validations are only active when groupOption !== group
			groupOption: "not ldap group",
		};
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigDataTestSpecific,
			},
			listeners: {
				input: (event) => {
					ldapConfigDataTestSpecific.member = event.member;
					ldapConfigDataTestSpecific.student = event.student;
					ldapConfigDataTestSpecific.teacher = event.teacher;
					ldapConfigDataTestSpecific.admin = event.admin;
					ldapConfigDataTestSpecific.user = event.user;
				},
			},
		});

		const inputMember = wrapper.find("input[data-testid=ldapDataRolesMember]");
		expect(inputMember.exists()).toBe(true);

		inputMember.setValue("");
		inputMember.trigger("blur");

		expect(inputMember.element.value).toBe("");
		expect(wrapper.vm.$v.$invalid).toBe(true);
		await wrapper.vm.$nextTick();
		const errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataRolesMember'] .info.error"
		);
		expect(errorMessageComponent.exists()).toBeTrue();
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

	it("invalid error message is displayed only after the blur event, even if originally invalid props were passed through", async () => {
		const ldapConfigDataTestSpecific = {
			// validations are only active when groupOption !== group
			groupOption: "not ldap group",
			member: "",
			student: "invalid",
			teacher: "invalid",
			admin: "invalid",
			user: "invalid",
		};
		const wrapper = mount(LdapRolesSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigDataTestSpecific,
			},
			listeners: {
				input: (event) => {
					ldapConfigDataTestSpecific.member = event.member;
					ldapConfigDataTestSpecific.student = event.student;
					ldapConfigDataTestSpecific.teacher = event.teacher;
					ldapConfigDataTestSpecific.admin = event.admin;
					ldapConfigDataTestSpecific.user = event.user;
				},
			},
		});

		let errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataRolesMember'] .info.error"
		);
		expect(wrapper.vm.$v.$invalid).toBe(true);
		expect(errorMessageComponent.exists()).toBeFalse();

		const inputMember = wrapper.find("input[data-testid=ldapDataRolesMember]");
		expect(inputMember.exists()).toBe(true);
		expect(inputMember.element.value).toBe(ldapConfigDataTestSpecific.member);

		inputMember.trigger("blur"); // without this the error is not displayed

		await wrapper.vm.$nextTick();
		errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataRolesMember'] .info.error"
		);
		expect(errorMessageComponent.exists()).toBeTrue();
	});
});
