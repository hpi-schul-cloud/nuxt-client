import { mount } from "@vue/test-utils";
import LdapUsersSection from "./LdapUsersSection";

describe("@components/organisms/LdapUsersSection", () => {
	const ldapConfigData = {
		userPfad: "user=path;;user=p",
		firstName: "givenName",
		familyName: "sn",
		email: "mail@de.de",
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

	it("loads the validator", () => {
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});
		expect(wrapper.vm.$v).not.toBeUndefined();
	});

	it("invalid validation is false when valid values are sent thorugh props", async () => {
		const wrapper = mount(LdapUsersSection, {
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
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});

		await wrapper.setProps({
			value: {
				userPfad: "invalid",
				firstName: "",
				familyName: "",
				email: "",
				uid: "",
				uuid: "",
			},
		});

		await wrapper.vm.$v.$touch();
		expect(wrapper.vm.$v.$invalid).toBe(true);
	});

	it("invalid validation is true when any of the input values are invalid", async () => {
		const wrapper = mount(LdapUsersSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});

		const inputPath = wrapper.find("input[data-testid=ldapDataUsersUserPfad]");
		expect(inputPath.exists()).toBe(true);

		// inputPath.setValue("");
		// expect(inputPath.element.value).toBe("");

		// temporary fix for validation model not updating
		wrapper.vm.$v.value.userPfad.$model = "";

		expect(wrapper.vm.$v.$invalid).toBe(true);
	});

	it("it emits update:errors event when validate prop changes value", async () => {
		const wrapper = mount(LdapUsersSection, {
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
