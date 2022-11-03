import { mount } from "@vue/test-utils";
import LdapConnectionSection from "./LdapConnectionSection";

describe("@/components/organisms/LdapConnectionSection", () => {
	const ldapConfigData = {
		url: "ldaps://url.u",
		rootPath: "cn=schueler,ou=rolle",
		basisPath: "cn=schueler,ou=rolle",
		searchUser: "cn=schueler,ou=rolle",
		searchUserPassword: "pass",
	};

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
			wrapper.find("[data-testid=ldapDataConnectionBasisPath]").exists()
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

	it("invalid validation is false when valid values are sent through props", async () => {
		const wrapper = mount(LdapConnectionSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigData,
			},
		});
		// default props values are valid so expect this assertion to succeed
		expect(wrapper.vm.$v.$invalid).toBe(false);
	});

	it("invalid validation is true when invalid values are sent through props", async () => {
		const wrapper = mount(LdapConnectionSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: {
					url: "invalid",
					rootPath: "invalid",
					basisPath: "invalid",
					searchUser: "invalid",
					searchUserPassword: "",
				},
			},
		});
		expect(wrapper.vm.$v.$invalid).toBe(true);
	});

	it("invalid validation is true when any of the input values are invalid", async () => {
		const ldapConfigDataTestSpecific = {
			...ldapConfigData,
		};
		const wrapper = mount(LdapConnectionSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigDataTestSpecific,
			},
			listeners: {
				input: (event) => {
					ldapConfigDataTestSpecific.url = event.url;
					ldapConfigDataTestSpecific.rootPath = event.rootPath;
					ldapConfigDataTestSpecific.basisPath = event.basisPath;
					ldapConfigDataTestSpecific.searchUser = event.searchUser;
					ldapConfigDataTestSpecific.searchUserPassword =
						event.searchUserPassword;
				},
			},
		});

		const inputUrl = wrapper.find("input[data-testid=ldapDataConnectionUrl]");
		expect(inputUrl.exists()).toBe(true);

		inputUrl.setValue("");
		inputUrl.trigger("blur");

		expect(inputUrl.element.value).toBe("");
		expect(wrapper.vm.$v.$invalid).toBe(true);
		await wrapper.vm.$nextTick();
		const errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataConnectionUrl'] .base-input-info.base-input-error"
		);
		expect(errorMessageComponent.exists()).toBeTrue();
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

	it("invalid error message is displayed only after the blur event, even if originally invalid props were passed through", async () => {
		const ldapConfigDataTestSpecific = {
			url: "invalid",
			rootPath: "invalid",
			basisPath: "invalid",
			searchUser: "invalid",
			searchUserPassword: "",
		};
		const wrapper = mount(LdapConnectionSection, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				value: ldapConfigDataTestSpecific,
			},
			listeners: {
				input: (event) => {
					ldapConfigDataTestSpecific.url = event.url;
					ldapConfigDataTestSpecific.rootPath = event.rootPath;
					ldapConfigDataTestSpecific.basisPath = event.basisPath;
					ldapConfigDataTestSpecific.searchUser = event.searchUser;
					ldapConfigDataTestSpecific.searchUserPassword =
						event.searchUserPassword;
				},
			},
		});

		let errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataConnectionUrl'] .base-input-info.base-input-error"
		);
		expect(wrapper.vm.$v.$invalid).toBe(true);
		expect(errorMessageComponent.exists()).toBeFalse();

		const inputUrl = wrapper.find("input[data-testid=ldapDataConnectionUrl]");
		expect(inputUrl.exists()).toBe(true);
		expect(inputUrl.element.value).toBe(ldapConfigDataTestSpecific.url);

		inputUrl.trigger("blur"); // without this the error is not displayed

		await wrapper.vm.$nextTick();
		errorMessageComponent = wrapper.find(
			"div[data-testid='ldapDataConnectionUrl'] .base-input-info.base-input-error"
		);
		expect(errorMessageComponent.exists()).toBeTrue();
	});
});
